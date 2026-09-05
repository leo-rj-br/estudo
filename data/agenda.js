/* =============================================================================
 *  AGENDA DE EVENTOS — Comunidade Manifesto
 *  -----------------------------------------------------------------------
 *  Este é o ÚNICO arquivo que precisa ser editado para atualizar a agenda.
 *  Não é preciso mexer em HTML, CSS ou JavaScript.
 *
 *  COMO ADICIONAR UM EVENTO
 *  -------------------------
 *  Acrescente um item em `eventos`, na ordem que preferir — o site ordena
 *  por data sozinho. Só `data` e `categoria` são obrigatórios:
 *
 *      { data: '2026-12-06', categoria: 'ceia' }
 *
 *  Sem `titulo`, o site usa o nome da categoria (ex.: "Ceia do Senhor"). Use
 *  `titulo` só quando o evento precisar de um nome próprio:
 *
 *      { data: '2026-09-25', fim: '2026-09-26', categoria: 'conferencia',
 *        titulo: 'Conferência Manifesto 2026' }
 *
 *  CAMPOS DE CADA EVENTO
 *  -----------------------
 *    data        "AAAA-MM-DD", primeiro dia do evento (obrigatório)
 *    categoria   id de uma categoria da lista abaixo (obrigatório)
 *    fim         "AAAA-MM-DD" — último dia, só em eventos de mais de um dia
 *    titulo      nome próprio do evento, se diferente do nome da categoria
 *    horario     hora de início, "HH:MM" — sem isso o evento entra como um
 *                evento de dia inteiro (sem hora) na agenda e no .ics
 *    horarioFim  hora de término, "HH:MM" (opcional, só com `horario`)
 *    local       onde acontece — sem isso usa `config.localPadrao`
 *    descricao   parágrafo curto sobre o evento
 *    link        inscrição, formulário ou página com mais detalhes
 *
 *  Datas repetidas não são erro: um mesmo dia pode ter mais de um evento
 *  (é o caso de 1º de novembro de 2026, com Ceia do Senhor e Comunhão dos
 *  Santos no mesmo domingo).
 *
 *  Antes de commitar, rode: node scripts/validar-agenda.js
 * ========================================================================== */

window.AGENDA = {
  config: {
    igreja: 'Comunidade Manifesto',
    // Fuso dos eventos. Datas e horários são sempre lidos neste fuso, então
    // quem acessar de fora do Brasil recebe um .ics no instante correto.
    fuso: '-03:00',
    // Local padrão dos eventos presenciais — usado quando o evento não
    // define o seu próprio `local`.
    localPadrao: 'Comunidade Manifesto',
  },

  // A cor é só decoração — o nome da categoria aparece sempre por escrito
  // ao lado dela, nunca é a única forma de identificar um evento.
  // `texto` é a cor do texto sobre o fundo `cor` (preta ou branca, a que
  // melhor contrasta).
  categorias: [
    { id: 'ceia',            nome: 'Ceia do Senhor',                   cor: '#b8f943', texto: '#111111' },
    { id: 'comunhao',        nome: 'Comunhão dos Santos',              cor: '#af10ff', texto: '#ffffff' },
    { id: 'lideres',         nome: 'Reunião de Líderes',               cor: '#ddd0bf', texto: '#111111' },
    { id: 'mulheres',        nome: 'Reunião de Mulheres',              cor: '#f33bb3', texto: '#ffffff' },
    { id: 'homens',          nome: 'Reunião dos Homens',               cor: '#3b47f3', texto: '#ffffff' },
    { id: 'membresia',       nome: 'Reunião de Membresia',             cor: '#fc7921', texto: '#ffffff' },
    { id: 'financas',        nome: 'Seminário Finanças',               cor: '#24ba94', texto: '#ffffff' },
    { id: 'novo-estudo',     nome: 'Seminário Introdução Novo Estudo', cor: '#23c8e8', texto: '#111111' },
    { id: 'criancas',        nome: 'Dia das Crianças',                 cor: '#fe0000', texto: '#ffffff' },
    { id: 'infantil-online', nome: 'Reunião Dpt. Infantil (Online)',   cor: '#832c2b', texto: '#ffffff' },
    { id: 'ordenacao',       nome: 'Ordenação Pastoral',               cor: '#e0d112', texto: '#111111' },
    { id: 'conferencia',     nome: 'Conferência Manifesto',            cor: '#0f1343', texto: '#ffffff' },
  ],

  eventos: [
    /* -------------------------------------------------------------------
     * 2026 — 2º semestre
     * ---------------------------------------------------------------- */
    { data: '2026-09-06', categoria: 'ceia' },
    { data: '2026-09-19', categoria: 'homens' },
    { data: '2026-09-25', fim: '2026-09-26', categoria: 'conferencia' },

    { data: '2026-10-04', categoria: 'ceia' },
    { data: '2026-10-24', categoria: 'criancas' },

    { data: '2026-11-01', categoria: 'ceia' },
    { data: '2026-11-01', categoria: 'comunhao' },

    { data: '2026-12-06', categoria: 'ceia' },
    { data: '2026-12-13', categoria: 'lideres' },
    { data: '2026-12-17', categoria: 'membresia' },
    { data: '2026-12-19', categoria: 'comunhao' },
  ],
};
