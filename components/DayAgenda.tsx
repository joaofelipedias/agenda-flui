import { Fragment } from "react";
import { site } from "@/content/site";
import { PlayOnView } from "./PlayOnView";

type Slot = {
  readonly row: number;
  readonly span?: number;
  readonly pet?: string;
  readonly service?: string;
  readonly kind: "confirmed" | "taxi" | "free";
};
type Column = { readonly name: string; readonly slots: readonly Slot[] };

/** Linha do "agora" fica logo acima desta linha da grade (11:00). */
const NOW_ROW = 2;

const SLOT_STYLES: Record<Slot["kind"], string> = {
  confirmed: "bg-brand-light text-on-brand-light",
  taxi: "bg-caramelo-light text-ink",
  free: "border-[1.5px] border-dashed border-[#2f5049] text-night-muted",
};

/** Mockup da agenda do dia (seção escura). */
export function DayAgenda() {
  const agenda = site.petShop.agenda;
  const columns: readonly Column[] = agenda.columns;

  return (
    <div className="min-w-0 rounded-block border border-night-line bg-night-card p-4 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-night-text">{agenda.title}</p>
        <p className="tabular text-small text-night-muted">{agenda.summary}</p>
      </div>

      <div
        role="region"
        aria-label={agenda.ariaLabel}
        tabIndex={0}
        className="-mx-1 mt-6 overflow-x-auto rounded-chip px-1 pt-1 pb-1"
      >
        <PlayOnView
          threshold={0.4}
          className="grid min-w-[300px] grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)] gap-x-2 gap-y-2 sm:grid-cols-[52px_minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-2.5"
          style={{ gridTemplateRows: `auto repeat(${agenda.hours.length}, minmax(52px, auto))` }}
        >
          <span aria-hidden="true" />
          {columns.map((column) => (
            <p key={column.name} className="pb-1 text-small font-semibold text-night-text">
              {column.name}
            </p>
          ))}

          {agenda.hours.map((hour, row) => (
            <Fragment key={hour}>
              <span className="tabular pt-3 text-small text-night-muted" style={{ gridColumn: 1, gridRow: row + 2 }}>
                {hour}
              </span>
              {columns.map((column, col) => {
                const slot = column.slots.find((s) => s.row === row);
                if (!slot) return null;
                return (
                  <div
                    key={`${column.name}-${row}`}
                    className={`demo-drop flex items-start rounded-chip px-2.5 py-2.5 text-small sm:px-3 ${SLOT_STYLES[slot.kind]}`}
                    style={{
                      gridColumn: col + 2,
                      gridRow: `${row + 2} / span ${slot.span ?? 1}`,
                      animationDelay: `${120 + row * 90 + col * 60}ms`,
                    }}
                  >
                    {slot.kind === "free" ? (
                      <span>{agenda.free}</span>
                    ) : (
                      <span>
                        <strong className="font-bold">{slot.pet}</strong> · {slot.service}
                      </span>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}

          {/* Linha do "agora" (como nas agendas de verdade) */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-10 -mt-[5px] h-0 self-start"
            style={{ gridColumn: "2 / -1", gridRow: NOW_ROW + 2 }}
          >
            <span className="absolute -top-[4px] -left-[5px] size-2.5 rounded-full bg-caramelo-light">
              <span className="absolute inset-0 rounded-full bg-caramelo-light motion-safe:animate-ping" />
            </span>
            <span className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-caramelo-light" />
          </div>
        </PlayOnView>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-small text-night-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-[4px] bg-brand-light" />
          {agenda.legend.confirmed}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-[4px] bg-caramelo-light" />
          {agenda.legend.taxi}
        </li>
      </ul>
    </div>
  );
}
