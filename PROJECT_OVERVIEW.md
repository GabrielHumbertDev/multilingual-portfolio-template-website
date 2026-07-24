# Project Overview

## Purpose

The project creates a professional portfolio that can grow with a career rather
than behaving like a static online CV. It presents professional identity,
capabilities, experience, projects, education, courses, and certifications in
three languages while giving the owner a non-technical editing interface.

## Original objectives

- Introduce the portfolio owner and communicate a clear professional position.
- Present capabilities across enterprise systems, software, data, security,
  and responsible AI.
- Publish verified GitHub projects and a current CV.
- Upload and manage certifications and courses.
- Support English, Spanish, and Brazilian Portuguese.
- Use a modern, futuristic, responsive visual language.
- Keep the website online independently of the owner’s computer.
- Use a custom domain with HTTPS.
- Allow content changes without editing source code.

## Delivered scope

### Public experience

- Four public routes per language: home, experience, projects, and learning.
- Responsive desktop and mobile navigation.
- Language switching that preserves the current page.
- Futuristic interface with layered grids, ambient lighting, scan lines,
  orbital motion, and 3D-style CSS geometry.
- Public LinkedIn, GitHub, email, and CV actions.
- Search and social-sharing metadata.

### Content management

- Authenticated Sanity Studio.
- A singleton profile and site-settings document.
- Multilingual experience and project fields.
- Credentials with verification links, images, and PDF uploads.
- Courses with stage, progress, description, evidence, and public links.
- Publish/unpublish controls and explicit display ordering.
- Local content fallback for resilience.

### Infrastructure

- Cloudflare Workers-compatible application output.
- Managed production deployment through Sites.
- Custom domain and `www` hostname through Cloudflare DNS.
- Automatic HTTPS certificate management.
- Git-based source history and versioned releases.

## Key decisions

### Sanity instead of editing JSON manually

The portfolio owner can update content through forms and upload assets without
learning Git or TypeScript. The website performs public, read-only queries;
Studio writes remain protected by Sanity authentication.

### Bundled fallback content

The application remains usable before CMS setup and during temporary external
API problems. Published CMS collections replace the corresponding fallback
collections only when records exist.

### CSS-driven futuristic visuals

The design relies primarily on layout, typography, CSS geometry, glow, and
motion. This keeps the interface responsive and avoids a large 3D runtime for
decorative elements.

### Separate responsibilities

- Sanity manages public content.
- The hosting platform runs the application.
- Cloudflare controls the domain and DNS.
- GitHub stores the reusable source project.
- Codex supports structural, design, and deployment changes.

## Delivery stages

1. Content discovery from the CV and professional profiles.
2. Information architecture and multilingual route planning.
3. Visual system and responsive interface implementation.
4. Public deployment and access configuration.
5. Custom domain and HTTPS activation.
6. CMS schema design, content import, and Studio deployment.
7. Production CMS connection and validation.
8. Reusable template and project documentation.

## Definition of success

The project is successful when:

- Visitors can open the website without authentication.
- The website works when the owner’s computer is switched off.
- All three languages are reachable.
- CMS edits can be published without source-code changes.
- Certificates, courses, links, and CV assets can be maintained safely.
- No secrets or private employer information are committed or published.
