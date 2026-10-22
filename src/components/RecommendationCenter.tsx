import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Filter, 
  FileEdit,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationCenterProps {
  recommendations: Recommendation[];
  onToggleComplete: (recId: string) => void;
  jobTitle: string;
}

export const RecommendationCenter: React.FC<RecommendationCenterProps> = ({
  recommendations,
  onToggleComplete,
  jobTitle
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'evidence', 'clarity', 'keywords', 'structure'];

  const filteredRecs = recommendations.filter(rec => {
    const matchesPriority = priorityFilter === 'all' || rec.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || rec.category === categoryFilter;
    return matchesPriority && matchesCategory;
  });

  const completedCount = recommendations.filter(r => r.completed).length;
  const progressPercent = recommendations.length > 0 
    ? Math.round((completedCount / recommendations.length) * 100) 
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Actionable Recommendation Center</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-white">
          Prioritized Action Plan for {jobTitle}
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Concrete, high-leverage phrasing improvements crafted to align your genuine achievements with this employer's requirements.
        </p>
      </div>

      {/* Progress & Ethics Notice Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Tracker Card */}
        <div className="card-base p-5 border border-navy-700 space-y-3 md:col-span-1 bg-navy-900/90">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Action Progress</span>
            <span className="font-heading text-sm font-bold text-indigo-400">{progressPercent}% Completed</span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{completedCount} of {recommendations.length} recommendations addressed</span>
            {completedCount === recommendations.length && recommendations.length > 0 && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All complete!
              </span>
            )}
          </div>
        </div>

        {/* Anti-fabrication ethical guarantee */}
        <div className="card-base p-5 border border-amber-500/30 bg-amber-950/20 md:col-span-2 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-amber-200">Ethical Recommendation Policy</h4>
            <p className="text-slate-300 leading-relaxed">
              ResumeIQ will <strong>never</strong> suggest fabricating skills, employment dates, or credentials. Only adopt bullet points that accurately reflect work you completed in your coursework, projects, or internships.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-navy-900 border border-navy-800">
        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Priority:</span>
          {(['all', 'high', 'medium', 'low'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 rounded text-xs capitalize transition-colors ${
                priorityFilter === p
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-navy-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-navy-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-6">
        {filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className={`card-base p-6 sm:p-7 border transition-all ${
              rec.completed 
                ? 'border-emerald-500/30 bg-navy-950/40 opacity-75' 
                : 'border-navy-700 hover:border-slate-600 bg-navy-900/80'
            }`}
          >
            <div className="space-y-4">
              {/* Header: Title, Tags & Complete Checkbox */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                      rec.priority === 'high' 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : rec.priority === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {rec.priority} Priority
                    </span>

                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-navy-800 text-slate-400 border border-slate-700">
                      Category: {rec.category}
                    </span>

                    {rec.relatedSkill && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        {rec.relatedSkill}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-heading text-lg font-bold ${
                    rec.completed ? 'text-slate-400 line-through' : 'text-white'
                  }`}>
                    {rec.title}
                  </h3>
                </div>

                {/* Mark as Completed Toggle Button */}
                <button
                  onClick={() => onToggleComplete(rec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    rec.completed
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700 hover:bg-emerald-900'
                      : 'bg-navy-800 text-slate-300 border border-slate-700 hover:border-indigo-500 hover:text-white'
                  }`}
                  aria-label={rec.completed ? "Mark as pending" : "Mark as completed"}
                >
                  {rec.completed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Applied to Resume</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span>Mark as Applied</span>
                    </>
                  )}
                </button>
              </div>

              {/* What to Improve & Why it Matters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <span className="font-semibold text-slate-300 block uppercase tracking-wider text-[10px]">
                    What to Improve
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {rec.whatToImprove}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <span className="font-semibold text-indigo-300 block uppercase tracking-wider text-[10px]">
                    Why it Matters for this Posting
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {rec.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Before & After Phrasing Comparison */}
              {(rec.beforeExample || rec.afterExample) && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Concrete Phrasing Transformation
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    {rec.beforeExample && (
                      <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-rose-400 block font-sans">
                          Original Phrasing (Vague / Missing Metric)
                        </span>
                        <p className="text-rose-200/90 leading-relaxed">
                          {rec.beforeExample}
                        </p>
                      </div>
                    )}

                    {rec.afterExample && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block font-sans">
                          Recommended Phrasing (Action + Impact)
                        </span>
                        <p className="text-emerald-200/90 leading-relaxed">
                          {rec.afterExample}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
