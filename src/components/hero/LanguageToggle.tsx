"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

const locales: { code: Locale; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
];

type LanguageToggleProps = {
  onLight?: boolean;
};

export function LanguageToggle({ onLight = false }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();

  const activeText = onLight ? "text-foreground" : "text-white";
  const inactiveText = onLight
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/45 hover:text-white/80";
  const separator = onLight ? "text-muted-foreground/40" : "text-white/30";

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
    >
      {locales.map((item, index) => {
        const active = item.code === locale;
        return (
          <span key={item.code} className="flex items-center gap-2">
            <button
              type="button"
              data-cursor="view"
              aria-pressed={active}
              onClick={() => setLocale(item.code)}
              className={cn(
                "transition-colors duration-200 focus-visible:outline-none focus-visible:underline",
                active ? activeText : inactiveText,
              )}
            >
              {item.label}
            </button>
            {index < locales.length - 1 && (
              <span aria-hidden className={separator}>
                ·
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
