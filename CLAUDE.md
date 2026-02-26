# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page academic profile website for Mateo Belalcázar (doctoral researcher in Psychology, Universidad del Valle). The entire site lives in a single `index.html` file with inline CSS — no build tools, no JavaScript, no external dependencies beyond Google Fonts.

## Development

Open `index.html` directly in a browser or use any local server:

```bash
python3 -m http.server 8000
```

No build step, no package manager, no tests.

## Architecture

- **Single file**: `index.html` contains all markup and styles (inline `<style>` block).
- **Fonts**: EB Garamond (body/serif) and DM Sans (UI/sans-serif) loaded from Google Fonts.
- **CSS custom properties** on `:root`: `--ink`, `--paper`, `--muted`, `--accent`, `--rule`, `--hover`. Use these for any color additions.
- **Layout**: `.page` container with `max-width: 640px`, responsive breakpoint at `600px`.
- **Sections**: About, Research Interests, Publications, Selected Presentations, Awards, Research Groups, Technical Skills, Education, Profiles, Contact.

## Conventions

- Section headings use `<h2>` styled via DM Sans uppercase with letter-spacing.
- Publications use `.pub` / `.pub-title` / `.pub-meta` / `.pub-type` class pattern.
- Education items use `.edu-item` / `.edu-degree` / `.edu-detail`.
- External links in Profiles section use `→` prefix via CSS `::before`.
- Several profile URLs contain placeholders (`YOUR_GOOGLE_SCHOLAR_URL`, etc.) that need real URLs.
- Content is in English; publication titles are in their original language (Spanish).
