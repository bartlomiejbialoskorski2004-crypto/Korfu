import type { AnchorHTMLAttributes, ReactNode } from "react";

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function NavLink({ children, className = "", ...rest }: NavLinkProps) {
  return (
    <a
      data-cursor="view"
      className={[
        "relative inline-block uppercase tracking-[0.2em] text-xs font-medium",
        "text-white/85 hover:text-white transition-colors",
        "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0",
        "after:bg-current after:transition-[width] after:duration-300 after:ease-out",
        "hover:after:w-full focus-visible:after:w-full",
        "focus-visible:outline-none focus-visible:text-white",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </a>
  );
}
