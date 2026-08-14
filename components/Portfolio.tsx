import Link from "next/link";
import type { Locale, PageKey } from "@/lib/content";
import { content } from "@/lib/content";
import type { CmsContent } from "@/lib/sanity";
import { InteractiveMenu } from "@/components/InteractiveMenu";
import { RevealController } from "@/components/RevealController";
import { SiteControls } from "@/components/SiteControls";
import { DegreeCertificateLightbox } from "@/components/DegreeCertificateLightbox";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const defaultProfile = {
  displayName: "Gabriel Humbert",
  email: "gabrielhumbert@outlook.com",
  linkedinUrl: "https://www.linkedin.com/in/gabrielghumbert/",
  githubUrl: "https://github.com/GabrielHumbertDev",
  cvUrl: "/Gabriel-Gomes-CV.pdf",
};

function resolveProfile(cms?: CmsContent | null) {
  return {
    displayName: cms?.profile?.displayName || defaultProfile.displayName,
    email: cms?.profile?.email || defaultProfile.email,
    linkedinUrl: cms?.profile?.linkedinUrl || defaultProfile.linkedinUrl,
    githubUrl: cms?.profile?.githubUrl || defaultProfile.githubUrl,
    cvUrl: cms?.profile?.cvUrl || defaultProfile.cvUrl,
  };
}

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
    <span className="brand-symbol" aria-hidden="true">
      <i className="brand-symbol-orbit brand-symbol-orbit-one" />
      <i className="brand-symbol-orbit brand-symbol-orbit-two" />
      <span className="brand-symbol-frame" />
      <span className="brand-symbol-type">GH</span>
      <span className="brand-symbol-node brand-symbol-node-one" />
      <span className="brand-symbol-node brand-symbol-node-two" />
      <span className="brand-symbol-node brand-symbol-node-three" />
    </span>
  );
}

function BrandName({ displayName }: { displayName: string }) {
  const [firstName, ...remainingNames] = displayName.trim().split(/\s+/);
  return (
    <>
      <span className="brand-name-desktop">
        {firstName.toUpperCase()}{" "}
        <strong>{remainingNames.join(" ").toUpperCase()}</strong>
      </span>
      <span className="brand-name-mobile">DEV</span>
    </>
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
  const profile = resolveProfile(cms);
  const languageNames: Record<Locale, string> = {
    en: "English",
    es: "Español",
    "pt-br": "Português",
  };

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
        <div className="header-utility">
          <SiteControls locale={locale} />
          <span className="utility-divider" aria-hidden="true" />
          <details className="language-menu">
            <summary aria-label="Choose language">
              <span>{locale === "pt-br" ? "PT" : locale.toUpperCase()}</span>
              <i aria-hidden="true" />
            </summary>
            <div className="language-options" aria-label="Language selector">
              {(["en", "es", "pt-br"] as Locale[])
                .filter((lang) => lang !== locale)
                .map((lang) => (
                  <Link
                    key={lang}
                    href={localPath(lang, page)}
                    hrefLang={lang}
                    lang={lang}
                  >
                    <span>{lang === "pt-br" ? "PT" : lang.toUpperCase()}</span>
                    {languageNames[lang]}
                  </Link>
                ))}
            </div>
          </details>
          <span className="utility-divider utility-divider-cv" aria-hidden="true" />
          <a
            className="header-cv"
            href={profile.cvUrl}
            download
            aria-label={t.nav.cv}
            title={t.nav.cv}
          >
            <span aria-hidden="true">{t.nav.cv}</span>
          </a>
        </div>
        <InteractiveMenu
          links={navItems.map((item) => ({
            href: localPath(locale, item),
            label: t.nav[item],
          }))}
          contactLabel={t.nav.contact}
          email={profile.email}
          cvLabel={t.nav.cv}
          cvUrl={profile.cvUrl}
        />
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
  const profile = resolveProfile(cms);
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
        <a
          className="button button-primary contact-button"
          href={`mailto:${profile.email}`}
        >
          {t.sections.contact.action}
        </a>
      </div>
      <div className="footer-bottom">
        <div className="footer-signature">
          <BrandMark />
          <span className="signature-copy">
            <strong>{profile.displayName}</strong>
            <small>Gabriel Humbert Dev</small>
          </span>
        </div>
        <p>{t.footer}</p>
        <div className="social-links">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Gabriel Humbert's LinkedIn profile"
          >
            <span className="social-monogram" aria-hidden="true">
              <FaLinkedinIn />
            </span>
            <span className="social-copy">
              <strong>LinkedIn</strong>
              <small>linkedin.com</small>
            </span>
            <span className="social-status" aria-hidden="true" />
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Gabriel Humbert's GitHub profile"
          >
            <span className="social-monogram social-monogram-github" aria-hidden="true">
              <FaGithub />
            </span>
            <span className="social-copy">
              <strong>GitHub</strong>
              <small>github.com</small>
            </span>
            <span className="social-status" aria-hidden="true" />
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
  const skipLabel = {
    en: "Skip to main content",
    es: "Saltar al contenido principal",
    "pt-br": "Ir para o conteúdo principal",
  }[locale];
  return (
    <div className="site-frame" lang={locale}>
      <a className="skip-link" href="#main-content">{skipLabel}</a>
      <RevealController />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header locale={locale} page={page} cms={cms} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer locale={locale} cms={cms} />
    </div>
  );
}

function HoloCore({ labels }: { labels: string[] }) {
  return (
    <div className="holo-scene" aria-hidden="true">
      <div className="scene-grid" />
      <img
        className="system-art-backdrop"
        src="/hero-system-lattice.png"
        alt=""
      />
      <div className="holo-ring ring-one" />
      <div className="holo-ring ring-two" />
      <div className="holo-ring ring-three" />
      <div className="lattice-core">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            className={`lattice-cube lattice-cube-${index + 1}`}
            key={index}
          >
            <i className="lattice-face lattice-front" />
            <i className="lattice-face lattice-right" />
            <i className="lattice-face lattice-top" />
          </span>
        ))}
        <span className="core-glow" />
      </div>
      {labels.map((label, index) => (
        <span className={`orbit-ball ball-${index + 1}`} key={index}>
          {label}
        </span>
      ))}
      <div className="scene-caption scene-caption-hidden">
        <span>GG // SYSTEMS_01</span>
        <span>51.5072° N · 0.1276° W</span>
      </div>
    </div>
  );
}

const nowLabels: Record<
  Locale,
  { eyebrow: string; label: string; learning: string }
