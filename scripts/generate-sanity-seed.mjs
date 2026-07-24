import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectRoot = process.cwd();
const contentPath = path.join(projectRoot, "lib", "content.ts");
const outputPath = path.join(projectRoot, "studio", "seed.ndjson");
const source = fs.readFileSync(contentPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const moduleExports = {};
vm.runInNewContext(compiled, {
  exports: moduleExports,
  module: { exports: moduleExports },
});

const { content } = moduleExports;
const english = content.en;
const spanish = content.es;
const portuguese = content["pt-br"];
const translated = (values) => ({
  en: values.en,
  es: values.es,
  ptBr: values["pt-br"],
});

const documents = [
  {
    _id: "profile",
    _type: "profile",
    displayName: "Gabriel Gomes",
    headline: {
      en: `${english.hero.titleStart} ${english.hero.titleAccent} ${english.hero.titleEnd}`,
      es: `${spanish.hero.titleStart} ${spanish.hero.titleAccent} ${spanish.hero.titleEnd}`,
      ptBr: `${portuguese.hero.titleStart} ${portuguese.hero.titleAccent} ${portuguese.hero.titleEnd}`,
    },
    introduction: translated({
      en: english.hero.intro,
      es: spanish.hero.intro,
      "pt-br": portuguese.hero.intro,
    }),
    location: translated({
      en: english.common.location,
      es: spanish.common.location,
      "pt-br": portuguese.common.location,
    }),
    email: "gabrielhumbert@outlook.com",
    linkedinUrl: "https://www.linkedin.com/in/gabrielghumbert/",
    githubUrl: "https://github.com/GabrielHumbertDev",
  },
  ...english.projects.map((project, index) => ({
    _id: `project-${String(index + 1).padStart(2, "0")}`,
    _type: "project",
    number: project.number,
    title: {
      en: project.title,
      es: spanish.projects[index].title,
      ptBr: portuguese.projects[index].title,
    },
    kicker: {
      en: project.kicker,
      es: spanish.projects[index].kicker,
      ptBr: portuguese.projects[index].kicker,
    },
    summary: {
      en: project.summary,
      es: spanish.projects[index].summary,
      ptBr: portuguese.projects[index].summary,
    },
    stack: project.stack,
    repositoryUrl: project.href,
    order: (index + 1) * 10,
    published: true,
  })),
  ...english.experience.map((experience, index) => ({
    _id: `experience-${String(index + 1).padStart(2, "0")}`,
    _type: "experience",
    role: {
      en: experience.role,
      es: spanish.experience[index].role,
      ptBr: portuguese.experience[index].role,
    },
    organisation: {
      en: experience.organisation,
      es: spanish.experience[index].organisation,
      ptBr: portuguese.experience[index].organisation,
    },
    dates: {
      en: experience.dates,
      es: spanish.experience[index].dates,
      ptBr: portuguese.experience[index].dates,
    },
    summary: {
      en: experience.summary,
      es: spanish.experience[index].summary,
      ptBr: portuguese.experience[index].summary,
    },
    highlights: {
      en: experience.highlights,
      es: spanish.experience[index].highlights,
      ptBr: portuguese.experience[index].highlights,
    },
    order: (index + 1) * 10,
    published: true,
  })),
  ...english.credentials.map((credential, index) => ({
    _id: `credential-${String(index + 1).padStart(2, "0")}`,
    _type: "credential",
    title: credential.title,
    provider: credential.provider,
    status: {
      en: credential.status,
      es: spanish.credentials[index].status,
      ptBr: portuguese.credentials[index].status,
    },
    focus: {
      en: credential.focus,
      es: spanish.credentials[index].focus,
      ptBr: portuguese.credentials[index].focus,
    },
    order: (index + 1) * 10,
    published: true,
  })),
];

fs.writeFileSync(
  outputPath,
  `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`,
  "utf8",
);

console.log(`Created ${documents.length} Sanity documents at ${outputPath}`);
