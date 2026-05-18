"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

type HeroVideoProps = {
  containerRef: RefObject<HTMLElement | null>;
  src?: string;
  poster?: string;
};

export function HeroVideo({
  containerRef,
  src = "/video/hero.mp4",
  poster = "/images/hero-poster.jpg",
}: HeroVideoProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  useEffect(() => {
    if (!reduced) return;
    const node = videoRef.current;
    if (!node) return;
    node.pause();
  }, [reduced]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      <motion.video
        ref={videoRef}
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={reduced ? { scale: 1.05 } : { y, scale }}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </motion.video>
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
