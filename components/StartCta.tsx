import { site } from "@/content/site";
import { LeadForm } from "./LeadForm";
import { Bubble } from "./ui";

export function StartCta() {
  const { start } = site;
  return (
    <section id="comecar" aria-labelledby="comecar-title" className="pb-18 lg:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-block bg-brand px-5 py-12 text-on-brand sm:px-10 lg:p-16">
          <Bubble className="-top-16 -right-16 size-40 bg-caramelo sm:size-56 lg:-top-20 lg:-right-20 lg:size-64" />
          <Bubble className="top-10 right-[52%] hidden size-7 bg-brand-tint lg:block" />
          <Bubble className="bottom-10 left-[38%] size-16 bg-brand-strong" />
          <Bubble className="top-auto bottom-28 right-6 size-6 bg-brand-tint lg:hidden" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <h2 id="comecar-title" className="max-w-[15ch] pr-12 text-h2 sm:pr-0">
                {start.title}
              </h2>
              <p className="mt-5 max-w-[30rem] text-body-lg text-brand-tint">{start.text}</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
