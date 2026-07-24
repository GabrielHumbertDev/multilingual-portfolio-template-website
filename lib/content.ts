export const locales = ["en", "es", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export type PageKey = "home" | "experience" | "projects" | "credentials";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type Project = {
  title: string;
  kicker: string;
  summary: string;
  stack: string[];
  href: string;
  number: string;
};

export type Experience = {
  role: string;
  organisation: string;
  dates: string;
  summary: string;
  highlights: string[];
};

export type Capability = {
  code: string;
  title: string;
  body: string;
  tags: string[];
};

export type Credential = {
  title: string;
  provider: string;
  status: string;
  focus: string;
};

export type Translation = {
  localeName: string;
  nav: Record<PageKey, string> & { contact: string; cv: string };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    intro: string;
    primary: string;
    secondary: string;
    availability: string;
    orbitLabels: string[];
  };
  proof: { value: string; label: string }[];
  sections: {
    capabilities: { eyebrow: string; title: string; intro: string };
    projects: { eyebrow: string; title: string; intro: string; all: string };
    journey: { eyebrow: string; title: string; intro: string };
    credentials: { eyebrow: string; title: string; intro: string };
    contact: { eyebrow: string; title: string; intro: string; action: string };
  };
  capabilities: Capability[];
  projects: Project[];
  experience: Experience[];
  credentials: Credential[];
  education: {
    label: string;
    title: string;
    institution: string;
    detail: string;
  };
  footer: string;
  common: {
    viewProject: string;
    github: string;
    location: string;
    status: string;
    inProgress: string;
    current: string;
  };
};

const sharedProjects = {
  codeCvi: "https://github.com/GabrielHumbertDev/CodeCVI-agent",
  malware: "https://github.com/GabrielHumbertDev/Android-Malware-Detection-Toolkit",
  algorithms:
    "https://github.com/GabrielHumbertDev/Android-Malware-Detection-Toolkit-algorithms-analysis",
  sql: "https://github.com/GabrielHumbertDev/employee-management-system-sql-main",
};

