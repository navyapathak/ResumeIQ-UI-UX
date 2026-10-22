import { AnalysisResult } from '../types';
import { DEMO_ANALYSIS_RESULT } from '../constants/sampleData';

const STORAGE_KEY = 'resumeiq_analyses_v1';
const ACTIVE_ANALYSIS_KEY = 'resumeiq_active_analysis_v1';

export function getSavedAnalyses(): AnalysisResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Seed with initial demo result if empty
      const initial = [DEMO_ANALYSIS_RESULT];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read saved analyses from localStorage', e);
    return [DEMO_ANALYSIS_RESULT];
  }
}

export function saveAnalysis(analysis: AnalysisResult): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedAnalyses().filter(a => a.id !== analysis.id);
    const updated = [analysis, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(ACTIVE_ANALYSIS_KEY, JSON.stringify(analysis));
  } catch (e) {
    console.error('Failed to save analysis to localStorage', e);
  }
}

export function getActiveAnalysis(): AnalysisResult {
  if (typeof window === 'undefined') return DEMO_ANALYSIS_RESULT;
  try {
    const active = localStorage.getItem(ACTIVE_ANALYSIS_KEY);
    if (active) return JSON.parse(active);
    const saved = getSavedAnalyses();
    return saved.length > 0 ? saved[0] : DEMO_ANALYSIS_RESULT;
  } catch (e) {
    return DEMO_ANALYSIS_RESULT;
  }
}

export function setActiveAnalysis(analysis: AnalysisResult): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVE_ANALYSIS_KEY, JSON.stringify(analysis));
  } catch (e) {
    console.error('Failed to set active analysis', e);
  }
}

export function deleteAnalysis(id: string): AnalysisResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const remaining = getSavedAnalyses().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    return remaining;
  } catch (e) {
    console.error('Failed to delete analysis', e);
    return [];
  }
}

export function toggleRecommendationCompletion(analysisId: string, recId: string): AnalysisResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const analyses = getSavedAnalyses();
    const target = analyses.find(a => a.id === analysisId);
    if (!target) return null;

    target.recommendations = target.recommendations.map(r =>
      r.id === recId ? { ...r, completed: !r.completed } : r
    );

    saveAnalysis(target);
    return target;
  } catch (e) {
    console.error('Failed to toggle recommendation', e);
    return null;
  }
}
