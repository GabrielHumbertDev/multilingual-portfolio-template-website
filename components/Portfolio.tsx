import Link from "next/link";
import type { Locale, PageKey } from "@/lib/content";
import { content } from "@/lib/content";
import type { CmsContent } from "@/lib/sanity";

const defaultProfile = {
  displayName: "Gabriel Gomes",
  email: "gabrielhumbert@outlook.com",
  linkedinUrl: "https://www.linkedin.com/in/gabrielghumbert/",
  githubUrl: "https://github.com/GabrielHumbertDev",
  cvUrl: "/Gabriel-Gomes-CV.pdf",
};

const pagePaths: Record<PageKey, string> = {
  home: "",
  experience: "/experience",
  projects: "/projects",
  credentials: "/credentials",
};

function localPath(locale: Locale, page: PageKey) {
  return `/${locale}${pagePaths[page]}`;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function BrandName({ displayName }: { displayName: string }) {
  const [firstName, ...remainingNames] = displayName.trim().split(/\s+/);
  return (
    <span>
      {firstName.toUpperCase()}{" "}
      <strong>{remainingNames.join(" ").toUpperCase()}</strong>
    </span>
  );
}

function Header({
  locale,
  page,
  cms,
}: {
  locale: Locale;
  page: PageKey;
  cms?: CmsContent | null;
}) {
  const t = content[locale];
  const navItems: PageKey[] = ["home", "experience", "projects", "credentials"];
  const profile = { ...defaultProfile, ...cms?.profile };

  return (
    <header className="site-header">
      <Link
        href={`/${locale}`}
        className="brand"
        aria-label={`${profile.displayName} home`}
      >
        <BrandMark />
        <BrandName displayName={profile.displayName} />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item}
            href={localPath(locale, item)}
            className={page === item ? "active" : ""}
          >
            {t.nav[item]}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <div className="language-switcher" aria-label="Language selector">
          {(["en", "es", "pt-br"] as Locale[]).map((lang) => (
            <Link
              key={lang}
              href={localPath(lang, page)}
              className={locale === lang ? "active" : ""}
              hrefLang={lang}
              lang={lang}
            >
              {lang === "pt-br" ? "PT" : lang.toUpperCase()}
            </Link>
          ))}
        </div>
        <a className="header-cv" href={profile.cvUrl} download>
          {t.nav.cv}
          <Arrow diagonal />
        </a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <div className="mobile-menu-panel">
            {navItems.map((item) => (
              <Link key={item} href={localPath(locale, item)}>
                {t.nav[item]}
              </Link>
            ))}
            <a href={`mailto:${profile.email}`}>{t.nav.contact}</a>
          </div>
        </details>
      </div>
    </header>
  );
}

