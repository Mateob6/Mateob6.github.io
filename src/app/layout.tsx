import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { GoatCounterTracker } from "@/components/layout/goatcounter-tracker";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PERSON_ID, baseOpenGraph } from "@/lib/seo";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "Mateo Belalcazar — Psychometrics & Computational Psychology",
    template: "%s — Mateo Belalcazar",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Mateo Belalcazar",
    "Mateo Belalcázar",
    "psychometrics",
    "quantitative methodology",
    "computational psychology",
    "psychological measurement",
    "statistics",
    "cognitive development",
    "Universidad del Valle",
    "CIDEAS",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  openGraph: {
    ...baseOpenGraph,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  // No title/description here: Next fills them from each page's own metadata
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-title-en="Mateo Belalcazar"
      data-title-es="Mateo Belalcazar"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              inLanguage: ["en", "es"],
              author: { "@id": PERSON_ID },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=localStorage.getItem('lang');if(l)document.documentElement.lang=l})();`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 pb-20 sm:pb-8">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <Analytics />
        <GoatCounterTracker />
        <script
          data-goatcounter="https://mateob6.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
