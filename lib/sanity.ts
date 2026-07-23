import type { Credential, Experience, Locale, Project } from "@/lib/content";

export type CmsContent = {
  projects: Project[];
  experience: Experience[];
  credentials: Credential[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2026-07-01";

function languageField(locale: Locale) {
  if (locale === "pt-br") return "ptBr";
  return locale;
}

const query = `{
  "projects": *[_type == "project" && published == true] | order(order asc) {
    "number": coalesce(number, "00"),
    "title": coalesce(title[$lang], title.en),
    "kicker": coalesce(kicker[$lang], kicker.en),
    "summary": coalesce(summary[$lang], summary.en),
    "stack": stack,
    "href": repositoryUrl
  },
  "experience": *[_type == "experience" && published == true] | order(order asc) {
    "role": coalesce(role[$lang], role.en),
    "organisation": coalesce(organisation[$lang], organisation.en),
    "dates": coalesce(dates[$lang], dates.en),
    "summary": coalesce(summary[$lang], summary.en),
    "highlights": coalesce(highlights[$lang], highlights.en)
  },
  "credentials": *[_type == "credential" && published == true] | order(order asc) {
    "title": title,
    "provider": provider,
    "status": coalesce(status[$lang], status.en),
    "focus": coalesce(focus[$lang], focus.en)
  }
}`;

export async function getCmsContent(locale: Locale): Promise<CmsContent | null> {
  if (!projectId) return null;

  const params = new URLSearchParams({
    query,
    $lang: JSON.stringify(languageField(locale)),
  });

  try {
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params}`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) return null;
    const payload = (await response.json()) as { result?: CmsContent };
    return payload.result ?? null;
  } catch {
    return null;
  }
}
