export type LanguageCode = "pt" | "en" | "fr" | "es";

export const languageOptions: Array<{ code: LanguageCode; label: string; shortLabel: string }> = [
  { code: "pt", label: "Português", shortLabel: "PT" },
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "es", label: "Español", shortLabel: "ES" },
];

export const defaultLanguage: LanguageCode = "pt";
export const LANGUAGE_COOKIE = "oxala-language";

export function isLanguageCode(value?: string | null): value is LanguageCode {
  if (!value) return false;
  return languageOptions.some((option) => option.code === value);
}

type TranslationShape = {
  nav: {
    home: string;
    menu: string;
    wines: string;
  };
  header: {
    menuToggle: string;
  };
  menu: {
    introTag: string;
    introTitle: string;
    introDescription: string;
    categoryLabel: string;
    fishNote: string;
    meatNote: string;
    taxLine1: string;
    taxLine2: string;
    taxLaw: string;
  };
  home: {
    heroTitle: string;
    heroDescription: string;
    ctaMenu: string;
    ctaWines: string;
  };
  footer: {
    tagline: string;
    description: string;
    visitUs: string;
    reservations: string;
    socials: string;
    rights: string;
  };
  vinhos: {
    title: string;
    description: string;
  };
};

export const translations: Record<LanguageCode, TranslationShape> = {
  pt: {
    nav: {
      home: "Início",
      menu: "Ementa",
      wines: "Carta de Vinhos",
    },
    header: {
      menuToggle: "Abrir menu",
    },
    menu: {
      introTag: "A nossa cozinha",
      introTitle: "Ementa do Oxalá",
      introDescription:
        "A seleção de pratos do Oxalá é cuidadosamente elaborada para proporcionar uma experiência gastronómica única.",
      categoryLabel: "Categoria",
      fishNote: "Guarnecidos com batata, legumes e salada | pratos individuais sob consulta",
      meatNote: "Guarnecidos com batata, arroz e salada | pratos individuais sob consulta",
      taxLine1: "IVA incluído em todos os preços apresentados.",
      taxLine2:
        "Nenhum prato, produto alimentar ou bebida, incluindo o couvert, pode ser cobrado se não for solicitado pelo cliente ou por este for inutilizado.",
      taxLaw: "Decreto-Lei 10/2015",
    },
    home: {
      heroTitle: "Restaurante Oxalá",
      heroDescription:
        "Cozinha atlântica e ria em Ovar, apresentada numa ementa digital elegante e atualizada.",
      ctaMenu: "Ver ementa",
      ctaWines: "Ver carta de vinhos",
    },
    footer: {
      tagline: "Restaurante Oxalá",
      description: "A melhor experiência gastronómica em Ovar.",
      visitUs: "Visite-nos",
      reservations: "Reservas",
      socials: "Redes sociais",
      rights: "Todos os direitos reservados.",
    },
    vinhos: {
      title: "Carta de Vinhos",
      description:
        "A seleção de vinhos do Oxalá diretamente da maior garrafeira nacional para complementar a sua refeição.",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      wines: "Wine List",
    },
    header: {
      menuToggle: "Toggle menu",
    },
    menu: {
      introTag: "Our kitchen",
      introTitle: "Oxalá Menu",
      introDescription:
        "Oxalá’s selection of dishes is carefully curated to deliver a unique gastronomic experience.",
      categoryLabel: "Category",
      fishNote: "Served with potatoes, vegetables and salad | individual portions on request",
      meatNote: "Served with potatoes, rice and salad | individual portions on request",
      taxLine1: "VAT included in all listed prices.",
      taxLine2:
        "No dish, food product or beverage, including couvert, can be charged if not requested by the guest or if unusable.",
      taxLaw: "Decree-Law 10/2015",
    },
    home: {
      heroTitle: "Oxalá Restaurant",
      heroDescription:
        "Atlantic-inspired cuisine in Ovar, presented in an elegant, always up-to-date digital menu.",
      ctaMenu: "View menu",
      ctaWines: "View wine list",
    },
    footer: {
      tagline: "Oxalá Restaurant",
      description: "The finest gastronomic experience in Ovar.",
      visitUs: "Visit us",
      reservations: "Reservations",
      socials: "Social media",
      rights: "All rights reserved.",
    },
    vinhos: {
      title: "Wine List",
      description: "Oxalá’s wine selection curated from the largest national cellar to pair with your meal.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      menu: "Carte",
      wines: "Carte des vins",
    },
    header: {
      menuToggle: "Ouvrir le menu",
    },
    menu: {
      introTag: "Notre cuisine",
      introTitle: "Menu d’Oxalá",
      introDescription:
        "La sélection de plats d’Oxalá est soigneusement élaborée pour offrir une expérience gastronomique unique.",
      categoryLabel: "Catégorie",
      fishNote: "Servis avec pommes de terre, légumes et salade | plats individuels sur demande",
      meatNote: "Servis avec pommes de terre, riz et salade | plats individuels sur demande",
      taxLine1: "TVA incluse dans tous les prix affichés.",
      taxLine2:
        "Aucun plat, produit alimentaire ou boisson, y compris le couvert, ne peut être facturé s’il n’a pas été demandé par le client ou s’il est inutilisable.",
      taxLaw: "Décret-loi 10/2015",
    },
    home: {
      heroTitle: "Restaurant Oxalá",
      heroDescription:
        "Cuisine inspirée de l’Atlantique à Ovar, présentée dans une carte digitale élégante et toujours à jour.",
      ctaMenu: "Voir la carte",
      ctaWines: "Voir la carte des vins",
    },
    footer: {
      tagline: "Restaurant Oxalá",
      description: "La meilleure expérience gastronomique à Ovar.",
      visitUs: "Rendez-nous visite",
      reservations: "Réservations",
      socials: "Réseaux sociaux",
      rights: "Tous droits réservés.",
    },
    vinhos: {
      title: "Carte des vins",
      description:
        "La sélection de vins d’Oxalá, directement de la plus grande cave nationale, pour accompagner votre repas.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      menu: "Menú",
      wines: "Carta de vinos",
    },
    header: {
      menuToggle: "Abrir menú",
    },
    menu: {
      introTag: "Nuestra cocina",
      introTitle: "Menú de Oxalá",
      introDescription:
        "La selección de platos de Oxalá está cuidadosamente elaborada para ofrecer una experiencia gastronómica única.",
      categoryLabel: "Categoría",
      fishNote: "Acompañados con patata, verduras y ensalada | platos individuales bajo consulta",
      meatNote: "Acompañados con patata, arroz y ensalada | platos individuales bajo consulta",
      taxLine1: "IVA incluido en todos los precios presentados.",
      taxLine2:
        "Ningún plato, producto alimenticio o bebida, incluido el couvert, puede cobrarse si no fue solicitado por el cliente o si se inutiliza.",
      taxLaw: "Decreto-ley 10/2015",
    },
    home: {
      heroTitle: "Restaurante Oxalá",
      heroDescription:
        "Cocina inspirada en el Atlántico en Ovar, presentada en un menú digital elegante y siempre actualizado.",
      ctaMenu: "Ver menú",
      ctaWines: "Ver carta de vinos",
    },
    footer: {
      tagline: "Restaurante Oxalá",
      description: "La mejor experiencia gastronómica en Ovar.",
      visitUs: "Visítanos",
      reservations: "Reservas",
      socials: "Redes sociales",
      rights: "Todos los derechos reservados.",
    },
    vinhos: {
      title: "Carta de vinos",
      description:
        "La selección de vinos de Oxalá directamente de la mayor bodega nacional para acompañar tu comida.",
    },
  },
};
