import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/Portfolio";
import { content, isLocale } from "@/lib/content";
import { getCmsContent } from "@/lib/sanity";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: content[locale].nav.credentials,
    description: content[locale].sections.credentials.intro,
  };
}

export default async function Credentials({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const cms = await getCmsContent(locale);
  return <Portfolio locale={locale} page="credentials" cms={cms} />;
}
