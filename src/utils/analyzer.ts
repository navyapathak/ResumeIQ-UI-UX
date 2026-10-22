import { AnalysisResult, Skill, Recommendation, ResumeStrength, ImprovementArea } from '../types';

interface SkillDefinition {
  name: string;
  category: 'technical' | 'tools' | 'soft' | 'domain';
  synonyms: string[];
  importance?: 'critical' | 'preferred' | 'bonus';
}

const SKILL_TAXONOMY: SkillDefinition[] = [
  // Frontend & Web
  { name: 'React', category: 'technical', synonyms: ['react', 'react.js', 'reactjs'] },
  { name: 'TypeScript', category: 'technical', synonyms: ['typescript', 'ts'] },
  { name: 'JavaScript', category: 'technical', synonyms: ['javascript', 'js', 'es6', 'es6+'] },
  { name: 'Next.js', category: 'technical', synonyms: ['next.js', 'nextjs', 'next'] },
  { name: 'HTML5 & CSS3', category: 'technical', synonyms: ['html', 'html5', 'css', 'css3', 'sass', 'scss'] },
  { name: 'Tailwind CSS', category: 'tools', synonyms: ['tailwind', 'tailwindcss'] },
  { name: 'Web Performance & Core Web Vitals', category: 'domain', synonyms: ['core web vitals', 'web vitals', 'lcp', 'inp', 'cls', 'bundle size', 'page speed', 'lighthouse', 'latency'] },
  { name: 'Accessibility (WCAG)', category: 'domain', synonyms: ['accessibility', 'a11y', 'wcag', 'aria', 'screen reader'] },
  { name: 'State Management', category: 'technical', synonyms: ['redux', 'zustand', 'react query', 'tanstack query', 'context api', 'state management'] },

  // Testing & Quality
  { name: 'Automated Testing', category: 'technical', synonyms: ['testing', 'jest', 'vitest', 'unit test', 'integration test', 'test driven'] },
  { name: 'E2E Testing (Playwright / Cypress)', category: 'technical', synonyms: ['playwright', 'cypress', 'selenium', 'e2e'] },

  // Backend & Cloud
  { name: 'Node.js', category: 'technical', synonyms: ['node', 'node.js', 'nodejs', 'express', 'nest'] },
  { name: 'Python', category: 'technical', synonyms: ['python', 'fastapi', 'flask', 'django'] },
  { name: 'SQL & Relational Databases', category: 'technical', synonyms: ['sql', 'postgresql', 'postgres', 'mysql', 'sqlite', 'bigquery', 'database'] },
  { name: 'APIs & REST / GraphQL', category: 'technical', synonyms: ['api', 'rest', 'restful', 'graphql', 'endpoints', 'grpc'] },
  { name: 'Docker & Containers', category: 'tools', synonyms: ['docker', 'container', 'kubernetes', 'k8s'] },
  { name: 'CI/CD & Cloud Infrastructure', category: 'tools', synonyms: ['ci/cd', 'github actions', 'jenkins', 'aws', 'vercel', 'gcp', 'cloud'] },
  { name: 'Git & Version Control', category: 'tools', synonyms: ['git', 'github', 'gitlab', 'version control'] },

  // Design & Product
  { name: 'Figma & UI Prototyping', category: 'tools', synonyms: ['figma', 'prototyping', 'wireframing', 'sketch'] },
  { name: 'Design Systems & Tokens', category: 'domain', synonyms: ['design system', 'design systems', 'tokens', 'components', 'style dictionary'] },
  { name: 'User Research & Usability Testing', category: 'domain', synonyms: ['user research', 'usability testing', 'user interviews', 'heuristics'] },
  { name: 'Interaction Design', category: 'domain', synonyms: ['interaction design', 'micro-interactions', 'user journeys', 'flow'] },

  // Data & Analytics
  { name: 'Data Visualization & BI', category: 'tools', synonyms: ['tableau', 'powerbi', 'looker', 'matplotlib', 'seaborn', 'visualization'] },
  { name: 'Statistical Analysis & A/B Testing', category: 'domain', synonyms: ['a/b testing', 'hypothesis testing', 'statistics', 'experimentation', 'regression'] },
  { name: 'Pandas & Data Wrangling', category: 'technical', synonyms: ['pandas', 'numpy', 'scipy', 'wrangling', 'etl'] },

  // Collaboration & Soft Skills
  { name: 'Cross-functional Collaboration', category: 'soft', synonyms: ['collaboration', 'cross-functional', 'partnered with', 'stakeholders', 'worked with'] },
  { name: 'Technical Communication & Mentorship', category: 'soft', synonyms: ['communication', 'mentorship', 'mentored', 'teaching', 'documentation'] },
  { name: 'Agile & Code Reviews', category: 'soft', synonyms: ['agile', 'scrum', 'code review', 'code reviews', 'sprint'] }
];

