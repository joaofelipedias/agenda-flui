"use client";

import { CircleCheck } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { buttonClasses } from "./ui";

const b = site.booking;

/**
 * Card de agendamento interativo do hero — o único destaque animado da página.
 * Entra com fade + leve subida (CSS, só sem prefers-reduced-motion) e seleciona 10:00 sozinho uma vez.
 */
export function BookingCard() {
  const [service, setService] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [focusTarget, setFocusTarget] = useState<"success" | "service" | null>(null);
  const userTouched = useRef(false);
  const successRef = useRef<HTMLParagraphElement>(null);
  const serviceRefs = useRef<(HTMLInputElement | null)[]>([]);
  const radioName = useId();
  const dayId = useId();

  // Seleção automática de 10:00, uma vez, se a pessoa ainda não mexeu no card.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        if (!userTouched.current) setTime(b.autoSelect);
      },
      reduceMotion ? 0 : 900,
    );
    return () => window.clearTimeout(timer);
  }, []);

  // Move o foco depois da troca de estado (leitor de tela anuncia o resultado).
  useEffect(() => {
    if (!focusTarget) return;
    if (focusTarget === "success") successRef.current?.focus({ preventScroll: true });
    if (focusTarget === "service") serviceRefs.current[service]?.focus();
    setFocusTarget(null);
  }, [focusTarget, service]);

  const pickTime = (value: string) => {
    userTouched.current = true;
    setTime(value);
  };

  const confirm = () => {
    if (!time) return;
    userTouched.current = true;
    setConfirmed(time);
    setFocusTarget("success");
  };

  const reset = () => {
    setConfirmed(null);
    setTime(null);
    setFocusTarget("service");
  };

  const selectedService = b.services[service];

  return (
    <div
      role="group"
      aria-label={b.ariaLabel}
      className="relative w-full max-w-[400px] rounded-block bg-surface p-5 text-ink shadow-pop motion-safe:animate-card-in sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div className="min-w-0">
          <p className="text-small text-ink-muted">{b.shopName}</p>
          <p className="mt-0.5 font-display text-[1.625rem] leading-tight font-bold tracking-[-0.025em]">{b.title}</p>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-brand-tint px-3 py-1 text-[0.8125rem] leading-5 font-semibold">
          {b.petChip}
        </span>
      </div>

      {/* Os dois estados ocupam a mesma célula, para o card não mudar de altura. */}
      <div className="mt-5 grid [&>*]:[grid-area:1/1]">
        <div className={confirmed ? "invisible" : undefined} inert={confirmed ? true : undefined}>
          <fieldset>
            <legend className="text-small font-semibold">{b.serviceLabel}</legend>
            <div className="mt-2 grid gap-2">
              {b.services.map((option, index) => {
                const selected = index === service;
                return (
                  <label
                    key={option.name}
                    className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-chip border-2 px-4 py-2 text-[0.9375rem] transition-colors duration-150 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-caramelo ${
                      selected ? "border-brand bg-brand-tint" : "border-line bg-surface hover:border-[#a9c4be]"
                    }`}
                  >
                    <input
                      ref={(el) => {
                        serviceRefs.current[index] = el;
                      }}
                      type="radio"
                      name={radioName}
                      value={option.name}
                      checked={selected}
                      onChange={() => {
                        userTouched.current = true;
                        setService(index);
                      }}
                      className="sr-only"
                    />
                    <span className="font-semibold">{option.name}</span>
                    <span className="tabular text-ink-muted">{option.duration}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5">
            <p id={dayId} className="text-small font-semibold">
              {b.dayLabel}
            </p>
            <div role="group" aria-labelledby={dayId} className="mt-2 grid grid-cols-3 gap-2">
              {b.times.map((slot) =>
                "busy" in slot && slot.busy ? (
                  <button
                    key={slot.time}
                    type="button"
                    disabled
                    aria-label={`${slot.time}, ${b.busyLabel}`}
                    className="tabular min-h-11 cursor-not-allowed rounded-chip border border-dashed border-line text-[0.9375rem] font-semibold text-[#8aa19c] line-through"
                  >
                    {slot.time}
                  </button>
                ) : (
                  <button
                    key={slot.time}
                    type="button"
                    aria-pressed={time === slot.time}
                    onClick={() => pickTime(slot.time)}
                    className={`tabular min-h-11 rounded-chip text-[0.9375rem] font-semibold transition-colors duration-150 ${
                      time === slot.time ? "bg-brand text-on-brand" : "bg-brand-tint text-ink hover:bg-[#c3e6df]"
                    }`}
                  >
                    {slot.time}
                  </button>
                ),
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={confirm}
            disabled={!time}
            className={buttonClasses(
              "primary",
              "tabular mt-5 w-full disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted",
            )}
          >
            {time ? `${b.confirmPrefix} ${time}` : b.pickTime}
          </button>
        </div>

        <div
          className={`flex flex-col justify-center ${confirmed ? "" : "invisible"}`}
          inert={confirmed ? undefined : true}
        >
          <CircleCheck className="size-11 text-success" strokeWidth={2} aria-hidden="true" />
          <p
            ref={successRef}
            tabIndex={-1}
            className="mt-4 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.025em] focus:outline-none"
          >
            {b.successTitle}
            <span className="sr-only">. {confirmed ? b.successText(confirmed) : ""}</span>
          </p>
          <p className="mt-2 text-ink-muted">
            {selectedService.name} · {selectedService.duration}
          </p>
          <p className="tabular mt-1" aria-hidden="true">
            {confirmed ? b.successText(confirmed) : b.successText(b.autoSelect)}
          </p>
          <button type="button" onClick={reset} className={buttonClasses("secondary", "mt-6 w-full")}>
            {b.again}
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-small text-ink-muted">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-caramelo" />
        {b.reminder}
      </div>
    </div>
  );
}
