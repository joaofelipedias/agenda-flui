import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Bubble, ButtonLink } from "./ui";

export function Pricing() {
  const { pricing } = site;
  const { plan } = pricing;
  return (
    <section id="planos" aria-labelledby="planos-title" className="border-y border-line bg-surface py-18 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="planos-title" className="max-w-[16ch] text-h2">
            {pricing.title}
          </h2>
          <p className="mt-5 max-w-[26rem] text-body-lg text-ink-muted">{pricing.aside}</p>
        </div>

        <div className="relative">
          <Bubble className="-top-8 -right-4 size-28 bg-brand-tint sm:-right-8 sm:size-36" />
          <Bubble className="-bottom-4 -left-3 size-8 bg-caramelo" />
          <div className="relative rounded-block border border-line bg-surface p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-caramelo-tint px-3 py-1 text-small font-semibold">
              <span aria-hidden="true" className="size-2 rounded-full bg-caramelo" />
              {plan.badge}
            </p>
            <h3 className="mt-5 text-h3">{plan.name}</h3>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-[2.75rem] leading-none font-bold tracking-[-0.03em]">{plan.price}</span>
              <span className="text-body-lg text-ink-muted">{plan.period}</span>
            </p>
            <p className="mt-3 text-ink-muted">{plan.note}</p>

            <p className="sr-only">{plan.includesLabel}</p>
            <ul className="mt-6 grid gap-3 border-t border-line pt-6">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={plan.cta.href} className="mt-8 w-full">
              {plan.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
