# ResumeIQ — Career Intelligence Platform

A dedicated career intelligence platform engineered for university students, graduates, and early-career job seekers to understand resume-job alignment, uncover genuine skill gaps, and improve relevance with evidence-backed recommendations.

Designed as an end-to-end, high-fidelity portfolio product showcasing product design, design systems thinking, interaction design, and frontend engineering.

---

## Key Features

1. **Editorial SaaS Aesthetic:** Custom design system built with Space Grotesk, Inter, Deep Navy (`#0A0F1E`), and Electric Indigo (`#6366F1`).
2. **Evidence-Based Alignment:** Radial alignment score paired with reassuring, non-judgmental explanations (clarifies that match scores reflect text clarity, not hiring certainty).
3. **100% In-Browser Privacy:** Client-side PDF parsing using `pdfjs-dist`. Resumes and contact information never leave the candidate's browser.
4. **Competency Gap Matrix:** Differentiates between *Demonstrated* (backed by project proof), *Weak Evidence* (keyword only), and *Missing Gaps*, with a side-by-side excerpt inspector.
5. **Action Plan & Phrasing Transformations:** Prioritized recommendations with concrete before/after bullet revisions and an interactive completion tracker.
6. **Side-by-Side Job Comparison:** Compares two job descriptions against candidate experience to assist in strategic preparation.
7. **Session History & JSON Export:** Full `localStorage` persistence with one-click reload, export, and delete options.
8. **Pre-Loaded Sample Candidates:** One-click sample profiles for Software Engineering (Vercel), Product Design (Linear), and Data Analytics (Spotify).

---

## Tech Stack

* **Framework:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS, PostCSS, Custom Design System
* **Icons:** Lucide React
* **PDF Engine:** PDF.js (`pdfjs-dist`)
* **Persistence:** LocalStorage API
* **Deployment:** Vercel (Configured via `vercel.json`)

---

## Local Development Setup

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** and **npm** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

---

## Vercel Deployment Guide

This project is pre-configured for seamless zero-config deployment on Vercel.

### Method A: Deploy via Vercel Web Dashboard (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ResumeIQ career intelligence platform"
   git branch -M main
   git remote add origin https://github.com/your-username/resumeiq-ui-ux.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `resumeiq-ui-ux` repository.
4. Vercel will automatically detect the settings:
   * **Framework Preset:** Vite
   * **Build Command:** `vite build`
   * **Output Directory:** `dist`
5. Click **"Deploy"**. Your live product will be live in under 60 seconds!

### Method B: Deploy via Vercel CLI
If you have the Vercel CLI installed:
```bash
npx vercel
```
Follow the interactive prompts to deploy directly from your terminal. For production deployment:
```bash
npx vercel --prod
```

---

## Documentation & Portfolio Materials

* **Case Study:** Refer to [`CASE-STUDY.md`](./CASE-STUDY.md) for the design rationale, user research framing, information architecture diagrams, heuristics evaluation, and portfolio placeholders.
