# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page academic profile website for Mateo Belalcazar (doctoral researcher in Psychology, Universidad del Valle). Deployed via GitHub Pages at **mateob6.github.io**. No build tools, minimal JavaScript (language toggle only), no external dependencies beyond Google Fonts.

## Development

Open `index.html` directly in a browser or use any local server:

```bash
python3 -m http.server 8000
```

No build step, no package manager, no tests.

## Deployment

```bash
git add <files> && git commit -m "message" && git push
```

Pushes to `main` branch on `https://github.com/Mateob6/Mateob6.github.io.git`. GitHub Pages serves automatically.

## File Structure

- `index.html` — Main profile page (hero, about, skills, education, profiles, affiliation, research interests, publications highlights, and CTA links to subpages)
- `teaching.html` — Teaching experience across 3 universities (PUJ, UV, USB)
- `publications.html` — Full list of publications (articles & book chapters)
- `presentations.html` — Selected conference presentations
- `awards.html` — Awards & grants
- `groups.html` — Research groups (Minciencias ranked)
- `lang.js` — Shared language toggle script (EN/ES switcher)
- `photo.jpg` — Profile photo used in hero section

## Architecture

- All pages use inline `<style>` blocks (no external CSS files).
- **Fonts**: Outfit (UI/sans-serif) and Source Serif 4 (body text in About section) loaded from Google Fonts.
- **CSS custom properties** on `:root`: `--bg`, `--bg-card`, `--ink`, `--muted`, `--accent`, `--accent-light`, `--accent-glow`, `--warm`, `--warm-light`, `--rule`, `--shadow`, `--shadow-hover`.
- **Layout**: `.page` container with `max-width: 820px`, responsive breakpoint at `700px`.
- **Animations**: `fadeUp` keyframe applied with staggered delays on sections.

## Index Page Order

Hero → About → Skills bar → Education | Profiles (dual-row) → Institutional Affiliation → Research Interests → Publications (1st & 3rd highlighted + CTA) → Presentations CTA → Teaching CTA → Awards CTA → Research Groups CTA → Footer.

## Patterns

- **Subpages** (teaching, publications, presentations, awards, groups) follow the same template: back link, page title, page subtitle, content cards, footer with back link.
- **CTA cards** on index use `.teaching-cta` class to link to subpages (card with icon, title, subtitle, arrow).
- **Horizontal bars** (`.skills-bar`, `.affiliation-bar`) are flex containers with label `<h2>` + inline items.
- **Dual-row**: CSS grid `1fr 1px 1fr` with `.dual-divider` between columns; collapses to single column on mobile.
- **Publication cards**: `.pub-card` / `.pub-card-header` / `.pub-title` / `.pub-type` / `.pub-meta`. Chapter variant uses `.pub-type--chapter`.
- **Skill pills**: `.skill-pill` (dark bg) and `.skill-pill--outline` (border only) for broad competencies.
- **Badges** in hero: `.badge--green` (accent) and `.badge--warm` (warm tone), both with hover states.
- Content is bilingual (EN/ES); publication/presentation titles stay in their original language (Spanish).
- Name is spelled **Belalcazar** (no tilde) across the site.

## Bilingual Support (EN/ES)

- Toggle button (fixed top-right, circular) switches between English and Spanish.
- Translatable text uses dual `<span class="en">` / `<span class="es">` inline elements. Block content uses `<p class="en">` / `<p class="es">`.
- CSS rules `html[lang="es"] .en { display: none }` / `html[lang="en"] .es { display: none }` control visibility (in each page's inline `<style>`).
- Language preference saved in `localStorage` under key `lang` (default: `en`).
- Inline `<script>` in each page's `<head>` sets `html[lang]` before first paint (no flash of wrong language).
- `lang.js` (loaded with `defer`) injects the toggle button and handles title switching via `data-title-en` / `data-title-es` attributes on `<html>`.
- **Not translated** (stays in original language): publication titles, presentation titles, course names, research group names, university names, professional titles ("Profesor hora cátedra"), technical skills (Python, R), profile names (ORCID, GitHub), badges (CIDEAS, AI, A1, A), author names, journal names.

## Planned: Course Materials Page (`cursos.html`)

**Status**: Not yet implemented. Pending course details from user.

**Goal**: Let students access course presentations directly from the personal site.

**Design decisions**:
- Single dedicated page `cursos.html` (Option A — all courses in one page, organized by sections).
- Follows the standard subpage template: back link, page title, subtitle, content cards, footer.
- Presentations hosted externally (Gamma links for online viewing, Google Drive/OneDrive links for PPTX download). No large files in the repo.
- Each presentation rendered as a card with: topic name + "Ver en Gamma" button + "Descargar PPTX" button.
- Public access, no restrictions.
- Add a CTA card in `index.html` linking to `cursos.html` (same `.teaching-cta` pattern).

**Pending info before implementation**:
1. Number of courses and their names.
2. Organization preference: by weeks (Semana 1, 2…) or by topic name.
3. Gamma links and PPTX download URLs for each presentation.
