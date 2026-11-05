import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import localFont from "next/font/local";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { defaultLanguage, LANGUAGE_COOKIE, isLanguageCode } from "@/lib/i18n";

const maisonNeue = localFont({
  src: [
    {
      path: "./fonts/fonnts.com-Maison_Neue_Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Maison_Neue_Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Maison_Neue_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-maison",
  display: "swap",
});
const bigCaslon = localFont({
  src: [
    {
      path: "./fonts/fonnts.com-Big_Caslon_CC_Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-big-caslon",
  display: "swap",
});

export const metadata = {
  title: "Restaurante Oxalá",
  description: "Ementa e Carta de Vinhos - Restaurante Oxalá",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const initialLanguage = isLanguageCode(cookieLang)
    ? cookieLang
    : defaultLanguage;

  return (
    <html lang={initialLanguage}>
      <body
        className={`${maisonNeue.variable} ${bigCaslon.variable} antialiased`}
      >
        <LanguageProvider initialLanguage={initialLanguage}>
          <ScrollToTop />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="site-main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
