import { site } from "@/content/site";
import { TutorPhone } from "./TutorPhone";
import { Bubble } from "./ui";

// Alterna Bolha e Mel: em coluna única intercala; em 2×2 vira xadrez.
const TILE_COLORS = [
  "bg-brand-tint",
  "bg-caramelo-tint",
  "bg-brand-tint sm:bg-caramelo-tint",
  "bg-caramelo-tint sm:bg-brand-tint",
];

export function ForTutor() {
  const { tutor } = site;
  return (
    <section id="tutor" aria-labelledby="tutor-title" className="py-18 lg:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="tutor-title" className="max-w-[18ch] text-h2">
              {tutor.title}
            </h2>
            <p className="mt-5 max-w-[32rem] text-body-lg text-ink-muted">{tutor.text}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {tutor.features.map((feature, index) => (
              <li key={feature.title} className={`rounded-card p-5 lg:p-6 ${TILE_COLORS[index % 4]}`}>
                <h3 className="text-h3">{feature.title}</h3>
                <p className="mt-1.5 text-ink-muted">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="max-w-[18ch] font-display text-[1.75rem] leading-[1.1] font-bold tracking-[-0.025em] lg:text-[2rem]">
              {tutor.caption.title}
            </h3>
            <p className="mt-4 max-w-[28rem] text-body-lg text-ink-muted">{tutor.caption.text}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-caramelo-tint px-3.5 py-1.5 text-small font-semibold">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-caramelo" />
              {tutor.caption.hint}
            </p>
          </div>
          <div className="relative flex justify-center py-6 lg:order-first">
            <Bubble className="top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 bg-brand-tint sm:size-[400px]" />
            <Bubble className="top-[12%] right-[calc(50%-190px)] size-10 bg-caramelo sm:right-[calc(50%-230px)]" />
            <Bubble className="bottom-[14%] left-[calc(50%-180px)] size-6 bg-surface sm:left-[calc(50%-220px)]" />
            <div className="relative">
              <TutorPhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
