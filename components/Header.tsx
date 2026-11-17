"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { buttonClasses } from "./ui";

const DRAWER_ID = "menu-celular";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { nav } = site;

  // Borda aparece só depois de rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Gaveta aberta: foco no primeiro link, Esc fecha, Tab circula, sem rolagem do fundo.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusables = () => [
      toggleRef.current,
      ...Array.from(drawer?.querySelectorAll<HTMLElement>("a[href]") ?? []),
    ].filter((el): el is HTMLElement => Boolean(el));

    focusables()[1]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ground transition-colors duration-150 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <a href="#topo" className="flex min-h-11 items-center rounded-lg">
          <Logo pet />
          <span className="sr-only">, {nav.homeSuffix}</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <a href={nav.cta.href} className={buttonClasses("primary", "min-h-11 px-5")}>
              {nav.cta.label}
            </a>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            aria-expanded={open}
            aria-controls={DRAWER_ID}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" strokeWidth={2} aria-hidden="true" /> : <Menu className="size-5" strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id={DRAWER_ID}
        ref={drawerRef}
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-ground lg:hidden"
      >
        <nav aria-label="Menu" className="container-page flex min-h-full flex-col pt-4 pb-8">
          <ul className="flex flex-col">
            {nav.links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => close(false)}
                  className="flex min-h-14 items-center font-display text-[1.5rem] font-bold tracking-[-0.02em] text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={nav.cta.href} onClick={() => close(false)} className={buttonClasses("primary", "mt-8 w-full")}>
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
