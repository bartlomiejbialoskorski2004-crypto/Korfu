"use client";

import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

const locales: { code: Locale; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

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
              className={[
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:text-white",
                active ? "text-white" : "text-white/45 hover:text-white/80",
              ].join(" ")}
            >
              {item.label}
            </button>
            {index < locales.length - 1 && (
              <span aria-hidden className="text-white/30">·</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
