import React, { useState } from 'react';
import { 
  GitCompare, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Briefcase, 
  HelpCircle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { JobComparisonItem } from '../types';
import { DEMO_JOB_COMPARISON } from '../constants/sampleData';

interface JobComparisonViewProps {
  comparisonData?: JobComparisonItem;
  candidateName?: string;
}

export const JobComparisonView: React.FC<JobComparisonViewProps> = ({
  comparisonData = DEMO_JOB_COMPARISON,
  candidateName = 'Candidate'
}) => {
  const { jobA, jobB, commonSkills, uniqueToA, uniqueToB, strategicAdvice } = comparisonData;

  const [activeTab, setActiveTab] = useState<'side-by-side' | 'venn'>('side-by-side');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Opportunity Comparison Intelligence</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-white">
          Compare Two Job Opportunities Side-by-Side
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Evaluate which position your current experience is better aligned for, identify common foundational skills, and pinpoint unique preparation requirements.
        </p>
      </div>

      {/* Strategic Preparation Advice Banner */}
      <div className="card-base p-6 border border-indigo-500/40 bg-gradient-to-r from-navy-900 via-indigo-950/30 to-navy-900 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Strategic Decision Recommendation</span>
        </div>
        <p className="text-slate-200 text-sm leading-relaxed">
          {strategicAdvice}
        </p>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JOB A */}
        <div className="card-base p-6 sm:p-7 border border-navy-700 space-y-6 bg-navy-900/90 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-mono text-indigo-400 font-semibold block mb-1">Role Option 1</span>
                <h2 className="font-heading text-2xl font-bold text-white">{jobA.title}</h2>
                <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  {jobA.company}
                </p>
              </div>

              {/* Alignment Score Badge */}
              <div className="text-right">
                <span className="text-3xl font-heading font-bold text-emerald-400">{jobA.alignmentScore}%</span>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Estimated Alignment</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-lg bg-navy-950 border border-navy-800">
              {jobA.description}
            </p>

            {/* Matched Skills for Job A */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Demonstrated in Your Resume ({jobA.matchedSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {jobA.matchedSkills.map((s, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Gaps for Job A */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                Missing or Weak Gaps ({jobA.missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {jobA.missingSkills.map((s, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded bg-rose-950/40 border border-rose-800/40 text-rose-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-navy-800 text-xs text-slate-400">
            <strong>Key Focus:</strong> Next.js internals, performance metrics, design systems.
          </div>
        </div>

        {/* JOB B */}
        <div className="card-base p-6 sm:p-7 border border-navy-700 space-y-6 bg-navy-900/90 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-mono text-indigo-400 font-semibold block mb-1">Role Option 2</span>
                <h2 className="font-heading text-2xl font-bold text-white">{jobB.title}</h2>
                <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  {jobB.company}
                </p>
              </div>

              {/* Alignment Score Badge */}
              <div className="text-right">
                <span className="text-3xl font-heading font-bold text-amber-400">{jobB.alignmentScore}%</span>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Estimated Alignment</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-lg bg-navy-950 border border-navy-800">
              {jobB.description}
            </p>

            {/* Matched Skills for Job B */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Demonstrated in Your Resume ({jobB.matchedSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {jobB.matchedSkills.map((s, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Gaps for Job B */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                Missing or Weak Gaps ({jobB.missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {jobB.missingSkills.map((s, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded bg-rose-950/40 border border-rose-800/40 text-rose-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-navy-800 text-xs text-slate-400">
            <strong>Key Focus:</strong> High-throughput backend, distributed data, financial logic.
          </div>
        </div>
      </div>

      {/* Shared vs Unique Competency Venn Breakdown */}
      <div className="card-base p-6 sm:p-8 border border-navy-700 space-y-6">
        <div>
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Skill Overlap & Distinct Demands
          </h3>
          <p className="text-xs text-slate-400">
            Understand which skills help you across both applications versus what requires targeted study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Unique to Role A */}
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-3">
            <span className="text-xs font-semibold text-indigo-300 block uppercase tracking-wider">
              Unique to {jobA.company} ({jobA.title})
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {uniqueToA.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shared Common Ground */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 space-y-3">
            <span className="text-xs font-semibold text-emerald-300 block uppercase tracking-wider">
              Common High-Value Core (Both Roles)
            </span>
            <ul className="space-y-2 text-xs text-slate-200">
              {commonSkills.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unique to Role B */}
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-3">
            <span className="text-xs font-semibold text-indigo-300 block uppercase tracking-wider">
              Unique to {jobB.company} ({jobB.title})
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {uniqueToB.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
