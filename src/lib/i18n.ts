export type Locale = "pl" | "en";

export const dictionary = {
  pl: {
    brand: { name: "KORFU INVESTMENT", tagline: "PREMIUM REAL ESTATE" },
    nav: {
      properties: "Nieruchomości",
      island: "O Korfu",
      process: "Proces",
      about: "O nas",
      contact: "Kontakt",
    },
    hero: {
      eyebrowNumber: "01",
      coords: "39°37′N 19°50′E",
      eyebrowLabel: "Inwestycje na wyspie Korfu",
      headlineBefore: "Twoje miejsce na",
      headlineAccent: "Korfu",
      headlineAfter: ".",
      sub: "Apartamenty inwestycyjne — wybrane okazje, rzetelna analiza, partner na miejscu.",
      cta: "Zobacz oferty",
    },
    weather: { clear: "Bezchmurnie", cloudy: "Pochmurno", rain: "Deszcz", storm: "Burza", snow: "Śnieg", fog: "Mgła" },
    scroll: "Przewiń",
    pauseVideo: "Zatrzymaj wideo",
    playVideo: "Odtwórz wideo",
    soon: "Oferta wkrótce",
  },
  en: {
    brand: { name: "KORFU INVESTMENT", tagline: "PREMIUM REAL ESTATE" },
    nav: {
      properties: "Properties",
      island: "About Corfu",
      process: "Process",
      about: "About",
      contact: "Contact",
    },
    hero: {
      eyebrowNumber: "01",
      coords: "39°37′N 19°50′E",
      eyebrowLabel: "Investments on the island of Corfu",
      headlineBefore: "Your place on",
      headlineAccent: "Corfu",
      headlineAfter: ".",
      sub: "Investment apartments — curated deals, due diligence, partner on the ground.",
      cta: "View listings",
    },
    weather: { clear: "Clear", cloudy: "Cloudy", rain: "Rain", storm: "Storm", snow: "Snow", fog: "Fog" },
    scroll: "Scroll",
    pauseVideo: "Pause video",
    playVideo: "Play video",
    soon: "Coming soon",
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];
