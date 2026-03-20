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
- `teaching.html`, `publications.html`, `presentations.html`, `awards.html`, `groups.html` — Legacy subpages (no longer linked from index)

## Architecture

- Single-page layout styled with **Tailwind CSS** via CDN play script. Custom colors defined in `tailwind.config`.
- **Fonts**: Google Fonts — `Noto Serif` (headings, serif), `Inter` (body/labels, sans-serif). Loaded via `<link>`.
- **Icons**: Material Symbols Outlined (weight 300) via Google Fonts CDN.
- **Color palette** (Tailwind custom colors):
  - `soft-blue` (#f0f7ff) — highlight background for alternating cards
  - `deep-blue` / `primary` (#004c7c) — headings, accents, border-left markers
  - `background` / `surface` (#fff8f4) — warm page surface
  - `on-surface` (#231a10) — primary text
  - `tertiary` (#534738) — secondary text, nav links
  - `outline` (#727780) — muted metadata
  - `green-rank` (#4a7c59) — Minciencias group rankings
- **Layout**: Single centered column (`max-w-3xl`, ~48rem). TopAppBar (fixed, glass blur). BottomNavBar (mobile only, hidden on `min-width: 769px`).
- **SEO**: meta description, author, keywords, canonical URL (`https://mateob6.github.io`). Google Search Console verified.

## Visual Contrast System

The site uses an **alternating card highlight** pattern for visual separation — NOT horizontal rules or section background bands.

### How it works:
- **Highlighted items**: `bg-soft-blue p-6 border-l-4 border-deep-blue shadow-sm` — the blue field wraps the element, creating territory.
- **Plain items**: padding only, no background — sit directly on the warm surface (#fff8f4).
- Items alternate between highlighted and plain within each section, creating rhythm.
- In highlighted cards: titles use `text-deep-blue`. In plain cards: titles use `text-on-surface`.
- Tags/badges: `bg-soft-blue text-deep-blue border border-deep-blue/10`.

### Design principles:
- **"Paper-on-Paper"**: Avoid harsh shadows. Use tonal shifts (warm surface vs soft-blue field) to create depth.
- Blue does not divide — it **envelopes** certain elements as a territorial marker.
- No `<hr>` elements. No explicit border lines between sections. Contrast comes from presence/absence of the blue field.
- Section numbers (`01`–`09`) in `text-deep-blue/25` provide subtle structural anchoring.

## Page Layout

### TopAppBar (fixed)
Name (italic, deep-blue) → Desktop nav links → Language toggle (injected by lang.js) → Profile photo thumbnail.

### Content (scrolls)
Hero (centered photo, name, tagline, profile links) → 01 About → 02 Research Interests → 03 Publications (Articles + Book Chapters) → 04 Selected Presentations → 05 Teaching (3 universities) → 06 Awards & Grants → 07 Research Groups → 08 Education → 09 Skills → Footer.

### BottomNavBar (mobile only)
5 anchor links: About, Pubs, Teach (highlighted), Awards, Edu.

## Patterns

- **Section headings**: `font-headline text-2xl md:text-3xl font-bold` with a numbered prefix (`01`–`09`) in faded deep-blue.
- **Publication entries**: Alternating highlighted/plain cards. Highlighted cards include type badge (Article/Chapter), title, authors, journal, and DOI link with arrow icon. Plain cards use `bg-soft-blue` badge inline.
- **Presentation entries**: Alternating highlighted/plain. Title + venue/year metadata.
- **Teaching blocks**: Alternating highlighted/plain per university. University name as `font-headline font-bold`, with Pregrado/Posgrado sublabels in uppercase tracking.
- **Awards**: Alternating highlighted/plain with Material Symbol icons.
- **Groups**: Highlighted/plain with Minciencias rank badges (`bg-green-rank/10 text-green-rank`).
- **Education**: Alternating highlighted/plain with degree + institution.
- **Skills**: Tags in `bg-soft-blue text-deep-blue` with subtle borders.
- Content is bilingual (EN/ES); publication/presentation titles stay in their original language (Spanish).
- Name is spelled **Belalcazar** (no tilde) across the site.

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
- Should follow "The Digital Curator" design system with the same alternating card highlight pattern.
- Presentations hosted externally (Gamma links for online viewing, Google Drive/OneDrive links for PPTX download). No large files in the repo.
- Each presentation rendered with: topic name + "Ver en Gamma" link + "Descargar PPTX" link.
- Public access, no restrictions.
- Add a nav link in the TopAppBar and BottomNavBar pointing to `cursos.html`.

**Pending info before implementation**:
1. Number of courses and their names.
2. Organization preference: by weeks (Semana 1, 2…) or by topic name.
3. Gamma links and PPTX download URLs for each presentation.
