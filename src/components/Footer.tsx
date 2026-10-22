import React from 'react';
import { FileText, Shield, Heart, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenCaseStudy?: () => void;
  onNavigateTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="border-t border-navy-700/60 bg-navy-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-navy-800">
        {/* Brand column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4 text-indigo-100" />
            </div>
            <span className="font-heading font-bold text-lg text-white">Resume<span className="text-indigo-400">IQ</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Career intelligence engineered to turn overwhelming application feedback into clear, actionable decisions for students and early-career job seekers.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-medium bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-1 rounded-full w-fit">
            <Shield className="w-3.5 h-3.5" />
            <span>Zero Data Storage • 100% In-Browser</span>
          </div>
        </div>

        {/* Product navigation */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-semibold text-slate-200 tracking-wider uppercase">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateTab('landing')} className="hover:text-indigo-300 transition-colors">
                Product Vision & Overview
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('upload')} className="hover:text-indigo-300 transition-colors">
                Resume Analyzer
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('skills')} className="hover:text-indigo-300 transition-colors">
                Skill Gap Matrix
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('recommendations')} className="hover:text-indigo-300 transition-colors">
                Action Plan & Phrasing
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('compare')} className="hover:text-indigo-300 transition-colors">
                Role Comparison Tool
              </button>
            </li>
          </ul>
        </div>

        {/* Design system & principles */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-semibold text-slate-200 tracking-wider uppercase">Design System</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-1">
              <span>Palette: Deep Navy & Electric Indigo</span>
            </li>
            <li>Typography: Space Grotesk & Inter</li>
            <li>Accessibility: WCAG 2.1 AA Compliant</li>
            <li>Scoring Philosophy: Transparent & Evidence-Based</li>
            <li>Interaction: Non-judgmental decision guidance</li>
          </ul>
        </div>

        {/* Portfolio & transparency */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-semibold text-slate-200 tracking-wider uppercase">Case Study</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designed as a high-fidelity portfolio piece demonstrating end-to-end product design, systems architecture, and engineering execution.
          </p>
          <div className="pt-1">
            <a 
              href="#case-study-modal" 
              onClick={(e) => {
                e.preventDefault();
                alert('The complete Case Study document is located at CASE-STUDY.md in the project root with complete design rationale, UX journey diagrams, and research notes.');
              }}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium group"
            >
              <span>View Case Study Documentation</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} ResumeIQ. Designed with purpose for university students and early-career talent.</p>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
          <span>for exceptional candidate experiences</span>
        </div>
      </div>
    </footer>
  );
};
