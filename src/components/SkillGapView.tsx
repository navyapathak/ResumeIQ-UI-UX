import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  XCircle, 
  Search, 
  Filter, 
  Info, 
  Layers, 
  FileText, 
  Briefcase, 
  ArrowRight,
  X,
  ExternalLink
} from 'lucide-react';
import { Skill } from '../types';

interface SkillGapViewProps {
  skills: Skill[];
  jobTitle: string;
  onNavigateTab: (tab: any) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  skills,
  jobTitle,
  onNavigateTab
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'demonstrated' | 'partial' | 'missing'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingSkill, setInspectingSkill] = useState<Skill | null>(null);

  const categories = ['all', 'technical', 'tools', 'domain', 'soft'];

  const filteredSkills = skills.filter(skill => {
    const matchesStatus = statusFilter === 'all' || skill.matchStatus === statusFilter;
    const matchesCategory = categoryFilter === 'all' || skill.category === categoryFilter;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.jobRequirement.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const demonstratedCount = skills.filter(s => s.matchStatus === 'demonstrated').length;
  const partialCount = skills.filter(s => s.matchStatus === 'partial').length;
  const missingCount = skills.filter(s => s.matchStatus === 'missing').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Competency Matrix</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-white">
          Skill-Gap Analysis & Evidence Mapping
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Compare every required competency from the job description against your resume text. Click on any skill to inspect the exact citations and algorithmic classification reasoning.
        </p>
      </div>

      {/* Top Filter & Status Overview Bar */}
      <div className="card-base p-5 border border-navy-700 space-y-4">
        {/* Status Count Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'all'
                ? 'bg-navy-800 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-navy-900 border-navy-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-semibold block">All Competencies</span>
            <span className="font-heading text-xl font-bold text-white">{skills.length}</span>
          </button>

          <button
            onClick={() => setStatusFilter('demonstrated')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'demonstrated'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                : 'bg-navy-900 border-navy-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Demonstrated</span>
            </div>
            <span className="font-heading text-xl font-bold text-emerald-300">{demonstratedCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('partial')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'partial'
                ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                : 'bg-navy-900 border-navy-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Weak Evidence</span>
            </div>
            <span className="font-heading text-xl font-bold text-amber-300">{partialCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('missing')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'missing'
                ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500'
                : 'bg-navy-900 border-navy-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
              <XCircle className="w-3.5 h-3.5" />
              <span>Missing Gaps</span>
            </div>
            <span className="font-heading text-xl font-bold text-rose-300">{missingCount}</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-navy-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill or keyword..."
              className="w-full bg-navy-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 font-medium mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                  categoryFilter === cat
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => setInspectingSkill(skill)}
            className="card-base p-5 border border-navy-700 hover:border-indigo-500/60 cursor-pointer space-y-3 transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Category: {skill.category}
                  </span>
                </div>

                {/* Status Indicator */}
                {skill.matchStatus === 'demonstrated' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Demonstrated
                  </span>
                )}
                {skill.matchStatus === 'partial' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-950/60 text-amber-300 border border-amber-800/40">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    Weak Evidence
                  </span>
                )}
                {skill.matchStatus === 'missing' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-950/60 text-rose-300 border border-rose-800/40">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    Missing
                  </span>
                )}
              </div>

              {/* Requirement context */}
              <div className="p-2.5 rounded bg-navy-900 border border-navy-800 text-xs space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">Employer Requirement</span>
                <p className="text-slate-300 line-clamp-2 italic">
                  "{skill.jobRequirement.excerpt}"
                </p>
              </div>

              {/* Resume Evidence Snippet */}
              {skill.evidence ? (
                <div className="p-2.5 rounded bg-navy-850 border border-navy-800 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-indigo-400 block">
                    Found in {skill.evidence.section}
                  </span>
                  <p className="text-slate-300 line-clamp-2">
                    {skill.evidence.resumeExcerpt}
                  </p>
                </div>
              ) : (
                <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/30 text-xs text-rose-300">
                  No mention or related project work detected in your resume document.
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:text-indigo-300">
              <span>Inspect full comparison citations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="card-base p-12 border border-navy-700 text-center space-y-3">
          <p className="text-slate-300 font-medium">No competencies match your current filters.</p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setCategoryFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* INSPECTION MODAL / DRAWER */}
      {inspectingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
          <div className="card-base max-w-2xl w-full border border-navy-700 bg-navy-900 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setInspectingSkill(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-navy-800 text-indigo-300 border border-indigo-500/30">
                  {inspectingSkill.category}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  inspectingSkill.matchStatus === 'demonstrated'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                    : inspectingSkill.matchStatus === 'partial'
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                    : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                }`}>
                  {inspectingSkill.matchStatus.toUpperCase()}
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white">
                {inspectingSkill.name}
              </h2>
            </div>

            {/* Side-by-side comparative quotes */}
            <div className="space-y-4 text-xs">
              {/* Job Requirement */}
              <div className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    Target Job Specification Requirement
                  </span>
                  <span className="uppercase text-[10px] text-amber-400">
                    Importance: {inspectingSkill.jobRequirement.importance}
                  </span>
                </div>
                <blockquote className="p-3 rounded bg-navy-900 border-l-2 border-indigo-500 text-slate-200 text-sm italic font-sans">
                  "{inspectingSkill.jobRequirement.excerpt}"
                </blockquote>
              </div>

              {/* Resume Evidence */}
              <div className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 space-y-2">
                <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  Detected in Your Resume
                </span>
                {inspectingSkill.evidence ? (
                  <div className="space-y-2">
                    <blockquote className="p-3 rounded bg-navy-900 border-l-2 border-emerald-500 text-slate-200 text-sm font-mono">
                      "{inspectingSkill.evidence.resumeExcerpt}"
                    </blockquote>
                    <p className="text-slate-400 text-xs">
                      <strong>Section:</strong> {inspectingSkill.evidence.section}
                    </p>
                    <p className="text-slate-400 text-xs">
                      <strong>Classification Reasoning:</strong> {inspectingSkill.evidence.relevanceNote}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs leading-relaxed">
                    No explicit mention of this skill or related synonym was detected in your resume document. If you have coursework or projects involving this technology, refer to our Action Plan recommendations.
                  </div>
                )}
              </div>
            </div>

            {/* Modal actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setInspectingSkill(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setInspectingSkill(null);
                  onNavigateTab('recommendations');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <span>View Recommendations For This Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
