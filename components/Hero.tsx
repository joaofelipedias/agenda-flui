import { site } from "@/content/site";
import { BookingCard } from "./BookingCard";
import { HeroToasts } from "./HeroToasts";
import { Bubble, ButtonLink } from "./ui";

export function Hero() {
  const { hero } = site;
  return (
    <section id="topo" aria-labelledby="hero-title" className="pt-10 pb-18 lg:pt-16 lg:pb-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-caramelo-tint px-3.5 py-1.5 text-small font-semibold text-ink">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-caramelo" />
            {hero.badge}
          </p>
          <h1 id="hero-title" className="mt-6 max-w-[12ch] text-display">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-body-lg text-ink-muted">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <p className="mt-5 text-small text-ink-muted">{hero.note}</p>
        </div>

        <div className="relative">
          {/* Bloco vertical brand com bolhas (espuma do banho). */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-block bg-brand lg:left-[16%]">
            <Bubble className="-top-14 -right-14 size-44 bg-caramelo sm:size-52" />
            <Bubble className="top-[42%] right-6 size-9 bg-ground" />
            <Bubble className="right-[22%] -bottom-8 size-24 bg-brand-tint" />
            <Bubble className="bottom-8 left-6 size-6 bg-ground lg:left-auto lg:right-[42%]" />
            <Bubble className="top-6 left-8 size-12 bg-brand-tint lg:hidden" />
          </div>
          <div className="relative flex justify-center px-4 py-12 sm:px-10 lg:justify-start lg:px-0 lg:py-14">
            <BookingCard />
          </div>
          <HeroToasts />
        </div>
      </div>
    </section>
  );
}
