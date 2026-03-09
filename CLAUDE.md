# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page academic profile website for Mateo Belalcazar (doctoral researcher in Psychology, Universidad del Valle). Deployed via GitHub Pages at **mateob6.github.io**. Minimalist design inspired by gautam-rao.com. No build tools, minimal JavaScript (language toggle only), no external dependencies (system fonts only).

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

- `index.html` — Single-page profile with all content (about, interests, publications, presentations, teaching, awards, groups, education, skills)
- `lang.js` — Shared language toggle script (EN/ES switcher with flag icons)
- `google5845fe3ac49f41f4.html` — Google Search Console verification file
- `photo.jpg` — Profile photo displayed in left column
- `teaching.html`, `publications.html`, `presentations.html`, `awards.html`, `groups.html` — Legacy subpages (no longer linked from index)

## Architecture

- Single-page layout with inline `<style>` block (no external CSS files).
- **Fonts**: System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`). No Google Fonts.
- **CSS custom properties** on `:root`: `--bg`, `--ink`, `--muted`, `--accent`, `--accent-hover`, `--link`, `--link-hover`, `--rule`, `--green`, `--section-bg`.
- **Color palette**: Coffee-based — cream background (`#faf8f5`), dark coffee text (`#2c2218`), coffee accents (`#6b4c30`), blue links (`#2a6496`), green for Minciencias ranks (`#4a7c59`).
- **Layout**: Centered two-column flex layout (`.layout`, `max-width: 1050px`). Left column (`.left`, 280px, sticky) + right column (`.right`, fluid). Responsive breakpoint at `780px` collapses to single column.
- **No animations**: Clean, static minimalist design.
- **SEO**: `index.html` includes meta description, author, keywords, and canonical URL (`https://mateob6.github.io`). Google Search Console verified via `google5845fe3ac49f41f4.html`.

## Page Layout

### Left column (sticky)
Name → Subtitle → Navigation anchors → Photo → Email → Profile links (Scholar, ORCID, ResearchGate, GitHub, OSF, Semantic Scholar).

### Right column (scrolls)
About → Research Interests → Publications (Articles + Book Chapters) → Selected Presentations → Teaching (3 universities) → Awards & Grants → Research Groups → Education → Skills → Footer.

## Patterns

- **Two-column layout**: `.layout` is a centered flex container. `.left` is sticky (`top: 2.5rem`), `.right` is fluid. On mobile, stacks vertically.
- **Section headings** (`h2`): Bold text with `border-bottom: 2px solid var(--accent)` for visual contrast.
- **Sub-headings** (`h3`): Coffee-colored (`var(--accent)`), used for Articles/Book Chapters within Publications.
- **Navigation**: Anchor links in `.left nav`, styled in blue (`var(--link)`), one per line.
- **Publication entries**: `.pub` with `.title` (linked in blue when DOI available) + `.meta` (muted authors/journal).
- **Presentation entries**: `.pres` with title text + `.location` (muted venue/year).
- **Teaching blocks**: `.uni` with `.uni-name`, `.uni-period`, `.level-label` (uppercase), `.course-list` (unstyled `<ul>`).
- **Awards/Groups/Education**: Simple `.award`, `.group`, `.edu-item` blocks with title + detail pattern.
- **Horizontal rules** (`<hr>`): Thin coffee-colored lines (`var(--rule)`) separating sections.
- Content is bilingual (EN/ES); publication/presentation titles stay in their original language (Spanish).
- Name is spelled **Belalcazar** (no tilde) across the site.

## Bilingual Support (EN/ES)

- Toggle button (fixed top-right, small rectangle) switches between English and Spanish.
- Translatable text uses dual `<span class="en">` / `<span class="es">` inline elements. Block content uses `<p class="en">` / `<p class="es">`.
- CSS rules `html[lang="es"] .en { display: none }` / `html[lang="en"] .es { display: none }` control visibility.
- Language preference saved in `localStorage` under key `lang` (default: `es`).
- Inline `<script>` in `<head>` sets `html[lang]` before first paint (no flash of wrong language).
- `lang.js` (loaded with `defer`) injects the toggle button and handles title switching via `data-title-en` / `data-title-es` attributes on `<html>`.
- **Not translated** (stays in original language): publication titles, presentation titles, course names, research group names, university names, technical skills (Python, R), profile names (ORCID, GitHub), author names, journal names.

## Planned: Course Materials Page (`cursos.html`)

**Status**: Not yet implemented. Pending course details from user.

**Goal**: Let students access course presentations directly from the personal site.

**Design decisions**:
- Single dedicated page `cursos.html` (all courses in one page, organized by sections).
- Should follow the minimalist two-column style of the current index.
- Presentations hosted externally (Gamma links for online viewing, Google Drive/OneDrive links for PPTX download). No large files in the repo.
- Each presentation rendered with: topic name + "Ver en Gamma" link + "Descargar PPTX" link.
- Public access, no restrictions.
- Add a nav link in the left column of `index.html` pointing to `cursos.html`.

**Pending info before implementation**:
1. Number of courses and their names.
2. Organization preference: by weeks (Semana 1, 2…) or by topic name.
3. Gamma links and PPTX download URLs for each presentation.
