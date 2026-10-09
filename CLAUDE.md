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
│   ├── page.tsx                 ← HOME: hero + about + education + research lines + research groups + selected publications + explore grid
│   ├── icon.svg                 ← favicon (MB monogram)
│   ├── sitemap.ts               ← 5 URLs (dynamic lastModified)
│   ├── robots.ts
│   ├── publications/page.tsx    ← APA-style reference list (5 articles + 1 chapter + 4 presentations) + ScholarlyArticle JSON-LD
│   ├── teaching/page.tsx        ← interactive SVG tree diagram + reactive table (3 domains, 13 courses)
│   ├── skills/page.tsx          ← editorial text-list skills (Statistical Analysis + Tools & Methods)
│   └── awards/page.tsx          ← 4 awards & grants
├── components/
│   ├── ui/                      ← cn, Card, Badge, Button
│   ├── layout/                  ← Header, Footer, MobileNav, ThemeToggle, LanguageToggle
│   └── content/                 ← T (bilingual), SectionHeader, ScrollReveal, PublicationCard,
│                                   TeachingExplorer (diagram+table), PresentationEntry,
│                                   AwardCard, GroupCard, CourseEntry, EducationEntry, ProfileLinks
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

Hero (photo, name, profile links) → About (bio) → Education (3 entries, horizontal grid) → Research Lines (2 cards, stacked) → Research Groups (2 GroupCards with Minciencias rank badges) → Selected Publications (4 articles in APA reference format, link to /publications) → Explore (2×2 grid linking to 4 subpages)

Person JSON-LD schema in home page with `sameAs` linking to 6 academic profiles. WebSite JSON-LD in root layout.

### About Narrative

Bio centers on constructs and measurement: "I study how psychological constructs are built and measured, combining quantitative methodology with computational methods. Much of my work addresses the distance between what we theorize about a psychological phenomenon and what our instruments actually capture." Sober tone, no jargon. Does not lead with "doctoral student."

### Education

3-column horizontal grid (chronological: BSc → MSc → PhD). Each entry has top accent border, serif degree name, institution, and period. No intro paragraph.

### Research Lines

Section titled "Líneas de Investigación" / "Research Lines". Two lines stacked vertically, each with title + multi-sentence description (no topic pills):

1. **Computational Approaches in Psychology** (accent: blue) — Constructs studied via computational methods and AI. Multimodal phenomena (gesture, speech, artifacts). Centered in cognitive development and education. Examples: deaf children, STEM classrooms, motivation.
2. **Applied Quantitative Methodology** (accent: green) — Psychometrics, statistical modeling, methodology applied across psychology fields. Collaborative framing ("I collaborate on..."). Attention to how methodological decisions affect conclusions.

### Selected Publications

Section titled "Selected Publications" / "Publicaciones Destacadas". Shows the 4 articles (excludes chapter) in APA reference format — same style as `/publications` page: authors (Mateo bolded via `**Name**`), year, italic title linked to DOI, journal, DOI URL. Inside `pl-4 border-l-2 border-accent/20` rail. Each entry wrapped in `ScrollReveal` with staggered delay. Ends with "View all publications →" link to `/publications`. Uses local `renderAuthors()` and `SelectedPublication` components defined in `page.tsx`.

### Name Spelling

**Belalcazar** (no tilde) across the site.

## Subpages

Each subpage has a hero header with gradient left border (`subpage-hero` class) and scroll-reveal animations. Content comes from typed data files in `src/data/`.

### Publications & Presentations (`/publications`)

APA-style reference list format. No cards — flat typographic entries with `border-b` separators inside `pl-4 border-l-2 border-accent/20` rail. Author name bolded via `**Name**` syntax. Titles in italics linked to DOI. Three sections: Articles, Book Chapters, Selected Presentations. ScholarlyArticle JSON-LD for articles with DOI (`@graph` array).

### Teaching (`/teaching`)

Interactive SVG tree diagram + reactive table. `TeachingExplorer` client component with `selectedDomain` state.

**Diagram:** Central "COURSES" node branching to 3 domains. Animated on scroll (line drawing + node fade-in). Active domain has accent fill/border; inactive has muted styling. Click swaps the table below with fade-in transition. Pre-selects first domain on load. Breaks out of `max-w-3xl` container to `max-w-6xl` for prominence.