export function analyzeResumeAndJob(
  resumeText: string,
  jobText: string,
  jobTitle: string = 'Target Role',
  companyName: string = 'Target Company',
  fileName: string = 'Uploaded_Resume.pdf'
): AnalysisResult {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobText.toLowerCase();

  // 1. Identify skills relevant to the Job Description
  const matchedJobSkills: { def: SkillDefinition; importance: 'critical' | 'preferred' | 'bonus'; jobExcerpt: string }[] = [];

  for (const def of SKILL_TAXONOMY) {
    let foundInJob = false;
    let jobExcerpt = '';

    for (const syn of def.synonyms) {
      const idx = jobLower.indexOf(syn);
      if (idx !== -1) {
        foundInJob = true;
        // Extract surrounding sentence
        const start = Math.max(0, jobLower.lastIndexOf('.', idx) + 1);
        let end = jobLower.indexOf('.', idx + syn.length);
        if (end === -1) end = Math.min(jobLower.length, idx + 100);
        jobExcerpt = jobText.substring(start, end + 1).trim();
        break;
      }
    }

    if (foundInJob) {
      // Determine importance based on context clues
      const lowerExcerpt = jobExcerpt.toLowerCase();
      let importance: 'critical' | 'preferred' | 'bonus' = 'preferred';
      if (
        lowerExcerpt.includes('require') ||
        lowerExcerpt.includes('must') ||
        lowerExcerpt.includes('essential') ||
        lowerExcerpt.includes('strong') ||
        lowerExcerpt.includes('proficiency')
      ) {
        importance = 'critical';
      } else if (lowerExcerpt.includes('bonus') || lowerExcerpt.includes('nice to have') || lowerExcerpt.includes('plus')) {
        importance = 'bonus';
      }

      matchedJobSkills.push({
        def,
        importance,
        jobExcerpt: jobExcerpt.length > 15 ? jobExcerpt : `Required competency: ${def.name}`
      });
    }
  }

  // If very few skills matched from JD, inject foundational ones based on JD text
  if (matchedJobSkills.length < 5) {
    // Pick top 6 generic tech/soft skills present in JD or standard
    for (const def of SKILL_TAXONOMY.slice(0, 10)) {
      if (!matchedJobSkills.find(s => s.def.name === def.name)) {
        matchedJobSkills.push({
          def,
          importance: 'preferred',
          jobExcerpt: `Core role competency: ${def.name}`
        });
      }
      if (matchedJobSkills.length >= 7) break;
    }
  }

  // 2. Evaluate how resume matches each Job Requirement
  const evaluatedSkills: Skill[] = [];
  let demonstratedCount = 0;
  let partialCount = 0;
  let missingCount = 0;

  for (let i = 0; i < matchedJobSkills.length; i++) {
    const item = matchedJobSkills[i];
    const def = item.def;

    let foundInResume = false;
    let resumeExcerpt = '';
    let matchSynonym = '';

    for (const syn of def.synonyms) {
      const idx = resumeLower.indexOf(syn);
      if (idx !== -1) {
        foundInResume = true;
        matchSynonym = syn;
        // Extract surrounding sentence
        const start = Math.max(0, resumeLower.lastIndexOf('\n', idx) + 1);
        let end = resumeLower.indexOf('\n', idx + syn.length);
        if (end === -1) end = Math.min(resumeLower.length, idx + 120);
        resumeExcerpt = resumeText.substring(start, end).trim();
        break;
      }
    }

    if (foundInResume) {
      // Check if it's merely a comma-separated list or contains action/outcome
      const isWeakList =
        resumeExcerpt.includes(',') &&
        (resumeExcerpt.toLowerCase().includes('languages:') ||
          resumeExcerpt.toLowerCase().includes('skills:') ||
          resumeExcerpt.toLowerCase().includes('tools:')) &&
        !resumeExcerpt.includes('%') &&
        !/\d+/.test(resumeExcerpt);

      if (isWeakList && resumeExcerpt.length < 80) {
        // Partial evidence
        partialCount++;
        evaluatedSkills.push({
          id: `skill-${i}`,
          name: def.name,
          category: def.category,
          matchStatus: 'partial',
          evidence: {
            resumeExcerpt,
            section: 'Skills section / Keyword list',
            relevanceNote: 'Mentioned as a keyword, but lacks quantified project impact or contextual evidence.'
          },
          jobRequirement: {
            excerpt: item.jobExcerpt,
            importance: item.importance
          }
        });
      } else {
        // Strong demonstrated evidence
        demonstratedCount++;
        evaluatedSkills.push({
          id: `skill-${i}`,
          name: def.name,
          category: def.category,
          matchStatus: 'demonstrated',
          evidence: {
            resumeExcerpt: resumeExcerpt || `Demonstrated knowledge of ${def.name}`,
            section: resumeExcerpt.toLowerCase().includes('experience') ? 'Work Experience' : 'Projects & Portfolio',
            relevanceNote: 'Demonstrated with hands-on context and descriptive outcomes.'
          },
          jobRequirement: {
            excerpt: item.jobExcerpt,
            importance: item.importance
          }
        });
      }
    } else {
      // Missing
      missingCount++;
      evaluatedSkills.push({
        id: `skill-${i}`,
        name: def.name,
        category: def.category,
        matchStatus: 'missing',
        jobRequirement: {
          excerpt: item.jobExcerpt,
          importance: item.importance
        }
      });
    }
  }

  // 3. Compute Alignment Score
  const totalWeight = matchedJobSkills.length;
  const scoreNumerator = demonstratedCount * 1.0 + partialCount * 0.5;
  const rawPercentage = totalWeight > 0 ? Math.round((scoreNumerator / totalWeight) * 100) : 70;
  const overallScore = Math.min(95, Math.max(45, rawPercentage));

  let scoreLabel = 'Moderate Alignment';
  let scoreContext = '';

  if (overallScore >= 80) {
    scoreLabel = 'High Candidate Alignment';
    scoreContext =
      'Your resume strongly mirrors the primary requirements and technical priorities of this role. Focusing on high-impact clarity edits will make your application stand out to hiring managers.';
  } else if (overallScore >= 65) {
    scoreLabel = 'Solid Foundational Alignment';
    scoreContext =
      'You demonstrate the core competencies required. Addressing missing keyword evidence and clarifying project outcomes will significantly increase your relevance.';
  } else {
    scoreLabel = 'Emerging Skill Overlap';
    scoreContext =
      'You possess transferable skills, but the resume currently lacks explicit evidence for several specialized role requirements. Consider tailoring your projects and highlighting relevant coursework.';
  }

  // 4. Extract Strengths
  const strengths: ResumeStrength[] = [];

  // Check for numbers and quantifiable results
  const metricsCount = (resumeText.match(/\d+%/g) || []).length + (resumeText.match(/\$\d+/g) || []).length;
  if (metricsCount >= 2) {
    strengths.push({
      title: 'Measurable Impact & Metrics',
      description: `Found ${metricsCount}+ quantified outcome markers (percentages/numbers). Quantified achievements build immediate credibility with engineering leads.`,
      evidence: 'Experience Section',
      tag: 'Quantified Impact'
    });
  }

  if (demonstratedCount >= 5) {
    strengths.push({
      title: 'Strong Core Skill Coverage',
      description: `Directly matches ${demonstratedCount} primary requirements called out in the job specification with contextual evidence.`,
      evidence: 'Core Experience & Projects',
      tag: 'Domain Relevance'
    });
  }

  if (resumeLower.includes('git') || resumeLower.includes('agile') || resumeLower.includes('collaborat')) {
    strengths.push({
      title: 'Team & Engineering Workflow Maturity',
      description: 'Your experience highlights modern team workflows like code reviews, version control, or cross-functional alignment.',
      evidence: 'Experience bullets',
      tag: 'Collaboration'
    });
  }

  if (strengths.length === 0) {
    strengths.push({
      title: 'Clear Technical Foundation',
      description: 'Your resume clearly articulates foundational capabilities and relevant education/training.',
      evidence: 'Education & Projects',
      tag: 'Foundations'
    });
  }

  // 5. Generate Areas for Improvement & Recommendations
  const areasForImprovement: ImprovementArea[] = [];
  const recommendations: Recommendation[] = [];

  // Partial skills recommendations
  const partials = evaluatedSkills.filter(s => s.matchStatus === 'partial');
  if (partials.length > 0) {
    const p = partials[0];
    areasForImprovement.push({
      title: `${p.name} Lacks Project Outcome Evidence`,
      description: `You listed ${p.name} in your technical profile, but haven't detailed where or how you applied it in a project or internship bullet.`,
      recommendationId: 'rec-partial-1',
      impact: 'High'
    });

    recommendations.push({
      id: 'rec-partial-1',
      title: `Substantiate ${p.name} with a Concrete Project Achievement`,
      category: 'evidence',
      priority: 'high',
      whatToImprove: `Add a bullet point connecting your knowledge of ${p.name} to a real problem you solved or a feature you built.`,
      whyItMatters: `The job description treats ${p.name} as a meaningful requirement (${p.jobRequirement.importance}). Listing it only as a isolated tag leaves recruiters skeptical.`,
      beforeExample: `• Skills: ${p.name}, JavaScript, HTML/CSS`,
      afterExample: `• Utilized ${p.name} to build and test core product workflows, improving reliability and preventing regressions.`,
      completed: false,
      relatedSkill: p.name
    });
  }

  // Missing critical skills
  const missingCritical = evaluatedSkills.filter(s => s.matchStatus === 'missing');
  if (missingCritical.length > 0) {
    const m = missingCritical[0];
    areasForImprovement.push({
      title: `No Evidence Found for "${m.name}"`,
      description: `The job posting explicitly emphasizes "${m.name}". If you have relevant coursework or side-project experience with this, surface it prominently.`,
      recommendationId: 'rec-missing-1',
      impact: 'High'
    });

    recommendations.push({
      id: 'rec-missing-1',
      title: `Surface Experience or Coursework in ${m.name}`,
      category: 'keywords',
      priority: 'high',
      whatToImprove: `If you have genuinely used ${m.name} or related concepts in academic labs, open source, or hackathons, add a dedicated mention. Never fabricate skills you do not possess.`,
      whyItMatters: `Applicant Tracking Systems and technical recruiters search for this exact competency: "${m.jobRequirement.excerpt}"`,
      beforeExample: `(Requirement not detected in your current resume document)`,
      afterExample: `• Engineered a prototype integrating ${m.name} to handle automated workflows and data consistency.`,
      completed: false,
      relatedSkill: m.name
    });
  }

  // Clarity / Action verbs recommendation
  recommendations.push({
    id: 'rec-clarity-verb',
    title: 'Lead with Strong Action Verbs and Measurable Outcomes',
    category: 'clarity',
    priority: 'medium',
    whatToImprove: 'Ensure every bullet point follows the formula: [Strong Action Verb] + [What You Built/Solved] + [Quantified Result or Impact].',
    whyItMatters: 'Vague bullets like "Responsible for frontend tasks" sound passive. Recruiters scan resumes in under 7 seconds looking for agency and results.',
    beforeExample: '• Responsible for working on the UI and fixing bugs on the web portal.',
    afterExample: '• Architected 4 core user dashboard views; resolved 18 high-priority UI defects to increase user task completion rate by 22%.',
    completed: false
  });

  recommendations.push({
    id: 'rec-structure-trim',
    title: 'Tailor Project Bullet Hierarchy to Match the Target Role',
    category: 'structure',
    priority: 'low',
    whatToImprove: 'Reorder your project bullets so the most relevant technologies for this role appear in the very first bullet of your top project.',
    whyItMatters: 'Recruiters read top-to-bottom. Putting the most relevant framework front and center immediately confirms role fit.',
    beforeExample: '• Started project with basic setup and documentation before building the app.',
    afterExample: '• Deployed fullstack application utilizing the core target stack to serve real active users.',
    completed: false
  });

  return {
    id: `analysis-${Date.now()}`,
    timestamp: new Date().toISOString(),
    jobTitle,
    targetCompany: companyName,
    resumeFileName: fileName,
    resumeRawText: resumeText,
    jobDescriptionText: jobText,
    isDemoData: false,
    alignment: {
      overallScore,
      scoreLabel,
      scoreContext,
      skillMatchPercentage: Math.round((demonstratedCount / Math.max(1, matchedJobSkills.length)) * 100),
      experienceAlignment: Math.min(95, Math.max(50, overallScore - 4)),
      formattingAndClarity: 85,
      demonstratedSkillsCount: demonstratedCount,
      partialSkillsCount: partialCount,
      missingSkillsCount: missingCount
    },
    skills: evaluatedSkills,
    strengths,
    areasForImprovement,
    recommendations
  };
}
