# CLAUDE.md

## Project Overview

Academic profile website for Mateo Belalcazar (doctoral student in Psychology, Universidad del Valle). Deployed via **GitHub Pages** at **mateob6.github.io**. (The Vercel copy, paginapersonal-swart.vercel.app, project `pagina_personal` of team `mateu7`, was deleted on 2026-11-22: Mateo only uses GoatCounter. It had been auto-deploying from the GitHub repo.) Migrated from static HTML to **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** with static export (`output: "export"`).

Private `sistema/` layer (gitignored) contains deep context about Mateo's full digital ecosystem. Read only when explicitly asked.

## Current Status (as of 2026-11-23)

Done on 2026-11-22: downloadable CV (EN/ES, cleaned for public use), honeycomb background (everywhere, 1 % under the text), curved panels on Home, Teaching and Materials, Materials with English versions and the first Zenodo DOI (Estadística), Lighthouse fixes (nav renamed «Recognition»), Vercel removed (GoatCounter only), Search Console set up (sitemap submitted, personal Gmail added as owner), GoatCounter export analysed, CvLAC largely updated.

Next:
- **Search Console** (in a few days): sitemap «Correcto» with 6 pages, more than 1 page indexed
- **GoatCounter** (≈ mid-December): Google's share and direct landings on subpages
- **CvLAC**: co-authors/keywords/areas of the 4 articles, the book chapter, PhD advisor, recent events, peer review, awards (see «CvLAC»)
- **Materials**: Univalle and Javeriana rules on class material (Mateo); a new Zenodo version each semester
- **Teaching on phones**: the course table overflows (Period column cut off) and the diagram is tiny at 390 px (see «Pending»)

## Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no tailwind.config — uses `@theme inline` in CSS)
- **Fonts**: Lora (serif, headings/name) + Inter (sans, body) via `next/font/google`
- **Icons**: Inline SVGs (no external icon library)
- **Analytics**: GoatCounter only (`mateob6.goatcounter.com`, script in layout.tsx). `@vercel/analytics` was removed 2026-11-22. `count.js` only counts full page loads, so `GoatCounterTracker` (`components/layout/goatcounter-tracker.tsx`) calls `goatcounter.count()` on client-side route changes (since 2026-10-17)
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
git push origin main          # GitHub Actions → GitHub Pages (automatic)
```

Repo: `https://github.com/Mateob6/Mateob6.github.io.git`

## File Structure

