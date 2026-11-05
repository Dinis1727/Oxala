import type { LanguageCode } from "@/lib/i18n";

type DesignCopy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  discover: string;
  menuDescription: string;
  wineDescription: string;
  cellarTitle: string;
  cellarDescription: string;
  visitLink: string;
  emailLabel: string;
  galleryTitle: string;
  galleryLink: string;
  galleryAmbience: string;
  skip: string;
  language: string;
  top: string;
  results: string;
  noResults: string;
  reset: string;
  details: string;
  closeMenu: string;
};

export const designCopy: Record<LanguageCode, DesignCopy> = {
  pt: {
    eyebrow: "À mesa, em Ovar",
    title: "O sabor do mar.",
    titleAccent: "O prazer de ficar.",
    discover: "Descubra o Oxalá",
    menuDescription:
      "Do mar à mesa, uma cozinha que celebra o sabor e a tradição.",
    wineDescription:
      "Uma seleção para descobrir, saborear e acompanhar cada momento à mesa.",
    cellarTitle: "Um brinde aos bons momentos.",
    cellarDescription: "Encontre o vinho para acompanhar a sua escolha.",
    visitLink: "Direções",
    emailLabel: "Email",
    galleryTitle: "À mesa do Oxalá",
    galleryLink: "Mais no Instagram",
    galleryAmbience: "O ambiente",
    skip: "Saltar para o conteúdo",
    language: "Idioma",
    top: "Voltar ao topo",
    results: "vinhos",
    noResults: "Não encontrámos vinhos para esta pesquisa.",
    reset: "Limpar pesquisa e filtros",
    details: "Ver detalhes",
    closeMenu: "Fechar menu",
  },
  en: {
    eyebrow: "At the table, in Ovar",
    title: "A taste of the sea.",
    titleAccent: "A reason to linger.",
    discover: "Discover Oxalá",
    menuDescription:
      "From the sea to your table, a cuisine that celebrates flavour and tradition.",
    wineDescription:
      "A selection to discover, savour and enjoy with every moment at the table.",
    cellarTitle: "A toast to good moments.",
    cellarDescription: "Find a wine to pair with your meal.",
    visitLink: "Directions",
    emailLabel: "Email",
    galleryTitle: "At the Oxalá table",
    galleryLink: "More on Instagram",
    galleryAmbience: "The atmosphere",
    skip: "Skip to content",
    language: "Language",
    top: "Back to top",
    results: "wines",
    noResults: "No wines match your search.",
    reset: "Clear search and filters",
    details: "View details",
    closeMenu: "Close menu",
  },
  fr: {
    eyebrow: "À table, à Ovar",
    title: "Le goût de la mer.",
    titleAccent: "Le plaisir de rester.",
    discover: "Découvrez Oxalá",
    menuDescription:
      "De la mer à votre table, une cuisine qui célèbre le goût et la tradition.",
    wineDescription:
      "Une sélection à découvrir et à savourer pour accompagner chaque moment à table.",
    cellarTitle: "Aux bons moments.",
    cellarDescription: "Trouvez le vin qui accompagnera votre repas.",
    visitLink: "Itinéraire",
    emailLabel: "E-mail",
    galleryTitle: "À la table d’Oxalá",
    galleryLink: "Sur Instagram",
    galleryAmbience: "L’ambiance",
    skip: "Aller au contenu",
    language: "Langue",
    top: "Retour en haut",
    results: "vins",
    noResults: "Aucun vin ne correspond à votre recherche.",
    reset: "Effacer la recherche et les filtres",
    details: "Voir les détails",
    closeMenu: "Fermer le menu",
  },
  es: {
    eyebrow: "A la mesa, en Ovar",
    title: "El sabor del mar.",
    titleAccent: "El placer de quedarse.",
    discover: "Descubre Oxalá",
    menuDescription:
      "Del mar a tu mesa, una cocina que celebra el sabor y la tradición.",
    wineDescription:
      "Una selección para descubrir, saborear y acompañar cada momento en la mesa.",
    cellarTitle: "Un brindis por los buenos momentos.",
    cellarDescription: "Encuentra el vino para acompañar tu elección.",
    visitLink: "Cómo llegar",
    emailLabel: "Correo electrónico",
    galleryTitle: "A la mesa de Oxalá",
    galleryLink: "Más en Instagram",
    galleryAmbience: "El ambiente",
    skip: "Ir al contenido",
    language: "Idioma",
    top: "Volver arriba",
    results: "vinos",
    noResults: "No encontramos vinos para esta búsqueda.",
    reset: "Borrar búsqueda y filtros",
    details: "Ver detalles",
    closeMenu: "Cerrar menú",
  },
};
