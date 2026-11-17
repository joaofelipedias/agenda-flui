import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";

export function Faq() {
  const { faq } = site;
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-18 lg:py-24">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div>
          <h2 id="duvidas-title" className="text-h2">
            {faq.title}
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted">{faq.intro}</p>
        </div>
        <div className="border-t border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.0625rem] leading-6 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown
                  className="size-5 shrink-0 text-brand group-open:rotate-180"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[40rem] pr-9 pb-5 text-ink-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
