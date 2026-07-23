# Gabriel Gomes — Professional Portfolio

A multilingual professional portfolio for Gabriel Gomes, focused on SAP
SuccessFactors, HRIS, enterprise systems, software engineering, cybersecurity,
data and responsible AI.

## Public website

The portfolio provides English, Spanish and Brazilian Portuguese versions:

- `/en`
- `/es`
- `/pt-br`

Each language includes home, experience, projects and continuous-learning
pages. The downloadable CV, LinkedIn profile and verified public GitHub
repositories are linked from the site.

## Local development

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
npm run build
```

## Content Management Studio

The `studio` directory contains the Sanity Studio configuration and schemas for:

- profile and public contact settings
- multilingual projects
- multilingual experience
- certifications and uploaded certificate files
- courses and learning progress
- portrait and CV uploads

Create a Sanity project, copy the project ID and dataset into the root and
Studio environment files, then run:

```bash
npm run studio:install
npm run studio:dev
```

Until a Sanity project is connected, the website uses its reviewed,
publication-safe bundled content. Once configured, published Studio records
replace the bundled project, experience and credential collections.

## Privacy

Only public professional information and verified personal repositories belong
on this site. Internal HR records, payroll data, employer screenshots, colleague
details, credential IDs and private system information must not be published.