function Footer({
  locale,
  cms,
}: {
  locale: Locale;
  cms?: CmsContent | null;
}) {
  const t = content[locale];
  const profile = { ...defaultProfile, ...cms?.profile };
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-orbit" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="footer-copy">
        <p className="eyebrow">{t.sections.contact.eyebrow}</p>
        <h2>{t.sections.contact.title}</h2>
        <p>{t.sections.contact.intro}</p>
        <a className="button button-primary" href={`mailto:${profile.email}`}>
          {t.sections.contact.action}
          <Arrow />
        </a>
      </div>
      <div className="footer-bottom">
        <div className="brand footer-brand">
          <BrandMark />
          <BrandName displayName={profile.displayName} />
        </div>
        <p>{t.footer}</p>
        <div className="social-links">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow diagonal />
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow diagonal />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Shell({
  locale,
  page,
  cms,
  children,
}: {
  locale: Locale;
  page: PageKey;
  cms?: CmsContent | null;
  children: React.ReactNode;
}) {
  return (
    <div className="site-frame" lang={locale}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header locale={locale} page={page} cms={cms} />
      <main>{children}</main>
      <Footer locale={locale} cms={cms} />
    </div>
  );
}

function HoloCore({ labels }: { labels: string[] }) {
  return (
    <div className="holo-scene" aria-hidden="true">
      <div className="scene-grid" />
      <div className="holo-ring ring-one" />
      <div className="holo-ring ring-two" />
      <div className="holo-ring ring-three" />
      <div className="holo-core">
        <span className="core-face face-one" />
        <span className="core-face face-two" />
        <span className="core-face face-three" />
        <span className="core-glow" />
      </div>
      {labels.map((label, index) => (
        <span
          className={`orbit-node node-${index + 1}`}
          key={label}
          style={{ "--node-index": index } as React.CSSProperties}
        >
          {label}
        </span>
      ))}
      <div className="scene-caption">
        <span>GG // SYSTEMS_01</span>
        <span>51.5072° N · 0.1276° W</span>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
    </div>
  );
}

function CapabilityGrid({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="content-section capabilities-section">
      <SectionHeading {...t.sections.capabilities} />
      <div className="capability-grid">
        {t.capabilities.map((capability) => (
          <article className="capability-card" key={capability.code}>
            <span className="card-code">{capability.code}</span>
            <div className="capability-icon" aria-hidden="true">
              <span />
              <span />
            </div>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
            <div className="tag-list">
              {capability.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  action,
  large = false,
}: {
  project: (typeof content)["en"]["projects"][number];
  action: string;
  large?: boolean;
}) {
  return (
    <article className={`project-card ${large ? "project-card-large" : ""}`}>
      <div className="project-visual" aria-hidden="true">
        <span className="project-number">{project.number}</span>
        <div className="project-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="window-content">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="visual-scanline" />
      </div>
      <div className="project-content">
        <p className="eyebrow">{project.kicker}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a href={project.href} target="_blank" rel="noreferrer">
          {action}
          <Arrow diagonal />
        </a>
      </div>
    </article>
  );
}

function Home({ locale, cms }: { locale: Locale; cms?: CmsContent | null }) {
  const base = content[locale];
  const t = {
    ...base,
    projects: cms?.projects?.length ? cms.projects : base.projects,
  };
  return (
    <Shell locale={locale} page="home" cms={cms}>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          {cms?.profile?.headline ? (
            <h1>{cms.profile.headline}</h1>
          ) : (
            <h1>
              {t.hero.titleStart} <em>{t.hero.titleAccent}</em>{" "}
              {t.hero.titleEnd}
            </h1>
          )}
          <p className="hero-intro">
            {cms?.profile?.introduction || t.hero.intro}
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/${locale}/projects`}>
              {t.hero.primary}
              <Arrow />
            </Link>
            <Link className="text-link" href={`/${locale}/experience`}>
              {t.hero.secondary}
              <Arrow />
            </Link>
          </div>
          <div className="availability">
            <span className="status-dot" />
            {t.hero.availability}
          </div>
        </div>
        <HoloCore labels={t.hero.orbitLabels} />
      </section>

      <section className="proof-strip" aria-label="Profile highlights">
        {t.proof.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <CapabilityGrid locale={locale} />

      <section className="content-section selected-projects">
        <SectionHeading {...t.sections.projects} />
        <div className="project-grid">
          {t.projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              action={t.common.viewProject}
              large={index === 0}
            />
          ))}
        </div>
        <Link className="section-cta" href={`/${locale}/projects`}>
          {t.sections.projects.all}
          <Arrow />
        </Link>
      </section>

      <section className="content-section journey-preview">
        <SectionHeading {...t.sections.journey} />
        <div className="journey-line">
          {t.experience.slice(0, 3).map((item, index) => (
            <article key={item.role}>
              <span className="journey-index">0{index + 1}</span>
              <p>{item.dates}</p>
              <h3>{item.role}</h3>
              <span>{item.organisation}</span>
            </article>
          ))}
        </div>
        <Link className="section-cta" href={`/${locale}/experience`}>
          {t.nav.experience}
          <Arrow />
        </Link>
      </section>
    </Shell>
  );
}

function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
      <div className="page-hero-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function ExperiencePage({
  locale,
  cms,
}: {
  locale: Locale;
  cms?: CmsContent | null;
}) {
  const base = content[locale];
  const t = {
    ...base,
    experience: cms?.experience?.length ? cms.experience : base.experience,
  };
  return (
    <Shell locale={locale} page="experience" cms={cms}>
      <PageHero
        eyebrow={t.sections.journey.eyebrow}
        title={t.sections.journey.title}
        intro={t.sections.journey.intro}
      />
      <section className="content-section timeline-section">
        <div className="timeline">
          {t.experience.map((item, index) => (
            <article className="timeline-item" key={item.role}>
              <div className="timeline-marker">
                <span>0{index + 1}</span>
              </div>
              <div className="timeline-meta">
                <p>{item.dates}</p>
                <span>{item.organisation}</span>
              </div>
              <div className="timeline-content">
                <h2>{item.role}</h2>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <article className="education-card">
          <p className="eyebrow">{t.education.label}</p>
          <h2>{t.education.title}</h2>
          <span>{t.education.institution}</span>
          <p>{t.education.detail}</p>
        </article>
      </section>
    </Shell>
  );
}

function ProjectsPage({
  locale,
  cms,
}: {
  locale: Locale;
  cms?: CmsContent | null;
}) {
  const base = content[locale];
  const t = {
    ...base,
    projects: cms?.projects?.length ? cms.projects : base.projects,
  };
  return (
    <Shell locale={locale} page="projects" cms={cms}>
      <PageHero
        eyebrow={t.sections.projects.eyebrow}
        title={t.sections.projects.title}
        intro={t.sections.projects.intro}
      />
      <section className="content-section projects-index">
        {t.projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            action={t.common.viewProject}
            large={index % 3 === 0}
          />
        ))}
      </section>
    </Shell>
  );
}

function CredentialsPage({
  locale,
  cms,
}: {
  locale: Locale;
  cms?: CmsContent | null;
}) {
  const base = content[locale];
  const t = {
    ...base,
    credentials: cms?.credentials?.length ? cms.credentials : base.credentials,
  };
  const courseStage = {
    planned: {
      en: "Planned",
      es: "Planificado",
      "pt-br": "Planejado",
    },
    inProgress: {
      en: "In progress",
      es: "En curso",
      "pt-br": "Em andamento",
    },
    completed: {
      en: "Completed",
      es: "Completado",
      "pt-br": "Concluído",
    },
  } as const;
  return (
    <Shell locale={locale} page="credentials" cms={cms}>
      <PageHero
        eyebrow={t.sections.credentials.eyebrow}
        title={t.sections.credentials.title}
        intro={t.sections.credentials.intro}
      />
      <section className="content-section credentials-grid">
        {t.credentials.map((credential, index) => (
          <article className="credential-card" key={credential.title}>
            <div className="credential-topline">
              <span>0{index + 1}</span>
              <span className="status-pill">
                <i />
                {credential.status}
              </span>
            </div>
            <div className="credential-seal" aria-hidden="true">
              <span>{credential.provider.slice(0, 2).toUpperCase()}</span>
            </div>
            <p>{credential.provider}</p>
            <h2>{credential.title}</h2>
            <span className="credential-focus">{credential.focus}</span>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${35 + index * 12}%` }} />
            </div>
            {"verificationUrl" in credential && credential.verificationUrl ? (
              <a
                className="credential-link"
                href={credential.verificationUrl}
                target="_blank"
                rel="noreferrer"
              >
                Verify credential <Arrow diagonal />
              </a>
            ) : null}
          </article>
        ))}
        {cms?.courses.map((course, index) => (
          <article className="credential-card" key={`${course.title}-${index}`}>
            <div className="credential-topline">
              <span>C{String(index + 1).padStart(2, "0")}</span>
              <span className="status-pill">
                <i />
                {courseStage[course.stage][locale]}
              </span>
            </div>
            <div className="credential-seal" aria-hidden="true">
              <span>{(course.provider || "CO").slice(0, 2).toUpperCase()}</span>
            </div>
            <p>{course.provider}</p>
            <h2>{course.title}</h2>
            <span className="credential-focus">{course.description}</span>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${course.progress ?? 0}%` }} />
            </div>
            {course.courseUrl ? (
              <a
                className="credential-link"
                href={course.courseUrl}
                target="_blank"
                rel="noreferrer"
              >
                View course <Arrow diagonal />
              </a>
            ) : null}
          </article>
        ))}
        <article className="education-card credentials-education">
          <p className="eyebrow">{t.education.label}</p>
          <h2>{t.education.title}</h2>
          <span>{t.education.institution}</span>
          <p>{t.education.detail}</p>
        </article>
      </section>
    </Shell>
  );
}

export function Portfolio({
  locale,
  page,
  cms,
}: {
  locale: Locale;
  page: PageKey;
  cms?: CmsContent | null;
}) {
  if (page === "experience")
    return <ExperiencePage locale={locale} cms={cms} />;
  if (page === "projects") return <ProjectsPage locale={locale} cms={cms} />;
  if (page === "credentials")
    return <CredentialsPage locale={locale} cms={cms} />;
  return <Home locale={locale} cms={cms} />;
}
