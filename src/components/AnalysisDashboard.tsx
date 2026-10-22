import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  XCircle, 
  ArrowRight, 
  TrendingUp, 
  FileText, 
  Award, 
  AlertTriangle, 
  Check, 
  Info,
  Clock,
  Building,
  Briefcase,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
  onNavigateTab: (tab: any) => void;
  onToggleRecommendation: (recId: string) => void;
  onOpenResumePreview: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  analysis,
  onNavigateTab,
  onToggleRecommendation,
  onOpenResumePreview
}) => {
  const { alignment, skills, strengths, areasForImprovement, recommendations } = analysis;

  const demonstratedSkills = skills.filter(s => s.matchStatus === 'demonstrated');
  const partialSkills = skills.filter(s => s.matchStatus === 'partial');
  const missingSkills = skills.filter(s => s.matchStatus === 'missing');

  const completedRecsCount = recommendations.filter(r => r.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Banner / Role Summary */}
      <div className="card-base p-6 border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Active Evaluation
            </span>
            {analysis.isDemoData && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Sample Demonstration Data
              </span>
            )}
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {new Date(analysis.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <span>{analysis.jobTitle}</span>
            {analysis.targetCompany && (
              <span className="text-slate-400 font-normal text-xl">at {analysis.targetCompany}</span>
            )}
          </h1>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span>File evaluated: <strong className="text-slate-300">{analysis.resumeFileName}</strong></span>
            <span>•</span>
            <button
              onClick={onOpenResumePreview}
              className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium underline underline-offset-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Raw Extracted Text</span>
            </button>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:self-center">
          <button
            onClick={() => onNavigateTab('skills')}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Skill Matrix
          </button>
          <button
            onClick={() => onNavigateTab('recommendations')}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            View Action Plan ({recommendations.length})
          </button>
        </div>
      </div>

      {/* Hero Analytics Grid: Score & Core Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alignment Gauge & Reassuring Meaning */}
        <div className="card-base p-6 sm:p-8 border border-navy-700 space-y-6 lg:col-span-1 bg-gradient-to-b from-navy-900 to-navy-950 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Resume Alignment Index
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {alignment.scoreLabel}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Measures text clarity and competency overlap against this specific job description.
            </p>
          </div>

          {/* Radial score gauge visualization */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#1E2440"
                  strokeWidth="8"
                />
                {/* Score Progress */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#6366F1"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - alignment.overallScore / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-heading text-5xl font-bold text-white tracking-tight">
                  {alignment.overallScore}
                </span>
                <span className="text-xs text-slate-400 font-medium">out of 100</span>
              </div>
            </div>
          </div>

          {/* Reassuring Explanation Notice */}
          <div className="p-3.5 rounded-xl bg-navy-800/80 border border-navy-700/80 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>What this score means</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {alignment.scoreContext}
            </p>
            <p className="text-[10px] text-slate-500 italic pt-1 border-t border-navy-700">
              Note: This score evaluates resume text alignment, not hiring certainty.
            </p>
          </div>
        </div>

        {/* 4 Pillars Breakdown & Skills Coverage */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card-base p-4 border border-navy-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demonstrated</span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-bold text-emerald-400">
                  {demonstratedSkills.length}
                </span>
                <span className="text-xs text-slate-500">skills</span>
              </div>
              <p className="text-[11px] text-slate-400">Backed with concrete evidence</p>
            </div>

            <div className="card-base p-4 border border-navy-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Weak Evidence</span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-bold text-amber-400">
                  {partialSkills.length}
                </span>
                <span className="text-xs text-slate-500">skills</span>
              </div>
              <p className="text-[11px] text-slate-400">Keyword mentioned only</p>
            </div>

            <div className="card-base p-4 border border-navy-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Missing Gaps</span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-bold text-rose-400">
                  {missingSkills.length}
                </span>
                <span className="text-xs text-slate-500">skills</span>
              </div>
              <p className="text-[11px] text-slate-400">Not found in resume</p>
            </div>

            <div className="card-base p-4 border border-navy-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Action Plan</span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-bold text-indigo-400">
                  {completedRecsCount}/{recommendations.length}
                </span>
                <span className="text-xs text-slate-500">completed</span>
              </div>
              <p className="text-[11px] text-slate-400">Suggestions resolved</p>
            </div>
          </div>

          {/* Quick Skill Alignment Overview Table */}
          <div className="card-base p-6 border border-navy-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-white">Target Requirement Breakdown</h3>
                <p className="text-xs text-slate-400">Key competencies requested by the employer and your detection status</p>
              </div>
              <button
                onClick={() => onNavigateTab('skills')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
              >
                <span>Open Deep Inspection Matrix</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {skills.slice(0, 5).map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-lg bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{skill.name}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-navy-800 text-slate-400 border border-slate-700">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {skill.jobRequirement.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {skill.matchStatus === 'demonstrated' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Demonstrated
                      </span>
                    )}
                    {skill.matchStatus === 'partial' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-amber-950/60 text-amber-300 border border-amber-800/40">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        Weak Evidence
                      </span>
                    )}
                    {skill.matchStatus === 'missing' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-rose-950/60 text-rose-300 border border-rose-800/40">
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        Missing Gap
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Resume Strengths vs Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* STRENGTHS */}
        <div className="card-base p-6 border border-navy-700 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Detected Strengths</h3>
              <p className="text-xs text-slate-400">High-leverage highlights confirmed in your resume</p>
            </div>
          </div>

          <div className="space-y-3">
            {strengths.map((str, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-100">{str.title}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {str.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {str.description}
                </p>
                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                  Evidence: {str.evidence}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AREAS FOR IMPROVEMENT */}
        <div className="card-base p-6 border border-navy-700 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Areas for Improvement</h3>
              <p className="text-xs text-slate-400">Specific gaps that could weaken recruiter confidence</p>
            </div>
          </div>

          <div className="space-y-3">
            {areasForImprovement.map((area, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-100">{area.title}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    area.impact === 'High' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {area.impact} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {area.description}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => onNavigateTab('recommendations')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>View recommended before/after phrasing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Plan Preview Banner */}
      <div className="card-base p-6 border border-indigo-500/30 bg-gradient-to-r from-navy-900 via-indigo-950/20 to-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Prioritized Recommendations Ready ({recommendations.length} actionable suggestions)
          </h3>
          <p className="text-xs text-slate-300">
            Adopt concrete bullet point revisions formulated specifically for this job description.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('recommendations')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <span>Open Recommendation Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
