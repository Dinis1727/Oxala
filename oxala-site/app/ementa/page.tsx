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
    <div className="-mx-4 -mt-28 -mb-16 bg-[#f7f2e9] px-4 pt-20 sm:-mx-6 sm:px-6 sm:pt-24 lg:-mx-8 lg:px-8">
      <MenuContent categorias={categorias} />
    </div>
  );
}
