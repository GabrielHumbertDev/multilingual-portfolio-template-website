import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { getCmsContent } from "@/lib/sanity";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const cms = await getCmsContent("en");
  const displayName = cms?.profile?.displayName || "Gabriel Humbert";
  const description =
    cms?.profile?.introduction ||
    "Gabriel Humbert connects SAP SuccessFactors, enterprise systems, software engineering, cybersecurity and responsible AI.";
  const host =
    requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "https";
  const base = host ? `${protocol}://${host}` : "http://localhost:3000";

  return {
    metadataBase: new URL(base),
    title: {
      default: `${displayName} — HRIS, SAP SuccessFactors & Software Engineering`,
      template: `%s — ${displayName}`,
    },
    description,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      type: "website",
      title: `${displayName} — Enterprise systems, engineered around people`,
      description,
      images: [
        {
          url: new URL("/og.png", base).toString(),
          width: 1536,
          height: 1024,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} — Enterprise systems, engineered around people`,
      description,
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