```
src/
├── app/
│   ├── globals.css              ← theme tokens + bilingual CSS + dark mode + animations
│   ├── layout.tsx               ← root layout (Lora+Inter fonts, Header, Footer, MobileNav, GoatCounter, honeycomb, FOUC prevention)
│   ├── page.tsx                 ← HOME: hero + about + education + research lines + research groups + selected publications + explore grid
│   ├── icon.svg                 ← favicon (MB monogram)
│   ├── sitemap.ts               ← home, publications, teaching, materials, one per course with classes, more (dynamic lastModified)
│   ├── robots.ts
│   ├── publications/page.tsx    ← APA-style reference list (4 articles + 1 chapter + 10 presentations) + ScholarlyArticle JSON-LD
│   ├── teaching/page.tsx        ← interactive SVG tree diagram + reactive table (3 domains, 12 courses); «Materials →» on courses with slides
│   ├── materials/page.tsx       ← class slides by course → unit → class (data fetched at build from the slides site)
│   ├── materials/[curso]/page.tsx ← one static page per course with classes
│   ├── more/page.tsx            ← "Recognition": #awards (4 awards & grants) + #skills (Statistical Analysis + Tools & Methods)
│   ├── skills/page.tsx          ← redirect stub → /more#skills (meta refresh, noindex)
│   └── awards/page.tsx          ← redirect stub → /more#awards (meta refresh, noindex)
├── components/
│   ├── ui/                      ← cn, Card, Badge, Button
│   ├── layout/                  ← Header, Footer, MobileNav, ThemeToggle, LanguageToggle, GoatCounterTracker, panal (PanalFondo, PanalLuz)
│   └── content/                 ← T (bilingual), SectionHeader, ScrollReveal, PublicationCard,
│                                   TeachingExplorer (diagram+table), PresentationEntry,
│                                   AwardCard, GroupCard, CourseEntry, EducationEntry, ProfileLinks (+ CV paths),
│                                   materials (CourseCard, ComingSoonCard, ClassRow, UnitTrack…),
│                                   CurvedPanel (curved-panel.tsx: the curve + surface panel)
├── data/                        ← typed content (profile, publications, teaching, skills, materials, etc.)
├── types/react-canary.d.ts      ← types for React's <ViewTransition>
└── lib/
    └── types.ts                 ← shared types
public/
├── photo.jpg                    ← profile photo
├── cv/                          ← downloadable academic CV, EN and ES (see «Downloadable CV»)
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
- **Header**: scroll-aware (transparent → glass-blur + shadow on scroll). Logo text is bilingual "Home"/"Inicio" (not the full name)
- **Decorative**: floating dots + pulsing rings (subtle, opacity 15%)
- **Honeycomb background (panal, 2026-11-22)**: one faint hexagon lattice for the whole site, drawn as CSS masks in `globals.css` («Panal») with the layers in `components/layout/panal.tsx` (`PanalFondo`, `PanalLuz`, mounted in `layout.tsx`; `body` is `relative`). Lines are `--foreground` at **8 %** (`--panal-fuerza`), so light and dark read the same. **It is everywhere, phones included**: full strength in the side margins on desktop (from ~26–36rem off the center outwards), in a patch at the top left of every subpage hero (`body:has(.subpage-hero)`, ≥ 1024 px) and under the blue curve of every curved panel; much fainter under the reading column, **1 %** (`--panal-texto: 0.125` of the 8 %, set in `--panal-margenes`). Each curved panel has its own layer (`.panal-panel`, curve path repeated in `--panal-curva` / `--panal-curva-espejo`; the panel content sits at `z-[1]`) that fades from the curve down to the same floor by 44rem. A copy of the lattice in the accent color lights up around the mouse (`*-luz`, `--px/--py` set by `PanalLuz`; off on touch screens and with reduced motion), dimmed exactly where the lattice is (`--panal-texto-luz`, defaults to `--panal-texto`; can be lowered on its own if the light ever distracts while reading). Cards stay opaque (research lines, awards, course and «Coming soon» cards): objects on top of the honeycomb, no pattern of their own. The page lattice and the panel lattice are out of phase at the curve; accepted, the blue line separates them (aligning would need JS). Decided with Mateo on mock-ups: margins 5/7/12 % compared (→ 8 %), then the floor under the text 2/3/4 % in light and dark (→ 2 %, same in both themes), lowered to 1 % the same day after seeing it live (2026-11-22). The home keeps its dots and rings; «filled cells» were dropped
- **Curved panels (2026-11-22)**: where a page turns from *reading* to *exploring*, the cream background gives way to a full-width surface panel whose top edge is the curve Mateo drew (flat, a broad rise, a drop at one side; fill + thin `accent/40` stroke). One component, `CurvedPanel` (`components/content/curved-panel.tsx`): props `espejo` (drop at the left: `.panel-espejo` flips the SVG and swaps `--panal-curva` for `--panal-curva-espejo`, so the honeycomb mask follows), `final` (the page ends in the panel: `data-panel-final`, and `globals.css` «Curved panel» makes `main` a flex column without bottom padding, stretches the panel and paints the footer `--surface`, so the white runs into the footer with no cream strip or gap), `ancho` (inner width) and `labelledBy`. Where: **Home** before Explore (normal), **Teaching** around the diagram + table (mirrored), **Materials** around the courses (normal). **Rules** (Mateo, 2026-11-22): at most one curve per page; only at that reading → exploring turn (a collection, a tool, the doors to the rest of the site); always the same two surfaces, no new colors or accent bands; reading pages (Publications, Recognition) stay flat; alternate the orientation between pages. Things on the panel use `bg-background` (cream) to stand out: course cards, Explore cards, inactive Teaching nodes. Chosen on a mock-up (normal vs mirrored; flat end + cream strip vs panel into the footer). Candidate for a later round: the course page (units and classes on a panel)

### FOUC Prevention

Two blocking scripts in `<head>` via `dangerouslySetInnerHTML`:
1. Theme: reads `localStorage('theme')` → sets `data-theme` before paint
2. Language: reads `localStorage('lang')` → sets `html[lang]` before paint

`suppressHydrationWarning` on `<html>` because server render doesn't have these attributes.

## Home Page Layout

Hero (photo, name, profile links) → About (bio) → Education (3 entries, horizontal grid) → Research Lines (2 cards, stacked) → Research Groups (3 GroupCards with rank badges: Instituto CIDEAS, A1, A) → Selected Publications (4 articles in APA reference format, link to /publications) → Explore (2 × 2 grid of cream cards, stacked on mobile, linking to the 4 subpages) on a curved panel that runs into the footer (no section divider before it: the curve does that job)

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

APA-style reference list format. No cards — flat typographic entries with `border-b` separators inside `pl-4 border-l-2 border-accent/20` rail. Author name bolded via `**Name**` syntax. Titles in italics linked to DOI. Three sections: Articles, Book Chapters, Presentations (all 10 from the CV). Journal name rendered with `text-foreground` contrast. ScholarlyArticle JSON-LD for articles with DOI (`@graph` array).

### Teaching (`/teaching`)

Interactive SVG tree diagram + reactive table. `TeachingExplorer` client component with `selectedDomain` state. Both sit on a mirrored curved panel (`CurvedPanel final espejo`, sr-only h2 «Courses»), so inactive domain nodes are filled with `--background` (cream on the white panel).

**Diagram:** Central "COURSES" node branching to 3 domains. Animated on scroll (line drawing + node fade-in). Active domain has accent fill/border; inactive has muted styling. Click swaps the table below with fade-in transition. Pre-selects first domain on load. Breaks out of `max-w-3xl` container to `max-w-6xl` for prominence.

**Table:** Single reactive table showing courses of the selected domain. Columns: Course, Level (badge: amber Pregrado, blue Posgrado), University (short names), Period. Courses with multiple instances get multiple rows.

3 domains, 12 courses, 17 instances across 3 universities (source of truth: `cv/fuentes/academico.tex`):
1. **Statistics & Quantitative Methods** (3 courses)
2. **Research Methodology** (4 courses)
3. **Cognitive Development & Learning** (5 courses)

Data types in `teaching.ts` (TeachingDomain → CourseGroup → CourseInstance). Diagram counts computed dynamically from data.

### Materials (`/materials` and `/materials/<course>`) — added 2026-11-22

Class slides built with Mateo's own slide engine (`~/Desktop/Cursos/diapositivas-web/`), organized **course → unit → class**. Only classes made with that engine, from 2026-11 on (no old PowerPoint or Gamma decks). Nav label "Materials" / "Materiales" (mobile: "Slides" / "Diapos"); also in footer, sitemap and as a 4th card in the home Explore grid (2 × 2).

**Structure (decided 2026-11-22: "course front page + focused view", after weighing a sliding tabbed panel and a honeycomb)**
- **`/materials` (front page)**: hero, one sentence, chips «CC BY 4.0» and «Spanish · English», counts («3 courses · 1 class»). Below, a **curved panel** (`CurvedPanel final`, see Architecture → Curved panels; drop at the right), the first one on the site. Inside (`max-w-5xl`): «Recently published» (only when there are ≥ 3 classes; `RECENT_MIN` in the page), then the courses grouped by the teaching domains (same names as `/teaching`), as cards in a 1/2/3-column grid.
  - **`CourseCard`** (course with classes): link to `/materials/<slug>`; 16:9 cover (thumbnail of the course's most recent class), name, description (2 lines), «3 units · 1 class · Nov 2026», «Open course →».
  - **`ComingSoonCard`** (course Mateo teaches but without classes yet): not a link, dashed border, a plain cover with «Coming soon / Próximamente» (its own honeycomb pattern was removed 2026-11-22; the panel lattice is behind the cards, so the card background is opaque). Every course in `cursos.json` shows up; today Estadística (with classes), Análisis Integrado de Datos and Psicología del Aprendizaje.
- **`/materials/<slug>` (focused view)**: one static page per course **with classes** (`generateStaticParams`, `dynamicParams = false`, own metadata). «← All courses», header with domain label, name, description, counts and the cover on the right; `UnitTrack` (all units, faint until they have classes, «Coming soon»); then each unit with its `ClassRow`s (thumbnail on the left, title, summary, slide count and date, «View slides ↗» filled accent and «PDF ↓» outline; no download of the HTML itself, Mateo's decision).
- **Transition**: React `<ViewTransition name="curso-<slug>" share="morph" default="none">` wraps the cover on the card and on the course page, so the card cover morphs into the course header on client navigation (and back). The React bundled by Next 16 exports `ViewTransition`; types come from `src/types/react-canary.d.ts`. CSS in `globals.css`: `.morph` 420 ms with a slight blur, site header pinned (`viewTransitionName: "site-header"` in `header.tsx`), `pointer-events: none` on the overlay, no animation with `prefers-reduced-motion`. Browsers without the API (Firefox) just navigate. Tested 2026-11-22 with headless Chrome via CDP: client navigation, 1 transition per click, no console errors.
- **Data**: `src/data/materials.ts` fetches `cursos.json` (courses, bilingual description, units, `perfil` = name in `teaching.ts`, `dominio`) and `clases.json` from `mateob6.github.io/diapositivas/` **during `next build`** (one cache-busting value per build). `getMaterials()` returns all courses (ordered by domain, then file order) with units, classes, total, last update and cover; `getCourse()`, `getRecent()`, `getMaterialsLinks()` (Teaching "Materials →" now points to `/materials/<slug>`). If the fetch fails, the build fails and Pages keeps the previous version.
- **Automatic updates**: `clase.py publicar` (a class) and `clase.py cursos` (the course registry) push to the slides repo, wait until the files are served and run `gh workflow run deploy.yml -R Mateob6/Mateob6.github.io`.
- **Thumbnails**: `miniatura.webp` / `miniatura-oscura.webp` (960 × 540) next to each class, from the slide number in its `publicacion.json`; both `<img>` are rendered and `.thumb-light` / `.thumb-dark` in `globals.css` show the one matching the site theme (Tailwind `dark:` follows only the OS, so it is not used).
- **English version (2026-11-22)**: the decks are written and shown in Spanish; a cover button (or `?en`) switches the whole deck to English (engine rule; Claude translates each class when it is finished, `clase.py traducir`). `clases.json` carries `titulo_en`, `pdf_en`, `miniatura_en` and `miniatura_en_oscura`. When the site is in English, Materials shows the English title and thumbnail (`DeckTitle`, `Thumb` with `<T>`), «View slides» opens the deck with `?en` (`verUrl`) and «PDF» downloads the English PDF; classes without a translation fall back to Spanish. Course page meta line: «Spanish and English»; JSON-LD `inLanguage` ["es", "en"] and `alternateName`.
- **License**: CC BY 4.0. **JSON-LD**: `CollectionPage` with `Course` items on the front page; `Course` with `LearningResource` parts on each course page.
- **Zenodo archive (since 2026-11-22)**: one record per course, a new version each semester. The course page shows «Archived in Zenodo · DOI …» with the **concept DOI** (always the latest version), from `COURSE_DOI` in `src/data/materials.ts`; the Course JSON-LD carries it as `identifier` + `sameAs`. Estadística: concept DOI `10.5281/zenodo.24450377`, version 2026-2 `10.5281/zenodo.24450378` (record https://zenodo.org/record/24450378): «Estadística: diapositivas de clase (2026-2)», type Lesson, CC BY 4.0, ORCID as creator, bilingual description, files = the class PDF in Spanish and English plus the single-file offline `.html` (`clase.py empaquetar`; Zenodo stores it but does not serve it as a live page, so the record links the web deck with `isVariantFormOf`). Account: Zenodo user `mateob6`, ORCID sign-in, mateo.belalcazar6@gmail.com; token `perfil-materiales` (`deposit:write`, `deposit:actions`) in `~/.zshrc` as `ZENODO_TOKEN` (it was pasted once in a chat; recreate it with `pbpaste` if that matters). Next semester: «New version» of the same record; a new course gets its own record and a `COURSE_DOI` entry. Before any upload, apply the filter in «Pending → Materials»
- **Old slides index**: `mateob6.github.io/diapositivas/` redirects to `/materials`.
- **Later** (decided): a short looping video of each class on hover; a page per course already exists, so growth needs no restructuring.

### Recognition (`/more`)

Merged Skills + Awards page (2026-10-17). Nav label "Recognition" / "Reconocimientos" (renamed from "More" on 2026-11-22: Lighthouse flagged "More" as generic link text; mobile nav says "Awards" / "Premios" because the long word does not fit); H1 "Awards & Skills" / "Premios y Habilidades". Awards first (they're short and high-signal), then skills. Anchors `#awards` and `#skills` with `scroll-mt-20` so the sticky header doesn't cover them. Professional experience stays only in the CV (Mateo's decision, 2026-11-22); Materials and the CV have their own places (/materials, the «CV» link).

