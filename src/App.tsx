import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AnalysisForm } from './components/AnalysisForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { SkillGapView } from './components/SkillGapView';
import { RecommendationCenter } from './components/RecommendationCenter';
import { JobComparisonView } from './components/JobComparisonView';
import { HistoryView } from './components/HistoryView';
import { LiveResumePreview } from './components/LiveResumePreview';

import { AnalysisResult } from './types';
import { 
  getActiveAnalysis, 
  setActiveAnalysis as persistActiveAnalysis, 
  getSavedAnalyses, 
  saveAnalysis, 
  deleteAnalysis as removeAnalysisFromStorage,
  toggleRecommendationCompletion
} from './utils/storage';
import { DEMO_ANALYSIS_RESULT, SAMPLE_PROFILES } from './constants/sampleData';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [activeAnalysis, setActiveAnalysisState] = useState<AnalysisResult>(() => getActiveAnalysis());
  const [savedAnalyses, setSavedAnalyses] = useState<AnalysisResult[]>(() => getSavedAnalyses());
  const [showResumePreview, setShowResumePreview] = useState<boolean>(false);
  const [initialSampleId, setInitialSampleId] = useState<string | undefined>(undefined);

  // Sync saved analyses
  useEffect(() => {
    setSavedAnalyses(getSavedAnalyses());
  }, [activeAnalysis]);

  // Handle new analysis completion
  const handleAnalysisComplete = (result: AnalysisResult) => {
    saveAnalysis(result);
    setActiveAnalysisState(result);
    persistActiveAnalysis(result);
    setSavedAnalyses(getSavedAnalyses());
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle sample selection from Landing Page
  const handleLoadSample = (sampleId: string) => {
    setInitialSampleId(sampleId);
    setActiveTab('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle recommendation completion
  const handleToggleRecommendation = (recId: string) => {
    const updated = toggleRecommendationCompletion(activeAnalysis.id, recId);
    if (updated) {
      setActiveAnalysisState(updated);
      setSavedAnalyses(getSavedAnalyses());
    }
  };

  // Delete analysis
  const handleDeleteAnalysis = (id: string) => {
    const remaining = removeAnalysisFromStorage(id);
    setSavedAnalyses(remaining);
    if (activeAnalysis.id === id) {
      if (remaining.length > 0) {
        setActiveAnalysisState(remaining[0]);
        persistActiveAnalysis(remaining[0]);
      } else {
        setActiveAnalysisState(DEMO_ANALYSIS_RESULT);
        persistActiveAnalysis(DEMO_ANALYSIS_RESULT);
      }
    }
  };

  // Reset sample data
  const handleResetSampleData = () => {
    saveAnalysis(DEMO_ANALYSIS_RESULT);
    setActiveAnalysisState(DEMO_ANALYSIS_RESULT);
    persistActiveAnalysis(DEMO_ANALYSIS_RESULT);
    setSavedAnalyses(getSavedAnalyses());
    alert('Restored default demo evaluations to history.');
  };

  // Navigate to upload screen
  const handleNewAnalysis = () => {
    setInitialSampleId(undefined);
    setActiveTab('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-900 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActiveAnalysis={!!activeAnalysis}
        onNewAnalysis={handleNewAnalysis}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartAnalysis={handleNewAnalysis}
            onLoadSample={handleLoadSample}
            onExploreHowItWorks={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'upload' && (
          <AnalysisForm
            onAnalysisComplete={handleAnalysisComplete}
            onCancel={() => {
              if (activeAnalysis) {
                setActiveTab('dashboard');
              } else {
                setActiveTab('landing');
              }
            }}
            initialSampleId={initialSampleId}
          />
        )}

        {activeTab === 'dashboard' && activeAnalysis && (
          <AnalysisDashboard
            analysis={activeAnalysis}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleRecommendation={handleToggleRecommendation}
            onOpenResumePreview={() => setShowResumePreview(true)}
          />
        )}

        {activeTab === 'skills' && activeAnalysis && (
          <SkillGapView
            skills={activeAnalysis.skills}
            jobTitle={activeAnalysis.jobTitle}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'recommendations' && activeAnalysis && (
          <RecommendationCenter
            recommendations={activeAnalysis.recommendations}
            onToggleComplete={handleToggleRecommendation}
            jobTitle={activeAnalysis.jobTitle}
          />
        )}

        {activeTab === 'compare' && (
          <JobComparisonView candidateName="Candidate" />
        )}

        {activeTab === 'history' && (
          <HistoryView
            analyses={savedAnalyses}
            activeAnalysisId={activeAnalysis?.id}
            onSelectAnalysis={(analysis) => {
              setActiveAnalysisState(analysis);
              persistActiveAnalysis(analysis);
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDeleteAnalysis={handleDeleteAnalysis}
            onNewAnalysis={handleNewAnalysis}
            onResetSampleData={handleResetSampleData}
          />
        )}
      </main>

      {/* Live Raw Resume Extracted Text Modal */}
      {showResumePreview && activeAnalysis && (
        <LiveResumePreview
          analysis={activeAnalysis}
          onClose={() => setShowResumePreview(false)}
        />
      )}

      {/* Editorial Footer */}
      <Footer onNavigateTab={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export default App;
