import { AnalysisResult, JobComparisonItem } from '../types';

export interface SampleProfile {
  id: string;
  role: string;
  candidateName: string;
  tagline: string;
  resumeFileName: string;
  targetCompany: string;
  resumeText: string;
  jobDescriptionText: string;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'swe-intern',
    role: 'Frontend / Fullstack Engineer',
    candidateName: 'Alex Rivera',
    tagline: 'CS Junior @ UC Berkeley • Full-stack Intern',
    resumeFileName: 'Alex_Rivera_Software_Engineer_Resume.pdf',
    targetCompany: 'Vercel',
    resumeText: `ALEX RIVERA
Berkeley, CA • alex.rivera@berkeley.edu • github.com/alexrivera • linkedin.com/in/alexrivera-dev

EDUCATION
University of California, Berkeley
B.S. in Electrical Engineering & Computer Sciences (EECS) | Expected May 2026
Relevant Coursework: Data Structures & Algorithms, Web Development, Computer Architecture, Database Systems

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL
Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, Redux Toolkit
Tools & Platforms: Git, GitHub, Docker, Vercel, Supabase, Jest, Figma, Postman

EXPERIENCE
Frontend Developer Intern | DevForge Labs | June 2024 – August 2024
• Architected and shipped 6 core web application views in React and TypeScript, serving over 14,000 monthly active users.
• Migrated legacy REST data-fetching layer to React Query and Optimistic UI updates, cutting perceptible UI latency by 42%.
• Collaborated with senior product designers to implement an accessible component design system complying with WCAG 2.1 AA standards.
• Reduced client-side JavaScript bundle size by 28% through dynamic route code splitting and asset optimization.

Undergraduate Teaching Assistant (CS 61B) | UC Berkeley | January 2024 – May 2024
• Mentored 45+ students weekly on data structures (balanced trees, graphs, hashing) and object-oriented programming in Java.
• Conducted code reviews for project submissions and debugged algorithmic edge cases during office hours.

PROJECTS
HyperDoc — Real-Time Collaborative Workspace (Next.js, TypeScript, WebSockets)
• Built a notion-style markdown editor supporting real-time collaborative editing with sub-50ms sync latency using WebSockets.
• Integrated operational transformation logic for conflict resolution and deployed serverless APIs on Vercel with Redis caching.

InsightPulse — Student Career Analytics Dashboard (React, Tailwind CSS, Supabase)
• Designed and developed a responsive job tracker dashboard allowing 600+ students to track application pipeline conversion metrics.
• Implemented drag-and-drop kanban boards, export to CSV, and secure OAuth authentication with Supabase.`,

