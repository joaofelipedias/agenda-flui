import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ForPetShop } from "@/components/ForPetShop";
import { ForTutor } from "@/components/ForTutor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pains } from "@/components/Pains";
import { StartCta } from "@/components/StartCta";
import { Pricing } from "@/components/Pricing";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// JSON-LD sem `offers`: o preço ainda é [PREÇO]. Inclua quando o valor estiver definido.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Agendamento online para pet shops (banho e tosa)",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  url: SITE_URL,
  description: site.seo.description,
  sameAs: [site.contact.instagram.url],
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-simbolo.svg`,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="conteudo" tabIndex={-1} className="overflow-x-clip focus:outline-none">
        <Hero />
        <Pains />
        <HowItWorks />
        <ForPetShop />
        <ForTutor />
        <Pricing />
        <Faq />
        <StartCta />
      </main>
      <Footer />
    </>
  );
}
