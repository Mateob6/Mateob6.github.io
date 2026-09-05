# CLAUDE.md

## Project Overview

Academic profile website for Mateo Belalcazar (doctoral student in Psychology, Universidad del Valle). Deployed via **GitHub Pages** at **mateob6.github.io** (primary, public) and **Vercel** at **paginapersonal-swart.vercel.app** (secondary, analytics). Migrated from static HTML to **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** with static export (`output: "export"`).

Private `sistema/` layer (gitignored) contains deep context about Mateo's full digital ecosystem. Read only when explicitly asked.

## Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no tailwind.config — uses `@theme inline` in CSS)
- **Fonts**: Lora (serif, headings/name) + Inter (sans, body) via `next/font/google`
- **Icons**: Inline SVGs (no external icon library)
- **Analytics**: GoatCounter (`mateob6.goatcounter.com`, script in layout.tsx, tracks GitHub Pages) + `@vercel/analytics` (Vercel deployment only)
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
│   ├── page.tsx                 ← HOME: hero + about + education (3-col grid) + research lines
│   ├── icon.svg                 ← favicon (MB monogram)
│   ├── sitemap.ts               ← 7 URLs
│   ├── robots.ts
│   ├── publications/page.tsx    ← APA-style reference list (5 articles + 1 chapter)
│   ├── teaching/page.tsx        ← editorial two-column course portfolio (3 domains, 11 courses)
│   ├── skills/page.tsx          ← editorial text-list skills (Statistical Analysis + Tools & Methods)
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
- Default: English
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

Hero (photo, name "Researcher in Psychology, Statistics & Computational Methods", profile links) → About (bio) → Education (3 entries, horizontal grid) → Research Lines (2 cards, stacked)

### About Narrative

Bio centers on constructs and measurement: "I study how psychological constructs are built and measured, combining quantitative methodology with computational methods. Much of my work addresses the distance between what we theorize about a psychological phenomenon and what our instruments actually capture." Sober tone, no jargon. Does not lead with "doctoral student."

### Education

3-column horizontal grid (chronological: BSc → MSc → PhD). Each entry has top accent border, serif degree name, institution, and period. No intro paragraph.

### Research Lines

Section titled "Líneas de Investigación" / "Research Lines". Two lines stacked vertically, each with title + multi-sentence description (no topic pills):

1. **Computational Approaches in Psychology** (accent: blue) — Constructs studied via computational methods and AI. Multimodal phenomena (gesture, speech, artifacts). Centered in cognitive development and education. Examples: deaf children, STEM classrooms, motivation.
2. **Applied Quantitative Methodology** (accent: green) — Psychometrics, statistical modeling, methodology applied across psychology fields. Collaborative framing ("I collaborate on..."). Attention to how methodological decisions affect conclusions.

### Name Spelling

**Belalcazar** (no tilde) across the site.

## Subpages

Each subpage has a hero header with gradient left border (`subpage-hero` class) and scroll-reveal animations. Content comes from typed data files in `src/data/`.

### Publications (`/publications`)

APA-style reference list format. No cards — flat typographic entries with `border-b` separators inside `pl-4 border-l-2 border-accent/20` rail. Author name bolded via `**Name**` syntax. Titles in italics linked to DOI. Grouped by type (Articles, Book Chapters).

### Teaching (`/teaching`)

Domain-grouped course portfolio. No intro paragraph. 3 thematic domains with `border-b` section headers:
1. **Statistics & Quantitative Methods** (4 courses)
2. **Research Methodology** (2 courses)
3. **Cognitive Development & Learning** (5 courses)

Editorial two-column layout: course name (1/3 left) + description & university instances (2/3 right). Full university names (Pontificia Universidad Javeriana, Cali / Universidad del Valle / Universidad de San Buenaventura, Cali). Each instance has accent dot bullet, year range (no semester count), and level badge (Pregrado in amber, Posgrado in accent blue). USB entries are historical (2024, no "present"). Data types defined in `teaching.ts` (TeachingDomain → CourseGroup → CourseInstance).