**Awards** (`#awards`): 4 `AwardCard`s under an h2 styled like the skills headers.

**Skills** (`#skills`): editorial typography layout (no cards or chips). Two sections:
1. **Statistical Analysis** — 2×2 grid of subgroups (Inference & Modeling, Psychometrics & Measurement, Simulation & Design, Exploration) with serif subheadings and dot-bulleted text lists
2. **Tools & Methods** — 3-column grid (Computational, Languages & Frameworks, Platforms) with dot-bulleted text lists

All three h2s have `border-b border-accent/15` for consistency.

**Old URLs**: `/skills` and `/awards` are stubs with `<meta httpEquiv="refresh">` (React 19 hoists it to `<head>`) + visible link, `noindex`, canonical `/more`. `redirect()` from `next/navigation` does NOT emit a meta refresh under `output: "export"` (it only works with client JS), so don't use it for this.

## Content Inventory

| Category | Count |
|----------|-------|
| Publications (articles) | 4 (all with DOI) + 1 chapter |
| Presentations | 10 (all from CV, merged into /publications) |
| Teaching domains | 3 (Statistics 3, Methodology 4, Cognitive Dev. 5) |
| Teaching courses | 12 unique, 17 instances across 3 universities (source: CV) |
| Awards & Grants | 4 |
| Research Groups | 3 (Instituto CIDEAS + Minciencias A1 + A) — section on home page |
| Education | 3 (PhD, MSc, BSc) |
| Skills sections | 2 (Statistical Analysis with 4 subgroups; Tools & Methods with 3 groups) |
| Profile links | 8 (CV, Email, Scholar, ORCID, RG, GitHub, OSF, S2) |
| Pages | 5 (Home, Publications, Teaching, Materials, Recognition) + one page per course with slides under /materials + 2 redirect stubs |
| Nav items | 4 (Publications, Teaching, Materials, Recognition) |

