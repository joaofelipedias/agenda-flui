import Link from "next/link";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const linkClasses =
  "inline-flex min-h-11 items-center rounded-md px-2 font-semibold text-ink transition-colors duration-150 hover:text-brand";

export function Footer({ homeHref = "#topo" }: { homeHref?: string }) {
  const { footer, contact, nav } = site;
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link href={homeHref} className="flex min-h-11 w-fit items-center rounded-lg">
            <Logo size="sm" />
            <span className="sr-only">, {nav.homeSuffix}</span>
          </Link>
        </div>

        <nav aria-label="Rodapé">
          <ul className="-mx-2 flex flex-wrap items-center text-small">
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                {footer.contactLabel}
              </a>
            </li>
            <li>
              {contact.instagram.url ? (
                <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  Instagram {contact.instagram.label}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center px-2 font-semibold">Instagram {contact.instagram.label}</span>
              )}
            </li>
          </ul>
        </nav>

        <p className="text-small text-ink-muted">{footer.copyright}</p>
      </div>
    </footer>
  );
}