export const content: Record<Locale, Translation> = {
  en: {
    localeName: "English",
    nav: {
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      credentials: "Learning",
      contact: "Contact",
      cv: "Download CV",
    },
    hero: {
      eyebrow: "HRIS · ENTERPRISE SYSTEMS · SOFTWARE ENGINEERING",
      titleStart: "Enterprise systems,",
      titleAccent: "engineered",
      titleEnd: "around people.",
      intro:
        "I’m Gabriel Humbert, a London-based HRIS Analyst supporting SAP SuccessFactors across a global organisation. I combine enterprise-system thinking, software engineering and responsible AI to turn complex operational needs into clear, secure solutions.",
      primary: "Explore my work",
      secondary: "Meet the person behind the systems",
      availability: "Open to conversations in English, Spanish and Portuguese",
      orbitLabels: ["HRIS", "SAP", "AI", "SEC", "DATA", "CODE"],
    },
    proof: [
      { value: "16+", label: "countries supported" },
      { value: "3", label: "fluent languages" },
      { value: "2:1", label: "Computer Science degree" },
      { value: "4", label: "certifications in progress" },
    ],
    sections: {
      capabilities: {
        eyebrow: "CAPABILITY MATRIX",
        title: "One profile. Four connected disciplines.",
        intro:
          "My strongest work happens where enterprise operations, engineering discipline, data and human communication meet.",
      },
      projects: {
        eyebrow: "SELECTED BUILDS",
        title: "Projects with a practical reason to exist.",
        intro:
          "Personal and academic projects that demonstrate product thinking, secure engineering, data modelling and applied machine learning.",
        all: "View all projects",
      },
      journey: {
        eyebrow: "EXPERIENCE",
        title: "A career built through systems, service and trust.",
        intro:
          "From high-stakes customer service and healthcare logistics to software engineering and global HR technology.",
      },
      credentials: {
        eyebrow: "CONTINUOUS LEARNING",
        title: "Building the next layer of expertise.",
        intro:
          "My current learning plan strengthens networks, security, data analytics and applied AI alongside hands-on SAP SuccessFactors experience.",
      },
      contact: {
        eyebrow: "LET’S CONNECT",
        title: "Have a complex system that needs a clearer path?",
        intro:
          "I’m open to conversations about HR technology, SAP SuccessFactors, enterprise systems, solution advisory, software engineering and responsible automation.",
        action: "Start a conversation",
      },
    },
    capabilities: [
      {
        code: "01",
        title: "SAP SuccessFactors & HRIS",
        body:
          "Global HRIS support spanning employee data, Employee Central exposure, Time Off, workflows, reporting, permissions and system health activities.",
        tags: ["SuccessFactors", "Data quality", "Reporting", "Workflows"],
      },
      {
        code: "02",
        title: "Integration & testing",
        body:
          "Structured QAT and UAT for employee lifecycle scenarios, reconciliation, negative testing and SuccessFactors-to-Active Directory integration work.",
        tags: ["UAT", "Microsoft Entra", "Azure exposure", "Defect tracking"],
      },
      {
        code: "03",
        title: "Software engineering",
        body:
          "Backend and full-stack foundations with Java, Spring Boot, FastAPI, React, SQL, REST APIs, automated testing, Git and Docker.",
        tags: ["Java", "Python", "TypeScript", "Docker"],
      },
      {
        code: "04",
        title: "AI, data & security",
        body:
          "Applied ML/DL experimentation, local-first AI applications, model evaluation, cybersecurity foundations and responsible data handling.",
        tags: ["Machine learning", "Ollama", "TensorFlow", "Cybersecurity"],
      },
    ],
    projects: [
      {
        number: "01",
        title: "CodeCVI Agent",
        kicker: "LOCAL-FIRST AI PRODUCT",
        summary:
          "An active MVP for CV matching, tailoring, cover-letter generation, analytics and GDPR workflows—designed to keep AI processing local.",
        stack: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker", "Ollama"],
        href: sharedProjects.codeCvi,
      },
      {
        number: "02",
        title: "Android Malware Detection",
        kicker: "CYBERSECURITY TOOLKIT",
        summary:
          "A Python toolkit that classifies Android malware from datasets, PCAP files and live tethered network traffic through practical GUI workflows.",
        stack: ["Python", "LightGBM", "Scapy", "PyShark"],
        href: sharedProjects.malware,
      },
      {
        number: "03",
        title: "ML/DL Algorithm Analysis",
        kicker: "FINAL-YEAR RESEARCH",
        summary:
          "Comparative machine-learning, deep-learning and hybrid ensemble research for Android network-traffic classification.",
        stack: ["Random Forest", "XGBoost", "CNN", "LSTM", "LightGBM"],
        href: sharedProjects.algorithms,
      },
      {
        number: "04",
        title: "Employee Management SQL",
        kicker: "RELATIONAL DATA MODEL",
        summary:
          "An 11-table employee-management database demonstrating joins, transactions, aggregation, subqueries and reporting workflows.",
        stack: ["SQL", "MySQL", "Data modelling", "Transactions"],
        href: sharedProjects.sql,
      },
    ],
    experience: [
      {
        role: "HRIS Analyst — SAP SuccessFactors",
        organisation: "FDM Group · Global remit",
        dates: "May 2026 — Present",
        summary:
          "Supporting SAP SuccessFactors operations across more than 16 countries in EMEA, APAC and North America.",
        highlights: [
          "Employee data, Time Off, workflows, access and reporting support",
          "Data-quality remediation and access-governance activity",
          "Structured integration QAT/UAT and stakeholder communication",
        ],
      },
      {
        role: "Software Engineering Consultant",
        organisation: "FDM Group · London",
        dates: "Dec 2025 — Mar 2026",
        summary:
          "Intensive enterprise engineering training focused on backend systems, APIs, databases, testing and Agile delivery.",
        highlights: [
          "Java, Spring Boot, JPA/Hibernate and SQL",
          "REST API design with Postman and Swagger",
          "JUnit 5, Mockito, TDD, Docker and Git",
        ],
      },
      {
        role: "Concierge Assistant",
        organisation: "Hilton · The Trafalgar St. James",
        dates: "Sep 2022 — Dec 2025",
        summary:
          "High-trust, premium customer service in a five-star central-London environment.",
        highlights: [
          "Discovery, communication and tailored problem-solving",
          "Escalation ownership under pressure",
          "Confidentiality and relationship management",
        ],
      },
      {
        role: "Hospital Logistics Support",
        organisation: "NHS · St Bartholomew’s Hospital",
        dates: "Mar 2020 — Sep 2022",
        summary:
          "Critical logistics support through the COVID-19 period in a regulated healthcare environment.",
        highlights: ["Reliability", "Structured process awareness", "Service under pressure"],
      },
      {
        role: "Restaurant Manager",
        organisation: "Souvlaki · Soho",
        dates: "Jan 2018 — Mar 2020",
        summary:
          "Led daily operations and teams in a high-volume central-London restaurant.",
        highlights: ["Team leadership", "Workload coordination", "Conflict resolution"],
      },
    ],
    credentials: [
      {
        title: "CompTIA Network+",
        provider: "CompTIA",
        status: "In progress",
        focus: "Networking concepts, infrastructure, operations and troubleshooting",
      },
      {
        title: "CompTIA Security+",
        provider: "CompTIA",
        status: "In progress",
        focus: "Threats, architecture, security operations and governance",
      },
      {
        title: "Google Data Analytics",
        provider: "Google",
        status: "In progress",
        focus: "Data preparation, analysis, visualisation and decision support",
      },
      {
        title: "Azure AI Engineer Associate",
        provider: "Microsoft",
        status: "In progress",
        focus: "Designing and implementing responsible AI solutions on Azure",
      },
    ],
    education: {
      label: "EDUCATION",
      title: "BSc (Hons) Computer Science — Cybersecurity Pathway",
      institution: "University of Greenwich · London · 2021–2025",
      detail:
        "Awarded 2:1. Final-year project: a hybrid ML/DL Android malware-detection system with Python analysis tools and on-device TensorFlow Lite detection.",
    },
    footer:
      "Designed around clarity, built for continuous growth. Built by Gabriel Humbert Dev.",
    common: {
      viewProject: "Open repository",
      github: "GitHub",
      location: "London, United Kingdom",
      status: "Status",
      inProgress: "In progress",
      current: "Current",
    },
  },
  es: {
    localeName: "Español",
    nav: {
      home: "Inicio",
      experience: "Experiencia",
      projects: "Proyectos",
      credentials: "Formación",
      contact: "Contacto",
      cv: "Descargar CV",
    },
    hero: {
      eyebrow: "HRIS · SISTEMAS EMPRESARIALES · INGENIERÍA DE SOFTWARE",
      titleStart: "Sistemas empresariales,",
      titleAccent: "diseñados",
      titleEnd: "alrededor de las personas.",
      intro:
        "Soy Gabriel Humbert, analista HRIS en Londres, dando soporte a SAP SuccessFactors en una organización global. Combino sistemas empresariales, ingeniería de software e IA responsable para convertir necesidades complejas en soluciones claras y seguras.",
      primary: "Explorar mi trabajo",
      secondary: "Conocer a la persona detrás de los sistemas",
      availability: "Disponible para conversar en inglés, español y portugués",
      orbitLabels: ["HRIS", "SAP", "IA", "SEG", "DATOS", "CÓD"],
    },
    proof: [
      { value: "16+", label: "países con soporte" },
      { value: "3", label: "idiomas fluidos" },
      { value: "2:1", label: "grado en Informática" },
      { value: "4", label: "certificaciones en curso" },
    ],
    sections: {
      capabilities: {
        eyebrow: "MATRIZ DE CAPACIDADES",
        title: "Un perfil. Cuatro disciplinas conectadas.",
        intro:
          "Mi mejor trabajo surge donde se unen las operaciones empresariales, la ingeniería, los datos y la comunicación humana.",
      },
      projects: {
        eyebrow: "PROYECTOS SELECCIONADOS",
        title: "Tecnología creada con una razón práctica.",
        intro:
          "Proyectos personales y académicos que demuestran visión de producto, ingeniería segura, modelado de datos y aprendizaje automático aplicado.",
        all: "Ver todos los proyectos",
      },
      journey: {
        eyebrow: "EXPERIENCIA",
        title: "Una carrera construida con sistemas, servicio y confianza.",
        intro:
          "Desde atención al cliente y logística sanitaria hasta ingeniería de software y tecnología global de RR. HH.",
      },
      credentials: {
        eyebrow: "APRENDIZAJE CONTINUO",
        title: "Construyendo la siguiente capa de conocimiento.",
        intro:
          "Mi plan actual refuerza redes, seguridad, análisis de datos e IA aplicada junto con experiencia práctica en SAP SuccessFactors.",
      },
      contact: {
        eyebrow: "CONECTEMOS",
        title: "¿Tienes un sistema complejo que necesita un camino más claro?",
        intro:
          "Estoy abierto a conversar sobre tecnología de RR. HH., SAP SuccessFactors, sistemas empresariales, ingeniería de software y automatización responsable.",
        action: "Iniciar una conversación",
      },
    },
    capabilities: [
      {
        code: "01",
        title: "SAP SuccessFactors y HRIS",
        body:
          "Soporte HRIS global: datos de empleados, Employee Central, Time Off, flujos, informes, permisos y actividades de salud del sistema.",
        tags: ["SuccessFactors", "Calidad de datos", "Informes", "Flujos"],
      },
      {
        code: "02",
        title: "Integración y pruebas",
        body:
          "QAT y UAT estructurados para el ciclo de vida del empleado, reconciliación, pruebas negativas e integración con Active Directory.",
        tags: ["UAT", "Microsoft Entra", "Azure", "Defectos"],
      },
      {
        code: "03",
        title: "Ingeniería de software",
        body:
          "Bases backend y full-stack con Java, Spring Boot, FastAPI, React, SQL, APIs REST, pruebas automatizadas, Git y Docker.",
        tags: ["Java", "Python", "TypeScript", "Docker"],
      },
      {
        code: "04",
        title: "IA, datos y seguridad",
        body:
          "Experimentación ML/DL, aplicaciones locales de IA, evaluación de modelos, fundamentos de ciberseguridad y uso responsable de datos.",
        tags: ["Machine learning", "Ollama", "TensorFlow", "Ciberseguridad"],
      },
    ],
    projects: [
      {
        number: "01",
        title: "CodeCVI Agent",
        kicker: "PRODUCTO DE IA LOCAL",
        summary:
          "MVP activo para comparar y adaptar CV, generar cartas, analizar resultados y gestionar flujos GDPR manteniendo la IA local.",
        stack: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker", "Ollama"],
        href: sharedProjects.codeCvi,
      },
      {
        number: "02",
        title: "Detección de malware Android",
        kicker: "KIT DE CIBERSEGURIDAD",
        summary:
          "Herramientas Python para clasificar malware desde datasets, archivos PCAP y tráfico de red Android en directo.",
        stack: ["Python", "LightGBM", "Scapy", "PyShark"],
        href: sharedProjects.malware,
      },
      {
        number: "03",
        title: "Análisis de algoritmos ML/DL",
        kicker: "INVESTIGACIÓN UNIVERSITARIA",
        summary:
          "Comparación de modelos de machine learning, deep learning y ensembles híbridos para clasificar tráfico Android.",
        stack: ["Random Forest", "XGBoost", "CNN", "LSTM", "LightGBM"],
        href: sharedProjects.algorithms,
      },
      {
        number: "04",
        title: "Gestión de empleados SQL",
        kicker: "MODELO RELACIONAL",
        summary:
          "Base de datos de 11 tablas que demuestra joins, transacciones, agregaciones, subconsultas e informes.",
        stack: ["SQL", "MySQL", "Modelado de datos", "Transacciones"],
        href: sharedProjects.sql,
      },
    ],
    experience: [
      {
        role: "Analista HRIS — SAP SuccessFactors",
        organisation: "FDM Group · Alcance global",
        dates: "Mayo 2026 — Actualidad",
        summary:
          "Soporte a SAP SuccessFactors en más de 16 países de EMEA, APAC y Norteamérica.",
        highlights: [
          "Datos, Time Off, flujos, accesos e informes",
          "Calidad de datos y gobierno de accesos",
          "QAT/UAT de integraciones y comunicación con stakeholders",
        ],
      },
      {
        role: "Consultor de Ingeniería de Software",
        organisation: "FDM Group · Londres",
        dates: "Dic 2025 — Mar 2026",
        summary:
          "Formación intensiva en sistemas backend, APIs, bases de datos, pruebas y entrega Agile.",
        highlights: [
          "Java, Spring Boot, JPA/Hibernate y SQL",
          "APIs REST con Postman y Swagger",
          "JUnit 5, Mockito, TDD, Docker y Git",
        ],
      },
      {
        role: "Asistente de conserjería",
        organisation: "Hilton · The Trafalgar St. James",
        dates: "Sep 2022 — Dic 2025",
        summary:
          "Servicio premium y de alta confianza en un hotel cinco estrellas de Londres.",
        highlights: [
          "Escucha y resolución personalizada",
          "Gestión de escalaciones bajo presión",
          "Confidencialidad y relaciones",
        ],
      },
      {
        role: "Soporte de logística hospitalaria",
        organisation: "NHS · St Bartholomew’s Hospital",
        dates: "Mar 2020 — Sep 2022",
        summary:
          "Soporte logístico crítico durante la COVID-19 en un entorno sanitario regulado.",
        highlights: ["Fiabilidad", "Procesos estructurados", "Servicio bajo presión"],
      },
      {
        role: "Gerente de restaurante",
        organisation: "Souvlaki · Soho",
        dates: "Ene 2018 — Mar 2020",
        summary:
          "Dirección de operaciones y equipos en un restaurante de alto volumen.",
        highlights: ["Liderazgo", "Coordinación", "Resolución de conflictos"],
      },
    ],
    credentials: [
      {
        title: "CompTIA Network+",
        provider: "CompTIA",
        status: "En curso",
        focus: "Redes, infraestructura, operaciones y resolución de problemas",
      },
      {
        title: "CompTIA Security+",
        provider: "CompTIA",
        status: "En curso",
        focus: "Amenazas, arquitectura, operaciones y gobierno de seguridad",
      },
      {
        title: "Google Data Analytics",
        provider: "Google",
        status: "En curso",
        focus: "Preparación, análisis, visualización y decisiones basadas en datos",
      },
      {
        title: "Azure AI Engineer Associate",
        provider: "Microsoft",
        status: "En curso",
        focus: "Diseño e implementación de soluciones responsables de IA en Azure",
      },
    ],
    education: {
      label: "EDUCACIÓN",
      title: "BSc (Hons) Informática — Itinerario de Ciberseguridad",
      institution: "University of Greenwich · Londres · 2021–2025",
      detail:
        "Calificación 2:1. Proyecto final: sistema híbrido ML/DL para detectar malware Android, con análisis en Python y detección TensorFlow Lite en el dispositivo.",
    },
    footer:
      "Diseñado para la claridad, construido para crecer. Creado por Gabriel Humbert Dev.",
    common: {
      viewProject: "Abrir repositorio",
      github: "GitHub",
      location: "Londres, Reino Unido",
      status: "Estado",
      inProgress: "En curso",
      current: "Actual",
    },
  },
  "pt-br": {
    localeName: "Português",
    nav: {
      home: "Início",
      experience: "Experiência",
      projects: "Projetos",
      credentials: "Formação",
      contact: "Contato",
      cv: "Baixar CV",
    },
    hero: {
      eyebrow: "HRIS · SISTEMAS EMPRESARIAIS · ENGENHARIA DE SOFTWARE",
      titleStart: "Sistemas empresariais,",
      titleAccent: "projetados",
      titleEnd: "em torno das pessoas.",
      intro:
        "Sou Gabriel Humbert, analista de HRIS em Londres, apoiando SAP SuccessFactors em uma organização global. Uno sistemas empresariais, engenharia de software e IA responsável para transformar necessidades complexas em soluções claras e seguras.",
      primary: "Explorar meu trabalho",
      secondary: "Conhecer a pessoa por trás dos sistemas",
      availability: "Disponível para conversar em inglês, espanhol e português",
      orbitLabels: ["HRIS", "SAP", "IA", "SEG", "DADOS", "CÓD"],
    },
    proof: [
      { value: "16+", label: "países atendidos" },
      { value: "3", label: "idiomas fluentes" },
      { value: "2:1", label: "graduação em Computação" },
      { value: "4", label: "certificações em andamento" },
    ],
    sections: {
      capabilities: {
        eyebrow: "MATRIZ DE CAPACIDADES",
        title: "Um perfil. Quatro disciplinas conectadas.",
        intro:
          "Meu melhor trabalho acontece onde operações empresariais, engenharia, dados e comunicação humana se encontram.",
      },
      projects: {
        eyebrow: "PROJETOS SELECIONADOS",
        title: "Tecnologia criada com uma razão prática.",
        intro:
          "Projetos pessoais e acadêmicos que demonstram visão de produto, engenharia segura, modelagem de dados e machine learning aplicado.",
        all: "Ver todos os projetos",
      },
      journey: {
        eyebrow: "EXPERIÊNCIA",
        title: "Uma carreira construída com sistemas, serviço e confiança.",
        intro:
          "Do atendimento premium e logística hospitalar à engenharia de software e tecnologia global de RH.",
      },
      credentials: {
        eyebrow: "APRENDIZADO CONTÍNUO",
        title: "Construindo a próxima camada de conhecimento.",
        intro:
          "Meu plano atual fortalece redes, segurança, análise de dados e IA aplicada junto à experiência prática em SAP SuccessFactors.",
      },
      contact: {
        eyebrow: "VAMOS CONVERSAR",
        title: "Tem um sistema complexo que precisa de um caminho mais claro?",
        intro:
          "Estou aberto a conversas sobre tecnologia de RH, SAP SuccessFactors, sistemas empresariais, engenharia de software e automação responsável.",
        action: "Iniciar uma conversa",
      },
    },
    capabilities: [
      {
        code: "01",
        title: "SAP SuccessFactors e HRIS",
        body:
          "Suporte global de HRIS envolvendo dados de colaboradores, Employee Central, Time Off, workflows, relatórios, permissões e saúde do sistema.",
        tags: ["SuccessFactors", "Qualidade de dados", "Relatórios", "Workflows"],
      },
      {
        code: "02",
        title: "Integração e testes",
        body:
          "QAT e UAT estruturados para cenários do ciclo do colaborador, reconciliação, testes negativos e integração com Active Directory.",
        tags: ["UAT", "Microsoft Entra", "Azure", "Defeitos"],
      },
      {
        code: "03",
        title: "Engenharia de software",
        body:
          "Fundamentos backend e full-stack com Java, Spring Boot, FastAPI, React, SQL, APIs REST, testes automatizados, Git e Docker.",
        tags: ["Java", "Python", "TypeScript", "Docker"],
      },
      {
        code: "04",
        title: "IA, dados e segurança",
        body:
          "Experimentos ML/DL, aplicações locais de IA, avaliação de modelos, fundamentos de cibersegurança e uso responsável de dados.",
        tags: ["Machine learning", "Ollama", "TensorFlow", "Cibersegurança"],
      },
    ],
    projects: [
      {
        number: "01",
        title: "CodeCVI Agent",
        kicker: "PRODUTO DE IA LOCAL",
        summary:
          "MVP ativo para comparar e adaptar CVs, gerar cartas, analisar resultados e gerir fluxos GDPR mantendo o processamento de IA local.",
        stack: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker", "Ollama"],
        href: sharedProjects.codeCvi,
      },
      {
        number: "02",
        title: "Detecção de malware Android",
        kicker: "KIT DE CIBERSEGURANÇA",
        summary:
          "Ferramentas Python para classificar malware a partir de datasets, arquivos PCAP e tráfego Android ao vivo.",
        stack: ["Python", "LightGBM", "Scapy", "PyShark"],
        href: sharedProjects.malware,
      },
      {
        number: "03",
        title: "Análise de algoritmos ML/DL",
        kicker: "PESQUISA UNIVERSITÁRIA",
        summary:
          "Comparação de machine learning, deep learning e ensembles híbridos para classificar tráfego de rede Android.",
        stack: ["Random Forest", "XGBoost", "CNN", "LSTM", "LightGBM"],
        href: sharedProjects.algorithms,
      },
      {
        number: "04",
        title: "Gestão de colaboradores em SQL",
        kicker: "MODELO RELACIONAL",
        summary:
          "Banco de dados com 11 tabelas demonstrando joins, transações, agregações, subconsultas e relatórios.",
        stack: ["SQL", "MySQL", "Modelagem de dados", "Transações"],
        href: sharedProjects.sql,
      },
    ],
    experience: [
      {
        role: "Analista de HRIS — SAP SuccessFactors",
        organisation: "FDM Group · Escopo global",
        dates: "Mai 2026 — Atual",
        summary:
          "Suporte a SAP SuccessFactors em mais de 16 países na EMEA, APAC e América do Norte.",
        highlights: [
          "Dados, Time Off, workflows, acessos e relatórios",
          "Qualidade de dados e governança de acesso",
          "QAT/UAT de integrações e comunicação com stakeholders",
        ],
      },
      {
        role: "Consultor de Engenharia de Software",
        organisation: "FDM Group · Londres",
        dates: "Dez 2025 — Mar 2026",
        summary:
          "Treinamento intensivo em sistemas backend, APIs, bancos de dados, testes e entrega Agile.",
        highlights: [
          "Java, Spring Boot, JPA/Hibernate e SQL",
          "APIs REST com Postman e Swagger",
          "JUnit 5, Mockito, TDD, Docker e Git",
        ],
      },
      {
        role: "Assistente de concierge",
        organisation: "Hilton · The Trafalgar St. James",
        dates: "Set 2022 — Dez 2025",
        summary:
          "Atendimento premium e de alta confiança em um hotel cinco estrelas de Londres.",
        highlights: [
          "Escuta e soluções personalizadas",
          "Gestão de escalonamentos sob pressão",
          "Confidencialidade e relacionamento",
        ],
      },
      {
        role: "Suporte de logística hospitalar",
        organisation: "NHS · St Bartholomew’s Hospital",
        dates: "Mar 2020 — Set 2022",
        summary:
          "Suporte logístico crítico durante a COVID-19 em um ambiente de saúde regulado.",
        highlights: ["Confiabilidade", "Processos estruturados", "Serviço sob pressão"],
      },
      {
        role: "Gerente de restaurante",
        organisation: "Souvlaki · Soho",
        dates: "Jan 2018 — Mar 2020",
        summary:
          "Gestão de operações e equipes em um restaurante movimentado no centro de Londres.",
        highlights: ["Liderança", "Coordenação", "Resolução de conflitos"],
      },
    ],
    credentials: [
      {
        title: "CompTIA Network+",
        provider: "CompTIA",
        status: "Em andamento",
        focus: "Redes, infraestrutura, operações e troubleshooting",
      },
      {
        title: "CompTIA Security+",
        provider: "CompTIA",
        status: "Em andamento",
        focus: "Ameaças, arquitetura, operações e governança de segurança",
      },
      {
        title: "Google Data Analytics",
        provider: "Google",
        status: "Em andamento",
        focus: "Preparação, análise, visualização e decisões orientadas por dados",
      },
      {
        title: "Azure AI Engineer Associate",
        provider: "Microsoft",
        status: "Em andamento",
        focus: "Design e implementação de soluções responsáveis de IA no Azure",
      },
    ],
    education: {
      label: "EDUCAÇÃO",
      title: "BSc (Hons) Ciência da Computação — Cibersegurança",
      institution: "University of Greenwich · Londres · 2021–2025",
      detail:
        "Resultado 2:1. Projeto final: sistema híbrido ML/DL para detectar malware Android, com análise em Python e detecção TensorFlow Lite no dispositivo.",
    },
    footer:
      "Projetado para clareza, construído para evoluir. Criado por Gabriel Humbert Dev.",
    common: {
      viewProject: "Abrir repositório",
      github: "GitHub",
      location: "Londres, Reino Unido",
      status: "Status",
      inProgress: "Em andamento",
      current: "Atual",
    },
  },
};
