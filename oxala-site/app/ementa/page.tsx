import { cookies } from "next/headers";
import MenuContent from "@/components/MenuContent";
import { fetchMenu } from "@/lib/menu";
import { LANGUAGE_COOKIE, defaultLanguage, isLanguageCode, LanguageCode } from "@/lib/i18n";

async function resolveLanguage(): Promise<LanguageCode> {
  const cookieLang = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;
}

export default async function EmentaPage() {
  const language = await resolveLanguage();
  const categorias = await fetchMenu(language);

  return (
    <MenuContent categorias={categorias} />
  );
}