> = {
  en: {
    eyebrow: "CURRENT FOCUS",
    label: "Now",
    learning: "Expanding applied expertise across networks, security, data and AI.",
  },
  es: {
    eyebrow: "ENFOQUE ACTUAL",
    label: "Ahora",
    learning: "Ampliando conocimientos aplicados en redes, seguridad, datos e IA.",
  },
  "pt-br": {
    eyebrow: "FOCO ATUAL",
    label: "Agora",
    learning: "Ampliando conhecimentos práticos em redes, segurança, dados e IA.",
  },
};

function NowPanel({ locale }: { locale: Locale }) {
  const t = content[locale];
  const labels = nowLabels[locale];
  const currentRole = t.experience[0];

  return (
    <section className="now-panel" aria-labelledby="current-focus-title">
      <div className="now-status" aria-label={labels.label}>
        <i className="now-orbit now-orbit-one" aria-hidden="true" />
        <i className="now-orbit now-orbit-two" aria-hidden="true" />
        <span className="now-core" aria-hidden="true" />
        <strong className="now-type" aria-hidden="true">{labels.label}</strong>
        <span className="now-node now-node-one" aria-hidden="true" />
        <span className="now-node now-node-two" aria-hidden="true" />
        <span className="now-node now-node-three" aria-hidden="true" />
      </div>
      <div className="now-copy">
        <p className="eyebrow">{labels.eyebrow}</p>
        <h2 id="current-focus-title">{currentRole.role}</h2>
        <p>{currentRole.summary}</p>
      </div>
      <div className="now-learning">
        <span>{t.sections.credentials.eyebrow}</span>
        <p>{labels.learning}</p>
      </div>
    </section>
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
    <div className="section-heading" data-reveal>
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
        {t.capabilities.map((capability, index) => (
          <article
            className={`capability-card ${index === 0 ? "material-prototype" : ""}`}
            key={capability.code}
            data-reveal
            style={{ "--reveal-delay": `${index * 85}ms` } as React.CSSProperties}
          >
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

const editorialContent: Record<
  Locale,
  {
    strip: string[];
    approach: {
      eyebrow: string;
      title: string;
      intro: string;
      steps: { label: string; body: string; signal: string }[];
    };
    feature: {
      eyebrow: string;
      label: string;
      problem: string;
      problemBody: string;
      approach: string;
      approachBody: string;
      outcome: string;
      outcomeBody: string;
    };
  }
> = {
  en: {
    strip: [
      "SAP SuccessFactors",
      "Human-centred systems",
      "Integration & testing",
      "Software engineering",
      "Responsible AI",
      "Secure delivery",
    ],
    approach: {
      eyebrow: "FROM COMPLEXITY TO CLARITY",
      title: "Good systems do more than function. They make work easier to understand, operate and improve.",
      intro:
        "My approach connects business context, engineering discipline and human validation—so the result works in the real environment, not only in a technical demonstration.",
      steps: [
        {
          label: "Understand the context",
          body: "Listen to the people doing the work, clarify the real constraint and define what a useful outcome looks like.",
          signal: "PEOPLE · PURPOSE",
        },
        {
          label: "Map the system",
          body: "Make processes, data, dependencies, permissions and risks visible before choosing the solution.",
          signal: "PROCESS · DATA",
        },
        {
          label: "Build with discipline",
          body: "Create the smallest maintainable path using clear architecture, responsible automation and secure engineering practices.",
          signal: "DESIGN · DELIVERY",
        },
        {
          label: "Validate and improve",
          body: "Test with realistic scenarios, communicate clearly and turn feedback into measurable, dependable improvement.",
          signal: "TEST · LEARN",
        },
      ],
    },
    feature: {
      eyebrow: "FEATURED CASE STUDY",
      label: "A private, practical AI workflow—not a technology demo.",
      problem: "The problem",
      problemBody:
        "Job-search workflows are fragmented, repetitive and often require sensitive CV data to leave the user’s control.",
      approach: "The approach",
      approachBody:
        "Connect matching, tailoring, cover letters, analytics and GDPR workflows in one local-first product architecture.",
      outcome: "The current outcome",
      outcomeBody:
        "An active MVP that demonstrates product thinking, full-stack delivery and responsible use of AI while keeping local processing central.",
    },
  },
  es: {
    strip: [
      "SAP SuccessFactors",
      "Sistemas centrados en personas",
      "Integración y pruebas",
      "Ingeniería de software",
      "IA responsable",
      "Entrega segura",
    ],
    approach: {
      eyebrow: "DE LA COMPLEJIDAD A LA CLARIDAD",
      title: "Los buenos sistemas hacen más que funcionar. Facilitan comprender, operar y mejorar el trabajo.",
      intro:
        "Mi enfoque conecta el contexto empresarial, la disciplina de ingeniería y la validación humana para que el resultado funcione en el entorno real, no solo en una demostración técnica.",
      steps: [
        {
          label: "Comprender el contexto",
          body: "Escuchar a quienes realizan el trabajo, aclarar la limitación real y definir un resultado útil.",
          signal: "PERSONAS · PROPÓSITO",
        },
        {
          label: "Mapear el sistema",
          body: "Hacer visibles los procesos, datos, dependencias, permisos y riesgos antes de elegir la solución.",
          signal: "PROCESO · DATOS",
        },
        {
          label: "Construir con disciplina",
          body: "Crear la ruta mantenible más directa con arquitectura clara, automatización responsable y prácticas seguras.",
          signal: "DISEÑO · ENTREGA",
        },
        {
          label: "Validar y mejorar",
          body: "Probar escenarios realistas, comunicar con claridad y convertir comentarios en mejoras fiables.",
          signal: "PROBAR · APRENDER",
        },
      ],
    },
    feature: {
      eyebrow: "CASO DESTACADO",
      label: "Un flujo de IA privado y práctico, no una simple demostración.",
      problem: "El problema",
      problemBody:
        "La búsqueda de empleo está fragmentada, es repetitiva y suele exigir que datos sensibles del CV salgan del control del usuario.",
      approach: "El enfoque",
      approachBody:
        "Conectar análisis, adaptación, cartas de presentación, métricas y procesos RGPD en una arquitectura local-first.",
      outcome: "El resultado actual",
      outcomeBody:
        "Un MVP activo que demuestra pensamiento de producto, desarrollo full-stack y uso responsable de IA manteniendo el procesamiento local como prioridad.",
    },
  },
  "pt-br": {
    strip: [
      "SAP SuccessFactors",
      "Sistemas centrados nas pessoas",
      "Integração e testes",
      "Engenharia de software",
      "IA responsável",
      "Entrega segura",
    ],
    approach: {
      eyebrow: "DA COMPLEXIDADE À CLAREZA",
      title: "Bons sistemas fazem mais do que funcionar. Tornam o trabalho mais fácil de entender, operar e melhorar.",
      intro:
        "Minha abordagem conecta contexto de negócio, disciplina de engenharia e validação humana para que o resultado funcione no ambiente real, não apenas numa demonstração técnica.",
      steps: [
        {
          label: "Entender o contexto",
          body: "Ouvir quem realiza o trabalho, esclarecer a restrição real e definir como é um resultado útil.",
          signal: "PESSOAS · PROPÓSITO",
        },
        {
          label: "Mapear o sistema",
          body: "Tornar visíveis processos, dados, dependências, permissões e riscos antes de escolher a solução.",
          signal: "PROCESSO · DADOS",
        },
        {
          label: "Construir com disciplina",
          body: "Criar o caminho sustentável mais direto com arquitetura clara, automação responsável e práticas seguras.",
          signal: "DESIGN · ENTREGA",
        },
        {
          label: "Validar e melhorar",
          body: "Testar cenários realistas, comunicar com clareza e transformar feedback em melhorias confiáveis.",
          signal: "TESTAR · APRENDER",
        },
      ],
    },
    feature: {
      eyebrow: "ESTUDO DE CASO EM DESTAQUE",
      label: "Um fluxo de IA privado e prático, não apenas uma demonstração.",
      problem: "O problema",
      problemBody:
        "A procura de emprego é fragmentada, repetitiva e frequentemente exige que dados sensíveis do CV saiam do controlo do utilizador.",
      approach: "A abordagem",
      approachBody:
        "Ligar análise, personalização, cartas, métricas e processos RGPD numa arquitetura local-first.",
      outcome: "O resultado atual",
      outcomeBody:
        "Um MVP ativo que demonstra pensamento de produto, desenvolvimento full-stack e uso responsável de IA, mantendo o processamento local como prioridade.",
    },
  },
};

function ExpertiseMarquee({ locale }: { locale: Locale }) {
  const items = editorialContent[locale].strip;
  return (
    <div className="expertise-marquee" aria-label={items.join(", ")}>
      <div className="expertise-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} aria-hidden={index >= items.length}>
            {item}<i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ApproachSection({ locale }: { locale: Locale }) {
  const approach = editorialContent[locale].approach;
  return (
    <section className="content-section approach-section">
      <div className="approach-statement" data-reveal>
        <p className="eyebrow">{approach.eyebrow}</p>
        <h2>{approach.title}</h2>
        <p>{approach.intro}</p>
      </div>
      <div className="approach-list">
        {approach.steps.map((step, index) => (
          <article
            key={step.label}
            data-reveal
            style={{ "--reveal-delay": `${index * 75}ms` } as React.CSSProperties}
          >
            <span className="approach-signal">{step.signal}</span>
            <h3>{step.label}</h3>
            <p>{step.body}</p>
            <span className="approach-pulse" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedCaseStudy({
  locale,
  project,
  action,
}: {
  locale: Locale;
  project: (typeof content)["en"]["projects"][number];
  action: string;
}) {
  const feature = editorialContent[locale].feature;
  return (
    <article className="featured-case" data-reveal>
      <div className="featured-case-visual" aria-hidden="true">
        <span className="feature-orbit feature-orbit-one" />
        <span className="feature-orbit feature-orbit-two" />
        <span className="feature-core"><i /><i /><i /></span>
        <span className="feature-scan" />
        <small>LOCAL / PRIVATE / HUMAN-VALIDATED</small>
      </div>
      <div className="featured-case-copy">
        <p className="eyebrow">{feature.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="feature-label">{feature.label}</p>
        <div className="feature-breakdown">
          <div><strong>{feature.problem}</strong><p>{feature.problemBody}</p></div>
          <div><strong>{feature.approach}</strong><p>{feature.approachBody}</p></div>
          <div><strong>{feature.outcome}</strong><p>{feature.outcomeBody}</p></div>
        </div>
        <div className="feature-footer">
          <div className="tag-list">
            {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <a href={project.href} target="_blank" rel="noreferrer">
            <span className="project-link-dot" aria-hidden="true" />{action}
          </a>
        </div>
      </div>
    </article>
  );
}

type PortfolioProject = (typeof content)["en"]["projects"][number];
type CaseCopy = {
  intro: string;
  problem: string;
  approach: string;
  outcome: string;
  visualLabel: string;
};

const projectLinks = {
  codeCvi: "https://github.com/GabrielHumbertDev/CodeCVI-agent",
  malware: "https://github.com/GabrielHumbertDev/Android-Malware-Detection-Toolkit",
  algorithms:
    "https://github.com/GabrielHumbertDev/Android-Malware-Detection-Toolkit-algorithms-analysis",
  sql: "https://github.com/GabrielHumbertDev/employee-management-system-sql-main",
  banking: "https://github.com/GabrielHumbertDev/Banking-System",
  portfolio:
    "https://github.com/GabrielHumbertDev/multilingual-portfolio-template-website",
} as const;

const additionalProjects: Record<Locale, PortfolioProject[]> = {
  en: [
    {
      number: "05",
      title: "Banking System",
      kicker: "TESTED JAVA SERVICE",
      summary:
        "A Java and Maven banking application focused on core service logic, dependable behaviour and automated test coverage.",
      stack: ["Java", "Maven", "JUnit", "Mockito", "OOP"],
      href: projectLinks.banking,
    },
    {
      number: "06",
      title: "Multilingual Portfolio Platform",
      kicker: "PRODUCTION WEB PLATFORM",
      summary:
        "A reusable multilingual portfolio architecture with structured content management, accessible interaction and Cloudflare-compatible delivery.",
      stack: ["Next.js", "TypeScript", "Sanity", "Cloudflare", "Vinext"],
      href: projectLinks.portfolio,
    },
  ],
  es: [
    {
      number: "05",
      title: "Sistema bancario",
      kicker: "SERVICIO JAVA CON PRUEBAS",
      summary:
        "Una aplicación bancaria con Java y Maven centrada en la lógica de servicios, el comportamiento fiable y las pruebas automatizadas.",
      stack: ["Java", "Maven", "JUnit", "Mockito", "OOP"],
      href: projectLinks.banking,
    },
    {
      number: "06",
      title: "Plataforma de portfolio multilingüe",
      kicker: "PLATAFORMA WEB EN PRODUCCIÓN",
      summary:
        "Una arquitectura de portfolio reutilizable y multilingüe con contenido estructurado, interacción accesible y entrega compatible con Cloudflare.",
      stack: ["Next.js", "TypeScript", "Sanity", "Cloudflare", "Vinext"],
      href: projectLinks.portfolio,
    },
  ],
  "pt-br": [
    {
      number: "05",
      title: "Sistema bancário",
      kicker: "SERVIÇO JAVA TESTADO",
      summary:
        "Uma aplicação bancária em Java e Maven focada na lógica de serviços, comportamento confiável e cobertura de testes automatizados.",
      stack: ["Java", "Maven", "JUnit", "Mockito", "OOP"],
      href: projectLinks.banking,
    },
    {
      number: "06",
      title: "Plataforma de portfólio multilíngue",
      kicker: "PLATAFORMA WEB EM PRODUÇÃO",
      summary:
        "Uma arquitetura de portfólio reutilizável e multilíngue com conteúdo estruturado, interação acessível e entrega compatível com Cloudflare.",
      stack: ["Next.js", "TypeScript", "Sanity", "Cloudflare", "Vinext"],
      href: projectLinks.portfolio,
    },
  ],
};

const caseLabels: Record<
  Locale,
  { problem: string; approach: string; outcome: string; repository: string }
> = {
  en: {
    problem: "The problem",
    approach: "The approach",
    outcome: "The current outcome",
    repository: "Open repository",
  },
  es: {
    problem: "El problema",
    approach: "El enfoque",
    outcome: "El resultado actual",
    repository: "Abrir repositorio",
  },
  "pt-br": {
    problem: "O problema",
    approach: "A abordagem",
    outcome: "O resultado atual",
    repository: "Abrir repositório",
  },
};

const projectCaseCopy: Record<Locale, Record<string, CaseCopy>> = {
  en: {
    [projectLinks.codeCvi]: {
      intro: "A private, practical AI workflow designed as a real product rather than a disconnected collection of AI features.",
      problem: "Job applications involve repetitive comparison, rewriting and document management, while CV data is highly personal and often sent to external AI services.",
      approach: "Unify CV parsing, job matching, gap analysis, supported-claim validation, tailoring, cover letters, application tracking and privacy controls in a local-first architecture.",
      outcome: "An active Docker-based MVP with authentication, PostgreSQL, Redis, FastAPI services, a React workflow and local Qwen 2.5 generation through Ollama.",
      visualLabel: "LOCAL / PRIVATE / HUMAN-VALIDATED",
    },
    [projectLinks.malware]: {
      intro: "A practical cybersecurity toolkit that moves malware classification from a research model into workflows a user can operate.",
      problem: "Android malware can appear in stored datasets, captured network sessions or live device traffic, but each source requires a different analysis workflow.",
      approach: "Use one LightGBM-based detection foundation across file analysis, PCAP classification and live USB-tethered traffic inspection, presented through Python GUI applications.",
      outcome: "Three operational analysis paths: CSV/XLSX dataset scanning, PCAP inspection and real-time packet classification with Scapy and PyShark.",
      visualLabel: "TRAFFIC / CLASSIFY / RESPOND",
    },
    [projectLinks.algorithms]: {
      intro: "Final-year research comparing traditional machine learning, deep learning and hybrid ensembles for Android network-traffic classification.",
      problem: "A high accuracy score alone does not show which model family offers the best balance of classification performance, generalisation and practical evaluation.",
      approach: "Evaluate ML, DL and hybrid combinations using accuracy, precision, recall, F1, ROC-AUC, precision-recall curves and confusion matrices across multiple malware classes.",
      outcome: "A documented comparative framework in which the strongest reported hybrid ML ensemble reached 99.3% accuracy and a 99.2% F1 score on the project dataset.",
      visualLabel: "COMPARE / EVALUATE / LEARN",
    },
    [projectLinks.sql]: {
      intro: "A relational data project built around realistic employee, department, geography, consultancy, customer and sales questions.",
      problem: "Operational reporting requires connected data structures and queries that can answer cross-departmental questions without duplicating or hard-coding information.",
      approach: "Design an 11-table company model and solve business stories using joins, subqueries, aggregation, grouping, variables and transactional updates.",
      outcome: "Nine core and four bonus reporting stories completed, including compensation comparisons, regional headcount, customer sales and transaction-safe changes.",
      visualLabel: "MODEL / QUERY / TRANSACT",
    },
    [projectLinks.banking]: {
      intro: "A service-focused Java project demonstrating how financial operations can be expressed as clear domain logic and verified behaviour.",
      problem: "Banking actions must preserve predictable rules and state changes; small logic errors can produce incorrect balances or inconsistent customer outcomes.",
      approach: "Separate core banking responsibilities through object-oriented Java, manage the build with Maven and verify service behaviour with isolated JUnit and Mockito tests.",
      outcome: "A documented personal banking system that demonstrates core functionality, service-layer reasoning and automated test coverage.",
      visualLabel: "RULES / SERVICE / ASSURANCE",
    },
    [projectLinks.portfolio]: {
      intro: "The reusable engineering case study behind this website: identity, content, multilingual routes, management tools and hosting treated as one product.",
      problem: "A professional portfolio becomes difficult to maintain when content, translations, certificates, deployment and visual presentation are handled separately.",
      approach: "Combine a typed Next.js interface, three-language content, Sanity Studio, accessible navigation, responsive motion and Cloudflare-compatible output.",
      outcome: "A production-oriented template with documented architecture, local content fallback, CMS schemas, social metadata, tests and a repeatable deployment path.",
      visualLabel: "DESIGN / CONTENT / DELIVERY",
    },
  },
  es: {
    [projectLinks.codeCvi]: {
      intro: "Un flujo de IA privado y práctico, diseñado como un producto real y no como una colección desconectada de funciones.",
      problem: "Las solicitudes de empleo exigen comparar, reescribir y gestionar documentos repetidamente, mientras los datos del CV son personales y suelen enviarse a servicios externos.",
      approach: "Unificar análisis de CV, comparación con vacantes, detección de brechas, validación, adaptación, cartas, seguimiento y privacidad en una arquitectura local-first.",
      outcome: "Un MVP activo en Docker con autenticación, PostgreSQL, Redis, servicios FastAPI, un flujo React y generación local Qwen 2.5 mediante Ollama.",
      visualLabel: "LOCAL / PRIVADO / VALIDADO",
    },
    [projectLinks.malware]: {
      intro: "Un toolkit práctico de ciberseguridad que convierte un modelo de clasificación en flujos que una persona puede utilizar.",
      problem: "El malware Android puede aparecer en datasets, capturas de red o tráfico en vivo, y cada fuente necesita un flujo de análisis diferente.",
      approach: "Aplicar una base LightGBM al análisis de archivos, clasificación PCAP y tráfico USB en vivo mediante aplicaciones gráficas en Python.",
      outcome: "Tres rutas operativas: análisis CSV/XLSX, inspección PCAP y clasificación de paquetes en tiempo real con Scapy y PyShark.",
      visualLabel: "TRÁFICO / CLASIFICAR / RESPONDER",
    },
    [projectLinks.algorithms]: {
      intro: "Investigación final comparando aprendizaje automático, aprendizaje profundo y ensembles híbridos para clasificar tráfico Android.",
      problem: "Una precisión alta no explica qué familia de modelos equilibra mejor rendimiento, generalización y evaluación práctica.",
      approach: "Evaluar modelos ML, DL e híbridos con precisión, recall, F1, ROC-AUC, curvas precisión-recall y matrices de confusión.",
      outcome: "Un marco comparativo cuyo mejor ensemble ML documentado alcanzó 99,3% de accuracy y 99,2% de F1 en el dataset del proyecto.",
      visualLabel: "COMPARAR / EVALUAR / APRENDER",
    },
    [projectLinks.sql]: {
      intro: "Un proyecto relacional basado en preguntas realistas sobre empleados, departamentos, geografía, clientes y ventas.",
      problem: "Los informes operativos requieren estructuras conectadas y consultas capaces de responder preguntas sin duplicar ni codificar datos manualmente.",
      approach: "Diseñar un modelo empresarial de 11 tablas y resolver historias mediante joins, subconsultas, agregación, agrupación, variables y transacciones.",
      outcome: "Nueve historias principales y cuatro adicionales completadas, incluyendo compensación, personal regional, ventas y cambios transaccionales.",
      visualLabel: "MODELAR / CONSULTAR / TRANSACCIONAR",
    },
    [projectLinks.banking]: {
      intro: "Un proyecto Java centrado en servicios que expresa operaciones financieras como lógica de dominio clara y verificable.",
      problem: "Las operaciones bancarias deben conservar reglas y cambios de estado previsibles; pequeños errores pueden generar saldos incorrectos.",
      approach: "Separar responsabilidades con Java orientado a objetos, gestionar la compilación con Maven y verificar servicios con JUnit y Mockito.",
      outcome: "Un sistema bancario personal documentado que demuestra funcionalidad principal, razonamiento de servicios y pruebas automatizadas.",
      visualLabel: "REGLAS / SERVICIO / GARANTÍA",
    },
    [projectLinks.portfolio]: {
      intro: "El caso de ingeniería reutilizable detrás de esta web: identidad, contenido, idiomas, gestión y alojamiento como un solo producto.",
      problem: "Un portfolio es difícil de mantener cuando contenido, traducciones, certificados, despliegue y presentación se gestionan por separado.",
      approach: "Combinar Next.js tipado, tres idiomas, Sanity Studio, navegación accesible, movimiento adaptable y salida compatible con Cloudflare.",
      outcome: "Una plantilla orientada a producción con arquitectura documentada, fallback local, esquemas CMS, metadatos, pruebas y despliegue repetible.",
      visualLabel: "DISEÑO / CONTENIDO / ENTREGA",
    },
  },
  "pt-br": {
    [projectLinks.codeCvi]: {
      intro: "Um fluxo de IA privado e prático, concebido como produto real e não como uma coleção desconectada de funcionalidades.",
      problem: "Candidaturas exigem comparação, reescrita e gestão repetitiva de documentos, enquanto os dados do CV são pessoais e muitas vezes enviados a serviços externos.",
      approach: "Unificar análise de CV, correspondência, lacunas, validação, personalização, cartas, acompanhamento e privacidade numa arquitetura local-first.",
      outcome: "Um MVP ativo em Docker com autenticação, PostgreSQL, Redis, serviços FastAPI, fluxo React e geração local Qwen 2.5 através do Ollama.",
      visualLabel: "LOCAL / PRIVADO / VALIDADO",
    },
    [projectLinks.malware]: {
      intro: "Um toolkit prático de cibersegurança que transforma um modelo de classificação em fluxos que uma pessoa pode operar.",
      problem: "Malware Android pode surgir em datasets, capturas de rede ou tráfego ao vivo, e cada fonte requer um fluxo de análise diferente.",
      approach: "Aplicar uma base LightGBM à análise de ficheiros, classificação PCAP e tráfego USB ao vivo através de aplicações gráficas Python.",
      outcome: "Três caminhos operacionais: análise CSV/XLSX, inspeção PCAP e classificação em tempo real com Scapy e PyShark.",
      visualLabel: "TRÁFEGO / CLASSIFICAR / RESPONDER",
    },
    [projectLinks.algorithms]: {
      intro: "Investigação final comparando machine learning, deep learning e ensembles híbridos para classificar tráfego Android.",
      problem: "Uma precisão elevada não revela qual família de modelos equilibra melhor desempenho, generalização e avaliação prática.",
      approach: "Avaliar modelos ML, DL e híbridos com accuracy, precisão, recall, F1, ROC-AUC, curvas precision-recall e matrizes de confusão.",
      outcome: "Um quadro comparativo cujo melhor ensemble ML documentado atingiu 99,3% de accuracy e 99,2% de F1 no dataset do projeto.",
      visualLabel: "COMPARAR / AVALIAR / APRENDER",
    },
    [projectLinks.sql]: {
      intro: "Um projeto relacional baseado em questões realistas sobre funcionários, departamentos, geografia, clientes e vendas.",
      problem: "Relatórios operacionais exigem estruturas ligadas e consultas que respondam a questões sem duplicar ou codificar dados manualmente.",
      approach: "Projetar um modelo empresarial de 11 tabelas e resolver histórias com joins, subconsultas, agregação, agrupamento, variáveis e transações.",
      outcome: "Nove histórias principais e quatro adicionais concluídas, incluindo remuneração, pessoal regional, vendas e alterações transacionais.",
      visualLabel: "MODELAR / CONSULTAR / TRANSACIONAR",
    },
    [projectLinks.banking]: {
      intro: "Um projeto Java orientado a serviços que expressa operações financeiras como lógica de domínio clara e verificável.",
      problem: "Operações bancárias devem preservar regras e alterações de estado previsíveis; pequenos erros podem produzir saldos incorretos.",
      approach: "Separar responsabilidades com Java orientado a objetos, gerir o build com Maven e verificar serviços com JUnit e Mockito.",
      outcome: "Um sistema bancário pessoal documentado que demonstra funcionalidade central, raciocínio de serviços e testes automatizados.",
      visualLabel: "REGRAS / SERVIÇO / GARANTIA",
    },
    [projectLinks.portfolio]: {
      intro: "O caso de engenharia reutilizável por trás deste site: identidade, conteúdo, idiomas, gestão e alojamento tratados como um produto.",
      problem: "Um portfólio torna-se difícil de manter quando conteúdo, traduções, certificados, implantação e apresentação são geridos separadamente.",
      approach: "Combinar Next.js tipado, três idiomas, Sanity Studio, navegação acessível, movimento responsivo e saída compatível com Cloudflare.",
      outcome: "Um template orientado à produção com arquitetura documentada, fallback local, schemas CMS, metadados, testes e implantação repetível.",
      visualLabel: "DESIGN / CONTEÚDO / ENTREGA",
    },
  },
};

function ProjectCaseStudy({
  locale,
  project,
  index,
}: {
  locale: Locale;
  project: PortfolioProject;
  index: number;
}) {
  const labels = caseLabels[locale];
  const copy = projectCaseCopy[locale][project.href] || {
    intro: project.summary,
    problem: project.summary,
    approach: project.summary,
    outcome: project.summary,
    visualLabel: "BUILD / TEST / IMPROVE",
  };

  return (
    <article
      className={`project-case-study project-case-${index + 1} ${index % 2 ? "project-case-reverse" : ""}`}
      data-reveal
    >
      <div className="project-case-visual" aria-hidden="true">
        <span className="case-grid" />
        <span className="case-orbit case-orbit-one" />
        <span className="case-orbit case-orbit-two" />
        <span className="case-object"><i /><i /><i /></span>
        <span className="case-node case-node-one" />
        <span className="case-node case-node-two" />
        <span className="case-scan" />
        <small>{copy.visualLabel}</small>
      </div>
      <div className="project-case-copy">
        <p className="eyebrow">{project.kicker}</p>
        <h2>{project.title}</h2>
        <p className="project-case-intro">{copy.intro}</p>
        <div className="project-case-breakdown">
          <div><strong>{labels.problem}</strong><p>{copy.problem}</p></div>
          <div><strong>{labels.approach}</strong><p>{copy.approach}</p></div>
          <div><strong>{labels.outcome}</strong><p>{copy.outcome}</p></div>
        </div>
        <div className="project-case-footer">
          <div className="tag-list">
            {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <a href={project.href} target="_blank" rel="noreferrer">
            <span className="project-link-dot" aria-hidden="true" />
            {labels.repository}
          </a>
        </div>
      </div>
    </article>
  );
}

function buildProjectCatalog(locale: Locale, projects: PortfolioProject[]) {
  const desiredOrder = Object.values(projectLinks);
  const byHref = new Map(
    [...projects, ...additionalProjects[locale]].map((project) => [project.href, project]),
  );
  return desiredOrder.map((href) => byHref.get(href)).filter(Boolean) as PortfolioProject[];
}

function ProjectCard({
  project,
  action,
  index,
  prototype = false,
}: {
  project: (typeof content)["en"]["projects"][number];
  action: string;
  index: number;
  prototype?: boolean;
}) {
  return (
    <article
      className={`project-card ${prototype ? "material-prototype" : ""}`}
      data-reveal
    >
      <div className={`project-visual project-visual-${index + 1}`} aria-hidden="true">
        <div className="project-art">
          <span className="project-art-orbit project-art-orbit-one" />
          <span className="project-art-orbit project-art-orbit-two" />
          <span className="project-art-core" />
          <span className="project-art-node project-art-node-one" />
          <span className="project-art-node project-art-node-two" />
          <span className="project-art-node project-art-node-three" />
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
          <span className="project-link-dot" aria-hidden="true" />
          {action}
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
            </Link>
            <Link className="text-link" href={`/${locale}/experience`}>
              {t.hero.secondary}
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

      <NowPanel locale={locale} />

      <ExpertiseMarquee locale={locale} />

      <CapabilityGrid locale={locale} />

      <ApproachSection locale={locale} />

      <section className="content-section selected-projects">
        <SectionHeading {...t.sections.projects} />
        <FeaturedCaseStudy
          locale={locale}
          project={t.projects[0]}
          action={t.common.viewProject}
        />
        <div className="project-grid">
          {t.projects.slice(1, 4).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              action={t.common.viewProject}
              index={index + 1}
            />
          ))}
        </div>
        <Link className="section-cta" href={`/${locale}/projects`}>
          {t.sections.projects.all}
        </Link>
      </section>

      <section className="content-section journey-preview">
        <SectionHeading {...t.sections.journey} />
        <div className="journey-line">
          {t.experience.slice(0, 3).map((item) => (
            <article key={item.role} data-reveal>
              <p>{item.dates}</p>
              <h3>{item.role}</h3>
              <span>{item.organisation}</span>
            </article>
          ))}
        </div>
        <Link className="section-cta" href={`/${locale}/experience`}>
          {t.nav.experience}
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
  const editorial = {
    en: {
      overview: "CAREER THROUGHLINE",
      statement: "From high-trust service environments to enterprise HR technology and software engineering.",
      signals: ["16+ countries supported", "SAP SuccessFactors", "Engineering & delivery"],
      current: "Current role",
      educationIntro:
        "A computer science degree shaped around secure systems, practical software development and the investigation of digital threats. The pathway connects core computing foundations with the security needs of networks, applications and the people who use them.",
      pathway: "Course pathway includes",
      subjects: [
        "Secure system design",
        "Penetration testing",
        "Ethical vulnerability scanning",
        "Computer forensics",
        "Information security",
        "Software systems",
      ],
      projectLabel: "FINAL-YEAR RESEARCH",
      project:
        "Hybrid machine-learning and deep-learning Android malware detection, combining Python analysis workflows with on-device TensorFlow Lite inference.",
      contextLabel: "COURSE CONTEXT",
      context:
        "BCS-accredited pathway delivered by the School of Computing and Mathematical Sciences at Greenwich Campus, with applied learning through lectures, laboratories, workshops and independent study.",
      courseLink: "View official course",
    },
    es: {
      overview: "TRAYECTORIA PROFESIONAL",
      statement: "De entornos de servicio de alta confianza a tecnología empresarial de RR. HH. e ingeniería de software.",
      signals: ["Más de 16 países", "SAP SuccessFactors", "Ingeniería y entrega"],
      current: "Puesto actual",
      educationIntro:
        "Una carrera de informática centrada en sistemas seguros, desarrollo práctico de software e investigación de amenazas digitales. El itinerario conecta las bases de la computación con la seguridad de redes, aplicaciones y sus usuarios.",
      pathway: "El itinerario incluye",
      subjects: ["Diseño de sistemas seguros", "Pruebas de penetración", "Análisis ético de vulnerabilidades", "Informática forense", "Seguridad de la información", "Sistemas de software"],
      projectLabel: "PROYECTO FINAL",
      project: "Detección híbrida de malware Android con aprendizaje automático y profundo, análisis en Python e inferencia TensorFlow Lite en el dispositivo.",
      contextLabel: "CONTEXTO DEL PROGRAMA",
      context: "Itinerario acreditado por BCS de la School of Computing and Mathematical Sciences en Greenwich Campus, con aprendizaje aplicado en clases, laboratorios, talleres y estudio independiente.",
      courseLink: "Ver curso oficial",
    },
    "pt-br": {
      overview: "TRAJETÓRIA PROFISSIONAL",
      statement: "De ambientes de serviço de alta confiança à tecnologia empresarial de RH e engenharia de software.",
      signals: ["Mais de 16 países", "SAP SuccessFactors", "Engenharia e entrega"],
      current: "Função atual",
      educationIntro:
        "Uma graduação em computação orientada a sistemas seguros, desenvolvimento prático de software e investigação de ameaças digitais. O percurso conecta fundamentos da computação à segurança de redes, aplicações e seus utilizadores.",
      pathway: "O percurso inclui",
      subjects: ["Design de sistemas seguros", "Testes de penetração", "Análise ética de vulnerabilidades", "Computação forense", "Segurança da informação", "Sistemas de software"],
      projectLabel: "PROJETO FINAL",
      project: "Detecção híbrida de malware Android com machine learning e deep learning, combinando análise em Python com inferência TensorFlow Lite no dispositivo.",
      contextLabel: "CONTEXTO DO CURSO",
      context: "Percurso acreditado pela BCS da School of Computing and Mathematical Sciences no Greenwich Campus, com aprendizagem aplicada em aulas, laboratórios, workshops e estudo independente.",
      courseLink: "Ver curso oficial",
    },
  }[locale];
  return (
    <Shell locale={locale} page="experience" cms={cms}>
      <PageHero
        eyebrow={t.sections.journey.eyebrow}
        title={t.sections.journey.title}
        intro={t.sections.journey.intro}
      />
      <section className="content-section timeline-section">
        <div className="experience-overview" data-reveal>
          <div>
            <p className="eyebrow">{editorial.overview}</p>
            <h2>{editorial.statement}</h2>
          </div>
          <div className="experience-signals">
            {editorial.signals.map((signal) => <span key={signal}>{signal}</span>)}
          </div>
        </div>
        <div className="timeline">
          {t.experience.map((item, index) => (
            <article className="timeline-item" key={item.role} data-reveal>
              <div className="timeline-marker">
                <span aria-hidden="true" />
              </div>
              <div className="timeline-meta">
                {index === 0 && <strong>{editorial.current}</strong>}
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
        <article className="education-card education-feature" data-reveal>
          <div className="education-visual" aria-label="University of Greenwich">
            <div className="education-logo-plaque">
              <img src="/university-of-greenwich-logo.png" alt="University of Greenwich logo" />
            </div>
            <span>BSc (Hons) · 2:1</span>
          </div>
          <div className="education-story">
            <p className="eyebrow">{t.education.label}</p>
            <h2>{t.education.title}</h2>
            <span className="education-institution">{t.education.institution}</span>
            <p className="education-intro">{editorial.educationIntro}</p>
            <div className="education-focus">
              <p>{editorial.pathway}</p>
              <div>{editorial.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div>
            </div>
            <div className="education-details">
              <div><p>{editorial.projectLabel}</p><span>{editorial.project}</span></div>
              <div><p>{editorial.contextLabel}</p><span>{editorial.context}</span></div>
            </div>
            <a className="education-course-link" href="https://www.gre.ac.uk/undergraduate-courses/engsci/computer-science-cyber-security-bsc-hons" target="_blank" rel="noreferrer">
              {editorial.courseLink}
            </a>
          </div>
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
  const projectCatalog = buildProjectCatalog(locale, t.projects);
  return (
    <Shell locale={locale} page="projects" cms={cms}>
      <PageHero
        eyebrow={t.sections.projects.eyebrow}
        title={t.sections.projects.title}
        intro={t.sections.projects.intro}
      />
      <section className="content-section project-case-index">
        {projectCatalog.map((project, index) => (
          <ProjectCaseStudy
            key={project.title}
            locale={locale}
            project={project}
            index={index}
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
  const learningEditorial = {
    en: {
      eyebrow: "VERIFIED & IN PROGRESS",
      statement: "Learning that compounds into practical capability.",
      intro: "A living record of formal credentials, focused study and the technologies I am actively developing.",
      earned: "Earned credential",
      verified: "Listed on LinkedIn",
      issued: "Issued Jun 2024 · Expires Jun 2028",
      certificateFocus: "Independent language-proficiency certification for professional communication.",
      viewLinkedIn: "View on LinkedIn",
      degreeStatus: "Degree awarded",
      degreeInstitution: "University of Greenwich",
      degreeTitle: "BSc (Hons) Computer Science (Cyber Security)",
      degreeDate: "Awarded 17 Jun 2025 · Second Class Honours (1st Division / 2:1)",
      degreeFocus: "A security-focused computer science pathway combining software engineering foundations with networks, information security, digital investigation and responsible systems design.",
      viewDegree: "View degree certificate",
      closeDegree: "Close degree certificate",
      degreeHint: "Click the certificate or outside it to return to the website.",
      roadmap: "Current learning roadmap",
      roadmapIntro: "Structured learning across networks, security, analytics and responsible cloud AI.",
      academic: "Academic foundation",
      academicLink: "Explore education and experience",
      viewCredential: "Verify credential",
      viewCourse: "View course",
    },
    es: {
      eyebrow: "VERIFICADO Y EN CURSO",
      statement: "Aprendizaje que se convierte en capacidad práctica.",
      intro: "Un registro vivo de credenciales formales, estudio enfocado y las tecnologías que desarrollo activamente.",
      earned: "Credencial obtenida",
      verified: "Publicada en LinkedIn",
      issued: "Emitida jun 2024 · Caduca jun 2028",
      certificateFocus: "Certificación independiente de competencia lingüística para la comunicación profesional.",
      viewLinkedIn: "Ver en LinkedIn",
      degreeStatus: "Título universitario obtenido",
      degreeInstitution: "University of Greenwich",
      degreeTitle: "BSc (Hons) Computer Science (Cyber Security)",
      degreeDate: "Otorgado el 17 jun 2025 · Honores de segunda clase, primera división (2:1)",
      degreeFocus: "Un itinerario de informática centrado en ciberseguridad que combina fundamentos de ingeniería de software con redes, seguridad de la información, investigación digital y diseño responsable de sistemas.",
      viewDegree: "Ver certificado universitario",
      closeDegree: "Cerrar certificado universitario",
      degreeHint: "Haz clic en el certificado o fuera de él para volver al sitio web.",
      roadmap: "Ruta de aprendizaje actual",
      roadmapIntro: "Aprendizaje estructurado en redes, seguridad, analítica e IA responsable en la nube.",
      academic: "Base académica",
      academicLink: "Ver educación y experiencia",
      viewCredential: "Verificar credencial",
      viewCourse: "Ver curso",
    },
    "pt-br": {
      eyebrow: "VERIFICADO E EM ANDAMENTO",
      statement: "Aprendizagem que se transforma em capacidade prática.",
      intro: "Um registro vivo de credenciais formais, estudo direcionado e tecnologias que desenvolvo ativamente.",
      earned: "Credencial concluída",
      verified: "Publicada no LinkedIn",
      issued: "Emitida jun 2024 · Expira jun 2028",
      certificateFocus: "Certificação independente de proficiência linguística para comunicação profissional.",
      viewLinkedIn: "Ver no LinkedIn",
      degreeStatus: "Graduação concluída",
      degreeInstitution: "University of Greenwich",
      degreeTitle: "BSc (Hons) Computer Science (Cyber Security)",
      degreeDate: "Concedido em 17 jun 2025 · Honras de segunda classe, primeira divisão (2:1)",
      degreeFocus: "Um percurso de ciência da computação focado em cibersegurança, combinando fundamentos de engenharia de software com redes, segurança da informação, investigação digital e design responsável de sistemas.",
      viewDegree: "Ver certificado universitário",
      closeDegree: "Fechar certificado universitário",
      degreeHint: "Clique no certificado ou fora dele para voltar ao site.",
      roadmap: "Roteiro de aprendizagem atual",
      roadmapIntro: "Aprendizagem estruturada em redes, segurança, análise de dados e IA responsável na nuvem.",
      academic: "Base acadêmica",
      academicLink: "Ver formação e experiência",
      viewCredential: "Verificar credencial",
      viewCourse: "Ver curso",
    },
  }[locale];
  return (
    <Shell locale={locale} page="credentials" cms={cms}>
      <PageHero
        eyebrow={t.sections.credentials.eyebrow}
        title={t.sections.credentials.title}
        intro={t.sections.credentials.intro}
      />
      <section className="content-section learning-content">
        <div className="learning-intro" data-reveal>
          <div>
            <p className="eyebrow">{learningEditorial.eyebrow}</p>
            <h2>{learningEditorial.statement}</h2>
          </div>
          <p>{learningEditorial.intro}</p>
        </div>

        <article className="earned-credential degree-credential" data-reveal>
          <div className="earned-credential-visual degree-credential-visual">
            <span>{learningEditorial.earned}</span>
            <div className="credential-badge-stage degree-certificate-stage">
              <div className="credential-badge-orbit degree-certificate-orbit" aria-hidden="true" />
              <DegreeCertificateLightbox
                src="/BSc-Computer-Science-Cyber-Security-Certificate-Gabriel-Gomes-2025.png"
                alt="University of Greenwich Bachelor of Science Computer Science Cyber Security degree certificate awarded to Gabriel Humbert"
                label={learningEditorial.viewDegree}
                closeLabel={learningEditorial.closeDegree}
                hint={learningEditorial.degreeHint}
                variant="image"
              />
            </div>
            <small>UNIVERSITY OF GREENWICH · 2025</small>
          </div>
          <div className="earned-credential-copy">
            <span className="verified-pill"><i />{learningEditorial.degreeStatus}</span>
            <p>{learningEditorial.degreeInstitution}</p>
            <h2>{learningEditorial.degreeTitle}</h2>
            <span className="credential-date">{learningEditorial.degreeDate}</span>
            <p className="credential-description">{learningEditorial.degreeFocus}</p>
            <DegreeCertificateLightbox
              src="/BSc-Computer-Science-Cyber-Security-Certificate-Gabriel-Gomes-2025.png"
              alt="University of Greenwich Bachelor of Science Computer Science Cyber Security degree certificate awarded to Gabriel Humbert"
              label={learningEditorial.viewDegree}
              closeLabel={learningEditorial.closeDegree}
              hint={learningEditorial.degreeHint}
              variant="button"
            />
          </div>
        </article>

        <article className="earned-credential" data-reveal>
          <div className="earned-credential-visual">
            <span>{learningEditorial.earned}</span>
            <div className="credential-badge-stage">
              <div className="credential-badge-orbit" aria-hidden="true" />
              <div className="credential-badge-logo">
                <img src="/pipplet-logo.webp" alt="Pipplet, an ETS company" />
              </div>
            </div>
            <small>ETS · PIPPLET · 2024</small>
          </div>
          <div className="earned-credential-copy">
            <span className="verified-pill"><i />{learningEditorial.verified}</span>
            <p>Pipplet · an ETS company</p>
            <h2>Pipplet Language Proficiency Certificate</h2>
            <span className="credential-date">{learningEditorial.issued}</span>
            <p className="credential-description">{learningEditorial.certificateFocus}</p>
            <a href="https://www.linkedin.com/in/gabrielghumbert/details/certifications/" target="_blank" rel="noreferrer">
              {learningEditorial.viewLinkedIn}
            </a>
          </div>
        </article>

        <div className="learning-roadmap-heading" data-reveal>
          <div><p className="eyebrow">{learningEditorial.roadmap}</p><h2>{learningEditorial.roadmapIntro}</h2></div>
          <span>{String(t.credentials.length).padStart(2, "0")} pathways</span>
        </div>

        <div className="credentials-grid">
        {t.credentials.map((credential, index) => (
          <article className="credential-card" key={credential.title} data-reveal>
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
                {learningEditorial.viewCredential}
              </a>
            ) : null}
          </article>
        ))}
        {cms?.courses.map((course, index) => (
          <article className="credential-card" key={`${course.title}-${index}`} data-reveal>
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
                {learningEditorial.viewCourse}
              </a>
            ) : null}
          </article>
        ))}
        </div>
        <article className="learning-foundation" data-reveal>
          <div><p className="eyebrow">{learningEditorial.academic}</p><h2>{t.education.title}</h2></div>
          <div><span>{t.education.institution}</span><p>{t.education.detail}</p><Link href={localPath(locale, "experience")}>{learningEditorial.academicLink}</Link></div>
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