## Downloadable CV (since 2026-11-22)

First link in the hero («CV») and in the footer. It follows the site language: `public/cv/mateo-belalcazar-cv-en.pdf` and `public/cv/mateo-belalcazar-cv-es.pdf`, copies of `~/Desktop/Proyectos/Certificados laborales/cv/fuentes/academico_en.pdf` and `academico.pdf`. The paths live in `CV` (`components/content/profile-links.tsx`). When the CV changes: recompile it there, copy both PDFs over these two files and push.

Both academic CVs were cleaned on 2026-11-22 for public use: the Cancillería work reads «concurso público de méritos para una entidad del Estado colombiano» / «public merit-based competitive examination for a Colombian state entity», with no entity, contract numbers, item or applicant counts, cities, scoring model or appeals. Keep it that way before copying a new version here.

Also fixed on 2026-11-22: the CvLAC link in both CVs pointed to someone else's profile (now `cod_rh=0000095645`), and the book chapter lists only Pulido-Moreno and Belalcazar as authors, with Blanch-Ribas and Díaz-Bambula as editors (pp. 161–183, Editorial Bonaventuriana, ISBN 978-628-7559-70-7).

## Professional Documentation (offline)

Employment documents in `~/Desktop/Proyectos/Certificados laborales/`. Teaching dates from official documents:
- **PUJ**: Jul 2022–present (3 departments)
- **Univalle**: Cali Nov 2020–present (hora cátedra; linked to research projects since 2018); Palmira Nov 2020–Dec 2025
- **USB**: Feb–Jun 2024
- **Public merit-based exam** (Fundación Mixta Politécnico Univalle Yumbo): Aug 2025–Nov 2026