**Table:** Single reactive table showing courses of the selected domain. Columns: Course, Level (badge: amber Pregrado, blue Posgrado), University (short names), Period. Courses with multiple instances get multiple rows.

3 domains, 13 courses, ~20 instances across 3 universities (source of truth: `cv/fuentes/academico.tex`):
1. **Statistics & Quantitative Methods** (4 courses)
2. **Research Methodology** (4 courses)
3. **Cognitive Development & Learning** (5 courses)

Data types in `teaching.ts` (TeachingDomain → CourseGroup → CourseInstance). Diagram counts computed dynamically from data.

### Skills (`/skills`)

Editorial typography layout (no cards or chips). Two sections:
1. **Statistical Analysis** — 2×2 grid of subgroups (Inference & Modeling, Psychometrics & Measurement, Simulation & Design, Exploration) with serif subheadings and dot-bulleted text lists
2. **Tools & Methods** — 3-column grid (Computational, Languages & Frameworks, Platforms) with dot-bulleted text lists

Both sections have `border-b border-accent/15` on headers for consistency.

## Content Inventory

| Category | Count |
|----------|-------|
| Publications (articles) | 4 (all with DOI) + 1 chapter |
| Presentations | 4 (merged into /publications) |
| Teaching domains | 3 (Statistics 4, Methodology 4, Cognitive Dev. 5) |
| Teaching courses | 13 unique, ~20 instances across 3 universities (source: CV) |
| Awards & Grants | 4 |
| Research Groups | 2 (Minciencias A1 + A) — section on home page |
| Education | 3 (PhD, MSc, BSc) |
| Skills sections | 2 (Statistical Analysis with 4 subgroups; Tools & Methods with 3 groups) |
| Profile links | 7 (Email, Scholar, ORCID, RG, GitHub, OSF, S2) |
| Pages | 5 (Home, Publications, Teaching, Skills, Awards) |
| Nav items | 4 (Publications, Teaching, Skills, Awards) |

## Professional Documentation (offline)

Employment documents in `~/Desktop/Proyectos/Certificados laborales/`. Teaching dates from official documents:
- **PUJ**: Jul 2022–present (3 departments)
- **Univalle**: Nov 2020–present (Cali + Palmira)
- **USB**: 2024

**CVs** (reorganized 2026-09-11) live in `~/Desktop/Proyectos/Certificados laborales/cv/`:
- `fuentes/academico.tex` — academic master CV (Spanish, 6 pp.)
- `fuentes/industria.tex` — corporate CV (Spanish, 3 pp.) oriented to computational methods + AI, analytics and measurement; sent to Tecnoquímicas 2026-09-11 (frozen copy in `enviados/`)
- `fuentes/anthropic_campus_en.tex` — English resume (2 pp.) for Anthropic's Claude Campus Ambassador program, PhD track (deadline 2026-09-12 11:59 PM PT). Research with Claude, teaching and community, fellowship, all 5 publications (no MAGA) + 4 under review + 1 in preparation. Sending copy and verified figures in `~/Desktop/Convocatorias, eventos y más/claude-campus-ambassador-2026/`
- `historico/2026-09_cv_industria_v1.*` contains internal Cancillería figures — **never publish or link it**
- Send registry and workflow: see that folder's `CLAUDE.md` → "Hojas de vida"

**Cancillería confidentiality**: contract CI-006-2026 has a continuing confidentiality clause. If the site ever lists this work, describe it as a public merit-based contest for a Colombian state entity, without the entity name, item counts, applicant counts, cities, scoring model (2PL) or appeals.

## Academic Profiles (external, synced 2026-09-04)

All three profiles were audited and configured on 2026-09-04. Citation tracking is automatic.

