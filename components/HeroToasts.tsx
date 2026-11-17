"use client";

import { BellRing, CalendarPlus, PawPrint } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/motion";

const ICONS = { booking: CalendarPlus, reminder: BellRing, ready: PawPrint } as const;
const INTERVAL_MS = 3400;

/** Notificações do sistema se alternando ao lado do card do hero (decorativo). */
export function HeroToasts() {
  const toasts = site.hero.toasts;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % toasts.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduced, visible, toasts.length]);

  const toast = toasts[index];
  const Icon = ICONS[toast.kind];

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute right-3 -bottom-7 z-20 sm:right-8 lg:-right-4 lg:-bottom-6">
      <div
        key={index}
        className="anim-rise flex w-[272px] items-center gap-3 rounded-card bg-surface p-3 pr-4 shadow-pop"
      >
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
            toast.kind === "ready" ? "bg-caramelo-tint" : "bg-brand-tint"
          }`}
        >
          <Icon className="size-5 text-brand" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[0.8125rem] leading-5 font-bold text-ink">{toast.title}</span>
            <span className="shrink-0 text-[0.6875rem] text-ink-muted">agora</span>
          </span>
          <span className="block truncate text-[0.8125rem] leading-5 text-ink-muted">{toast.text}</span>
        </span>
      </div>
    </div>
  );
}