**CVs** (reorganized 2026-09-11) live in `~/Desktop/Proyectos/Certificados laborales/cv/`:
- `fuentes/academico.tex` / `academico_en.tex` — academic master CV in Spanish and English (6 pp. each), the public versions linked from the site
- `fuentes/industria.tex` — corporate CV (Spanish, 3 pp.) oriented to computational methods + AI, analytics and measurement; sent to Tecnoquímicas 2026-09-11 (frozen copy in `enviados/`)
- `fuentes/anthropic_campus_en.tex` — English resume (2 pp.) for Anthropic's Claude Campus Ambassador program, PhD track (deadline 2026-09-12 11:59 PM PT). Research with Claude, teaching and community, fellowship, all 5 publications (no MAGA) + 4 under review + 1 in preparation. Sending copy and verified figures in `~/Desktop/Convocatorias, eventos y más/claude-campus-ambassador-2026/`
- `historico/2026-09_cv_industria_v1.*` contains internal Cancillería figures — **never publish or link it**
- Send registry and workflow: see that folder's `CLAUDE.md` → "Hojas de vida"

**Cancillería confidentiality**: contract CI-006-2026 has a continuing confidentiality clause. If the site ever lists this work, describe it as a public merit-based contest for a Colombian state entity, without the entity name, item counts, applicant counts, cities, scoring model (2PL) or appeals.

## Academic Profiles (external; audited 2026-09-04, rechecked 2026-11-22)

Citation tracking is automatic in Scholar, ORCID and Semantic Scholar.

