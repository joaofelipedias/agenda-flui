import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como a Agenda Flui trata os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
  // Texto provisório: liberar para indexação depois da revisão jurídica.
  robots: { index: false, follow: true },
};

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de privacidade" updated="[REVISAR COM ADVOGADO] · Última atualização: [DATA]">
      <section>
        <h2>Quais dados coletamos</h2>
        <p>
          [REVISAR COM ADVOGADO] Quando você envia o formulário do site, coletamos o nome do pet shop, seu nome, seu
          WhatsApp, sua cidade e a quantidade aproximada de banhos por semana.
        </p>
      </section>
      <section>
        <h2>Para que usamos</h2>
        <p>
          [REVISAR COM ADVOGADO] Usamos esses dados só para entrar em contato sobre a Agenda Flui. Não
          vendemos nem compartilhamos seus dados para publicidade de terceiros.
        </p>
      </section>
      <section>
        <h2>Medição de audiência</h2>
        <p>
          [REVISAR COM ADVOGADO] O site usa Vercel Web Analytics, que mede visitas de forma agregada e sem cookies.
        </p>
      </section>
      <section>
        <h2>Seus direitos (LGPD)</h2>
        <p>
          [REVISAR COM ADVOGADO] Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo
          nosso WhatsApp [NÚMERO DO WHATSAPP]. Controlador dos dados: [RAZÃO SOCIAL E CNPJ].
        </p>
      </section>
    </LegalPage>
  );
}
