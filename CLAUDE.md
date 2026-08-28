# CLAUDE.md

## Project Overview

Academic profile website for Mateo Belalcazar (doctoral researcher in Psychology, Universidad del Valle). Deployed via **GitHub Pages** at **mateob6.github.io**. Migrated from static HTML to **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** with static export (`output: "export"`).

Private `sistema/` layer (gitignored) contains deep context about Mateo's full digital ecosystem. Read only when explicitly asked.

## Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no tailwind.config — uses `@theme inline` in CSS)
- **Fonts**: Lora (serif, headings/name) + Inter (sans, body) via `next/font/google`
- **Icons**: Inline SVGs (no external icon library)
- **Deploy**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Export**: Static HTML in `/out` directory

## Development

```bash
npm run dev      # http://localhost:3000
npm run build    # generates /out (static export)
npx serve out    # preview static build locally
```

## Deployment

```bash
git push origin main
```

GitHub Actions builds and deploys automatically to Pages. Requires Pages source = "GitHub Actions" in repo settings.

Repo: `https://github.com/Mateob6/Mateob6.github.io.git`

## File Structure

```
src/
├── app/
│   ├── globals.css              ← theme tokens + bilingual CSS + dark mode + animations
│   ├── layout.tsx               ← root layout (Lora+Inter fonts, Header, Footer, MobileNav, FOUC prevention)
│   ├── page.tsx                 ← HOME: hero + about + research lines + education + skills
│   ├── icon.svg                 ← favicon (MB monogram)
│   ├── sitemap.ts               ← 6 URLs
│   ├── robots.ts
│   ├── publications/page.tsx    ← articles + book chapters
│   ├── teaching/page.tsx        ← 3 universities, 14 courses
│   ├── presentations/page.tsx   ← 4 presentations
│   ├── awards/page.tsx          ← 4 awards & grants
│   └── groups/page.tsx          ← 2 research groups
├── components/
│   ├── ui/                      ← cn, Card, Badge, Button (from reconstruir-psi patterns)
│   ├── layout/                  ← Header, Footer, MobileNav, ThemeToggle, LanguageToggle
│   └── content/                 ← T (bilingual), SectionHeader, ScrollReveal, PublicationCard,
│                                   CourseBlock, PresentationEntry, AwardCard, GroupCard,
│                                   EducationEntry, ProfileLinks
├── data/                        ← typed content (profile, publications, teaching, etc.)
└── lib/
    └── types.ts                 ← shared types
public/
├── photo.jpg                    ← profile photo
├── og-image.png                 ← OG image 1200×630
└── google5845fe3ac49f41f4.html  ← Google Search Console verification
```

## Architecture

### Theme System

CSS custom properties via `@theme inline` bridging to Tailwind classes (`bg-accent`, `text-foreground`, etc.):

- **Light**: warm cream background (#faf8f5), deep blue accent (#004c7c)
- **Dark**: stone-900 background (#0c0a09), blue-400 accent (#60a5fa)
- **3-state toggle**: system → dark → light → system (persisted in `localStorage`)

Dark mode CSS: dual selector pattern — `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` + `:root[data-theme="dark"]`

### Bilingual System (EN/ES)

- CSS-based: `html[lang="es"] .en { display: none }` / `html[lang="en"] .es { display: none }`
- `<T en="..." es="..." />` component for inline bilingual text
- Language persisted in `localStorage`, applied via blocking `<script>` in `<head>` (no FOUC)
- Default: Spanish
- **Not translated**: publication titles, course names, university names, technical skills, author names, journal names

### Animations

- **Hero entrance**: staggered fade-up (photo scale-in → subtitle → name → line → links)
- **Scroll reveal**: IntersectionObserver-based, elements fade/slide in on scroll (respects `prefers-reduced-motion`)
- **Card hover**: `card-lift` class (translateY -3px + accent border + shadow)
- **Profile links**: animated underline on hover (`link-hover` class)
- **Header**: scroll-aware (transparent → glass-blur + shadow on scroll)
- **Decorative**: floating dots + pulsing rings (subtle, opacity 15%)

### FOUC Prevention

Two blocking scripts in `<head>` via `dangerouslySetInnerHTML`:
1. Theme: reads `localStorage('theme')` → sets `data-theme` before paint
2. Language: reads `localStorage('lang')` → sets `html[lang]` before paint

`suppressHydrationWarning` on `<html>` because server render doesn't have these attributes.

## Home Page Layout

Hero (photo, name "Researcher in Psychology, Statistics & Computational Methods", profile links) → About (bio) → Research (2 line cards stacked: Statistical Methodology & Psychometrics | Computational Approaches in Psychology, each with description + topic pills) → Education (3 entries) → Skills (4 grouped cards: Statistical Analysis with subgroups, Computational, Languages & Frameworks, Platforms)

### About Narrative

Bio leads with the research QUESTION ("how psychological processes manifest across different modalities and populations, and how computational methods can formalize what traditional instruments miss"), then frames the dual identity: statistician (psychometric modeling, simulation, multivariate) + computational researcher (contextual embeddings, multimodal behavioral data). Does not lead with "doctoral student." Do not revert to a generic description.

### Research Lines

Two lines, each with title + one-line description + topic pills:
1. **Statistical Methodology & Psychometrics** (accent: blue) — Monte Carlo, scoring, scales, instruments, multivariate, consulting
2. **Computational Approaches in Psychology** (accent: green) — embeddings, AI content analysis, multimodal cognition, cognitive development, embodied cognition, research software

### Name Spelling

**Belalcazar** (no tilde) across the site.

## Subpages

Each subpage has a hero header with gradient left border (`subpage-hero` class), scroll-reveal animations, and `card-lift` hover effects. Content comes from typed data files in `src/data/`.

## Content Inventory

| Category | Count |
|----------|-------|
| Publications (articles) | 4 (all with DOI) |
| Publications (chapters) | 1 |
| Presentations | 4 |
| Teaching (PUJ) | 5 courses (4 undergrad + 1 grad) |
| Teaching (Univalle) | 7 courses (6 undergrad + 1 grad) |
| Teaching (USB) | 2 courses (2024 only) |
| Awards & Grants | 4 |
| Research Groups | 2 (Minciencias A1 + A) |
| Education | 3 (PhD, MSc, BSc) |
| Profile links | 7 (Email, Scholar, ORCID, RG, GitHub, OSF, S2) |

## Professional Documentation (offline)

Employment documents in `~/Desktop/Proyectos/Certificados laborales/`. Teaching dates from official documents:
- **PUJ**: Jul 2022–present (3 departments)
- **Univalle**: Nov 2020–present (Cali + Palmira)
- **USB**: 2024

## Pending

- Course materials page (`/courses`) for student access to presentations
- Professional Experience section (research projects, Cancillería consulting)
- Additional presentations (9 total vs. 4 shown)
- Downloadable CV link