| Platform | ID / URL | State |
|----------|----------|-------|
| Google Scholar | `RoI0VQ8AAAAJ` — scholar.google.com/citations?user=RoI0VQ8AAAAJ | 6 entries (Current Psychology added manually 2026-09-09), 4 citations, h=1. Auto-updates ON, citation alerts ON. Other names registered (Belalcázar Correa, Belalcázar). Areas: psychometrics, quantitative methodology, computational psychology, cognitive development, mathematics education. Metadata of CES, chapter and MAGA entries corrected by hand |
| ORCID | `0000-0001-8276-9734` | 5 works (4 with DOI + chapter), sources Crossref/Scopus/manual. Current Psychology pending auto-index via Crossref. 5 name variants under "Also known as". Public API: `pub.orcid.org/v3.0/<id>/works` |
| Semantic Scholar | author `2296970047` | Claimed & verified. 4 papers (no chapter), 2 citations. Current Psychology pending auto-index. Public API, no key needed: `api.semanticscholar.org/graph/v1/author/2296970047?fields=papers.title,papers.externalIds,citationCount` |
| ResearchGate | researchgate.net/profile/Mateo-Belalcazar | Current Psychology added manually 2026-09-09 |
| CvLAC (Minciencias) | `cod_rh=0001867285` — scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001867285 | **Not audited.** ScienTI returned 503 "Server-unavailable" (public view and login) on 2026-09-11; no Wayback snapshot. Current Psychology not yet added. Skill `/cvlac`; data bridge `herramientas/chrome/perfil.py` reads from `src/data/*.ts` and `~/Desktop/Convocatorias, eventos y más/consultoria/` |

**Google Scholar edit-form gotcha**: the Authors field expects `Surname, Given; Surname, Given` (semicolon-separated). Comma-only input is parsed as a single author.

**Signing convention**: always sign as **Mateo Belalcazar** (no tilde, no second surname) going forward. Past papers used "Belalcazar Correa, M." and "Belalcázar, M."; the name variants above cover them.

**Current Psychology paper**: published 2026-09-09. DOI `10.1007/s12144-026-10024-9`, vol. 45(17), article 1467. Entry in `src/data/publications.ts` updated. Project folder: `~/Desktop/articulos/Jubilación y validación IDA Colombia-España/`.

## Analytics (GoatCounter — mateob6.goatcounter.com)

Last export: 2026-10-09. Tracking since ~2026-09-01.

**Summary (sep 1 – oct 8, 2026):** 74 hits in 38 days, 28 days with data. Average ~12 hits/week, ~2.6/day.

| Metric | Breakdown |
|--------|-----------|
| **Pages** | `/` 93%, `/publications` 4%, `/groups` 1%, `/skills` 1% |
| **Sources** | Direct 47%, Instagram 32%, Google 12%, Bing 5%, Facebook 1% |
| **Countries** | Colombia 86%, USA 14% |

**Weekly trend:**
- Sem 1 (sep 01–06): 24 hits (peak — likely launch/sharing)
- Sem 2–3 (sep 07–20): ~10/week (baseline)
- Sem 4 (sep 21–27): 1 hit (valley)
- Sem 5 (sep 28–oct 04): 19 hits (rebound)
- Sem 6 (oct 05–08): 10 hits (incomplete)

**Observations:**
1. Almost all traffic hits home page — subpages get almost no direct visits
2. Instagram bio is the second traffic source (32%)
3. Google indexed the site (9 organic visits in 5 weeks)
4. Audience is 86% Colombian
5. No sustained growth trend yet — needs SEO improvements and more indexable content

## SEO (implemented 2026-10-09)

- [x] Per-page meta descriptions and OG metadata for all subpages
- [x] Canonical URLs on all pages
- [x] JSON-LD: WebSite (layout), Person (home, 6 sameAs profiles), ScholarlyArticle (publications, 4 articles)
- [x] Internal linking: Explore section on home (2×2 grid), footer nav + profile links
- [x] Sitemap dates dynamic (`new Date()` at build time)
- [x] Alt text on all images, header avatar width/height for CLS
- [x] Google Search Console verification in place
- [ ] Verify GSC indexing status post-deploy (manual)
- [ ] Run PageSpeed Insights post-deploy
- [ ] Evaluate blog/notes section for indexable content (deferred)
- [ ] Hreflang (deferred — requires i18n routing restructure)

## Pending

- Materials hub (`/materials`) for student course content, congress slides, research notes — discussed, not started
- Professional Experience section (research projects, consulting). Anonymize Cancillería as above
- Additional presentations (9 total vs. 4 shown in publications page)
- Downloadable CV link (decide between `fuentes/academico` and `fuentes/industria`; never `historico/2026-09_cv_industria_v1`)
- `publications.ts` includes `quartile` field (Q1/Q3) — not displayed on site, available for future use
- Published name forms (APA): Current Psychology and TCN "Belalcázar, M."; Frontiers and CES "Belalcázar Correa, M."; chapter "Belalcazar, M."
- Teaching data source of truth: `cv/fuentes/academico.tex`. Sync when CV updates.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
