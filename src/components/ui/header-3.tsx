"use client";

import React from "react";
import {
  Anchor,
  Building2,
  Castle,
  Compass,
  FileSpreadsheet,
  KeyRound,
  Lock,
  Mountain,
  Sailboat,
  Sparkles,
  TreePalm,
  TrendingUp,
  Waves,
} from "lucide-react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CorfuLivePill } from "@/components/hero/CorfuLivePill";
import { LanguageToggle } from "@/components/hero/LanguageToggle";
import { useLocale } from "@/lib/use-locale";

type Localized = { pl: string; en: string };

type LinkItem = {
  title: Localized;
  href: string;
  icon: LucideIcon;
  description?: Localized;
};

const investmentLinks: LinkItem[] = [
  {
    title: { pl: "Apartamenty", en: "Apartments" },
    href: "#oferta",
    description: {
      pl: "Wybrane apartamenty z widokiem na morze",
      en: "Curated sea-view apartments",
    },
    icon: Building2,
  },
  {
    title: { pl: "Wille i rezydencje", en: "Villas & estates" },
    href: "#oferta",
    description: {
      pl: "Wolnostojące inwestycje pod wynajem premium",
      en: "Standalone homes for premium-stay yields",
    },
    icon: Castle,
  },
  {
    title: { pl: "Off-Market", en: "Off-market" },
    href: "#oferta",
    description: {
      pl: "Oferty poza publicznym rynkiem",
      en: "Listings outside the public market",
    },
    icon: Lock,
  },
  {
    title: { pl: "Nowe inwestycje", en: "New developments" },
    href: "#oferta",
    description: {
      pl: "Apartamenty w budowie i przedsprzedaży",
      en: "Pre-sale and under-construction projects",
    },
    icon: Sparkles,
  },
  {
    title: { pl: "Analiza najmu", en: "Yield analysis" },
    href: "#oferta",
    description: {
      pl: "Symulacja stopy zwrotu i obłożenia",
      en: "Occupancy and ROI simulations",
    },
    icon: TrendingUp,
  },
  {
    title: { pl: "Pobierz katalog", en: "Download catalog" },
    href: "#oferta",
    description: {
      pl: "PDF z aktualną listą okazji",
      en: "PDF brochure with current opportunities",
    },
    icon: FileSpreadsheet,
  },
];

const locationLinks: LinkItem[] = [
  {
    title: { pl: "Korfu Miasto", en: "Corfu Town" },
    href: "#korfu",
    description: {
      pl: "Stolica wyspy, UNESCO, marina premium",
      en: "Capital of the island, UNESCO, premium marina",
    },
    icon: Compass,
  },
  {
    title: { pl: "Kassiopi", en: "Kassiopi" },
    href: "#korfu",
    description: {
      pl: "Północne wybrzeże, ciche zatoki",
      en: "Northern coast, quiet coves",
    },
    icon: Anchor,
  },
  {
    title: { pl: "Paleokastritsa", en: "Paleokastritsa" },
    href: "#korfu",
    description: {
      pl: "Klify zachodu, turkusowe wody",
      en: "Western cliffs, turquoise waters",
    },
    icon: Mountain,
  },
];

