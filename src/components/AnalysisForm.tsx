import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Building2, 
  Briefcase,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { parsePdfFile } from '../utils/pdfParser';
import { analyzeResumeAndJob } from '../utils/analyzer';
import { SAMPLE_PROFILES } from '../constants/sampleData';
import { AnalysisResult } from '../types';

interface AnalysisFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onCancel: () => void;
  initialSampleId?: string;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onAnalysisComplete,
  onCancel,
  initialSampleId
}) => {
  // Pre-load sample if specified
  const initialSample = initialSampleId 
    ? SAMPLE_PROFILES.find(s => s.id === initialSampleId) 
    : undefined;

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>(initialSample?.resumeFileName || '');
  const [resumeText, setResumeText] = useState<string>(initialSample?.resumeText || '');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseProgress, setParseProgress] = useState<number>(0);
  const [parseError, setParseError] = useState<string | null>(null);

  const [jobTitle, setJobTitle] = useState<string>(initialSample?.role || '');
  const [targetCompany, setTargetCompany] = useState<string>(initialSample?.targetCompany || '');
  const [jobDescription, setJobDescription] = useState<string>(initialSample?.jobDescriptionText || '');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [useTextInput, setUseTextInput] = useState<boolean>(!!initialSample);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop & upload
  const handleFileProcess = async (file: File) => {
    setParseError(null);
    setResumeFile(file);
    setResumeFileName(file.name);
    setIsParsing(true);
    setParseProgress(10);

    try {
      const result = await parsePdfFile(file, (percent) => {
        setParseProgress(percent);
      });
      setResumeText(result.text);
      setIsParsing(false);
    } catch (err: any) {
      setIsParsing(false);
      setParseError(err.message || 'Failed to read file. Please paste text directly.');
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSampleSelect = (sampleId: string) => {
    const s = SAMPLE_PROFILES.find(p => p.id === sampleId);
    if (s) {
      setResumeFileName(s.resumeFileName);
      setResumeText(s.resumeText);
      setJobTitle(s.role);
      setTargetCompany(s.targetCompany);
      setJobDescription(s.jobDescriptionText);
      setResumeFile(null);
      setParseError(null);
      setUseTextInput(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setParseError('Please upload a resume or paste your resume text.');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 40) {
      setParseError('Please enter a detailed job description (at least 40 characters).');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep('Reading resume sections and extracting competencies...');

    setTimeout(() => {
      setAnalysisStep('Mapping semantic skill coverage against job requirements...');
    }, 700);

    setTimeout(() => {
      setAnalysisStep('Synthesizing evidence-backed recommendations and actionable phrasing...');
    }, 1400);

    setTimeout(() => {
      const result = analyzeResumeAndJob(
        resumeText,
        jobDescription,
        jobTitle.trim() || 'Software Engineer',
        targetCompany.trim() || 'Target Company',
        resumeFileName || 'Candidate_Resume.pdf'
      );
      setIsAnalyzing(false);
      onAnalysisComplete(result);
    }, 2100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evidence-Based Career Analysis</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          Analyze Resume Alignment
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Upload your resume and paste the target job description. We will map your demonstrated evidence and provide actionable improvements.
        </p>

        {/* Quick Sample Selector */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Fill Sample:</span>
          {SAMPLE_PROFILES.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSampleSelect(s.id)}
              className="text-xs px-2.5 py-1 rounded bg-navy-800 hover:bg-navy-700 text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition-colors"
            >
              {s.role} ({s.targetCompany})
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: RESUME INPUT */}
        <div className="card-base p-6 sm:p-8 border border-navy-700 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="font-heading text-lg font-bold text-white">Your Resume</h2>
            </div>
            <button
              type="button"
              onClick={() => setUseTextInput(!useTextInput)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-4"
            >
              {useTextInput ? 'Switch to PDF Upload' : 'Or Paste Raw Text Instead'}
            </button>
          </div>

          {!useTextInput ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-slate-700 hover:border-indigo-500/50 bg-navy-900/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.md"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileProcess(e.target.files[0]);
                  }
                }}
              />

              <div className="w-12 h-12 rounded-xl bg-navy-800 border border-slate-700 flex items-center justify-center text-indigo-400 mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">
                  Click to select or drag and drop your resume here
                </p>
                <p className="text-xs text-slate-400">
                  Supports searchable PDF, TXT, or MD (max 8MB) • 100% Client-Side Privacy
                </p>
              </div>

              {resumeFileName && !parseError && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ready: {resumeFileName}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="resume-text" className="block text-xs font-semibold text-slate-300">
                Resume Content (Markdown / Plain Text)
              </label>
              <textarea
                id="resume-text"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
                placeholder="Paste your education, skills, experience, and project bullet points here..."
                className="w-full bg-navy-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono text-xs leading-relaxed"
              />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{resumeText.length} characters</span>
                {resumeFileName && <span>Preset: {resumeFileName}</span>}
              </div>
            </div>
          )}

          {/* Parsing Progress Bar */}
          {isParsing && (
            <div className="space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-medium">
                <span>Extracting resume text with PDF.js...</span>
                <span>{parseProgress}%</span>
              </div>
              <div className="w-full bg-navy-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${parseProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Parse Error Notification */}
          {parseError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-rose-950/50 border border-rose-800/60 text-xs text-rose-300 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200">Upload Note</p>
                <p>{parseError}</p>
                <p className="mt-1 text-slate-400">Tip: Click "Or Paste Raw Text Instead" above to copy-paste your bullets directly.</p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: TARGET JOB DESCRIPTION */}
        <div className="card-base p-6 sm:p-8 border border-navy-700 space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="font-heading text-lg font-bold text-white">Target Opportunity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="job-title" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Job Title
              </label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Frontend Software Engineer"
                className="w-full bg-navy-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="target-company" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Company Name (Optional)
              </label>
              <input
                id="target-company"
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Vercel, Linear, Stripe"
                className="w-full bg-navy-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="job-desc" className="block text-xs font-semibold text-slate-300">
                Job Description & Qualifications
              </label>
              <span className="text-[11px] text-slate-400">
                {jobDescription.length} characters
              </span>
            </div>
            <textarea
              id="job-desc"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={7}
              placeholder="Paste the full job posting, required qualifications, and responsibilities here..."
              className="w-full bg-navy-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Action Controls & Loading States */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isAnalyzing || isParsing}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Alignment...</span>
              </>
            ) : (
              <>
                <span>Generate Intelligence Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Animated Processing Step Display */}
        {isAnalyzing && (
          <div className="card-base p-5 border border-indigo-500/30 bg-navy-900/90 text-center space-y-3 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-indigo-300 font-medium text-sm">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
              <span>{analysisStep}</span>
            </div>
            <p className="text-xs text-slate-400">
              Examining verb strength, metric quantification, and requirement taxonomy matching.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
