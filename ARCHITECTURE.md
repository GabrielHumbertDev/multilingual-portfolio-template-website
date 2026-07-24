# Architecture

## System view

```text
Visitor
  |
  v
Custom domain and DNS (Cloudflare)
  |
  v
Portfolio application (React + Next.js + Vinext)
  |                         |
  |                         +--> Bundled multilingual fallback content
  |
  +--> Public read queries to Sanity Content Lake

Portfolio owner
  |
  v
Authenticated Sanity Studio
  |
  +--> Publish profile, projects, experience, credentials, courses, and assets
```

## Routes

Each locale uses the same information architecture:

```text
/{locale}
/{locale}/experience
/{locale}/projects
/{locale}/credentials
```

Supported locale keys:

- `en`
- `es`
- `pt-br`

The root route redirects to English by default.

## Application structure

| Path | Responsibility |
|---|---|
| `app/` | Routes, metadata, global styles, and redirect behavior |
| `components/Portfolio.tsx` | Shared responsive page components |
| `lib/content.ts` | Typed multilingual fallback content |
| `lib/sanity.ts` | GROQ query and CMS-to-interface mapping |
| `studio/` | Sanity Studio configuration and schemas |
| `worker/` | Cloudflare-compatible Worker entry point |
| `build/` | Sites/Vite build integration |
| `tests/` | Rendered output checks |

## CMS content model

### Profile

- Display name
- Translated headline, introduction, and location
- Email, LinkedIn, and GitHub
- Portrait
- Current CV

### Project

- Translated title, category, and summary
- Technology stack
- Repository and live URLs
- Cover image
- Order and visibility

### Experience

- Translated role, organisation, dates, summary, and highlights
- Order and visibility

### Credential

- Official title and provider
- Translated status and focus
- Issue and expiry dates
- Verification URL
- Certificate image and PDF
- Order and visibility

### Course

- Title and provider
- Planned, in-progress, or completed stage
- Translated description
- Progress percentage
- Public URL and evidence file
- Order and visibility

## Content resolution

For a requested language, the CMS query:

1. Selects the matching translated field.
2. Falls back to English when that translation is empty.
3. Returns only records marked visible.
4. Orders records by their numeric display order.
5. Falls back to bundled website content when no CMS collection is available.

## Security boundary

The public website requires no write token. It reads a dataset containing only
information intended for publication. Editing requires a Sanity account with
project membership. Secrets live in ignored local files or the hosting
platform’s environment configuration—not in source control.

## Deployment model

The build produces an ESM Worker-compatible bundle in `dist/`. A saved
deployment version is produced from a specific Git commit and then released to
production. Cloudflare DNS maps the custom domain to that hosted deployment;
the website does not run from the developer’s computer.
