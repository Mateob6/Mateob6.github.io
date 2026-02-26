# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page academic profile website for Mateo Belalcazar (doctoral researcher in Psychology, Universidad del Valle). Deployed via GitHub Pages at **mateob6.github.io**. No build tools, no JavaScript, no external dependencies beyond Google Fonts.

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
- Content is in English; publication/presentation titles stay in their original language (Spanish).
- Name is spelled **Belalcazar** (no tilde) across the site.
