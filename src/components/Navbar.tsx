import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  GitCompare, 
  History, 
  PlusCircle, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

export type NavTab = 'landing' | 'upload' | 'dashboard' | 'skills' | 'recommendations' | 'compare' | 'history';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  hasActiveAnalysis: boolean;
  onNewAnalysis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  hasActiveAnalysis,
  onNewAnalysis
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-700/60 bg-navy-900/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 text-left"
          aria-label="ResumeIQ Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg text-white tracking-tight">Resume<span className="text-indigo-400">IQ</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Career Intelligence Platform</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300" aria-label="Main Navigation">
          <button
            onClick={() => handleNav('landing')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'landing' 
                ? 'bg-navy-800 text-white font-semibold' 
                : 'hover:text-white hover:bg-navy-800/50'
            }`}
          >
            Overview
          </button>

          {hasActiveAnalysis && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                    : 'hover:text-white hover:bg-navy-800/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Dashboard
              </button>

              <button
                onClick={() => handleNav('skills')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'skills' 
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                    : 'hover:text-white hover:bg-navy-800/50'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                Skill Gap Matrix
              </button>

              <button
                onClick={() => handleNav('recommendations')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'recommendations' 
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                    : 'hover:text-white hover:bg-navy-800/50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                Action Plan
              </button>
            </>
          )}

          <button
            onClick={() => handleNav('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'compare' 
                ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                : 'hover:text-white hover:bg-navy-800/50'
            }`}
          >
            <GitCompare className="w-4 h-4 text-slate-400" />
            Job Compare
          </button>

          <button
            onClick={() => handleNav('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'history' 
                ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                : 'hover:text-white hover:bg-navy-800/50'
            }`}
          >
            <History className="w-4 h-4 text-slate-400" />
            History
          </button>
        </nav>

        {/* Action Button & Security Badge */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 border border-slate-700/60 rounded-full px-2.5 py-1 bg-navy-800/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Client-Side Privacy</span>
          </div>

          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onNewAnalysis}
            className="px-2.5 py-1 text-xs font-medium bg-indigo-600 text-white rounded-md"
          >
            Analyze
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-navy-700 bg-navy-900 px-4 pt-2 pb-4 space-y-1 animate-fade-in">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'landing' ? 'bg-navy-800 text-white' : 'text-slate-300'
            }`}
          >
            Overview
          </button>
          {hasActiveAnalysis && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'dashboard' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNav('skills')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'skills' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300'
                }`}
              >
                Skill Gap Matrix
              </button>
              <button
                onClick={() => handleNav('recommendations')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'recommendations' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300'
                }`}
              >
                Action Plan & Recommendations
              </button>
            </>
          )}
          <button
            onClick={() => handleNav('compare')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'compare' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300'
            }`}
          >
            Job Comparison
          </button>
          <button
            onClick={() => handleNav('history')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'history' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300'
            }`}
          >
            Analysis History
          </button>
          <div className="pt-2 border-t border-navy-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side Privacy
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
