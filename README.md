# Agenda Flui — landing page

Landing page de marketing da **Agenda Flui** (agendamento online para banho e tosa), feita para captar pet shops interessados.

Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + `lucide-react` + `zod/mini` + `@vercel/analytics`. Página estática; o formulário usa uma Server Action.

---

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```bash
npm install
cp .env.example .env.local   # depois preencha LEAD_WEBHOOK_URL (veja abaixo)
npm run dev                  # http://localhost:3000
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera a versão de produção (rode antes de publicar para ver se está tudo certo) |
| `npm run start` | Sobe a versão de produção gerada pelo build |
| `npm run lint` | Confere o código com o ESLint |

---

## Trocar textos

**Todos os textos da página estão em [`content/site.ts`](content/site.ts)**, separados por seção (`hero`, `pains`, `howItWorks`, `petShop`, `tutor`, `pricing`, `faq`, `start`, `form`, `footer`). Edite o texto entre aspas, salve e a página atualiza sozinha com `npm run dev`.

- Não apague as vírgulas nem as aspas.
- Se o texto tiver aspas duplas dentro, use as curvas: “assim”.
- As páginas de Privacidade e Termos ficam em `app/privacidade/page.tsx` e `app/termos/page.tsx`.

Outras pastas, para quem for mexer no código:

```
app/            páginas, layout, metadados, Server Action (actions.ts), ícones e imagem Open Graph
components/     uma seção por arquivo (Hero, Pains, HowItWorks, ForPetShop, ForTutor, Pricing, Faq, StartCta, Footer…)
content/        site.ts — todos os textos
lib/            validação do formulário (lead.ts), link do WhatsApp, URL do site, hooks de movimento (motion.ts)
public/         logos em SVG
brand/          pacote da marca (manual em PDF, fontes, tokens). Fica fora do repositório (.gitignore);
                peça aos sócios se precisar. O site não depende dele.
```

Cores, fontes, tamanhos de texto e cantos estão em [`app/globals.css`](app/globals.css), no bloco `@theme`. Cada token vira uma classe do Tailwind (`bg-brand`, `text-ink`, `rounded-card`…) e uma variável CSS (`var(--color-brand)`).

---

## Configurar o formulário de contato

O formulário valida os campos no navegador e de novo no servidor, e então envia um **POST com JSON** para a URL da variável `LEAD_WEBHOOK_URL`. Pode ser qualquer serviço que receba webhook:

- **Make**: crie um cenário com o módulo *Webhooks → Custom webhook*, copie a URL e ligue em *Google Sheets → Add a row*.
- **Zapier**: *Webhooks by Zapier → Catch Hook*, copie a URL e ligue em *Google Sheets → Create Spreadsheet Row* (ou mande para o WhatsApp/e-mail da equipe).
- **Google Sheets direto**: publique um Google Apps Script como *App da Web* com um `doPost(e)` que faça `JSON.parse(e.postData.contents)` e `appendRow`.

Formato enviado:

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

Comportamento:

- **Sem `LEAD_WEBHOOK_URL`**: o formulário mostra "Não conseguimos enviar agora. Tente de novo ou chame a gente no WhatsApp." e o servidor registra no log que a variável está faltando. Nada se perde em silêncio.
- **Webhook respondeu erro ou demorou mais de 10 s**: mesma mensagem de erro, e os campos continuam preenchidos.
- **Anti-spam**: há um campo escondido (`empresa_site`). Se vier preenchido, a página finge sucesso e não envia nada.
- **Analytics**: em cada envio com sucesso é registrado o evento `lead_submitted` (com a faixa de banhos por semana) no Vercel Web Analytics.

Para testar no computador, coloque a URL do webhook em `.env.local` e reinicie o `npm run dev`.

---

## Publicar na Vercel

1. Suba o projeto para um repositório no GitHub (ou GitLab/Bitbucket).
2. Na Vercel: **Add New… → Project**, importe o repositório. O framework (Next.js) é detectado sozinho; não mude os comandos de build.
3. Antes de clicar em **Deploy**, abra **Environment Variables** e cadastre:
   - `LEAD_WEBHOOK_URL` = a URL do webhook (Make/Zapier/Apps Script). Marque *Production* e *Preview*.
   - `NEXT_PUBLIC_SITE_URL` = `https://agendaflui.com.br` (ou o domínio final, **sem barra no final**). Marque *Production*.
4. Clique em **Deploy**.
5. Em **Settings → Domains**, adicione `agendaflui.com.br` (e `www.agendaflui.com.br`, redirecionando para o principal) e siga as instruções de DNS.
6. Em **Analytics**, clique em **Enable** para ligar o Web Analytics (o código já está pronto).
7. Se mudar alguma variável depois, faça um novo deploy (**Deployments → ⋯ → Redeploy**). Variáveis `NEXT_PUBLIC_*` só valem a partir do próximo build.

Pela linha de comando, o equivalente é:

```bash
npm i -g vercel@latest
vercel link
vercel env add LEAD_WEBHOOK_URL production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel --prod
```

---

## Placeholders que faltam preencher

Tudo que está entre colchetes aparece na página de propósito, para ninguém esquecer.

| Placeholder | Onde aparece | Onde trocar |
|---|---|---|
| `[PREÇO]` | Card do "Plano completo" | `content/site.ts` → `pricing.plan.price` |
| `[NÚMERO DO WHATSAPP]` | Link "Chamar no WhatsApp" (sucesso e erro do formulário), link "Contato" do rodapé, páginas legais | `content/site.ts` → `contact.whatsapp` (ex.: `"+55 41 99999-9999"`) e os textos das páginas legais |
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
