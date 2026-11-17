/**
 * Todos os textos da landing da Agenda Flui.
 *
 * Para trocar um texto, edite aqui e salve; a página atualiza sozinha em `npm run dev`.
 * Tudo que está entre [colchetes] é placeholder e precisa ser preenchido antes de publicar
 * (a lista completa está no README).
 */

export const site = {
  name: "Agenda Flui",

  contact: {
    /** Número com DDI + DDD, só dígitos ou formatado. Ex.: "+55 41 99999-9999". */
    whatsapp: "+55 41 99173-1154",
    /** Mensagem que já vem escrita quando a pessoa abre o WhatsApp. */
    whatsappMessage: "Oi! Quero saber mais sobre a Agenda Flui.",
    instagram: {
      label: "@agendaflui",
      url: "https://www.instagram.com/agendaflui/",
    },
  },

  seo: {
    title: "Agenda Flui — agendamento online para banho e tosa",
    description:
      "O tutor agenda sozinho, o horário fica confirmado na hora e o lembrete vai pelo WhatsApp. Agenda Flui para pet shops.",
  },

  nav: {
    links: [
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Para o pet shop", href: "#pet-shop" },
      { label: "Para o tutor", href: "#tutor" },
      { label: "Planos", href: "#planos" },
      { label: "Dúvidas", href: "#duvidas" },
    ],
    cta: { label: "Quero conhecer", href: "#comecar" },
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    homeSuffix: "voltar ao início",
    skipLink: "Pular para o conteúdo",
  },

  hero: {
    badge: "Agendamento online para banho e tosa",
    title: "Banho marcado, tutor tranquilo.",
    text: "O tutor escolhe o serviço e o horário pelo seu link, sem ligar. Você recebe o dia organizado, e o lembrete vai sozinho no WhatsApp na véspera.",
    primary: { label: "Quero conhecer", href: "#comecar" },
    secondary: { label: "Ver como funciona", href: "#como-funciona" },
    note: "Sem instalar nada. Funciona no celular do tutor e no computador do balcão.",
    /** Notificações que se alternam ao lado do card (ilustrativas). */
    toasts: [
      { kind: "booking", title: "Novo agendamento", text: "Paçoca · banho · amanhã, 14:00" },
      { kind: "reminder", title: "Lembrete enviado no WhatsApp", text: "Mel · banho amanhã, 09:00" },
      { kind: "ready", title: "Pet pronto", text: "Tutor do Thor avisado para buscar" },
    ],
  },

  /** Card interativo do hero e tela do celular na seção do tutor. */
  booking: {
    shopName: "[Nome do seu pet shop]",
    title: "Banho do Thor",
    petChip: "Shih-tzu · pequeno",
    serviceLabel: "Serviço",
    services: [
      { name: "Banho + hidratação", duration: "1h" },
      { name: "Banho + tosa higiênica", duration: "1h30" },
    ],
    dayLabel: "Terça, 17 de novembro",
    times: [
      { time: "09:00" },
      { time: "09:30", busy: true },
      { time: "10:00" },
      { time: "10:30" },
      { time: "11:00", busy: true },
      { time: "14:00" },
    ],
    busyLabel: "ocupado",
    /** Horário que se seleciona sozinho uma vez, quando a página carrega. */
    autoSelect: "10:00",
    pickTime: "Escolha um horário",
    confirmPrefix: "Confirmar",
    successTitle: "Banho agendado",
    successText: (time: string) =>
      `Terça, 17/11 às ${time}. A gente te lembra no WhatsApp na véspera.`,
    again: "Agendar outro",
    reminder: "Lembrete no WhatsApp na véspera",
    ariaLabel: "Exemplo de agendamento: banho do Thor",
  },

  pains: {
    title: "O dia do banho e tosa não precisa começar no WhatsApp.",
    items: [
      {
        title: "Chega de responder “tem horário?”",
        text: "O tutor vê só os horários livres e marca sozinho, até de madrugada. Seu atendente cuida dos pets, não do celular.",
      },
      {
        title: "Menos faltas",
        text: "Lembrete automático na véspera com botão para confirmar ou remarcar. O horário que vagar volta para a agenda.",
      },
      {
        title: "Cada pet com sua ficha",
        text: "Raça, porte, alergias, o tipo de tosa que o tutor gosta. Quem dá o banho sabe tudo antes do pet chegar.",
      },
    ],
  },

  howItWorks: {
    title: "Do link na bio ao pet cheiroso em três passos",
    /** Mini-telas animadas de cada passo (ilustrativas). */
    demos: {
      services: [
        { name: "Banho · porte P", meta: "1h · Ana" },
        { name: "Tosa higiênica", meta: "30 min · Léo" },
        { name: "Hidratação", meta: "30 min · Ana" },
        { name: "Táxi dog", meta: "ida e volta" },
      ],
      url: "agendaflui.com.br/seupetshop",
      copied: "Link copiado",
      channels: ["Instagram", "WhatsApp", "Google"],
      bookings: [
        { time: "09:00", pet: "Bob", service: "banho" },
        { time: "10:00", pet: "Thor", service: "banho + hidratação" },
        { time: "11:00", pet: "Paçoca", service: "táxi dog" },
      ],
      reminders: "Lembretes enviados no WhatsApp",
    },
    steps: [
      {
        title: "Monte seus serviços",
        text: "Banho por porte, tosa, hidratação, táxi dog. Defina duração, preço e quem da equipe atende.",
      },
      {
        title: "Compartilhe seu link",
        text: "Na bio do Instagram, no status do WhatsApp, no Google. Um endereço só:",
        link: "agendaflui.com.br/seupetshop",
      },
      {
        title: "Receba o dia pronto",
        text: "Os agendamentos caem na agenda da equipe, o tutor recebe o lembrete e você só abre a porta.",
      },
    ],
  },

  petShop: {
    title: "Sua agenda enche sozinha.",
    text: "Veja o dia de cada banhista e tosador numa tela só, encaixe um pet com dois toques e saiba quanto entrou hoje.",
    bullets: [
      "Agenda por profissional e por mesa de banho",
      "Pacotes mensais de banho com saldo do tutor",
      "Venda de produtos junto do atendimento",
      "Faturamento do dia, da semana e do mês",
    ],
    agenda: {
      title: "Hoje · terça, 17",
      summary: "9 pets agendados · 2 horários livres",
      ariaLabel: "Exemplo da agenda do dia, com os horários de Ana e Léo",
      hours: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
      free: "Livre",
      columns: [
        {
          name: "Ana · banho",
          slots: [
            { row: 0, pet: "Bob", service: "banho", kind: "confirmed" },
            { row: 1, pet: "Thor", service: "banho + hidratação", kind: "confirmed" },
            { row: 2, pet: "Paçoca", service: "banho · táxi dog", kind: "taxi" },
            { row: 3, kind: "free" },
            { row: 4, pet: "Mel", service: "banho + hidratação", kind: "confirmed" },
            { row: 5, pet: "Nina", service: "banho", kind: "confirmed" },
          ],
        },
        {
          name: "Léo · tosa",
          slots: [
            { row: 0, pet: "Luna", service: "tosa bebê", kind: "confirmed" },
            { row: 1, kind: "free" },
            { row: 2, pet: "Fred", service: "tosa higiênica", kind: "confirmed" },
            { row: 3, span: 2, pet: "Max", service: "tosa completa", kind: "confirmed" },
            { row: 5, pet: "Belinha", service: "tosa na tesoura", kind: "confirmed" },
          ],
        },
      ],
      legend: { confirmed: "Confirmado", taxi: "Com táxi dog" },
    },
  },

  tutor: {
    title: "Para o tutor, marcar banho fica fácil como pedir comida.",
    text: "Ele cadastra o pet uma vez, repete o último serviço com um toque e recebe aviso quando o pet estiver pronto para buscar.",
    features: [
      { title: "Repetir o último", text: "O banho de sempre, com um toque." },
      { title: "“O Thor está pronto”", text: "Aviso no WhatsApp na hora de buscar." },
      { title: "Vários pets", text: "Thor e Mel na mesma conta, cada um com sua ficha." },
      { title: "Remarcar sem ligar", text: "Mudou o plano? Troca o horário pelo link." },
    ],
    phone: {
      ariaLabel:
        "Tela do celular do tutor: escolha do serviço, do dia e do horário para o banho do Thor",
      title: "Qual o banho do Thor hoje?",
      last: { label: "Último banho · 03/11", service: "Banho + hidratação", action: "Repetir" },
      daysLabel: "Novembro",
      days: [
        { weekday: "seg", long: "Segunda", day: "16", busy: ["09:00", "10:30"] },
        { weekday: "ter", long: "Terça", day: "17", busy: ["09:30", "11:00"] },
        { weekday: "qua", long: "Quarta", day: "18", busy: ["10:00", "14:00"] },
        { weekday: "qui", long: "Quinta", day: "19", busy: ["09:00", "09:30", "11:00"] },
        { weekday: "sex", long: "Sexta", day: "20", busy: ["10:30"] },
      ],
      times: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00"],
      selectedDay: 1,
      selectedTime: "10:00",
      button: "Agendar banho",
      pickTime: "Escolha um horário",
      successTitle: "Banho agendado",
      successText: (weekday: string, day: string, time: string) => `${weekday}, ${day}/11 às ${time}`,
      again: "Agendar outro",
      groupLabel: "Simulação da tela do tutor. Experimente escolher serviço, dia e horário.",
    },
    caption: {
      title: "Seu link, do jeito que o tutor vê.",
      text: "Serviço, dia e horário na mesma tela. Ele marca pelo navegador do celular, sem baixar aplicativo.",
      hint: "Experimente no celular: troque o serviço, o dia e o horário.",
    },
  },

  pricing: {
    title: "Um plano só, com tudo incluído.",
    aside: "Sem taxa de implantação e sem fidelidade. A gente configura seus serviços com você.",
    plan: {
      badge: "Tudo incluído",
      name: "Plano completo",
      price: "[PREÇO]",
      period: "/mês",
      note: "Tudo o que o banho e tosa precisa, num plano só.",
      includesLabel: "O que está incluído",
      includes: [
        "Agendamento online pelo tutor, com confirmação na hora",
        "Lembretes automáticos no WhatsApp",
        "Aviso de pet pronto",
        "Ficha do pet",
        "Agenda por profissional",
        "Sem taxa de implantação",
        "Sem fidelidade",
      ],
      cta: { label: "Quero conhecer", href: "#comecar" },
    },
  },

  faq: {
    title: "Dúvidas",
    intro: "O básico antes de começar.",
    items: [
      {
        q: "Preciso instalar alguma coisa?",
        a: "Não. Funciona no navegador do computador e do celular.",
      },
      {
        q: "O tutor precisa baixar aplicativo?",
        a: "Não. Ele agenda pelo seu link.",
      },
      {
        q: "Como funcionam os lembretes no WhatsApp?",
        a: "Na véspera, o tutor recebe uma mensagem com botão para confirmar ou remarcar.",
      },
      {
        q: "Posso ter mais de um banhista ou tosador?",
        a: "Sim, cada profissional tem sua agenda.",
      },
      {
        q: "Tem taxa de implantação ou fidelidade?",
        a: "Não.",
      },
      {
        q: "Quanto tempo leva para começar?",
        a: "Poucos minutos. A gente configura seus serviços com você e o seu link já fica pronto para divulgar.",
      },
    ],
  },

  start: {
    title: "Leve a Agenda\u00a0Flui para o seu pet shop",
    text: "Conte um pouco do seu pet shop. A gente chama você no WhatsApp e configura seus serviços junto com você, sem taxa de implantação.",
  },

  form: {
    ariaLabel: "Fale com a Agenda Flui",
    fields: {
      petShop: { label: "Nome do pet shop", placeholder: "Ex.: Banho & Cia" },
      name: { label: "Seu nome", placeholder: "Ex.: Ana Souza" },
      whatsapp: { label: "WhatsApp", placeholder: "(41) 99999-9999" },
      city: { label: "Cidade", placeholder: "Ex.: Curitiba" },
      weeklyBaths: { label: "Quantos banhos por semana?", placeholder: "Selecione" },
    },
    weeklyBathsOptions: [
      { value: "ate-30", label: "até 30" },
      { value: "31-80", label: "31 a 80" },
      { value: "81-150", label: "81 a 150" },
      { value: "mais-150", label: "mais de 150" },
    ],
    errors: {
      petShop: "Informe o nome do pet shop",
      name: "Informe seu nome",
      whatsapp: "Informe um WhatsApp com DDD",
      city: "Informe a cidade",
      weeklyBaths: "Escolha quantos banhos por semana",
    },
    submit: "Quero conhecer a Agenda Flui",
    sending: "Enviando…",
    note: "Ao enviar, o WhatsApp abre com seus dados. É só mandar a mensagem.",
    successTitle: "Quase lá!",
    successText: "Abrimos o WhatsApp com seus dados. Envie a mensagem e a gente responde em até 1 dia útil.",
    successLink: "Chamar no WhatsApp agora",
    error: "Não conseguimos enviar agora. Tente de novo ou chame a gente no WhatsApp.",
    errorLink: "Chamar no WhatsApp",
    fixFields: "Confira os campos marcados.",
    honeypotLabel: "Deixe este campo em branco",
  },

  footer: {
    links: [
      { label: "Privacidade", href: "/privacidade" },
      { label: "Termos", href: "/termos" },
    ],
    contactLabel: "Contato",
    copyright: "© 2026 Agenda Flui",
  },
} as const;

export type Site = typeof site;
