import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Footer } from "./Footer";
import { Logo } from "./Logo";

/** Layout simples das páginas /privacidade e /termos. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-ground">
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex min-h-11 items-center rounded-lg">
            <Logo />
            <span className="sr-only">, {site.nav.homeSuffix}</span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-semibold text-ink hover:text-brand"
          >
            Voltar para o início
          </Link>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <article className="container-page max-w-[760px] py-16 lg:py-20">
          <h1 className="text-h1">{title}</h1>
          <p className="mt-3 text-small text-ink-muted">{updated}</p>
          <div className="mt-10 grid gap-8 [&_h2]:text-[1.5rem] [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_p]:mt-3 [&_p]:text-ink-muted">
            {children}
          </div>
        </article>
      </main>
      <Footer homeHref="/" />
    </>
  );
}
