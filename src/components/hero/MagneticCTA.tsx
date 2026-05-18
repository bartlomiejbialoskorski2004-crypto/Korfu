"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type MagneticCTAProps = {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
};

const MAGNET_RADIUS = 120;
const MAGNET_STRENGTH = 0.18;

export function MagneticCTA({ href, children, ariaLabel }: MagneticCTAProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      if (distance > MAGNET_RADIUS) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(dx * MAGNET_STRENGTH);
      y.set(dy * MAGNET_STRENGTH);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduced, x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      data-cursor="view"
      style={reduced ? undefined : { x: springX, y: springY }}
      className={[
        "group inline-flex items-center gap-3 select-none",
        "bg-cobalt text-white px-8 py-4 rounded-full",
        "text-sm uppercase tracking-[0.2em] font-medium",
        "transition-[background,box-shadow] duration-300",
        "hover:bg-[#0019E6] hover:shadow-[0_10px_40px_-10px_rgba(27,43,255,0.55)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
      ].join(" ")}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}
