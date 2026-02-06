import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageSelector from "@/components/LanguageSelector";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { defaultLanguage, LANGUAGE_COOKIE, isLanguageCode } from "@/lib/i18n";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});
const maisonNeue = localFont({
  src: [
    { path: "./fonts/fonnts.com-Maison_Neue_Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/fonnts.com-Maison_Neue_Book.ttf", weight: "400", style: "normal" },
    { path: "./fonts/fonnts.com-Maison_Neue_Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-maison",
  display: "swap",
});
const bigCaslon = localFont({
  src: [{ path: "./fonts/fonnts.com-Big_Caslon_CC_Italic.otf", weight: "400", style: "italic" }],
  variable: "--font-big-caslon",
  display: "swap",
});

export const metadata = {
  title: "Restaurante Oxalá",
  description: "Ementa e Carta de Vinhos - Restaurante Oxalá",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const initialLanguage = isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;

  return (
    <html lang={initialLanguage}>
      <body
        className={`${manrope.variable} ${cormorant.variable} ${maisonNeue.variable} ${bigCaslon.variable} text-brand-ink antialiased`}
      >
        <LanguageProvider initialLanguage={initialLanguage}>
          <ScrollToTop />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-28 pb-16">
              <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end pb-4">
                  <LanguageSelector size="sm" />
                </div>
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