const locationLinksSecondary: LinkItem[] = [
  {
    title: { pl: "Sidari", en: "Sidari" },
    href: "#korfu",
    icon: Waves,
  },
  {
    title: { pl: "Kavos", en: "Kavos" },
    href: "#korfu",
    icon: Sailboat,
  },
  {
    title: { pl: "Gouvia", en: "Gouvia" },
    href: "#korfu",
    icon: TreePalm,
  },
  {
    title: { pl: "Klucze pod opieką", en: "Keys under management" },
    href: "#proces",
    icon: KeyRound,
  },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const { locale, t } = useLocale();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLight = scrolled;
  const textClass = onLight ? "text-foreground" : "text-white";
  const triggerBase = "bg-transparent uppercase tracking-[0.15em] text-xs font-medium";
  const triggerLight = "data-[state=open]:bg-accent/60 data-[state=open]:text-foreground hover:bg-accent/60 hover:text-foreground";
  const triggerDark =
    "data-[state=open]:bg-white/10 data-[state=open]:text-white hover:bg-white/10 hover:text-white";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-colors duration-300",
        scrolled &&
          "bg-background/95 supports-[backdrop-filter]:bg-background/70 border-border backdrop-blur-lg",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-16 w-full items-center justify-between px-6 md:px-10",
          textClass,
        )}
      >
        <div className="flex items-center gap-6 md:gap-10">
          <a
            href="#"
            data-cursor="view"
            aria-label={t.brand.name}
            className="group flex flex-col leading-none"
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em]">
              {t.brand.name}
            </span>
            <span
              className={cn(
                "mt-1 text-[9px] tracking-[0.45em] uppercase",
                onLight ? "text-muted-foreground" : "text-white/60",
              )}
            >
              {t.brand.tagline}
            </span>
          </a>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(triggerBase, onLight ? triggerLight : triggerDark)}
                >
                  {locale === "pl" ? "Inwestycje" : "Investments"}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover p-1 pr-1.5">
                  <ul className="bg-popover grid w-[34rem] grid-cols-2 gap-2 rounded-md border p-2 shadow">
                    {investmentLinks.map((item, i) => (
                      <li key={i}>
                        <DropdownItem item={item} locale={locale} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-muted-foreground text-sm">
                      {locale === "pl" ? "Zainteresowany? " : "Interested? "}
                      <a
                        href="#kontakt"
                        className="text-foreground font-medium hover:underline"
                      >
                        {locale === "pl"
                          ? "Umów prezentację"
                          : "Book a private viewing"}
                      </a>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(triggerBase, onLight ? triggerLight : triggerDark)}
                >
                  {locale === "pl" ? "Lokalizacje" : "Localizations"}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover p-1 pr-1.5 pb-1.5">
                  <div className="grid w-[34rem] grid-cols-2 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                      {locationLinks.map((item, i) => (
                        <li key={i}>
                          <DropdownItem item={item} locale={locale} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-3">
                      {locationLinksSecondary.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink
                            href={item.href}
                            className="flex items-center gap-2 rounded-md p-2 hover:bg-accent text-sm"
                          >
                            <item.icon className="text-foreground size-4" />
                            <span className="font-medium">{item.title[locale]}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuLink className="px-4" asChild>
                <a
                  href="#kontakt"
                  data-cursor="view"
                  className={cn(
                    "rounded-md px-3 py-2 uppercase tracking-[0.15em] text-xs font-medium transition-colors",
                    onLight
                      ? "hover:bg-accent hover:text-accent-foreground"
                      : "hover:bg-white/10 hover:text-white",
                  )}
                >
                  {locale === "pl" ? "Kontakt" : "Contact"}
                </a>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle onLight={onLight} />
          <Button asChild className="rounded-full px-6">
            <a href="#kontakt" data-cursor="view">
              {locale === "pl" ? "Umów prezentację" : "Book a viewing"}
            </a>
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className={cn(
            "md:hidden",
            !onLight && "bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { locale, t } = useLocale();
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/70 backdrop-blur-lg text-foreground",
        "fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-y-auto border-y md:hidden",
      )}
    >
      <div className="size-full p-4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <CorfuLivePill tone="light" />
          <LanguageToggle onLight />
        </div>

        <Section title={locale === "pl" ? "Inwestycje" : "Investments"}>
          {investmentLinks.map((item, i) => (
            <MobileItem key={i} item={item} locale={locale} onClose={onClose} />
          ))}
        </Section>

        <Section title={locale === "pl" ? "Lokalizacje" : "Localizations"}>
          {locationLinks.map((item, i) => (
            <MobileItem key={i} item={item} locale={locale} onClose={onClose} />
          ))}
          {locationLinksSecondary.map((item, i) => (
            <MobileItem key={`s-${i}`} item={item} locale={locale} onClose={onClose} />
          ))}
        </Section>

        <a
          href="#kontakt"
          onClick={onClose}
          className="rounded-md border p-3 text-sm font-medium uppercase tracking-[0.15em] hover:bg-accent"
        >
          {t.nav.contact}
        </a>

        <Button asChild className="rounded-full">
          <a href="#kontakt" onClick={onClose}>
            {locale === "pl" ? "Umów prezentację" : "Book a viewing"}
          </a>
        </Button>
      </div>
    </div>,
    document.body,
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-1">
      <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">
        {title}
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </section>
  );
}

function MobileItem({
  item,
  locale,
  onClose,
}: {
  item: LinkItem;
  locale: "pl" | "en";
  onClose: () => void;
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      onClick={onClose}
      className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
    >
      <div className="bg-background/40 flex aspect-square size-10 items-center justify-center rounded-md border">
        <Icon className="text-foreground size-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{item.title[locale]}</span>
        {item.description && (
          <span className="text-xs text-muted-foreground">
            {item.description[locale]}
          </span>
        )}
      </div>
    </a>
  );
}

function DropdownItem({ item, locale }: { item: LinkItem; locale: "pl" | "en" }) {
  const Icon = item.icon;
  return (
    <NavigationMenuLink
      className="w-full flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground rounded-sm p-2"
      asChild
    >
      <a href={item.href} data-cursor="view">
        <div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm">
          <Icon className="text-foreground size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium text-sm">{item.title[locale]}</span>
          {item.description && (
            <span className="text-muted-foreground text-xs">
              {item.description[locale]}
            </span>
          )}
        </div>
      </a>
    </NavigationMenuLink>
  );
}

function subscribeScroll(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

function getScrollSnapshot() {
  if (typeof window === "undefined") return 0;
  return window.scrollY;
}

function getServerScrollSnapshot() {
  return 0;
}

function useScroll(threshold: number) {
  const scrollY = React.useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );
  return scrollY > threshold;
}
