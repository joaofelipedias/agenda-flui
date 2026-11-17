"use client";

import { track } from "@vercel/analytics";
import { ChevronDown, CircleAlert, CircleCheck } from "lucide-react";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { submitLead } from "@/app/actions";
import { site } from "@/content/site";
import {
  HONEYPOT_FIELD,
  LEAD_FIELDS,
  emptyLead,
  formatPhone,
  validateLead,
  type LeadErrors,
  type LeadField,
  type LeadState,
  type LeadValues,
} from "@/lib/lead";
import { leadWhatsappHref, whatsappHref, whatsappIsPlaceholder } from "@/lib/whatsapp";
import { buttonClasses } from "./ui";

const f = site.form;
const INITIAL_STATE: LeadState = { status: "idle" };

const controlBase =
  "min-h-12 w-full rounded-chip border-[1.5px] border-line bg-surface px-3.5 text-[1rem] transition-colors duration-150 hover:border-[#a9c4be] focus:border-brand aria-[invalid=true]:border-danger";
const inputClasses = `${controlBase} text-ink placeholder:text-[#6b807c]`;

function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-erro`} className="flex items-start gap-1.5 text-small font-medium text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function WhatsAppLink({ children }: { children: ReactNode }) {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-brand underline underline-offset-2 hover:text-brand-strong"
    >
      {children}
      {whatsappIsPlaceholder ? ` ${site.contact.whatsapp}` : null}
    </a>
  );
}

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, INITIAL_STATE);
  const [values, setValues] = useState<LeadValues>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submittedBaths = useRef("");

  // Erros que só o servidor percebeu (ex.: envio sem JavaScript) também aparecem nos campos.
  const serverErrors = state.status === "error" ? state.fieldErrors : undefined;
  const errorFor = (field: LeadField) => errors[field] ?? (touched[field] ? undefined : serverErrors?.[field]);

  useEffect(() => {
    if (state.status !== "success") return;
    track("lead_submitted", { weeklyBaths: submittedBaths.current || null });
    successRef.current?.focus({ preventScroll: true });
  }, [state]);

  const revalidate = (next: LeadValues, field: LeadField, force = false) => {
    if (!force && !touched[field] && !errors[field]) return;
    const result = validateLead(next);
    setErrors((prev) => ({ ...prev, [field]: result.ok ? undefined : result.errors[field] }));
  };

  const onChange = (field: LeadField) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const raw = event.target.value;
    const value = field === "whatsapp" ? formatPhone(raw) : raw;
    const next = { ...values, [field]: value };
    setValues(next);
    revalidate(next, field, field === "weeklyBaths");
  };

  const onBlur = (field: LeadField) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (values[field] !== "") revalidate(values, field, true);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateLead(values);
    setTouched(Object.fromEntries(LEAD_FIELDS.map((field) => [field, true])));
    if (!result.ok) {
      setErrors(result.errors);
      const firstInvalid = LEAD_FIELDS.find((field) => result.errors[field]);
      if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setErrors({});
    submittedBaths.current = result.data.weeklyBaths;
    // Abre o WhatsApp ainda dentro do clique, para o navegador não bloquear a nova aba.
    if (!formRef.current?.querySelector<HTMLInputElement>(`[name="${HONEYPOT_FIELD}"]`)?.value) {
      window.open(leadWhatsappHref(result.data), "_blank", "noopener");
    }
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-card bg-surface p-6 text-ink focus:outline-none sm:p-8"
      >
        <CircleCheck className="size-11 text-success" strokeWidth={2} aria-hidden="true" />
        <p className="mt-4 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.025em]">{f.successTitle}</p>
        <p className="mt-2 text-body-lg text-ink-muted">{f.successText}</p>
        <p className="mt-6">
          <WhatsAppLink>{f.successLink}</WhatsAppLink>
        </p>
      </div>
    );
  }

  const describedBy = (field: LeadField) => (errorFor(field) ? `lead-${field}-erro` : undefined);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label={f.ariaLabel}
      className="relative grid gap-4 rounded-card bg-surface p-5 text-ink sm:grid-cols-2 sm:p-7"
    >
      <Field id="lead-petShop" label={f.fields.petShop.label} error={errorFor("petShop")}>
        <input
          id="lead-petShop"
          name="petShop"
          type="text"
          autoComplete="organization"
          placeholder={f.fields.petShop.placeholder}
          value={values.petShop}
          onChange={onChange("petShop")}
          onBlur={onBlur("petShop")}
          aria-invalid={Boolean(errorFor("petShop"))}
          aria-describedby={describedBy("petShop")}
          required
          className={inputClasses}
        />
      </Field>

      <Field id="lead-name" label={f.fields.name.label} error={errorFor("name")}>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={f.fields.name.placeholder}
          value={values.name}
          onChange={onChange("name")}
          onBlur={onBlur("name")}
          aria-invalid={Boolean(errorFor("name"))}
          aria-describedby={describedBy("name")}
          required
          className={inputClasses}
        />
      </Field>

      <Field id="lead-whatsapp" label={f.fields.whatsapp.label} error={errorFor("whatsapp")}>
        <input
          id="lead-whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={f.fields.whatsapp.placeholder}
          value={values.whatsapp}
          onChange={onChange("whatsapp")}
          onBlur={onBlur("whatsapp")}
          aria-invalid={Boolean(errorFor("whatsapp"))}
          aria-describedby={describedBy("whatsapp")}
          maxLength={16}
          required
          className={`${inputClasses} tabular`}
        />
      </Field>

      <Field id="lead-city" label={f.fields.city.label} error={errorFor("city")}>
        <input
          id="lead-city"
          name="city"
          type="text"
          autoComplete="address-level2"
          placeholder={f.fields.city.placeholder}
          value={values.city}
          onChange={onChange("city")}
          onBlur={onBlur("city")}
          aria-invalid={Boolean(errorFor("city"))}
          aria-describedby={describedBy("city")}
          required
          className={inputClasses}
        />
      </Field>

      <Field
        id="lead-weeklyBaths"
        label={f.fields.weeklyBaths.label}
        error={errorFor("weeklyBaths")}
        className="sm:col-span-2"
      >
        <div className="relative">
          <select
            id="lead-weeklyBaths"
            name="weeklyBaths"
            value={values.weeklyBaths}
            onChange={onChange("weeklyBaths")}
            onBlur={onBlur("weeklyBaths")}
            aria-invalid={Boolean(errorFor("weeklyBaths"))}
            aria-describedby={describedBy("weeklyBaths")}
            required
            className={`${controlBase} cursor-pointer appearance-none pr-10 ${values.weeklyBaths ? "text-ink" : "text-[#5b706c]"}`}
          >
            <option value="" disabled>
              {f.fields.weeklyBaths.placeholder}
            </option>
            {f.weeklyBathsOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-ink">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-ink-muted"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      </Field>

      {/* Anti-spam: campo invisível para pessoas. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>{f.honeypotLabel}</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {state.status === "error" && !state.fieldErrors ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-chip border-[1.5px] border-danger bg-[#fdf3f1] px-3.5 py-3 text-small text-ink sm:col-span-2"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={2} aria-hidden="true" />
          <span>
            {f.error} <WhatsAppLink>{f.errorLink}</WhatsAppLink>
          </span>
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClasses("dark", "w-full disabled:cursor-wait disabled:opacity-80")}>
          {pending ? f.sending : f.submit}
        </button>
        <p className="mt-3 text-small text-ink-muted">{f.note}</p>
      </div>
    </form>
  );
}
