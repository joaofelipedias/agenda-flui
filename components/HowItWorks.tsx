"use client";

import { Camera, Check, CheckCheck, Copy, Lock, MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { site } from "@/content/site";
import { useMediaQuery, useReducedMotion } from "@/lib/motion";

const CYCLE_MS = 4200;
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/* ---------- Mini-telas (ilustrativas, aria-hidden) ---------- */

function ServicesDemo() {
  const { services } = site.howItWorks.demos;
  return (
    <div className="grid gap-1.5">
      {services.map((service, i) => (
        <div
          key={service.name}
          className="demo-rise flex items-center gap-2 rounded-[8px] bg-surface px-3 py-1.5"
          style={delay(i * 110)}
        >
          <span className="min-w-0 flex-1 truncate text-[0.8125rem] leading-5 font-semibold">{service.name}</span>
          <span className="shrink-0 text-[0.6875rem] text-ink-muted">{service.meta}</span>
          <span className="demo-track relative h-5 w-[34px] shrink-0 rounded-full bg-brand" style={delay(650 + i * 170)}>
            <span
              className="demo-knob absolute top-[3px] left-[3px] size-[14px] translate-x-[14px] rounded-full bg-white"
              style={delay(650 + i * 170)}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function LinkDemo() {
  const { url, copied, channels } = site.howItWorks.demos;
  const [domain, slug] = url.split("/");
  const icons = [Camera, MessageCircle, Search];
  return (
    <div className="flex h-full flex-col">
      <div className="demo-rise flex items-center gap-2 rounded-[8px] border border-line bg-surface px-3 py-2.5">
        <Lock className="size-3.5 shrink-0 text-ink-muted" strokeWidth={2} />
        <span className="min-w-0 flex-1 overflow-hidden text-[0.75rem] font-semibold whitespace-nowrap sm:text-[0.8125rem]">
          <span className="demo-type inline-block overflow-hidden align-bottom" style={delay(250)}>
            {domain}/<span className="text-brand">{slug}</span>
          </span>
          <span className="demo-caret ml-px inline-block h-3.5 w-[2px] translate-y-0.5 bg-brand opacity-0" style={delay(250)} />
        </span>
        <Copy className="size-3.5 shrink-0 text-ink-muted" strokeWidth={2} />
      </div>
      <span
        className="demo-pop mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[0.75rem] font-semibold"
        style={delay(1450)}
      >
        <Check className="size-3.5 text-success" strokeWidth={2.5} />
        {copied}
      </span>
      <div className="mt-auto grid grid-cols-3 gap-2">
        {channels.map((channel, i) => {
          const Icon = icons[i] ?? Search;
          return (
            <span
              key={channel}
              className="demo-rise flex flex-col items-center gap-1 rounded-[8px] bg-surface py-2 text-[0.6875rem] font-semibold"
              style={delay(1750 + i * 140)}
            >
              <Icon className="size-4 text-brand" strokeWidth={2} />
              {channel}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function DayDemo() {
  const { bookings, reminders } = site.howItWorks.demos;
  return (
    <div className="flex h-full flex-col gap-1.5">
      {bookings.map((booking, i) => (
        <div key={booking.time} className="flex items-center gap-2">
          <span className="tabular w-9 shrink-0 text-[0.6875rem] text-ink-muted">{booking.time}</span>
          <span
            className={`demo-drop min-w-0 flex-1 truncate rounded-[6px] px-2.5 py-1.5 text-[0.75rem] ${
              booking.service === "táxi dog" ? "bg-caramelo text-ink" : "bg-brand text-on-brand"
            }`}
            style={delay(200 + i * 220)}
          >
            <strong className="font-bold">{booking.pet}</strong> · {booking.service}
          </span>
        </div>
      ))}
      <div
        className="demo-rise mt-auto flex items-center gap-2 rounded-[8px] bg-ink px-3 py-2 text-[0.75rem] font-semibold text-white"
        style={delay(1100)}
      >
        <CheckCheck className="size-4 shrink-0 text-brand-light" strokeWidth={2} />
        {reminders}
      </div>
    </div>
  );
}

const DEMOS: (() => ReactNode)[] = [ServicesDemo, LinkDemo, DayDemo];

/* ---------- Seção ---------- */

/**
 * Os três passos tocam em sequência, como um tour do produto (desktop),
 * ou cada um quando entra na tela (celular). Sem movimento: tudo estático.
 */
export function HowItWorks() {
  const { howItWorks } = site;
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 64rem)");
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [ratios, setRatios] = useState<number[]>([0, 0, 0]);
  const [round, setRound] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Quanto de cada card está visível.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRatios((prev) => {
          const next = [...prev];
          for (const entry of entries) {
            const index = itemRefs.current.indexOf(entry.target as HTMLLIElement);
            if (index >= 0) next[index] = entry.intersectionRatio;
          }
          return next;
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const maxRatio = Math.max(...ratios);
  const mostVisible = ratios.indexOf(maxRatio);
  const playing = !reduced && maxRatio >= 0.5;

  // Relógio do tour: avança a cada ciclo enquanto a seção está em tela.
  useEffect(() => {
    if (!playing || hovered !== null) return;
    const timer = window.setInterval(() => setRound((r) => r + 1), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [playing, hovered]);

  const active = !playing ? -1 : wide ? (hovered ?? round % howItWorks.steps.length) : mostVisible;

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="py-18 lg:py-24">
      <div className="container-page">
        <h2 id="como-title" className="max-w-[20ch] text-h2">
          {howItWorks.title}
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {howItWorks.steps.map((step, index) => {
            const last = index === howItWorks.steps.length - 1;
            const isActive = index === active;
            const Demo = DEMOS[index];
            return (
              <li
                key={step.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-active={isActive}
                style={{ "--cycle": `${CYCLE_MS}ms` } as CSSProperties}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && playing) setHovered(index);
                }}
                onPointerLeave={() => {
                  if (hovered !== null) {
                    setRound(hovered + 1);
                    setHovered(null);
                  }
                }}
                className={`relative flex flex-col overflow-hidden rounded-card border bg-surface p-6 transition-colors duration-300 lg:p-6 xl:p-7 ${
                  isActive ? "border-brand" : "border-line"
                }`}
              >
                {/* Barra de progresso do passo ativo */}
                <span
                  key={isActive ? `progress-${round}` : "progress-idle"}
                  aria-hidden="true"
                  className="demo-progress absolute inset-x-0 top-0 h-[3px] origin-left bg-brand"
                  style={{ transform: "scaleX(0)" }}
                />
                <span
                  aria-hidden="true"
                  className={`demo-ring tabular flex size-12 items-center justify-center rounded-full font-display text-[1.375rem] font-bold ${
                    last ? "bg-caramelo text-ink" : "bg-brand text-on-brand"
                  }`}
                >
                  {index + 1}
                </span>
                <h3 className="mt-6 text-h3">{step.title}</h3>
                <p className="mt-2 text-ink-muted">
                  {step.text}
                  {"link" in step && step.link ? (
                    <>
                      {" "}
                      <span className="font-semibold whitespace-nowrap text-ink">{step.link}</span>
                    </>
                  ) : null}
                </p>
                <div
                  aria-hidden="true"
                  key={isActive ? `play-${round}` : "idle"}
                  className="mt-6 h-[188px] rounded-[12px] border border-line bg-ground p-3"
                >
                  <Demo />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
