import VinhosContent from "@/components/VinhosContent";
import { client } from "@/sanity/lib/client";
import { vinhosPorIdioma } from "@/sanity/lib/queries";
import { cookies } from "next/headers";
import { defaultLanguage, isLanguageCode, LANGUAGE_COOKIE } from "@/lib/i18n";
import { Vinho } from "@/types/vinho";

export default async function VinhosPage() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const language = isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;

  const vinhos = await client.fetch<Vinho[]>(vinhosPorIdioma, { language });

  return (
    <div className="-mx-4 -mt-28 bg-gradient-to-br from-[#faf4e7]/80 via-[#f4e7d4]/78 to-[#e7dcc6]/78 px-4 pt-20 sm:-mx-6 sm:px-6 sm:pt-24 lg:-mx-8 lg:px-8">
      <VinhosContent vinhos={vinhos} />
    </div>
  );
}
