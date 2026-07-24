# Multilingual Futuristic Portfolio Template

A production-oriented portfolio template based on the architecture of
[gabrielhumbertdev.com](https://gabrielhumbertdev.com). It combines a modern
futuristic interface, three languages, a structured professional profile,
project and experience pages, downloadable assets, and a Sanity content
management studio.

The repository serves two purposes:

1. A reusable starter for another professional portfolio.
2. A documented case study showing how the original website was planned,
   built, connected to a CMS, given a custom domain, and published.

## Included capabilities

- English, Spanish, and Brazilian Portuguese routes.
- Responsive home, experience, projects, and learning pages.
- Futuristic visual system using CSS, motion, grids, glow, and 3D-style forms.
- Accessible navigation and language switching.
- Sanity Studio schemas for profile, projects, experience, credentials, and
  courses.
- Image, certificate, evidence, and CV upload fields.
- Local content fallback when Sanity is not configured.
- Cloudflare Workers-compatible production output through Vinext.
- Open Graph and social-sharing metadata.
- Build, lint, and rendered HTML checks.

## Technology

| Layer | Technology |
|---|---|
| Interface | React, Next.js App Router, TypeScript, CSS |
| Build/runtime | Vinext, Vite, Cloudflare Workers |
| Content management | Sanity Studio and Content Lake |
| Hosting | OpenAI Sites-compatible Cloudflare deployment |
| Domain and DNS | Cloudflare |
| Source control | Git and GitHub |

## Quick start

Requirements:

- Node.js 22.13 or later
- npm
- A Sanity account only if you want the CMS

```bash
npm install
npm run dev
```

Then open the local address printed by the development server.

Production validation:

```bash
npm run lint
npm run build
```

## Add your identity and content

The bundled content is a public example from the original portfolio. Replace it
before presenting the project as your own:

1. Edit `lib/content.ts` for the three fallback languages.
2. Update the fallback profile, email, CV path, LinkedIn, and GitHub links in
   `components/Portfolio.tsx`.
3. Update metadata fallbacks in `app/layout.tsx`.
4. Add `public/cv.pdf` and `public/og.png`.
5. Replace the favicon if required.

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for the complete checklist.

## Connect Sanity Studio

Create a Sanity project with a public dataset named `production`, then create
the following ignored files:

Root `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

`studio/.env.local`:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Install and run the editor:

```bash
npm run studio:install
npm run studio:dev
```

The website continues using bundled content when Sanity is not connected or
temporarily unavailable.

## Repository safety

This template deliberately excludes:

- Live hosting project IDs.
- Sanity authentication tokens.
- Local environment files.
- The original downloadable CV.
- Browser login data.
- Deployment credentials and logs.

Only publish information that is already intended for your public portfolio.
Never upload internal employer records, private HR data, passwords, credential
numbers, or identity documents.

## Project documentation

- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) — goals, scope, decisions, and
  delivery stages.
- [ARCHITECTURE.md](ARCHITECTURE.md) — routes, content flow, and hosting model.
- [CUSTOMIZATION.md](CUSTOMIZATION.md) — how to create another portfolio.
- [ROADMAP.md](ROADMAP.md) — completed work and contemplated enhancements.
- [SECURITY.md](SECURITY.md) — publication and secret-handling rules.

## License

Released under the [MIT License](LICENSE). Personal biographies, CVs,
certificates, trademarks, and third-party materials remain the property of
their respective owners and are not granted for reuse merely because the code
is available.
