# Agenda Flui — landing page

Landing page de marketing da **Agenda Flui** (agendamento online para banho e tosa), feita para captar pet shops interessados.

Stack: Next.js 15 (App Router, exportação estática) + TypeScript + Tailwind CSS v4 + `lucide-react` + `zod/mini`. O formulário roda no navegador e abre o WhatsApp.

---

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```bash
npm install
cp .env.example .env.local   # opcional: NEXT_PUBLIC_LEAD_WEBHOOK_URL (veja abaixo)
npm run dev                  # http://localhost:3000
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera o site estático na pasta `out/` (é o que vai para a Hostinger) |
| `npm run lint` | Confere o código com o ESLint |

---

## Trocar textos

**Todos os textos da página estão em [`content/site.ts`](content/site.ts)**, separados por seção (`hero`, `pains`, `howItWorks`, `petShop`, `tutor`, `pricing`, `faq`, `start`, `form`, `footer`). Edite o texto entre aspas, salve e a página atualiza sozinha com `npm run dev`.

- Não apague as vírgulas nem as aspas.
- Se o texto tiver aspas duplas dentro, use as curvas: “assim”.
- As páginas de Privacidade e Termos ficam em `app/privacidade/page.tsx` e `app/termos/page.tsx`.

Outras pastas, para quem for mexer no código:

```
app/            páginas, layout, metadados, envio do formulário (actions.ts), ícones e imagem Open Graph
components/     uma seção por arquivo (Hero, Pains, HowItWorks, ForPetShop, ForTutor, Pricing, Faq, StartCta, Footer…)
content/        site.ts — todos os textos
lib/            validação do formulário (lead.ts), links do WhatsApp, URL do site, hooks de movimento (motion.ts)
public/         logos em SVG e .htaccess da Hostinger
brand/          pacote da marca (manual em PDF, fontes, tokens). Fica fora do repositório (.gitignore);
                peça aos sócios se precisar. O site não depende dele.
```

Cores, fontes, tamanhos de texto e cantos estão em [`app/globals.css`](app/globals.css), no bloco `@theme`. Cada token vira uma classe do Tailwind (`bg-brand`, `text-ink`, `rounded-card`…) e uma variável CSS (`var(--color-brand)`).

---

## Formulário de contato

O formulário valida os campos no navegador e, ao enviar, **abre o WhatsApp da Agenda Flui** (`content/site.ts` → `contact.whatsapp`) com a mensagem já escrita:

```
Oi! Quero conhecer a Agenda Flui.

