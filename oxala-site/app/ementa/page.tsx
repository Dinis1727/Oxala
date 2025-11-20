import MenuCard from "@/components/MenuCard";
import { fetchMenu } from "@/lib/menu";
import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, defaultLanguage, isLanguageCode, LanguageCode } from "@/lib/i18n";

async function resolveLanguage(): Promise<LanguageCode> {
  const cookieLang = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;
}

export default async function EmentaPage() {
  const language = await resolveLanguage();
  const categorias = await fetchMenu(language);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {categorias.map((categoria) => {
        const pratos = [
          ...(categoria.pratosSemSubcategoria || []),
          ...(categoria.subcategorias || []).flatMap((sub) => sub.pratos || []),
        ];

        if (!pratos.length) {
          return null;
        }

        return (
          <section key={categoria._id} id={(categoria.slugBase || categoria.nome).toLowerCase()}>
            <h2 className="text-3xl font-serif mb-8 border-b border-brand-line pb-2 text-brand-ink">
              {categoria.nome}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pratos.map((prato) => (
                <MenuCard
                  key={prato._id}
                  nome={prato.nome}
                  descricao={prato.descricao}
                  preco={prato.preco}
                  imagemUrl={prato.imagemUrl}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
