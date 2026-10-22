import React from 'react';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Download, 
  Clock, 
  Briefcase, 
  FileText, 
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface HistoryViewProps {
  analyses: AnalysisResult[];
  activeAnalysisId?: string;
  onSelectAnalysis: (analysis: AnalysisResult) => void;
  onDeleteAnalysis: (id: string) => void;
  onNewAnalysis: () => void;
  onResetSampleData: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  analyses,
  activeAnalysisId,
  onSelectAnalysis,
  onDeleteAnalysis,
  onNewAnalysis,
  onResetSampleData
}) => {
  const handleExportJson = (analysis: AnalysisResult) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ResumeIQ_${analysis.jobTitle.replace(/\s+/g, '_')}_Analysis.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
            <History className="w-3.5 h-3.5" />
            <span>Saved Local Evaluations</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white">
            Analysis Session History
          </h1>
          <p className="text-xs text-slate-400">
            Saved securely in your browser's LocalStorage. No server telemetry or data sharing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetSampleData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-navy-800 hover:bg-navy-700 text-slate-300 border border-slate-700 transition-colors"
            title="Restore default sample evaluation data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Samples</span>
          </button>
          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            <span>Run New Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* History Items List */}
      {analyses.length > 0 ? (
        <div className="space-y-4">
          {analyses.map((analysis) => {
            const isActive = analysis.id === activeAnalysisId;
            const completedRecs = analysis.recommendations.filter(r => r.completed).length;

            return (
              <div
                key={analysis.id}
                className={`card-base p-6 border transition-all ${
                  isActive 
                    ? 'border-indigo-500 bg-navy-850/90 ring-1 ring-indigo-500' 
                    : 'border-navy-700 bg-navy-900 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-xl font-bold text-white">
                        {analysis.jobTitle}
                      </span>
                      {analysis.targetCompany && (
                        <span className="text-sm text-slate-400 font-medium">
                          at {analysis.targetCompany}
                        </span>
                      )}
                      {isActive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Active in View
                        </span>
                      )}
                      {analysis.isDemoData && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          Sample Data
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(analysis.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        {analysis.resumeFileName}
                      </span>
                      <span>
                        Action items: {completedRecs}/{analysis.recommendations.length} completed
                      </span>
                    </div>
                  </div>

                  {/* Alignment score & actions */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-2xl font-heading font-bold text-white">
                        {analysis.alignment.overallScore}%
                      </div>
                      <span className="text-[10px] text-indigo-300 block">Alignment</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectAnalysis(analysis)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                      >
                        Load Dashboard
                      </button>

                      <button
                        onClick={() => handleExportJson(analysis)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 border border-slate-700 transition-colors"
                        title="Export JSON report"
                        aria-label="Export report"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove analysis for "${analysis.jobTitle}"?`)) {
                            onDeleteAnalysis(analysis.id);
                          }
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-700 transition-colors"
                        title="Delete from local history"
                        aria-label="Delete analysis"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-base p-12 border border-navy-700 text-center space-y-4">
          <History className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-white">No Saved Analyses Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't run any evaluations yet or your history was cleared. Start a new analysis or restore the default samples.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onResetSampleData}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-navy-800 text-slate-300 hover:bg-navy-700 border border-slate-700"
            >
              Restore Sample Demonstrations
            </button>
            <button
              onClick={onNewAnalysis}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
