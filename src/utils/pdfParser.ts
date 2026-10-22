import * as pdfjsLib from 'pdfjs-dist';

// Configure worker safely for browser environment
if (typeof window !== 'undefined' && 'Worker' in window) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('PDF.js worker could not be initialized from CDN:', e);
  }
}

export interface ParseResult {
  text: string;
  pageCount: number;
  fileName: string;
  fileSizeBytes: number;
}

export async function parsePdfFile(file: File, onProgress?: (percentage: number) => void): Promise<ParseResult> {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file size (max 8MB)
  const MAX_SIZE_BYTES = 8 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a PDF under 8MB.`);
  }

  // Handle plain text or markdown directly
  if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
    onProgress?.(50);
    const text = await file.text();
    onProgress?.(100);
    return {
      text,
      pageCount: 1,
      fileName: file.name,
      fileSizeBytes: file.size,
    };
  }

  // Handle PDF files
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    try {
      onProgress?.(10);
      const arrayBuffer = await file.arrayBuffer();
      onProgress?.(30);

      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useSystemFonts: true,
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let fullText = '';

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ');
        fullText += pageText + '\n\n';

        const percent = Math.min(95, 30 + Math.round((pageNum / numPages) * 60));
        onProgress?.(percent);
      }

      onProgress?.(100);

      const cleanedText = fullText.trim();
      if (!cleanedText || cleanedText.length < 50) {
        throw new Error(
          'Could not extract readable text from this PDF. It might be a scanned image. Please upload a searchable PDF or paste your resume text directly.'
        );
      }

      return {
        text: cleanedText,
        pageCount: numPages,
        fileName: file.name,
        fileSizeBytes: file.size,
      };
    } catch (err: any) {
      if (err.message && err.message.includes('readable text')) {
        throw err;
      }
      throw new Error(
        `Failed to parse PDF: ${err.message || 'Corrupted or password-protected PDF'}. Try copy-pasting your text below instead.`
      );
    }
  }

  throw new Error('Unsupported format. Please upload a .pdf, .txt, or .md file.');
}
