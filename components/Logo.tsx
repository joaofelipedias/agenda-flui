type SymbolProps = {
  variant?: "default" | "negative";
  className?: string;
};

const SYMBOL_COLORS = {
  default: { body: "#0B6E66", rings: "#0F2A27", wave: "#F3F8F6" },
  negative: { body: "#3CC4B4", rings: "#E8F2EF", wave: "#0C1A18" },
} as const;

/** Símbolo: calendário com argolas + onda + ponto caramelo. Tamanho mínimo 20px. */
export function LogoSymbol({ variant = "default", className }: SymbolProps) {
  const c = SYMBOL_COLORS[variant];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect x="4" y="9" width="56" height="51" rx="16" fill={c.body} />
      <rect x="16.5" y="3" width="7" height="14" rx="3.5" fill={c.rings} />
      <rect x="40.5" y="3" width="7" height="14" rx="3.5" fill={c.rings} />
      <path
        d="M14 43c6-9 12-9 18 0s12 9 18 0"
        fill="none"
        stroke={c.wave}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* O ponto é sempre caramelo, em qualquer versão. */}
      <circle cx="46" cy="26" r="5.5" fill="#F2A93B" />
    </svg>
  );
}

type LogoProps = {
  variant?: "default" | "negative";
  /** Variante pet: selo "pet" depois do wordmark. */
  pet?: boolean;
  size?: "sm" | "md";
  className?: string;
};

/** Logo horizontal: símbolo + wordmark "agenda flui". O texto do wordmark é o nome acessível. */
export function Logo({ variant = "default", pet = false, size = "md", className = "" }: LogoProps) {
  const negative = variant === "negative";
  const symbolSize = size === "sm" ? "size-7" : "size-9";
  const wordSize = size === "sm" ? "text-[1.25rem]" : "text-[1.5rem]";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoSymbol variant={variant} className={`${symbolSize} shrink-0`} />
      <span
        className={`font-display font-bold leading-none tracking-[-0.03em] whitespace-nowrap ${wordSize} ${
          negative ? "text-night-text" : "text-ink"
        }`}
      >
        agenda <span className={negative ? "text-brand-light" : "text-brand"}>flui</span>
      </span>
      {pet ? (
        <>
          {" "}
          <span className="rounded-full bg-caramelo px-2 py-0.5 text-[0.8125rem] font-bold leading-tight text-ink">
          pet
          </span>
        </>
      ) : null}
    </span>
  );
}
