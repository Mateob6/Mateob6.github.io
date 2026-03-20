# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page academic profile website for Mateo Belalcazar (doctoral researcher in Psychology, Universidad del Valle). Deployed via GitHub Pages at **mateob6.github.io**. Design concept: **"The Digital Curator"** — refined editorial aesthetic combining scholarly depth with modern digital sensibility. Uses Tailwind CSS (CDN), Google Fonts, and Material Symbols.

## Development

Open `index.html` directly in a browser or use any local server:

```bash
python3 -m http.server 8000
```

No build step, no package manager, no tests. Tailwind CSS loads via CDN (`cdn.tailwindcss.com`).

## Deployment

```bash
git add <files> && git commit -m "message" && git push
```

Pushes to `main` branch on `https://github.com/Mateob6/Mateob6.github.io.git`. GitHub Pages serves automatically.

## File Structure

- `index.html` — Single-page profile with all content (about, interests, publications, presentations, teaching, awards, groups, education, skills)
- `lang.js` — Language toggle script (EN/ES switcher with flag icons), injected into the TopAppBar header
- `google5845fe3ac49f41f4.html` — Google Search Console verification file
- `photo.jpg` — Profile photo (displayed in hero section and TopAppBar)
- `publications.html`, `presentations.html`, `teaching.html`, `awards.html`, `groups.html` — Standalone subpages using the same Digital Curator design system (TopAppBar, BottomNavBar, alternating card pattern, bilingual support)

## Architecture

- Single-page layout styled with **Tailwind CSS** via CDN play script. Custom colors defined in `tailwind.config`.
- **Fonts**: Google Fonts — `Noto Serif` (headings, serif), `Inter` (body/labels, sans-serif). Loaded via `<link>`.
- **Icons**: Material Symbols Outlined (weight 300) via Google Fonts CDN.
- **Color palette** (Tailwind custom colors):
  - `surface-container-low` (#fff1e7) — warm card backgrounds
  - `primary` (#004c7c) — Deep Blue, headings and accents
  - `background` / `surface` (#fff8f4) — warm page surface
  - `on-surface` (#231a10) — primary text
  - `on-surface-variant` (#41474f) — secondary text
  - `tertiary` (#534738) — nav links, muted elements
  - `outline` (#727780) — metadata
  - `outline-variant` (#c1c7d0) — subtle borders
  - `secondary-container` (#fed2ad) — warm accent badges
  - `green-rank` (#4a7c59) — Minciencias group rankings
- **Layout**: Single centered column (`max-w-3xl`, ~48rem). TopAppBar (fixed, glass blur). BottomNavBar (mobile only, hidden on `min-width: 769px`).
- **SEO**: meta description, author, keywords, canonical URL (`https://mateob6.github.io`). Google Search Console verified.

## Page Layout

### TopAppBar (fixed)
Name (italic, primary blue) → Desktop nav links → Language toggle (injected by lang.js) → Profile photo thumbnail.

### Content (scrolls)
Hero (centered photo, name, decorative blue line, profile links) → 01 About → 02 Research Interests → 03 Publications (Articles + Book Chapters) → 04 Selected Presentations → 05 Teaching (3 universities) → 06 Awards & Grants → 07 Research Groups → 08 Education → 09 Skills → Footer.

### BottomNavBar (mobile only)
5 anchor links: About, Pubs, Teach (highlighted with `bg-secondary-container/30`), Awards, Edu.

## Patterns

- **Section headings**: `font-headline text-2xl md:text-3xl font-bold` with numbered prefix (`01`–`09`) in `text-outline-variant/30`.
- **About block**: `bg-surface-container-low p-6 md:p-8` with decorative `bg-secondary-container/20` circle.
- **Interest cards**: Grid of `bg-surface-container-low p-5 border border-outline-variant/5` with Material Symbol icons in `text-primary`.
- **Publication entries**: White cards (`bg-white p-5 border border-outline-variant/10`). Type badge (`bg-secondary-container/40` for articles, `bg-surface-container/60` for chapters). Title in `font-headline text-sm font-bold`. DOI links where available.
- **Presentation entries**: `border-l-2 border-primary/20 pl-5` with hover darkening.
- **Teaching blocks**: White cards per university with `account_balance` icon. Level labels (UNDERGRADUATE/PREGRADO) in `text-[10px] uppercase tracking-[0.15em] text-primary font-semibold`.
- **Awards**: `bg-surface-container-low p-4 border border-outline-variant/5` with Material Symbol icons.
- **Groups**: White cards with Minciencias rank badges (`bg-green-rank/10 text-green-rank`).
- **Education**: `border-l-2 border-primary/30 pl-5` entries.
- **Skills**: Tags in `bg-surface-container-low border border-outline-variant/10`.
- Content is bilingual (EN/ES); publication/presentation titles stay in their original language (Spanish).
- Name is spelled **Belalcazar** (no tilde) across the site.

## Subpages

The standalone subpages (`publications.html`, `teaching.html`, `presentations.html`, `awards.html`, `groups.html`) use the Digital Curator design system with:
- Same Tailwind config, fonts, and Material Symbols as `index.html`
- TopAppBar with nav links (current page highlighted with `font-semibold border-b-2 border-deep-blue`)
- BottomNavBar for mobile
- Hero header with `border-l-4 border-primary pl-8` accent and uppercase category label
- Alternating highlighted/plain card pattern:
  - **Highlighted**: `bg-soft-blue` (#f0f7ff) + `border-l-4 border-deep-blue shadow-sm`
  - **Plain**: padding only, no background, sits on warm surface
- Bilingual EN/ES support via same `lang.js`

## Bilingual Support (EN/ES)

- Toggle button injected by `lang.js` into the TopAppBar header (before the nav links).
- Translatable text uses dual `<span class="en">` / `<span class="es">` inline elements. Block content uses `<p class="en">` / `<p class="es">`.
- CSS rules `html[lang="es"] .en { display: none !important }` / `html[lang="en"] .es { display: none !important }` control visibility.
- Language preference saved in `localStorage` under key `lang` (default: `es`).
- Inline `<script>` in `<head>` sets `html[lang]` before first paint (no flash of wrong language).
- `lang.js` (loaded with `defer`) injects the toggle button and handles title switching via `data-title-en` / `data-title-es` attributes on `<html>`.
- **Not translated** (stays in original language): publication titles, presentation titles, course names, research group names, university names, technical skills (Python, R), profile names (ORCID, GitHub), author names, journal names.

## Planned: Course Materials Page (`cursos.html`)

**Status**: Not yet implemented. Pending course details from user.

**Goal**: Let students access course presentations directly from the personal site.

**Design decisions**:
- Single dedicated page `cursos.html` (all courses in one page, organized by sections).
- Should follow "The Digital Curator" design system consistent with the subpages.
- Presentations hosted externally (Gamma links for online viewing, Google Drive/OneDrive links for PPTX download). No large files in the repo.
- Each presentation rendered with: topic name + "Ver en Gamma" link + "Descargar PPTX" link.
- Public access, no restrictions.
- Add a nav link in the TopAppBar and BottomNavBar pointing to `cursos.html`.

**Pending info before implementation**:
1. Number of courses and their names.
2. Organization preference: by weeks (Semana 1, 2…) or by topic name.
3. Gamma links and PPTX download URLs for each presentation.
