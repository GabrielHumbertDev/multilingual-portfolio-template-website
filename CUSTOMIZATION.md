# Customization Guide

## 1. Create your copy

Use GitHub’s **Use this template** button, clone the new repository, and install
dependencies:

```bash
npm install
```

## 2. Replace the example identity

Search the repository for:

```text
Gabriel Gomes
gabrielhumbert
GabrielHumbertDev
```

Replace those example values with your own public information.

Primary files:

- `lib/content.ts`
- `components/Portfolio.tsx`
- `app/layout.tsx`
- `README.md`

## 3. Edit all three languages

Every fallback content section has:

- English: `en`
- Spanish: `es`
- Brazilian Portuguese: `pt-br`

Keep the same array order across languages so projects, experience, and
credentials correspond correctly.

## 4. Add public assets

Create:

- `public/cv.pdf`
- `public/og.png`

Recommended social card size: 1536×1024.

Do not add private documents merely to make a button work. It is safer to remove
the button until a publication-safe PDF is ready.

## 5. Run locally

```bash
npm run dev
```

Check:

- All navigation links
- All three languages
- Mobile menu
- CV download
- LinkedIn and GitHub destinations
- Long translated text on small screens

## 6. Connect Sanity

1. Create a Sanity project.
2. Create a public dataset named `production`.
3. Copy `.env.example` to `.env.local`.
4. Copy `studio/.env.example` to `studio/.env.local`.
5. Insert your project ID in both files.
6. Run:

```bash
npm run studio:install
npm run studio:dev
```

Publish a profile document first. Add projects, experience, credentials, and
courses gradually. Only enable **Visible on website** for finished records.

The included seed generator converts `lib/content.ts` into importable Sanity
documents:

```bash
node scripts/generate-sanity-seed.mjs
```

Review the resulting data before importing it into your own dataset.

## 7. Validate

```bash
npm run lint
npm run build
```

Fix errors before deployment. Test the deployed domain again after changing
hosting environment values.

## 8. Publish and connect a domain

Deploy the application using a Cloudflare Workers-compatible platform or OpenAI
Sites. Add the exact DNS records returned by that hosting platform to your DNS
provider. Do not copy another project’s IP, validation, or CNAME values.

Keep the apex domain and `www` behavior consistent. Verify:

- Public access
- HTTPS
- Root redirect
- `/en`, `/es`, and `/pt-br`
- CMS content updates

## 9. Ongoing management

Use Sanity for content changes. Use source code for:

- Layout and styling changes
- New page types
- New interactions
- Schema changes
- Hosting configuration

Renew the domain annually and review public links, CV content, and certificates
regularly.
