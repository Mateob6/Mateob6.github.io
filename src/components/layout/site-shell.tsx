// The <html> of every page. Two root layouts use it (app/(en)/layout.tsx for /, app/es/layout.tsx for /es),
// so each URL is served with its own lang attribute, title and descriptions.
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { GoatCounterTracker } from "@/components/layout/goatcounter-tracker";
import { PanalFondo, PanalLuz } from "@/components/layout/panal";
import { inter, lora } from "@/lib/fonts";
import type { Lang } from "@/lib/i18n";
import { setLang } from "@/lib/lang-server";
import { jsonLd } from "@/lib/schema";
import { PERSON_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL, WEBSITE_ID } from "@/lib/seo";
import "@/app/globals.css";

const THEME_SCRIPT = `(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}})();`;

// The language the visitor chose with the toggle (LanguageToggle stores it): a page opened in the other language is
// replaced by its counterpart before paint. Crawlers keep no storage, so they always get the URL they asked for.
// /skills and /awards exist only in English (they redirect to the home: /#skills, /#awards).
const LANG_SCRIPT = `(function(){try{var p=localStorage.getItem('lang'),l=document.documentElement.lang,s=location.pathname;if((p!=='en'&&p!=='es')||p===l||/^\\/(skills|awards)\\/?$/.test(s))return;var t=p==='es'?(s==='/'?'/es':'/es'+s):(s==='/es'||s==='/es/'?'/':s.replace(/^\\/es(?=\\/)/,''));location.replace(t+location.search+location.hash)}catch(e){}})();`;

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  setLang(lang);
  return (
    <html lang={lang} suppressHydrationWarning className={`${lora.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION[lang],
            inLanguage: ["en", "es"],
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
          })}
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body className="relative flex min-h-screen flex-col font-sans">
        <PanalFondo />
        <PanalLuz />
        <Header lang={lang} />
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 pb-20 sm:pb-8">{children}</main>
        <Footer />
        <MobileNav lang={lang} />
        <GoatCounterTracker />
        <script data-goatcounter="https://mateob6.goatcounter.com/count" async src="//gc.zgo.at/count.js" />
      </body>
    </html>
  );
}
