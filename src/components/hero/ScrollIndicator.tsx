"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/use-locale";

export function ScrollIndicator() {
  const reduced = useReducedMotion();
  const { t } = useLocale();

  return (
    <div
      aria-hidden
      className="flex flex-col items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/60"
    >
      <span>{t.scroll}</span>
      <motion.span
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-px h-10 bg-white/50 origin-top"
      />
    </div>
  );
}
