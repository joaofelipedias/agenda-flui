import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso do site da Agenda Flui.",
  alternates: { canonical: "/termos" },
  // Texto provisório: liberar para indexação depois da revisão jurídica.
  robots: { index: false, follow: true },
};

export default function TermosPage() {
  return (
    <LegalPage title="Termos de uso" updated="[REVISAR COM ADVOGADO] · Última atualização: [DATA]">
      <section>
        <h2>Sobre o site</h2>
        <p>
          [REVISAR COM ADVOGADO] Este site apresenta a Agenda Flui, sistema de agendamento online para pet shops, e
          recebe contatos de pet shops interessados.
        </p>
      </section>
      <section>
        <h2>Contratação</h2>
        <p>
          [REVISAR COM ADVOGADO] Enviar o formulário não cria contrato. Preço, prazo e funcionalidades são combinados
          diretamente com cada pet shop.
        </p>
      </section>
      <section>
        <h2>Contato</h2>
        <p>[REVISAR COM ADVOGADO] Dúvidas sobre estes termos: WhatsApp +55 41 99173-1154.</p>
      </section>
    </LegalPage>
  );
}