| Platform | ID / URL | State |
|----------|----------|-------|
| Google Scholar | `RoI0VQ8AAAAJ` — scholar.google.com/citations?user=RoI0VQ8AAAAJ | 6 entries (Current Psychology added manually 2026-09-09), 4 citations, h=1. Auto-updates ON, citation alerts ON. Other names registered (Belalcázar Correa, Belalcázar). Areas: psychometrics, quantitative methodology, computational psychology, cognitive development, mathematics education. Metadata of CES, chapter and MAGA entries corrected by hand |
| ORCID | `0000-0001-8276-9734` | 5 works (4 with DOI + chapter), sources Crossref/Scopus/manual. Current Psychology indexed (checked 2026-11-22). 5 name variants under "Also known as". Public API: `pub.orcid.org/v3.0/<id>/works` |
| Semantic Scholar | author `2296970047` | Claimed & verified. 4 papers (no chapter, Current Psychology included), 3 citations (2026-11-22). Public API, no key needed: `api.semanticscholar.org/graph/v1/author/2296970047?fields=papers.title,papers.externalIds,citationCount` |
| ResearchGate | researchgate.net/profile/Mateo-Belalcazar | Current Psychology added manually 2026-09-09 |
| CvLAC (Minciencias) | **`cod_rh=0000095645`** — scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000095645 | Partly updated 2026-11-22; see «CvLAC» below |
| Zenodo | user `mateob6` (ORCID sign-in) | Course slides archive; see «Materials → Zenodo archive» |

**Google Scholar edit-form gotcha**: the Authors field expects `Surname, Given; Surname, Given` (semicolon-separated). Comma-only input is parsed as a single author.

**Signing convention**: always sign as **Mateo Belalcazar** (no tilde, no second surname) going forward. Past papers used "Belalcazar Correa, M." and "Belalcázar, M."; the name variants above cover them.

### CvLAC

