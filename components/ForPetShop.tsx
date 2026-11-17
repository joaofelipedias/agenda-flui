import { site } from "@/content/site";
import { DayAgenda } from "./DayAgenda";

export function ForPetShop() {
  const { petShop } = site;
  return (
    <section id="pet-shop" aria-labelledby="petshop-title" className="bg-ink py-18 text-night-text lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <h2 id="petshop-title" className="max-w-[14ch] text-h2">
            {petShop.title}
          </h2>
          <p className="mt-5 max-w-[30rem] text-body-lg text-night-muted">{petShop.text}</p>
          <ul className="mt-8 grid gap-3.5">
            {petShop.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rounded-full bg-brand-light" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <DayAgenda />
      </div>
    </section>
  );
}
