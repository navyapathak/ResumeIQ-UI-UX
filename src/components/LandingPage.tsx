import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  CheckCircle, 
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  Lightbulb, 
  FileCheck2,
  TrendingUp,
  Cpu,
  Eye
} from 'lucide-react';
import { SAMPLE_PROFILES } from '../constants/sampleData';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onLoadSample: (sampleId: string) => void;
  onExploreHowItWorks: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAnalysis,
  onLoadSample,
  onExploreHowItWorks
}) => {
  return (
    <div className="space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-indigo-500/30 text-indigo-300 text-xs font-medium tracking-wide shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>A dedicated career intelligence platform for university graduates</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Turn overwhelming career feedback into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-100">clear, actionable decisions.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Stop wondering what automated screening algorithms see. ResumeIQ compares your resume against real job specifications to reveal demonstrated strengths, uncover true skill gaps, and suggest high-impact improvements.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreHowItWorks}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 hover:border-slate-600 transition-all"
          >
            <Eye className="w-4 h-4 text-slate-400" />
            <span>Explore How It Works</span>
          </button>
        </div>

        {/* Quick Sample Profile Switcher */}
        <div className="pt-6 border-t border-navy-800/80 max-w-2xl mx-auto">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
            Or test instantly with pre-configured sample candidates:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SAMPLE_PROFILES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onLoadSample(sample.id)}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-navy-800/60 hover:bg-navy-800 border border-slate-700/60 hover:border-indigo-500/50 text-xs text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                <span className="font-medium">{sample.role}</span>
                <span className="text-slate-500 text-[11px]">({sample.targetCompany})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Interface Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl p-1 bg-gradient-to-b from-indigo-500/20 via-navy-700/40 to-transparent shadow-2xl">
          <div className="rounded-xl bg-navy-950 border border-navy-700/80 overflow-hidden shadow-2xl">
            {/* Top Browser Bar */}
            <div className="px-4 py-3 bg-navy-900 border-b border-navy-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">resumeiq.app/analysis/alex-rivera-vercel</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo Analysis
              </div>
            </div>

            {/* Dashboard Teaser Preview Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-navy-900/40">
              {/* Score Preview Card */}
              <div className="card-base p-6 border border-navy-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Alignment Score</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    High Fit
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-heading font-bold text-white">78</span>
                  <span className="text-slate-400 text-sm">/ 100</span>
                </div>
                <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full w-[78%]" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strong candidate alignment. Demonstrated high-traffic React & Next.js production impact.
                </p>
              </div>

              {/* Skill Matrix Preview */}
              <div className="card-base p-6 border border-navy-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Skill Breakdown</span>
                  <span className="text-xs text-slate-400">14 Detected</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-navy-800/80 border border-emerald-500/20">
                    <span className="text-slate-200 font-medium">React & TypeScript</span>
                    <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Demonstrated
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-navy-800/80 border border-amber-500/20">
                    <span className="text-slate-200 font-medium">Automated Testing (Jest)</span>
                    <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Weak Evidence
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-navy-800/80 border border-rose-500/20">
                    <span className="text-slate-200 font-medium">Playwright E2E</span>
                    <span className="text-rose-400 font-semibold text-[11px]">Not Found</span>
                  </div>
                </div>
              </div>

              {/* Actionable Recommendation Preview */}
              <div className="card-base p-6 border border-navy-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Top Priority Action</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    High Impact
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">Substantiate Testing Coverage</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You listed Jest in your skills tag, but no project bullet quantifies tests written or code coverage.
                </p>
                <div className="p-2.5 rounded bg-navy-800/90 border border-navy-700 text-[11px] font-mono text-indigo-200">
                  + "authored 40+ unit/integration tests with Jest ensuring 85%+ coverage"
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="p-4 bg-navy-950/80 border-t border-navy-800 text-center">
              <button 
                onClick={onStartAnalysis}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5"
              >
                <span>Upload your own resume to see complete interactive dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Questions We Answer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Designed to answer the 5 critical career questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Most resume tools provide an opaque score that creates anxiety. ResumeIQ breaks your application down into transparent, verifiable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="card-base p-5 border border-navy-700 space-y-2 hover:border-indigo-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-heading text-base font-semibold text-white">Alignment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              How well does my actual resume text align with the job description?
            </p>
          </div>

          <div className="card-base p-5 border border-navy-700 space-y-2 hover:border-indigo-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-heading text-base font-semibold text-white">Evidence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Which required skills do I have real, demonstrable project proof for?
            </p>
          </div>

          <div className="card-base p-5 border border-navy-700 space-y-2 hover:border-indigo-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-heading text-base font-semibold text-white">Skill Gaps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Which skills or experiences are missing from my resume bullets?
            </p>
          </div>

          <div className="card-base p-5 border border-navy-700 space-y-2 hover:border-indigo-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-heading text-base font-semibold text-white">Relevance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              What specific phrasing changes make my achievements clearer?
            </p>
          </div>

          <div className="card-base p-5 border border-navy-700 space-y-2 hover:border-indigo-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h3 className="font-heading text-base font-semibold text-white">Action Plan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              What prioritized steps should I take next to maximize interviews?
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Workflow (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Workflow</span>
          <h2 className="font-heading text-3xl font-bold text-white">
            A guided analysis designed for complete transparency
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-base p-8 border border-navy-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-indigo-300 font-semibold">STEP 01</div>
            <h3 className="font-heading text-xl font-bold text-white">Provide Resume & Job</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upload your resume PDF or paste raw text. Paste the target job description or choose a pre-filled tech role.
            </p>
          </div>

          <div className="card-base p-8 border border-navy-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-indigo-300 font-semibold">STEP 02</div>
            <h3 className="font-heading text-xl font-bold text-white">Semantic Verification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our engine maps competencies, differentiates keywords from actual project proof, and identifies genuine gaps without guesswork.
            </p>
          </div>

          <div className="card-base p-8 border border-navy-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-indigo-300 font-semibold">STEP 03</div>
            <h3 className="font-heading text-xl font-bold text-white">Execute Decisions</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Review prioritized suggestions with concrete before-and-after examples. Check off completed edits as you refine your application.
            </p>
          </div>
        </div>
      </section>

      {/* Transparency & Privacy Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-8 sm:p-12 border border-navy-700 space-y-8 bg-gradient-to-b from-navy-900 to-navy-950">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-6">
            <div className="space-y-1">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                Our Transparency & Privacy Promise
              </h3>
              <p className="text-sm text-slate-400">
                Ethical career intelligence with zero deceptive metrics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                100% Client-Side Parsing
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your resume text and contact information are processed locally within your browser. Nothing is uploaded to external servers or sold to data brokers.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                No Artificial Hireability Promises
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never claim that an alignment score predicts if you will get hired. Hiring decisions involve team dynamics, portfolios, and interviews that no software can simulate.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Anti-Fabrication Guardrail
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ResumeIQ never advises fabricating technologies or experiences you do not possess. We only help you present your genuine work with maximum clarity.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Inspectable Scoring Logic
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every identified skill cites the exact sentence in your resume and the exact requirement in the job post, so you always understand why a tag was assigned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Ready to see how your resume measures up?
        </h2>
        <p className="text-slate-300 text-base max-w-xl mx-auto">
          Free, private, and instantaneous. Understand your standing before hitting submit on your next job application.
        </p>
        <button
          onClick={onStartAnalysis}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Start Free Analysis</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
};