    jobDescriptionText: `Role: Frontend Software Engineer (Early Career / Intern)
Company: Vercel
Location: Remote / San Francisco, CA

About the Role:
We are looking for an ambitious Frontend Software Engineer who is passionate about developer experience, web performance, and building delightful user interfaces. You will work alongside our core framework and product teams to deliver ultra-fast, accessible web experiences.

Responsibilities:
• Build modern, high-performance web applications using React, Next.js, and TypeScript.
• Optimize Core Web Vitals (LCP, INP, CLS) across desktop and mobile browsers.
• Collaborate closely with Product Designers and backend engineers to craft intuitive, accessible user interfaces.
• Write comprehensive automated unit and integration tests (Jest, Playwright) and participate in rigorous code reviews.
• Investigate and debug complex state management and network performance bottlenecks.

Requirements & Qualifications:
• Demonstrated proficiency in modern TypeScript, React, and CSS/Tailwind.
• Solid understanding of DOM mechanics, browser rendering pipelines, and responsive design.
• Familiarity with server-side rendering (SSR), static site generation (SSG), and modern build tooling (Vite, Turbopack, or Webpack).
• Experience with automated testing libraries (Jest, Vitest, or React Testing Library).
• Familiarity with CI/CD deployment pipelines and cloud infrastructure (AWS or Vercel).
• Strong written communication skills and passion for mentorship or open source contributions.`
  },
  {
    id: 'product-designer',
    role: 'Associate Product Designer',
    candidateName: 'Maya Chen',
    tagline: 'HCI Master’s Graduate • Design Systems Enthusiast',
    resumeFileName: 'Maya_Chen_Product_Design_2025.pdf',
    targetCompany: 'Linear',
    resumeText: `MAYA CHEN
San Francisco, CA • maya.chen.design@gmail.com • mayachen.design • linkedin.com/in/mayachendesign

EDUCATION
University of Washington
M.S. in Human-Computer Interaction & Design | June 2024
B.Des. in Interaction Design | Magna Cum Laude | June 2022

DESIGN & TECHNICAL SKILLS
Design: Design Systems, Figma, UI/UX Prototyping, Wireframing, Micro-interactions, User Journey Mapping, Information Architecture
Research: Usability Testing, Semi-structured Interviews, Heuristic Evaluation, Competitive Benchmarking, A/B Testing
Technical: HTML/CSS, Basic React, Token Management (Style Dictionary), Storybook, WCAG 2.1 Accessibility

EXPERIENCE
Product Design Intern | CraftFlow Software | June 2023 – September 2023
• Redesigned the project onboarding flow in Figma; reduced customer time-to-first-task by 34% across 8,000 beta users.
• Established unified typography, color tokens, and 24 accessible UI component variants in collaboration with frontend engineers.
• Facilitated 12 remote moderated usability test sessions to evaluate navigation hierarchy and friction points.

UX Design Fellow | UW Health Innovation Lab | September 2022 – May 2023
• Led end-to-end design for a mobile patient monitoring application currently deployed in 3 regional clinics.
• Authored comprehensive design system guidelines covering contrast ratios, touch targets, and assistive keyboard navigation.

PROJECTS
Stride — Keyboard-First Productivity Tool (Figma, Interactive Prototyping)
• Designed a keyboard-first command palette and task management interface optimized for software teams.
• Conducted benchmark studies with 15 engineering managers to validate information density and spatial ergonomics.`,

    jobDescriptionText: `Role: Product Designer (Product Systems & Experience)
Company: Linear
Location: San Francisco / Remote

About the Team:
At Linear, we build software that feels fast, intentional, and finely crafted. We care deeply about details: keyboard shortcuts, pixel alignment, micro-interactions, and high-performance design workflows.

What You'll Do:
• Design end-to-end features and craft core workflows across web and desktop applications.
• Evolve and maintain our design system components, interactive states, and design tokens in Figma.
• Partner directly with engineers to ensure design fidelity and responsive polish in production code.
• Conduct qualitative user sessions and synthesize feedback to refine product ergonomics.
• Balance minimalist aesthetics with deep functional capability for high-frequency daily users.

What We Look For:
• Exceptional portfolio demonstrating strong visual polish, typography, spatial hierarchy, and interaction design.
• Deep expertise in Figma, including components, variants, variables, and auto-layout.
• Demonstrated understanding of frontend implementation constraints (CSS flexbox/grid, DOM hierarchy).
• Experience with user research, usability testing, and metric-informed iteration.
• Familiarity with design systems governance and token pipelines (Figma Tokens / Style Dictionary).`
  },
  {
    id: 'data-analyst',
    role: 'Junior Data Analyst',
    candidateName: 'Jordan Taylor',
    tagline: 'Statistics & Economics Grad • Python & SQL Specialist',
    resumeFileName: 'Jordan_Taylor_Data_Analyst.pdf',
    targetCompany: 'Spotify',
    resumeText: `JORDAN TAYLOR
New York, NY • j.taylor@columbia.edu • github.com/jordantaylor-data

EDUCATION
Columbia University
B.A. in Statistics & Economics | Minor in Computer Science | May 2024

SKILLS
Analysis & Modeling: SQL (PostgreSQL, BigQuery), Python (pandas, numpy, scikit-learn), R, Statistical Hypothesis Testing, A/B Testing
Visualization: Tableau, PowerBI, Matplotlib, Seaborn, Looker
Data Engineering Basics: Git, dbt, Apache Airflow, Docker, ETL Pipelines

EXPERIENCE
Data Analytics Intern | SoundMetrics Analytics | June 2023 – August 2023
• Automated daily executive revenue dashboards using SQL and Tableau, saving 6 analyst hours weekly.
• Formulated customer retention cohort models in Python, identifying key churn indicators for 120,000 active subscriptions.
• Partnered with product managers to design and evaluate 4 A/B experiments on promotional landing page conversion.`,

    jobDescriptionText: `Role: Associate Data Analyst (Product & Content Intelligence)
Company: Spotify
Location: New York, NY

Overview:
We are seeking an enthusiastic Associate Data Analyst to uncover insights that shape the future of music and podcast discovery. You will query massive event datasets, build dashboards, and support product experimentation.

Responsibilities:
• Query petabyte-scale event logs using SQL (BigQuery/Hive) to analyze listener engagement.
• Build reliable executive and operational dashboards in Tableau or Looker.
• Support product teams in formulating hypothesis-driven A/B tests and statistical significance reporting.
• Communicate data narratives clearly to cross-functional stakeholders including Product, Design, and Engineering.

Requirements:
• Strong foundation in SQL and exploratory data analysis in Python or R.
• Familiarity with dashboarding tools (Tableau, Looker, or PowerBI).
• Understanding of statistical testing (t-tests, chi-square, p-values, sample sizing).
• Experience with cloud data warehouses (BigQuery, Snowflake, or Redshift).`
  }
];

