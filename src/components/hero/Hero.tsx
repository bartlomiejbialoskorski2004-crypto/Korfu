"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLocale, hydrateLocaleFromStorage } from "@/lib/use-locale";
import { HeroVideo } from "./HeroVideo";
import { MaskedWord } from "./MaskedWord";
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

  const headlineWords = [
    ...t.hero.headlineBefore.split(" ").map((w) => ({ kind: "plain" as const, value: w })),
    { kind: "accent" as const, value: t.hero.headlineAccent },
  ];

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
          transition={{ duration: 0.7, delay: 0.1, ease: REVEAL_EASE }}
          className="flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-white/80"
        >
          <span>{t.hero.eyebrowNumber}</span>
          <span aria-hidden className="text-cobalt">·</span>
          <span className="tabular-nums">{t.hero.coords}</span>
          <span aria-hidden className="text-cobalt">·</span>
          <span>{t.hero.eyebrowLabel}</span>
        </motion.div>

        <h1
          className="mt-8 font-medium tracking-tight leading-[1.02] text-5xl sm:text-7xl md:text-[88px] max-w-[14ch]"
          aria-label={`${t.hero.headlineBefore} ${t.hero.headlineAccent}${t.hero.headlineAfter}`}
        >
          <span className="sr-only">
            {t.hero.headlineBefore} {t.hero.headlineAccent}
            {t.hero.headlineAfter}
          </span>
          <span aria-hidden className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word.kind}-${i}`}
                className="inline-block overflow-hidden"
                initial={reduced ? false : { clipPath: "inset(100% 0 0 0)", y: 12 }}
                animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.2 + i * 0.08,
                  ease: REVEAL_EASE,
                }}
              >
                {word.kind === "accent" ? (
                  <MaskedWord>{word.value}</MaskedWord>
                ) : (
                  <span>{word.value}</span>
                )}
                {i === headlineWords.length - 1 && (
                  <span className="text-cobalt">{t.hero.headlineAfter}</span>
                )}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: REVEAL_EASE }}
          className="mt-8 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: REVEAL_EASE }}
          className="mt-10"
        >
          <MagneticCTA href="#oferta" ariaLabel={t.hero.cta}>
            {t.hero.cta}
          </MagneticCTA>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: REVEAL_EASE }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
