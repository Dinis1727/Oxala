import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { defaultLanguage, LANGUAGE_COOKIE, isLanguageCode } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      <body className={`${inter.variable} ${playfair.variable} text-brand-ink antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>
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