export const DEMO_ANALYSIS_RESULT: AnalysisResult = {
  id: 'demo-analysis-alex-vercel',
  timestamp: new Date().toISOString(),
  jobTitle: 'Frontend Software Engineer',
  targetCompany: 'Vercel',
  resumeFileName: 'Alex_Rivera_Software_Engineer_Resume.pdf',
  resumeRawText: SAMPLE_PROFILES[0].resumeText,
  jobDescriptionText: SAMPLE_PROFILES[0].jobDescriptionText,
  isDemoData: true,
  alignment: {
    overallScore: 78,
    scoreLabel: 'Strong Candidate Alignment',
    scoreContext: 'Your resume demonstrates solid foundational technical requirements and hands-on React/TypeScript project impact. Closing 2 evidence gaps around automated testing and Core Web Vitals will significantly increase clarity for recruiters.',
    skillMatchPercentage: 82,
    experienceAlignment: 75,
    formattingAndClarity: 88,
    demonstratedSkillsCount: 9,
    partialSkillsCount: 3,
    missingSkillsCount: 2
  },
  skills: [
    {
      id: 'skill-react',
      name: 'React & Modern Frontend',
      category: 'technical',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'Architected and shipped 6 core web application views in React and TypeScript, serving over 14,000 monthly active users.',
        section: 'Experience (DevForge Labs)',
        relevanceNote: 'Direct production experience with high MAU traffic.'
      },
      jobRequirement: {
        excerpt: 'Build modern, high-performance web applications using React, Next.js, and TypeScript.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-typescript',
      name: 'TypeScript',
      category: 'technical',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'HyperDoc — Real-Time Collaborative Workspace (Next.js, TypeScript, WebSockets)',
        section: 'Technical Skills & Projects',
        relevanceNote: 'Applied in both production internship and complex fullstack projects.'
      },
      jobRequirement: {
        excerpt: 'Demonstrated proficiency in modern TypeScript, React, and CSS/Tailwind.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-nextjs',
      name: 'Next.js & SSR/SSG',
      category: 'technical',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'HyperDoc built with Next.js, TypeScript, and deployed serverless APIs on Vercel with Redis caching.',
        section: 'Projects (HyperDoc)',
        relevanceNote: 'Direct experience with Next.js architecture and Vercel deployment.'
      },
      jobRequirement: {
        excerpt: 'Familiarity with server-side rendering (SSR), static site generation (SSG), and modern build tooling.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-perf',
      name: 'Web Performance & Bundle Optimization',
      category: 'technical',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'Reduced client-side JavaScript bundle size by 28% through dynamic route code splitting and asset optimization.',
        section: 'Experience (DevForge Labs)',
        relevanceNote: 'Clear quantitative metric demonstrating performance awareness.'
      },
      jobRequirement: {
        excerpt: 'Optimize Core Web Vitals (LCP, INP, CLS) across desktop and mobile browsers.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-accessibility',
      name: 'Accessibility (WCAG 2.1)',
      category: 'domain',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'Collaborated with senior product designers to implement an accessible component design system complying with WCAG 2.1 AA standards.',
        section: 'Experience (DevForge Labs)',
        relevanceNote: 'Explicit mention of WCAG standards and designer partnership.'
      },
      jobRequirement: {
        excerpt: 'Collaborate closely with Product Designers and backend engineers to craft intuitive, accessible user interfaces.',
        importance: 'preferred'
      }
    },
    {
      id: 'skill-state-mgmt',
      name: 'State Management & Async Data',
      category: 'technical',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'Migrated legacy REST data-fetching layer to React Query and Optimistic UI updates, cutting perceptible UI latency by 42%.',
        section: 'Experience (DevForge Labs)',
        relevanceNote: 'Demonstrates modern async state and optimistic UI handling.'
      },
      jobRequirement: {
        excerpt: 'Investigate and debug complex state management and network performance bottlenecks.',
        importance: 'preferred'
      }
    },
    {
      id: 'skill-tailwind',
      name: 'Tailwind CSS & Responsive UI',
      category: 'tools',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'InsightPulse — Student Career Analytics Dashboard (React, Tailwind CSS, Supabase)',
        section: 'Technical Skills & Projects',
        relevanceNote: 'Listed under skills and applied in multiple responsive projects.'
      },
      jobRequirement: {
        excerpt: 'Solid understanding of DOM mechanics, browser rendering pipelines, and responsive design.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-git',
      name: 'Version Control & Code Review',
      category: 'tools',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'Git, GitHub, Docker, Postman; Conducted code reviews for project submissions.',
        section: 'Technical Skills & TA Experience',
        relevanceNote: 'Demonstrated collaborative development practices.'
      },
      jobRequirement: {
        excerpt: 'Participate in rigorous code reviews and collaborate in agile team setting.',
        importance: 'preferred'
      }
    },
    {
      id: 'skill-communication',
      name: 'Technical Communication & Mentorship',
      category: 'soft',
      matchStatus: 'demonstrated',
      evidence: {
        resumeExcerpt: 'Mentored 45+ students weekly on data structures and object-oriented programming in Java.',
        section: 'Teaching Assistant Experience',
        relevanceNote: 'Proven ability to articulate complex technical ideas to others.'
      },
      jobRequirement: {
        excerpt: 'Strong written communication skills and passion for mentorship or open source contributions.',
        importance: 'preferred'
      }
    },
    {
      id: 'skill-testing',
      name: 'Automated Testing (Unit & Integration)',
      category: 'technical',
      matchStatus: 'partial',
      evidence: {
        resumeExcerpt: 'Jest listed under Technical Skills tools, but no concrete bullet points quantify test coverage or framework.',
        section: 'Technical Skills list only',
        relevanceNote: 'Tool is named, but lacks real-world project context or outcome.'
      },
      jobRequirement: {
        excerpt: 'Write comprehensive automated unit and integration tests (Jest, Playwright) and participate in code reviews.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-cicd',
      name: 'CI/CD & Cloud Infrastructure',
      category: 'tools',
      matchStatus: 'partial',
      evidence: {
        resumeExcerpt: 'Deployed serverless APIs on Vercel with Redis caching; Docker in tools.',
        section: 'Projects (HyperDoc)',
        relevanceNote: 'Deployment is present, but automated CI pipelines (GitHub Actions) are not detailed.'
      },
      jobRequirement: {
        excerpt: 'Familiarity with CI/CD deployment pipelines and cloud infrastructure (AWS or Vercel).',
        importance: 'preferred'
      }
    },
    {
      id: 'skill-cwv',
      name: 'Core Web Vitals Metric Tracking',
      category: 'domain',
      matchStatus: 'partial',
      evidence: {
        resumeExcerpt: 'Mentioned "bundle size reduction" and "UI latency", but did not explicitly specify LCP, INP, or CLS measurements.',
        section: 'Experience (DevForge Labs)',
        relevanceNote: 'Shows performance awareness, but misses the exact industry metric standards required.'
      },
      jobRequirement: {
        excerpt: 'Optimize Core Web Vitals (LCP, INP, CLS) across desktop and mobile browsers.',
        importance: 'critical'
      }
    },
    {
      id: 'skill-e2e',
      name: 'End-to-End Testing (Playwright / Cypress)',
      category: 'technical',
      matchStatus: 'missing',
      jobRequirement: {
        excerpt: 'Write comprehensive automated unit and integration tests (Jest, Playwright).',
        importance: 'critical'
      }
    },
    {
      id: 'skill-build-tooling',
      name: 'Deep Build Systems (Turbopack / Vite Internals)',
      category: 'technical',
      matchStatus: 'missing',
      jobRequirement: {
        excerpt: 'Familiarity with modern build tooling (Vite, Turbopack, or Webpack) and bundle analyzers.',
        importance: 'preferred'
      }
    }
  ],
  strengths: [
    {
      title: 'Strong Quantitative Engineering Impact',
      description: 'Your bullet points use clear numbers ("cutting UI latency by 42%", "14,000 MAU", "28% bundle reduction"), which immediately validates your technical depth to technical hiring managers.',
      evidence: 'Experience (DevForge Labs)',
      tag: 'Metrics & Outcomes'
    },
    {
      title: 'Direct Framework Alignment',
      description: 'Both your internship and project portfolio heavily feature React, TypeScript, Next.js, and Vercel deployments, matching 100% of the core product stack.',
      evidence: 'DevForge Labs & HyperDoc project',
      tag: 'Stack Fit'
    },
    {
      title: 'Accessibility Awareness',
      description: 'Explicitly citing WCAG 2.1 AA compliance sets your resume apart from 90% of early-career applicants who overlook inclusive design.',
      evidence: 'Experience (DevForge Labs)',
      tag: 'Product Maturity'
    }
  ],
  areasForImprovement: [
    {
      title: 'Automated Testing Lacks Project Evidence',
      description: 'While Jest is listed in your skills bar, none of your project or experience bullets show how you tested code, leaving recruiters unsure of your testing rigor.',
      recommendationId: 'rec-1',
      impact: 'High'
    },
    {
      title: 'Core Web Vitals Vocabulary Missing',
      description: 'The job description explicitly prioritizes LCP, INP, and CLS. Your resume mentions "latency" and "bundle size", but updating the phrasing to standard metrics aligns you directly with ATS keyword filters.',
      recommendationId: 'rec-2',
      impact: 'High'
    },
    {
      title: 'Deployment & CI/CD Evidence is Implicit',
      description: 'You mention deploying on Vercel, but stating whether you set up GitHub Actions or automated staging previews would demonstrate production maturity.',
      recommendationId: 'rec-3',
      impact: 'Medium'
    }
  ],
  recommendations: [
    {
      id: 'rec-1',
      title: 'Add Concrete Testing Evidence to DevForge Labs',
      category: 'evidence',
      priority: 'high',
      whatToImprove: 'Explicitly mention how you tested your React components (unit tests with Jest or React Testing Library) and what coverage or defect prevention was achieved.',
      whyItMatters: 'Vercel’s job description categorizes automated testing (Jest, Playwright) as a critical requirement for early-career hires.',
      beforeExample: '• Architected and shipped 6 core web application views in React and TypeScript, serving over 14,000 monthly active users.',
      afterExample: '• Architected and shipped 6 core web views in React and TypeScript for 14K MAU; authored 40+ unit/integration tests with Jest & RTL ensuring 85%+ coverage.',
      completed: false,
      relatedSkill: 'Automated Testing'
    },
    {
      id: 'rec-2',
      title: 'Frame Performance Tuning around Core Web Vitals (LCP/INP)',
      category: 'clarity',
      priority: 'high',
      whatToImprove: 'Connect your 42% latency reduction directly to user-centric metrics like Interaction to Next Paint (INP) or Largest Contentful Paint (LCP) if applicable.',
      whyItMatters: 'Performance-focused engineering teams specifically search for INP and Core Web Vitals terminology in resume screens.',
      beforeExample: '• Migrated legacy REST data-fetching layer to React Query and Optimistic UI updates, cutting perceptible UI latency by 42%.',
      afterExample: '• Migrated legacy data-fetching to React Query and Optimistic UI, cutting UI response latency by 42% and boosting Core Web Vitals INP score by 35ms.',
      completed: false,
      relatedSkill: 'Core Web Vitals'
    },
    {
      id: 'rec-3',
      title: 'Clarify CI/CD Workflow on HyperDoc Project',
      category: 'keywords',
      priority: 'medium',
      whatToImprove: 'Detail how code moved from pull request to Vercel preview environments using GitHub Actions or automated checks.',
      whyItMatters: 'Demonstrates to senior engineers that you are comfortable working in collaborative continuous deployment environments.',
      beforeExample: '• Integrated operational transformation logic for conflict resolution and deployed serverless APIs on Vercel with Redis caching.',
      afterExample: '• Integrated operational transformation logic and established automated CI/CD staging previews via GitHub Actions on Vercel with Redis caching.',
      completed: false,
      relatedSkill: 'CI/CD & Cloud Infrastructure'
    },
    {
      id: 'rec-4',
      title: 'Emphasize Component Reusability & Token Usage',
      category: 'structure',
      priority: 'low',
      whatToImprove: 'Highlight whether the design system components you built were reused across multiple features or packaged as an internal library.',
      whyItMatters: 'Front-end teams value candidates who think systematically about UI component architecture rather than isolated pages.',
      beforeExample: '• Collaborated with senior product designers to implement an accessible component design system complying with WCAG 2.1 AA standards.',
      afterExample: '• Co-created 20+ reusable, accessible UI components in Tailwind CSS adhering to WCAG 2.1 AA standards, adopted across 4 internal team surfaces.',
      completed: false,
      relatedSkill: 'Accessibility (WCAG 2.1)'
    }
  ]
};

