import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { defaultLanguage, LANGUAGE_COOKIE, isLanguageCode } from "@/lib/i18n";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
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
      <body className={`${manrope.variable} ${cormorant.variable} text-brand-ink antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>
          <ScrollToTop />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-28 pb-16">
              <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