- **ID**: `cod_rh=0000095645`. The `0001867285` used until 2026-11-22 here and in the CVs belongs to someone else.
- **Login**: Claude fills «Nombres»; Mateo clicks «Ingresar» (Chrome autofills document and password). Sessions expire after a few idle minutes: fill and save in one go, and click «Salir» at the end.
- **Updated 2026-11-22**: 4 articles (Current Psychology, Frontiers, CES, TCN, with journal and city codes and the DOI as web link); MSc graduation Dec 2023 + thesis (approved); PhD (Univalle Sede Cali, program «Psicología», from Aug 2025, 3 semesters, scholarship, thesis «Integrar sin Excluir: IA para Mapear Interacciones Multimodales entre Niños, Maestros y Artefactos en Escenarios STEAM+H que Relacionen Pensamiento Matemático-Espacial y Resolución Pacífica de Problemáticas en el Pacífico Colombiano»); Scholar, ResearchGate and ORCID identifiers; citation names «BELALCAZAR, M.; BELALCAZAR CORREA, M.; BELALCÁZAR, M.»; professional experience by institution, without course-level activities (Mateo's choice): Univalle Sede Cali (2018–, **current affiliation**, 9 h), Javeriana Cali (Jul 2022–, 12 h; not «current» because CvLAC allows only one), Univalle Sede Palmira (Nov 2020–Dec 2025, 9 h), San Buenaventura Cali (Feb–Jun 2024, 6 h), Fundación Mixta Politécnico Univalle Yumbo (Aug 2025–Nov 2026, 20 h, the public merit-based exam without naming the entity). Weekly hours follow Mateo's rule: 3 h per course in the current (or busiest) semester.
- **Pending**: co-authors, keywords and areas of the 4 articles (popup windows, Mateo clicks); the book chapter (neither the book nor Editorial Bonaventuriana is in the catalog: create editorial → book ISBN 978-628-7559-70-7, 420 pp., Dec 2025 → chapter pp. 161–183, Pulido-Moreno & Belalcazar); PhD advisor (Yenny Otálora) under «Personas vinculadas»; recent events; peer reviewer; awards.
- **How to fill it**: popups that only write fields into `window.opener` can be replaced by reading the popup page in another tab and setting the same fields (journal: `cod_revista`, `tpo_revista`, `txt_nme_revista`; place: `_loc_<n>`, `_locValue_<n>`, `_locRHValue_<n>`, `_locPaisValue_<n>`, where `<n>` changes with each page load). Institution and program pickers in Formación/Experiencia are in-page dialogs that work directly; the academic program picker only works as a popup (Mateo clicks). Skill `/cvlac`; data bridge `herramientas/chrome/perfil.py`.

**Current Psychology paper**: published 2026-09-09. DOI `10.1007/s12144-026-10024-9`, vol. 45(17), article 1467. Entry in `src/data/publications.ts` updated. Project folder: `~/Desktop/articulos/Jubilación y validación IDA Colombia-España/`.

## Analytics (GoatCounter — mateob6.goatcounter.com)

Tracking since ~2026-09-01. Logged in with the personal Gmail (mateo.belalcazar6), which also holds the `journalfinder` site. The extension needs permission for goatcounter.com to read the dashboard in Chrome; exports arrive as a ZIP of JSONL aggregates (Settings → Export).

**Latest: full export 2026-11-22** (`goatcounter-export-mateob6-20261122T231754Z.zip` in Downloads; new JSONL format with hourly aggregates, not raw hits; analysis script kept only in the session scratchpad). Aug 31 – Nov 22: 185 visits; without Nov 22 (15, Mateo's own checks: internal referrers from /teaching and /diapositivas) 170 in 83 days ≈ 2/day, no growth. Weekly: 24 at launch, 4–16 in Sep, peak 34 + 23 in the weeks of Oct 12 and 19 (Instagram and Facebook, Oct 16–20), then 10, 4 and 3 in late Oct – mid Nov (no social pushes), 10 the week of Nov 16. Sources overall: direct/unknown 43 %, Instagram 35 % (`ig` + `l.instagram.com`), Google + Bing 11 %, Facebook 6 % (all in Oct–Nov). Subpages: from Oct 10 to Nov 21 only 9 of 86 visits (10 %) were not the home. Screens: computers 48 %, phones 45 %, tablets 7 %. Busiest: Monday and Friday; 9–12 h and 15–18 h, also 21–24 h (Colombia time). Countries: Colombia 86 %, USA 12 %. Reading: traffic depends on social posts; without them it falls to 3–4 visits a week

**Second reading (Oct 10 – Nov 22, 2026; first one with navigation tracking):** 101 visits in 44 days (≈ 2.3/day, ≈ 16/week). The Nov 22 export shows the first period also had 84 of these units (Aug 31 – Oct 9), so the two periods are comparable: flat at ≈ 2 visits/day.

| Metric | Breakdown |
|--------|-----------|
| **Pages** | `/` 80, `/publications` 7, `/teaching` 5, `/materials` 3, `/materials/estadistica` 3, `/more` 3 |
| **Sources** | Unknown/direct 37 %, Instagram 39 % (`ig` 35 + `l.instagram.com` 4), Facebook 10 %, Google 7 % |
| **Countries** | Colombia 85 %, USA 12 %, China, Ireland, Sweden 1 % each |
| **Devices** | Phones 50 %, tablets 5 %, computers 46 % |

- Navigation depth: 21 subpage visits against 80 home visits, so at most ~1 in 4 home visitors goes on to a subpage (fewer if some of those 21 landed directly); Publications first, then Teaching
- The Materials and `/more` visits are almost all on Nov 22, the day those pages changed: probably Mateo's own checks (and possibly Lighthouse runs), so not audience yet
- Instagram is now the top named source; Google is still small (7 %) because until Nov 22 only the home was indexed and no sitemap had been submitted (see SEO)

**Next reading:** after Google indexes the subpages (≈ mid-December), compare Google's share and the subpage landings

### History

**Summary (sep 1 – oct 9, 2026):** 84 hits in 29 days with data. Average 2.9 hits/day, ~20/week.

| Metric | Breakdown |
|--------|-----------|
| **Pages** | `/` 87%, `/publications` 6%, `/skills` 2.4%, `/teaching` 2.4%, `/awards` 1.2%, `/groups` 1.2% |
| **Sources** | Direct 51%, Instagram 30%, Google 11%, Bing 5%, Facebook 1% |
| **Countries** | Colombia 88%, USA 11% |

**Weekly trend:**
- Sem 1 (aug 31–sep 06): 24 hits (launch peak)
- Sem 2–3 (sep 07–20): ~10/week (baseline)
- Sem 4 (sep 21–27): 1 hit (valley)
- Sem 5 (sep 28–oct 04): 19 hits (rebound)
- Sem 6 (oct 05–09): 20 hits (stable)

**How to read the data before 2026-10-17 (measurement break):**
Until this date `count.js` only counted full page loads; clicks between pages via `next/link` were NOT counted. A "hit" in this period therefore means a full load: entering from outside (Instagram bio, Google, typed/shared link), a reload, a link opened in a new tab, or landing directly on a subpage.
- **Reliable**: visit counts and weekly trend (every visit starts with a full load, so 84 hits ≈ 84 visits), sources, countries
- **Underestimated**: navigation depth. Subpage shares only reflect direct landings (e.g. `/publications` 6% ≈ people arriving from Google/links), not people browsing from the home
- Lost internal-navigation data cannot be recovered. From 2026-10-17 on, `GoatCounterTracker` counts route changes, so subpage hits rise; don't compare subpage shares across this date

**Observations:**
1. Home page gets 87% of landings — expected, since the Instagram bio and most links point to `/`. Not evidence that subpages are ignored (see measurement break above). SEO overhaul (2026-10-09, 2026-10-17) should bring more direct landings on subpages as Google re-indexes
2. Instagram bio is second traffic source (30%)
3. Google indexed the site within 5 weeks (11% organic traffic)
4. Audience is 88% Colombian — matches target
5. Stable at ~20 visits/week with no sustained growth yet. Normal for a 1st-year doctoral student's academic profile (5 weeks old). Growth expected with new publications and indexable content
6. `/skills` and `/awards` were merged into `/more` on 2026-10-17; historical hits stay under the old paths (not summed into `/more`)

## SEO (implemented 2026-10-09)

- [x] Per-page meta descriptions and OG metadata for all subpages
- [x] Shared helper `src/lib/seo.ts` (2026-10-17): `pageMetadata({ title, description, path })` + `baseOpenGraph`. A page-level `openGraph` replaces the root one entirely, so subpages must spread `baseOpenGraph` (type, siteName, locale + `es_CO` alternate, image). Root `twitter` sets only the card, so Next fills twitter title/description from each page
- [x] Home title "Mateo Belalcazar — Psychometrics & Computational Psychology"; site description aligned with the bio (measurement, psychometrics, computational methods)
- [x] OG image regenerated 2026-10-17 (old one had a blank white square): photo in a circle, name, "Psychology · Psychometrics · Computational Methods". Made with Pillow + Georgia from `public/photo.jpg`
- [x] Canonical URLs on all pages
- [x] JSON-LD: WebSite (layout), Person (home, 6 sameAs profiles), ScholarlyArticle (publications, 4 articles). Linked by `@id` (`/#person`, `/#website`): Person has `alternateName` (published name variants with tilde/second surname), ORCID `identifier`, `worksFor` Univalle + Javeriana Cali, `memberOf` from `groups.ts`; Mateo's author entry in each ScholarlyArticle points to `/#person`
- [x] Internal linking: Explore section on home (2 × 2 grid), footer nav + profile links
- [x] Sitemap dates dynamic (`new Date()` at build time)
- [x] Alt text on all images, header avatar width/height for CLS
- [x] Google Search Console verification in place
- [x] Google Search Console (2026-11-22). Property `https://mateob6.github.io/` (URL prefix), verified by the Univalle account (mateo.belalcazar@correounivalle.edu.co, HTML file in `public/`); the personal Gmail (mateo.belalcazar6@gmail.com, «personal1») was added as owner the same day. State found: only the home was indexed and **no sitemap had ever been submitted** (18 web clicks Aug–Nov). Done: `sitemap.xml` submitted (first status «No se ha podido obtener», usual for a few hours; the file is valid XML, 200, `application/xml`) and indexing requested for `/materials` and `/materials/estadistica`. **Next check**: Sitemaps should show «Correcto» with 6 pages discovered, and Páginas should show more than 1 indexed. Request indexing for each new course page when it gets classes
- [x] Lighthouse 2026-11-22 (the PageSpeed API without a key hit its daily quota, so `npx lighthouse@12` locally against the live site): desktop 99–100 performance on home, Materials and Publications; mobile 83–100 (home 96–97 on repeat runs; a first run at 52 was noise). Fixed: mobile nav labels had 2.9:1 contrast (`opacity-60` removed), DOI links were `text-accent/70` and relied on color only (now full accent + underline), «More» was generic link text (renamed «Recognition»)
- [ ] Evaluate blog/notes section for indexable content (deferred)
- [ ] Hreflang (deferred — requires i18n routing restructure)

## Pending

- **Teaching on phones**: the course table is wider than the screen and the Period column is cut off (seen 2026-11-22, it predates the curved panel); the diagram is also very small at 390 px
- **Materials**:
  - **Intellectual property**: check Univalle and Javeriana rules on class material (Mateo). The first Zenodo record was published before this check
  - **Posters and congress talks** could get one DOI each on Zenodo (linked to the paper via `isSupplementTo`), with a «Slides» link on the matching entry in `/publications`
  - Filter before any DOI (permanent): no unpublished results, co-authors agree, no identifiable participant data, own or free figures, linked spreadsheets only as empty templates. Never Cancillería, consultorías, Univalle Contigo, Tenorio. No exams, solutions or rubrics in use
  - Later: a short looping video of each class on hover
- `publications.ts` includes `quartile` field (Q1/Q3) — not displayed on site, available for future use
- Published name forms (APA): Current Psychology and TCN "Belalcázar, M."; Frontiers and CES "Belalcázar Correa, M."; chapter "Belalcazar, M."
- Teaching data source of truth: `cv/fuentes/academico.tex`. Sync when CV updates.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