export const DEMO_JOB_COMPARISON: JobComparisonItem = {
  jobA: {
    title: 'Frontend Software Engineer',
    company: 'Vercel',
    alignmentScore: 78,
    description: 'Focuses heavily on React, Next.js, Core Web Vitals, SSR/SSG, and developer tooling.',
    matchedSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Web Performance', 'Accessibility'],
    missingSkills: ['Playwright / E2E Testing', 'Core Web Vitals (LCP/INP)', 'Build Tooling Internals']
  },
  jobB: {
    title: 'Fullstack Product Engineer (New Grad)',
    company: 'Stripe',
    alignmentScore: 68,
    description: 'Requires balanced fullstack aptitude with strong API architecture, SQL data modeling, and distributed backend concepts.',
    matchedSkills: ['TypeScript', 'JavaScript', 'React', 'SQL / Relational DBs', 'Git'],
    missingSkills: ['Ruby / Java Backend Services', 'Payment Systems Domain', 'Distributed Architecture', 'High-throughput APIs']
  },
  commonSkills: ['TypeScript', 'React', 'Git', 'Systematic Problem Solving', 'Code Review Practices'],
  uniqueToA: ['Next.js Framework internals', 'Core Web Vitals optimization', 'Server-Side Rendering (SSR)', 'Modern CSS & Design Systems'],
  uniqueToB: ['Enterprise backend services (Java/Ruby/Go)', 'Payment data idempotency', 'Microservice API contracts', 'Data modeling at scale'],
  strategicAdvice: 'You are currently significantly closer to Vercel’s requirements (78% vs 68%). With your strong React/Next.js foundation and bundle optimization experience, adding explicit testing bullets and Web Vitals phrasing will quickly position you as a top 10% frontend candidate.'
};
