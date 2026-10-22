import React, { useState } from 'react';
import { X, FileText, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { AnalysisResult } from '../types';

interface LiveResumePreviewProps {
  analysis: AnalysisResult;
  onClose: () => void;
}

export const LiveResumePreview: React.FC<LiveResumePreviewProps> = ({
  analysis,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.resumeRawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = analysis.resumeRawText.split('\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div className="card-base max-w-4xl w-full h-[85vh] border border-navy-700 bg-navy-900 p-6 flex flex-col shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-navy-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Extracted Document View: {analysis.resumeFileName}</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Evaluated for <strong>{analysis.jobTitle}</strong> ({analysis.targetCompany || 'Target Role'}) • {lines.length} lines parsed
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-800 hover:bg-navy-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto py-4 font-mono text-xs text-slate-200 space-y-1 leading-relaxed bg-navy-950/80 rounded-xl p-4 border border-navy-800 mt-4 select-text">
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-4 hover:bg-navy-800/40 px-2 py-0.5 rounded">
              <span className="text-slate-600 select-none w-8 text-right font-mono flex-shrink-0 text-[11px]">
                {idx + 1}
              </span>
              <span className={`${line.trim().startsWith('•') || line.trim().startsWith('-') ? 'text-indigo-200' : ''}`}>
                {line || <br />}
              </span>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Extracted via client-side PDF.js with zero server uploads</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
