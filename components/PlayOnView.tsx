"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Marca data-active="true" uma vez, quando o bloco entra na tela.
 * As animações (classes demo-*) só existem com esse atributo; sem JS ou sem
 * movimento, o conteúdo já está no estado final.
 */
export function PlayOnView({
  children,
  className = "",
  style,
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-active={active} className={className} style={style}>
      {children}
    </div>
  );
}
