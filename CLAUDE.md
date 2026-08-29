# CLAUDE.md

## Project Overview

Academic profile website for Mateo Belalcazar (doctoral student in Psychology, Universidad del Valle). Deployed via **GitHub Pages** at **mateob6.github.io** (primary, public) and **Vercel** at **paginapersonal-swart.vercel.app** (secondary, analytics). Migrated from static HTML to **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** with static export (`output: "export"`).

Private `sistema/` layer (gitignored) contains deep context about Mateo's full digital ecosystem. Read only when explicitly asked.

## Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no tailwind.config — uses `@theme inline` in CSS)
- **Fonts**: Lora (serif, headings/name) + Inter (sans, body) via `next/font/google`
- **Icons**: Inline SVGs (no external icon library)
- **Analytics**: `@vercel/analytics` (component in layout.tsx, collects on Vercel deployment)
- **Deploy**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) + Vercel (linked project `pagina_personal`)
- **Export**: Static HTML in `/out` directory

## Development

```bash
npm run dev      # http://localhost:3000
npm run build    # generates /out (static export)
npx serve out    # preview static build locally
```

## Deployment

```bash
git push origin main          # GitHub Actions → GitHub Pages (automatic)
vercel deploy --prod          # Vercel (manual, for analytics)
```

Repo: `https://github.com/Mateob6/Mateob6.github.io.git`
Vercel project: `pagina_personal` (team `mateu7`)

## File Structure

```
src/
├── app/
│   ├── globals.css              ← theme tokens + bilingual CSS + dark mode + animations
│   ├── layout.tsx               ← root layout (Lora+Inter fonts, Header, Footer, MobileNav, Analytics, FOUC prevention)
│   ├── page.tsx                 ← HOME: hero + about + research lines + education
│   ├── icon.svg                 ← favicon (MB monogram)
│   ├── sitemap.ts               ← 7 URLs
│   ├── robots.ts
│   ├── publications/page.tsx    ← APA-style reference list (4 articles + 1 chapter)
│   ├── teaching/page.tsx        ← domain-grouped course portfolio (3 domains, 11 courses)
│   ├── skills/page.tsx          ← technical skills (4 grouped cards)
│   ├── presentations/page.tsx   ← 4 presentations
│   ├── awards/page.tsx          ← 4 awards & grants
│   └── groups/page.tsx          ← 2 research groups
├── components/
│   ├── ui/                      ← cn, Card, Badge, Button
│   ├── layout/                  ← Header, Footer, MobileNav, ThemeToggle, LanguageToggle
│   └── content/                 ← T (bilingual), SectionHeader, ScrollReveal, PublicationCard,
│                                   CourseEntry, PresentationEntry, AwardCard, GroupCard,
│                                   EducationEntry, ProfileLinks
├── data/                        ← typed content (profile, publications, teaching, skills, etc.)
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

Hero (photo, name "Researcher in Psychology, Statistics & Computational Methods", profile links) → About (bio) → Research Lines (2 lines without topic pills) → Education (3 entries)

### About Narrative

Bio centers on constructs and measurement: "I study how psychological constructs are built and measured, combining quantitative methodology with computational methods. Much of my work addresses the distance between what we theorize about a psychological phenomenon and what our instruments actually capture." Sober tone, no jargon. Does not lead with "doctoral student."

### Research Lines

Section titled "Líneas de Investigación" / "Research Lines". Two lines, each with title + multi-sentence description (no topic pills):

1. **Computational Approaches in Psychology** (accent: blue) — Constructs studied via computational methods and AI. Multimodal phenomena (gesture, speech, artifacts). Centered in cognitive development and education. Examples: deaf children, STEM classrooms, motivation.
2. **Applied Quantitative Methodology** (accent: green) — Psychometrics, statistical modeling, methodology applied across psychology fields. Collaborative framing ("I collaborate on..."). Attention to how methodological decisions affect conclusions.

### Name Spelling

**Belalcazar** (no tilde) across the site.

## Subpages

Each subpage has a hero header with gradient left border (`subpage-hero` class) and scroll-reveal animations. Content comes from typed data files in `src/data/`.

### Publications (`/publications`)

APA-style reference list format. No cards — flat typographic entries with `border-b` separators inside `pl-4 border-l-2 border-accent/20` rail. Author name bolded via `**Name**` syntax. Titles in italics linked to DOI. Grouped by type (Articles, Book Chapters).

### Teaching (`/teaching`)

Domain-grouped course portfolio. Intro paragraph + 3 thematic domains:
1. **Statistics & Quantitative Methods** (4 courses)
2. **Research Methodology** (2 courses)
3. **Cognitive Development & Learning** (5 courses)

Each course appears ONCE with 1-line description in italics and all university instances listed underneath (university · semesters · period · level). Data types defined in `teaching.ts` (TeachingDomain → CourseGroup → CourseInstance).

### Skills (`/skills`)

Technical skills in grouped cards (Statistical Analysis with 4 subgroups, Computational, Languages & Frameworks, Platforms). Moved from home page to dedicated route.

## Content Inventory

| Category | Count |
|----------|-------|
| Publications (articles) | 4 (all with DOI) |
| Publications (chapters) | 1 |
| Teaching domains | 3 (Statistics, Methodology, Cognitive Dev.) |
| Teaching courses | 11 unique, 14 instances across 3 universities |
| Presentations | 4 |
| Awards & Grants | 4 |
| Research Groups | 2 (Minciencias A1 + A) |
| Education | 3 (PhD, MSc, BSc) |
| Skills groups | 4 (Statistical Analysis, Computational, Languages, Platforms) |
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
