"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLocale, hydrateLocaleFromStorage } from "@/lib/use-locale";
import { HeroVideo } from "./HeroVideo";
import { MagneticCTA } from "./MagneticCTA";
import { ScrollIndicator } from "./ScrollIndicator";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    hydrateLocaleFromStorage();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex flex-col min-h-[100dvh] -mt-16 pt-16 w-full overflow-hidden text-white"
    >
      <HeroVideo containerRef={heroRef} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: REVEAL_EASE }}
        >
          <MagneticCTA href="#oferta" ariaLabel={t.hero.cta}>
            {t.hero.cta}
          </MagneticCTA>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: REVEAL_EASE }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