### Skills (`/skills`)

Editorial typography layout (no cards or chips). Two sections:
1. **Statistical Analysis** — 2×2 grid of subgroups (Inference & Modeling, Psychometrics & Measurement, Simulation & Design, Exploration) with serif subheadings and dot-bulleted text lists
2. **Tools & Methods** — 3-column grid (Computational, Languages & Frameworks, Platforms) with dot-bulleted text lists

Both sections have `border-b border-accent/15` on headers for consistency.

## Content Inventory

| Category | Count |
|----------|-------|
| Publications (articles) | 5 (4 with DOI; Current Psychology in press, DOI pending) |
| Publications (chapters) | 1 |
| Teaching domains | 3 (Statistics, Methodology, Cognitive Dev.) |
| Teaching courses | 11 unique, 14 instances across 3 universities (2 current: PUJ, Univalle; 1 past: USB) |
| Presentations | 4 |
| Awards & Grants | 4 |
| Research Groups | 2 (Minciencias A1 + A) |
| Education | 3 (PhD, MSc, BSc) |
| Skills sections | 2 (Statistical Analysis with 4 subgroups; Tools & Methods with 3 groups) |
| Profile links | 7 (Email, Scholar, ORCID, RG, GitHub, OSF, S2) |

## Professional Documentation (offline)

Employment documents in `~/Desktop/Proyectos/Certificados laborales/`. Teaching dates from official documents:
- **PUJ**: Jul 2022–present (3 departments)
- **Univalle**: Nov 2020–present (Cali + Palmira)
- **USB**: 2024

## Academic Profiles (external, synced 2026-09-04)

All three profiles were audited and configured on 2026-09-04. Citation tracking is automatic; nothing needs manual action beyond the pending DOI below.

| Platform | ID / URL | State |
|----------|----------|-------|
| Google Scholar | `RoI0VQ8AAAAJ` — scholar.google.com/citations?user=RoI0VQ8AAAAJ | 5 entries, 4 citations, h=1. Auto-updates ON, citation alerts ON. Other names registered (Belalcázar Correa, Belalcázar). Areas: psychometrics, quantitative methodology, computational psychology, cognitive development, mathematics education. Metadata of CES, chapter and MAGA entries corrected by hand |
| ORCID | `0000-0001-8276-9734` | 5 works (4 with DOI + chapter), sources Crossref/Scopus/manual. 5 name variants under "Also known as". Public API: `pub.orcid.org/v3.0/<id>/works` |
| Semantic Scholar | author `2296970047` | Claimed & verified. 4 papers (no chapter), 2 citations. Public API, no key needed: `api.semanticscholar.org/graph/v1/author/2296970047?fields=papers.title,papers.externalIds,citationCount` |
| ResearchGate | researchgate.net/profile/Mateo-Belalcazar | Not audited (blocks automated access) |

**Google Scholar edit-form gotcha**: the Authors field expects `Surname, Given; Surname, Given` (semicolon-separated). Comma-only input is parsed as a single author.

**Signing convention**: always sign as **Mateo Belalcazar** (no tilde, no second surname) going forward. Past papers used "Belalcazar Correa, M." and "Belalcázar, M."; the name variants above cover them.

**Current Psychology paper (in press)**: accepted 2026-09-03 (CUPS-D-26-05368R2), Springer production pending. When the DOI arrives (`10.1007/s12144-...`): add `doi` to the entry in `src/data/publications.ts`, remove "(in press)" from `journal`, rebuild, push. Google Scholar and ORCID will pick it up automatically. Project folder: `~/Desktop/articulos/Jubilación y validación IDA Colombia-España/`.

## Pending

- **Add DOI to Current Psychology paper** when Springer assigns it (see Academic Profiles)
- Course materials page (`/courses`) for student access to presentations
- Professional Experience section (research projects, Cancillería consulting)
- Additional presentations (9 total vs. 4 shown)
- Downloadable CV link

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
