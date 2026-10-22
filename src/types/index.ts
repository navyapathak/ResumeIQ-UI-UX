export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'tools' | 'soft' | 'domain';
  matchStatus: 'demonstrated' | 'partial' | 'missing';
  evidence?: {
    resumeExcerpt: string;
    section: string;
    relevanceNote: string;
  };
  jobRequirement: {
    excerpt: string;
    importance: 'critical' | 'preferred' | 'bonus';
  };
}

export interface Recommendation {
  id: string;
  title: string;
  category: 'evidence' | 'clarity' | 'keywords' | 'structure';
  priority: 'high' | 'medium' | 'low';
  whatToImprove: string;
  whyItMatters: string;
  beforeExample?: string;
  afterExample?: string;
  completed: boolean;
  relatedSkill?: string;
}

export interface AlignmentBreakdown {
  overallScore: number; // 0 - 100
  scoreLabel: string;
  scoreContext: string;
  skillMatchPercentage: number;
  experienceAlignment: number;
  formattingAndClarity: number;
  demonstratedSkillsCount: number;
  partialSkillsCount: number;
  missingSkillsCount: number;
}

export interface ResumeStrength {
  title: string;
  description: string;
  evidence: string;
  tag: string;
}

export interface ImprovementArea {
  title: string;
  description: string;
  recommendationId: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  jobTitle: string;
  targetCompany?: string;
  resumeFileName: string;
  resumeRawText: string;
  jobDescriptionText: string;
  alignment: AlignmentBreakdown;
  skills: Skill[];
  strengths: ResumeStrength[];
  areasForImprovement: ImprovementArea[];
  recommendations: Recommendation[];
  isDemoData?: boolean;
}

export interface JobComparisonItem {
  jobA: {
    title: string;
    company: string;
    alignmentScore: number;
    description: string;
    matchedSkills: string[];
    missingSkills: string[];
  };
  jobB: {
    title: string;
    company: string;
    alignmentScore: number;
    description: string;
    matchedSkills: string[];
    missingSkills: string[];
  };
  commonSkills: string[];
  uniqueToA: string[];
  uniqueToB: string[];
  strategicAdvice: string;
}
