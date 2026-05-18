"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getHoverSnapshot,
  getServerHoverSnapshot,
  subscribeHoverMedia,
} from "@/lib/client-stores";

export function RootCursor() {
  const reduced = useReducedMotion();
  const hover = useSyncExternalStore(
    subscribeHoverMedia,
    getHoverSnapshot,
    getServerHoverSnapshot,
  );
  const [variant, setVariant] = useState<"default" | "view">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const enabled = hover && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      const hit = target?.closest?.("[data-cursor='view']");
      setVariant(hit ? "view" : "default");
    };

    const handleLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isView = variant === "view";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        animate={{
          width: isView ? 48 : 8,
          height: isView ? 22 : 8,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="-translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center rounded-full"
      >
        {isView && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-black font-medium">
            →
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
