import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://gabrielhumbertdev.com";
const socialImage = `${siteUrl}/og.png?v=8`;
const socialTitle =
  "Gabriel Humbert — Enterprise systems, engineered around people";
const socialDescription =
  "Gabriel Humbert is a London-based HRIS Analyst supporting SAP SuccessFactors across a global organisation, combining enterprise systems, software engineering and responsible AI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HRIS, SAP SuccessFactors & Software Engineering — Gabriel Humbert",
    template: "%s — Gabriel Humbert",
  },
  description: socialDescription,
  alternates: {
    canonical: "/en",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/en`,
    siteName: "Gabriel Humbert Dev",
    locale: "en_GB",
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: socialImage,
        secureUrl: socialImage,
        width: 1536,
        height: 1024,
        type: "image/png",
        alt: "Gabriel Humbert professional portfolio — enterprise systems, HRIS and software engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImage],
  },
};

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
