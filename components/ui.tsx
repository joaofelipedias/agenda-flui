import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "dark";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-strong active:bg-brand-strong",
  secondary: "bg-surface text-ink border border-line hover:border-ink-muted",
  dark: "bg-ink text-white hover:bg-[#1b3d39]",
};

export function buttonClasses(variant: Variant = "primary", extra = "") {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[1rem] font-bold leading-5 transition duration-150 ease-out active:scale-[0.98] ${VARIANTS[variant]} ${extra}`;
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: Variant };

/** Link com cara de botão (pílula). O texto diz a ação; nada de setas. */
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <a className={buttonClasses(variant, className)} {...props} />;
}

/** Bolha decorativa (espuma do banho). Posicione com classes absolutas. */
export function Bubble({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute rounded-full ${className}`} />;
}
