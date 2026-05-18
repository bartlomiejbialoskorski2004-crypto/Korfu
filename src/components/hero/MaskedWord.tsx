"use client";

import type { CSSProperties, ReactNode } from "react";

type MaskedWordProps = {
  children: ReactNode;
  src?: string;
  className?: string;
};

export function MaskedWord({
  children,
  src = "/images/hero-poster.jpg",
  className = "",
}: MaskedWordProps) {
  const style: CSSProperties = {
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  };

  return (
    <span className={`inline-block ${className}`} style={style}>
      {children}
    </span>
  );
}
