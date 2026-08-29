import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
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
  metadataBase: new URL("https://mateob6.github.io"),
  title: {
    default: "Mateo Belalcazar",
    template: "%s — Mateo Belalcazar",
  },
  description:
    "Doctoral researcher in Psychology at Universidad del Valle, Colombia. Research in cognitive development, neuropsychology, psychological measurement, and computational methods.",
  keywords: [
    "Mateo Belalcazar",
    "psychology",
    "statistics",
    "Universidad del Valle",
    "CIDEAS",
    "cognitive development",
    "neuropsychology",
    "psychological measurement",
  ],
  authors: [{ name: "Mateo Belalcázar" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Mateo Belalcazar",
    title: "Mateo Belalcazar",
    description:
      "Doctoral researcher in Psychology at Universidad del Valle, Colombia. Research in cognitive development, neuropsychology, psychological measurement, and computational methods.",
    url: "https://mateob6.github.io",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateo Belalcazar",
    description:
      "Doctoral researcher in Psychology at Universidad del Valle. Cognitive development, neuropsychology, measurement, computational methods.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      data-title-en="Mateo Belalcazar"
      data-title-es="Mateo Belalcazar"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
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
      </body>
    </html>
  );
}
