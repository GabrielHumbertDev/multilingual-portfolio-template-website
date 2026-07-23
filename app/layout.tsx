import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "https";
  const base = host ? `${protocol}://${host}` : "http://localhost:3000";

  return {
    metadataBase: new URL(base),
    title: {
      default: "Gabriel Gomes — HRIS, SAP SuccessFactors & Software Engineering",
      template: "%s — Gabriel Gomes",
    },
    description:
      "Gabriel Gomes connects SAP SuccessFactors, enterprise systems, software engineering, cybersecurity and responsible AI.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      type: "website",
      title: "Gabriel Gomes — Enterprise systems, engineered around people",
      description:
        "HRIS, SAP SuccessFactors, software engineering, cybersecurity and responsible automation.",
      images: [{ url: new URL("/og.png", base).toString(), width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gabriel Gomes — Enterprise systems, engineered around people",
      description:
        "HRIS, SAP SuccessFactors, software engineering, cybersecurity and responsible automation.",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
