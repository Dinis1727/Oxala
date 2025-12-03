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
    winesButton: string;
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
    bottleSizeLabel: string;
    alcoholContentLabel: string;
    yearLabel: string;
    emptyState: string;
    regionLabel: string;
    typeLabel: string;
    priceLabel: string;
    closeLabel: string;
    searchPlaceholder: string;
    searchLabel: string;
    filters: {
      title: string;
      all: string;
      region: string;
      type: string;
      apply: string;
      clear: string;
      refine: string;
    };
    bottleSizes: Array<{ value: number; label: string }>;
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
      winesButton: "Ver carta de vinhos",
      taxLine1: "IVA incluído em todos os preços apresentados.",
      taxLine2:
        "Nenhum prato, produto alimentar ou bebida, incluindo o couvert, pode ser cobrado se não for solicitado pelo cliente ou por este for inutilizado.",
      taxLaw: "Decreto-Lei 10/2015",
    },
    home: {
      heroTitle: "Restaurante Oxalá",
      heroDescription:
        "Seja bem-vindo ao Restaurante Oxalá, onde o sabor do mar encontra a tradição e a elegância à mesa. Convidamo-lo a descobrir a nossa ementa e carta de vinhos.",
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
      bottleSizeLabel: "Tamanho da garrafa",
      alcoholContentLabel: "Teor alcoólico (% vol.)",
      yearLabel: "Ano (colheita)",
      emptyState: "Em breve partilharemos a nossa carta de vinhos.",
      regionLabel: "Região",
      typeLabel: "Tipo",
      priceLabel: "Preço",
      closeLabel: "Fechar",
      searchPlaceholder: "Procurar vinho, região, ano...",
      searchLabel: "Pesquisar",
      filters: {
        title: "Filtrar",
        all: "Todas",
        region: "Região",
        type: "Tipo",
        apply: "Ver vinhos",
        clear: "Limpar filtros",
        refine: "Refinar seleção",
      },
      bottleSizes: [
        { value: 187.5, label: "Piccolo: 187,5 ml" },
        { value: 375, label: "Meia garrafa: 375 ml" },
        { value: 750, label: "Garrafa padrão: 750 ml" },
        { value: 1500, label: "Magnum: 1,5 L (1500 ml)" },
        { value: 3000, label: "Jeroboão: 3 L" },
        { value: 4500, label: "Roboão: 4,5 L" },
        { value: 6000, label: "Matusalém: 6 L" },
        { value: 9000, label: "Salmanazar: 9 L" },
        { value: 12000, label: "Baltazar: 12 L" },
        { value: 15000, label: "Nabucodonosor: 15 L" },
        { value: 18000, label: "Salomão: 18 L" },
        { value: 27000, label: "Golias: 27 L" },
        { value: 30000, label: "Melchizedec: 30 L" },
      ],
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
      winesButton: "View wine list",
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
      bottleSizeLabel: "Bottle size",
      alcoholContentLabel: "Alcohol by volume (% ABV)",
      yearLabel: "Vintage year",
      emptyState: "We’re curating the wine list — check back soon.",
      regionLabel: "Region",
      typeLabel: "Type",
      priceLabel: "Price",
      closeLabel: "Close",
      searchPlaceholder: "Search wine, region, year...",
      searchLabel: "Search",
      filters: {
        title: "Filter",
        all: "All",
        region: "Region",
        type: "Type",
        apply: "View wines",
        clear: "Clear filters",
        refine: "Refine selection",
      },
      bottleSizes: [
        { value: 187.5, label: "Piccolo: 187.5 ml" },
        { value: 375, label: "Half bottle: 375 ml" },
        { value: 750, label: "Standard bottle: 750 ml" },
        { value: 1500, label: "Magnum: 1.5 L (1500 ml)" },
        { value: 3000, label: "Jeroboam: 3 L" },
        { value: 4500, label: "Rehoboam: 4.5 L" },
        { value: 6000, label: "Methuselah: 6 L" },
        { value: 9000, label: "Salmanazar: 9 L" },
        { value: 12000, label: "Balthazar: 12 L" },
        { value: 15000, label: "Nebuchadnezzar: 15 L" },
        { value: 18000, label: "Solomon: 18 L" },
        { value: 27000, label: "Goliath: 27 L" },
        { value: 30000, label: "Melchizedek: 30 L" },
      ],
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
      winesButton: "Voir la carte des vins",
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
      bottleSizeLabel: "Taille de la bouteille",
      alcoholContentLabel: "Teneur en alcool (% vol.)",
      yearLabel: "Millésime",
      emptyState: "Notre carte des vins arrive très bientôt.",
      regionLabel: "Région",
      typeLabel: "Type",
      priceLabel: "Prix",
      closeLabel: "Fermer",
      searchPlaceholder: "Chercher vin, région, année...",
      searchLabel: "Rechercher",
      filters: {
        title: "Filtrer",
        all: "Toutes",
        region: "Région",
        type: "Type",
        apply: "Voir les vins",
        clear: "Effacer les filtres",
        refine: "Affiner la sélection",
      },
      bottleSizes: [
        { value: 187.5, label: "Piccolo : 187,5 ml" },
        { value: 375, label: "Demi-bouteille : 375 ml" },
        { value: 750, label: "Bouteille standard : 750 ml" },
        { value: 1500, label: "Magnum : 1,5 L (1500 ml)" },
        { value: 3000, label: "Jéroboam : 3 L" },
        { value: 4500, label: "Réhoboam : 4,5 L" },
        { value: 6000, label: "Mathusalem : 6 L" },
        { value: 9000, label: "Salmanazar : 9 L" },
        { value: 12000, label: "Balthazar : 12 L" },
        { value: 15000, label: "Nabuchodonosor : 15 L" },
        { value: 18000, label: "Salomon : 18 L" },
        { value: 27000, label: "Goliath : 27 L" },
        { value: 30000, label: "Melchisédech : 30 L" },
      ],
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
      winesButton: "Ver carta de vinos",
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
      bottleSizeLabel: "Tamaño de la botella",
      alcoholContentLabel: "Graduación alcohólica (% vol.)",
      yearLabel: "Año (cosecha)",
      emptyState: "Muy pronto compartiremos nuestra carta de vinos.",
      regionLabel: "Región",
      typeLabel: "Tipo",
      priceLabel: "Precio",
      closeLabel: "Cerrar",
      searchPlaceholder: "Buscar vino, región, año...",
      searchLabel: "Buscar",
      filters: {
        title: "Filtrar",
        all: "Todas",
        region: "Región",
        type: "Tipo",
        apply: "Ver vinos",
        clear: "Limpiar filtros",
        refine: "Refinar selección",
      },
      bottleSizes: [
        { value: 187.5, label: "Piccolo: 187,5 ml" },
        { value: 375, label: "Media botella: 375 ml" },
        { value: 750, label: "Botella estándar: 750 ml" },
        { value: 1500, label: "Magnum: 1,5 L (1500 ml)" },
        { value: 3000, label: "Jeroboam: 3 L" },
        { value: 4500, label: "Roboam: 4,5 L" },
        { value: 6000, label: "Matusalén: 6 L" },
        { value: 9000, label: "Salmanazar: 9 L" },
        { value: 12000, label: "Baltasar: 12 L" },
        { value: 15000, label: "Nabucodonosor: 15 L" },
        { value: 18000, label: "Salomón: 18 L" },
        { value: 27000, label: "Goliat: 27 L" },
        { value: 30000, label: "Melquisedec: 30 L" },
      ],
    },
  },
};
