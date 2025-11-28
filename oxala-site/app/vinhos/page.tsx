import Container from "@/components/Container";
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
    <Container>
      <VinhosContent vinhos={vinhos} />
    </Container>
  );
}
