"use client";

import { motion } from "motion/react";
import { useLocale } from "@/lib/use-locale";
import { NavLink } from "@/components/ui/NavLink";
import { CorfuLivePill } from "./CorfuLivePill";
import { LanguageToggle } from "./LanguageToggle";

export function TopBar() {
  const { t } = useLocale();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 inset-x-0 z-30"
    >
      <div className="hidden md:flex items-center justify-between px-12 pt-6 pb-3">
        <CorfuLivePill />
        <LanguageToggle />
      </div>

      <div className="hidden md:grid grid-cols-3 items-center px-12 pb-5 border-b border-white/15">
        <nav aria-label="Primary left" className="flex items-center gap-8">
          <NavLink href="#oferta">{t.nav.properties}</NavLink>
          <NavLink href="#korfu">{t.nav.island}</NavLink>
          <NavLink href="#proces">{t.nav.process}</NavLink>
        </nav>

        <div className="flex flex-col items-center text-center select-none">
          <span
            data-cursor="view"
            className="font-medium uppercase tracking-[0.25em] text-base text-white"
          >
            {t.brand.name}
          </span>
          <span className="mt-1 text-[10px] tracking-[0.4em] uppercase text-white/60">
            {t.brand.tagline}
          </span>
        </div>

        <nav aria-label="Primary right" className="flex items-center justify-end gap-8">
          <NavLink href="#o-nas">{t.nav.about}</NavLink>
          <NavLink href="#kontakt">{t.nav.contact}</NavLink>
        </nav>
      </div>

      <div className="md:hidden flex flex-col items-center gap-3 px-6 pt-6 pb-4 border-b border-white/15">
        <div className="flex items-center justify-between w-full">
          <CorfuLivePill />
          <LanguageToggle />
        </div>
        <div className="flex flex-col items-center text-center select-none mt-1">
          <span className="font-medium uppercase tracking-[0.25em] text-sm text-white">
            {t.brand.name}
          </span>
          <span className="mt-1 text-[9px] tracking-[0.4em] uppercase text-white/60">
            {t.brand.tagline}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