Pet shop: Banho & Cia
Nome: Ana Souza
WhatsApp: (41) 99999-9999
Cidade: Curitiba
Banhos por semana: 31 a 80
```

O contato só chega se a pessoa tocar em enviar no WhatsApp.

**Webhook (opcional)**: se `NEXT_PUBLIC_LEAD_WEBHOOK_URL` estiver definida no build, o navegador também manda um POST para essa URL (Make, Zapier, Google Apps Script…). O corpo é JSON, mas vai com `Content-Type: text/plain` para não exigir configuração de CORS. A URL fica visível no código da página. Formato:

```json
{
  "petShop": "Banho & Cia",
  "name": "Ana Souza",
  "whatsapp": "(41) 99999-9999",
  "whatsappDigits": "5541999999999",
  "city": "Curitiba",
  "weeklyBaths": "31 a 80",
  "source": "landing",
  "submittedAt": "2026-11-17T12:00:00.000Z"
}
```

- **Anti-spam**: há um campo escondido (`empresa_site`). Se vier preenchido, a página finge sucesso e não abre o WhatsApp nem envia nada.

---

## Publicar na Hostinger

O site é exportado como arquivos estáticos (`output: "export"` em `next.config.ts`), então funciona na hospedagem comum, sem Node.js.

1. Gere a build:

   ```bash
   NEXT_PUBLIC_SITE_URL=https://agendaflui.com.br npm run build
   ```

   (Para usar o webhook, acrescente `NEXT_PUBLIC_LEAD_WEBHOOK_URL=...` no mesmo comando.) Os arquivos saem na pasta `out/`.
2. Compacte o conteúdo de `out/` (não a pasta em si): `cd out && zip -r ../site.zip .`
3. No hPanel, abra **Gerenciador de Arquivos → `public_html`**, envie o zip e use **Extrair**. O `index.html` precisa ficar direto em `public_html`.
4. Confira se o `.htaccess` foi junto (arquivo oculto). Ele vem de `public/.htaccess` e define a página 404, o tipo das imagens `apple-icon` e `opengraph-image` (geradas sem extensão), cache e compressão.
5. No hPanel, ative o SSL e **Forçar HTTPS** do domínio.

Para atualizar, gere a build de novo e substitua os arquivos em `public_html`.

---

## Placeholders que faltam preencher

Tudo que está entre colchetes aparece na página de propósito, para ninguém esquecer.

| Placeholder | Onde aparece | Onde trocar |
|---|---|---|
| `[PREÇO]` | Card do "Plano completo" | `content/site.ts` → `pricing.plan.price` |
| `[Nome do seu pet shop]` | Card do hero e simulador de celular da seção do tutor | `content/site.ts` → `booking.shopName`. É um exemplo para o visitante; pode ficar assim ou virar um nome fictício |
| `[REVISAR COM ADVOGADO]` | `/privacidade` e `/termos` | `app/privacidade/page.tsx`, `app/termos/page.tsx` |
| `[DATA]` | Data de atualização das páginas legais | idem |
| `[RAZÃO SOCIAL E CNPJ]` | `/privacidade` | `app/privacidade/page.tsx` |

Quando o texto jurídico estiver revisado:

- tire o `robots: { index: false }` das duas páginas legais;
- inclua `/privacidade` e `/termos` em `app/sitemap.ts`.

Quando o preço for definido, inclua `offers` no JSON-LD em `app/page.tsx`.

---

## Decisões que valem saber

- **Fontes**: Bricolage Grotesque (variável, com eixo `opsz`) e Figtree vêm via `next/font/google`. São as mesmas fontes de `brand/fontes`, só que servidas pelo próprio site e cortadas para os caracteres do português, o que deixa a página mais leve.
- **Sombra**: foi usada a do briefing da landing (`0 24px 48px -20px rgba(15,42,39,0.45)`), só no card do hero. Os tokens em `brand/design-tokens` têm outra sombra (`0 12px 32px -12px …`); escolham uma para ficar igual nos dois lugares.
- **Ícone da Apple (`app/apple-icon.tsx`)**: símbolo branco sobre Água com cantos de 30%. O fundo fora dos cantos também é Água, porque o iOS aplica a própria máscara e deixaria preto qualquer canto transparente.
- **Animações** (CSS puro, sem biblioteca, para manter a página leve):
  - card do hero: entra com fade e seleciona as 10:00 sozinho; ao lado, notificações do sistema se alternam;
  - "Como funciona": os três passos tocam em sequência como um tour (no computador) ou cada um quando entra na tela (no celular), com mini-telas animadas; passar o mouse num passo o destaca;
  - agenda do dia (seção escura): os horários entram em cascata e há a linha do "agora".
  Tudo tem estado final visível por padrão; com "reduzir movimento" ligado no aparelho, nada anima.
- **Simulador de celular** (seção do tutor): é clicável. Dá para repetir o último banho, trocar serviço, dia e horário (cada dia tem horários ocupados diferentes) e confirmar. Os dias e horários ocupados ficam em `content/site.ts` → `tutor.phone.days`.
- **Instagram**: `@agendaflui` (https://www.instagram.com/agendaflui/), no rodapé e no JSON-LD (`sameAs`).
- **Imagem Open Graph**: gerada no build por `app/opengraph-image.tsx`. O build baixa a Bricolage do Google Fonts; sem internet, a imagem sai com a fonte padrão.
