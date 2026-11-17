"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";

const b = site.booking;
const phone = site.tutor.phone;

/**
 * Celular do tutor (390×844 escalado), interativo: dá para trocar serviço, dia e horário,
 * repetir o último banho e confirmar o agendamento.
 */
export function TutorPhone() {
  const [service, setService] = useState(0);
  const [day, setDay] = useState<number>(phone.selectedDay);
  const [time, setTime] = useState<string | null>(phone.selectedTime);
  const [confirmed, setConfirmed] = useState(false);
  const [flash, setFlash] = useState(0);
  const [focusTarget, setFocusTarget] = useState<"success" | "times" | null>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const timesRef = useRef<HTMLDivElement>(null);
  const radioName = useId();
  const daysLabelId = useId();
  const timesLabelId = useId();

  const busy: readonly string[] = phone.days[day].busy;

  useEffect(() => {
    if (!focusTarget) return;
    if (focusTarget === "success") successRef.current?.focus({ preventScroll: true });
    if (focusTarget === "times") timesRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus({ preventScroll: true });
    setFocusTarget(null);
  }, [focusTarget]);

  const pickDay = (index: number) => {
    setDay(index);
    // Se o horário escolhido estiver ocupado no novo dia, limpa a escolha.
    if (time && (phone.days[index].busy as readonly string[]).includes(time)) setTime(null);
  };

  const repeatLast = () => {
    setService(0);
    setFlash((n) => n + 1);
  };

  const confirm = () => {
    if (!time) return;
    setConfirmed(true);
    setFocusTarget("success");
  };

  const reset = () => {
    setConfirmed(false);
    setTime(null);
    setFocusTarget("times");
  };

  const selectedService = b.services[service];
  const selectedDay = phone.days[day];

  return (
    <div
      role="group"
      aria-label={phone.groupLabel}
      className="relative aspect-[390/844] w-[280px] shrink-0 overflow-hidden rounded-[40px] border-[10px] border-ink bg-surface text-ink sm:w-[300px]"
    >
      <div aria-hidden="true" className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />

      <div className="grid h-full [&>*]:[grid-area:1/1]">
        {/* Tela de escolha */}
        <div
          className={`flex h-full flex-col px-3.5 pt-9 pb-4 sm:px-4 ${confirmed ? "invisible" : ""}`}
          inert={confirmed ? true : undefined}
        >
          <p className="text-[0.75rem] text-ink-muted">{b.shopName}</p>
          <p className="mt-0.5 font-display text-[1.25rem] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[1.3125rem]">
            {phone.title}
          </p>

          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-chip bg-caramelo-tint py-1.5 pr-1.5 pl-3">
            <span className="min-w-0">
              <span className="block text-[0.6875rem] leading-4 text-ink-muted">{phone.last.label}</span>
              <span className="block truncate text-[0.8125rem] leading-5 font-semibold">{phone.last.service}</span>
            </span>
            <button
              type="button"
              onClick={repeatLast}
              className="min-h-9 shrink-0 rounded-full bg-surface px-3.5 text-[0.75rem] font-bold transition-colors duration-150 hover:bg-ground active:scale-[0.97]"
            >
              {phone.last.action}
            </button>
          </div>

          <fieldset className="mt-2.5">
            <legend className="sr-only">{b.serviceLabel}</legend>
            <div className="grid gap-1.5">
              {b.services.map((option, index) => {
                const selected = index === service;
                return (
                  <label
                    key={`${option.name}-${selected && index === 0 ? flash : 0}`}
                    className={`flex min-h-10 cursor-pointer items-center justify-between gap-2 rounded-chip border-2 px-3 text-[0.8125rem] transition-colors duration-150 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-caramelo ${
                      selected ? "border-brand bg-brand-tint" : "border-line hover:border-[#a9c4be]"
                    } ${selected && index === 0 && flash > 0 ? "anim-flash" : ""}`}
                  >
                    <input
                      type="radio"
                      name={radioName}
                      checked={selected}
                      onChange={() => setService(index)}
                      className="sr-only"
                    />
                    <span className="font-semibold">{option.name}</span>
                    <span className="tabular text-ink-muted">{option.duration}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <p id={daysLabelId} className="mt-2.5 text-[0.75rem] font-semibold">
            {phone.daysLabel}
          </p>
          <div role="group" aria-labelledby={daysLabelId} className="mt-1 grid grid-cols-5 gap-1.5">
            {phone.days.map((d, index) => {
              const selected = index === day;
              return (
                <button
                  key={d.day}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => pickDay(index)}
                  className={`flex min-h-11 flex-col items-center justify-center rounded-chip transition-colors duration-150 ${
                    selected ? "bg-brand text-on-brand" : "border border-line hover:border-[#a9c4be]"
                  }`}
                >
                  <span className="text-[0.6875rem] leading-4">{d.weekday}</span>
                  <span className="tabular text-[0.9375rem] leading-5 font-bold">
                    {" "}
                    {d.day}
                  </span>
                  <span className="sr-only"> de novembro</span>
                </button>
              );
            })}
          </div>

          <span id={timesLabelId} className="sr-only">
            Horários de {selectedDay.long.toLowerCase()}, {selectedDay.day} de novembro
          </span>
          <div ref={timesRef} role="group" aria-labelledby={timesLabelId} className="mt-2 grid grid-cols-3 gap-1.5">
            {phone.times.map((slot) => {
              const isBusy = busy.includes(slot);
              const selected = slot === time;
              return isBusy ? (
                <button
                  key={slot}
                  type="button"
                  disabled
                  aria-label={`${slot}, ${b.busyLabel}`}
                  className="tabular h-10 cursor-not-allowed rounded-chip border border-dashed border-line text-[0.8125rem] font-semibold text-ink-muted line-through"
                >
                  {slot}
                </button>
              ) : (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTime(slot)}
                  className={`tabular h-10 rounded-chip text-[0.8125rem] font-semibold transition-colors duration-150 ${
                    selected ? "bg-brand text-on-brand" : "bg-brand-tint hover:bg-[#c3e6df]"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-2">
            <button
              type="button"
              onClick={confirm}
              disabled={!time}
              className="flex h-11 w-full items-center justify-center rounded-full bg-brand text-[0.875rem] font-bold text-on-brand transition-colors duration-150 hover:bg-brand-strong active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted"
            >
              {time ? phone.button : phone.pickTime}
            </button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.6875rem] text-ink-muted">
              <span aria-hidden="true" className="size-2 rounded-full bg-caramelo" />
              {b.reminder}
            </p>
          </div>
        </div>

        {/* Tela de confirmação */}
        <div
          className={`flex h-full flex-col items-center justify-center px-5 text-center ${confirmed ? "" : "invisible"}`}
          inert={confirmed ? undefined : true}
        >
          {confirmed ? (
            <>
              <svg viewBox="0 0 48 48" className="anim-pop size-16" aria-hidden="true">
                <circle cx="24" cy="24" r="22" fill="#1E8A4C" />
                <path
                  d="M14 24.5l7 7 13-14"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  className="anim-draw"
                />
              </svg>
              <p
                ref={successRef}
                tabIndex={-1}
                className="anim-rise mt-5 font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] focus:outline-none"
              >
                {phone.successTitle}
                <span className="sr-only">
                  . {phone.successText(selectedDay.long, selectedDay.day, time ?? "")}. {selectedService.name}.
                </span>
              </p>
              <p aria-hidden="true" className="anim-rise tabular mt-2 text-[0.9375rem] font-semibold" style={{ animationDelay: "80ms" }}>
                {phone.successText(selectedDay.long, selectedDay.day, time ?? "")}
              </p>
              <p aria-hidden="true" className="anim-rise mt-1 text-[0.8125rem] text-ink-muted" style={{ animationDelay: "120ms" }}>
                {selectedService.name} · {selectedService.duration}
              </p>
              <p
                className="anim-rise mt-5 flex items-center gap-1.5 rounded-full bg-caramelo-tint px-3 py-1.5 text-[0.75rem] font-semibold"
                style={{ animationDelay: "180ms" }}
              >
                <span aria-hidden="true" className="size-2 rounded-full bg-caramelo" />
                {b.reminder}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-7 flex h-11 w-full items-center justify-center rounded-full border border-line text-[0.875rem] font-bold transition-colors duration-150 hover:border-ink-muted"
              >
                {phone.again}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
