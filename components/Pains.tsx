import { site } from "@/content/site";

export function Pains() {
  const { pains } = site;
  return (
    <section aria-labelledby="dores-title" className="border-y border-line bg-surface py-18 lg:py-24">
      <div className="container-page">
        <h2 id="dores-title" className="max-w-[22ch] text-h2">
          {pains.title}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-12">
          {pains.items.map((item) => (
            <div key={item.title} className="border-t-2 border-ink pt-6">
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-3 text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
