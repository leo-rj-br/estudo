/* =============================================================================
   Agenda de Eventos · Comunidade Manifesto
   Toda a interface é derivada de data/agenda.js. Nenhum estado é duplicado.
   ========================================================================== */

(() => {
  'use strict';

  const DATA = window.AGENDA;
  if (!DATA) return;

  const CFG = DATA.config || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const DIAS_CURTOS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']; // semana começa na segunda

  /* -- Ícones (SVG de traço único — nunca emoji) --------------------------- */
  const ico = {
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/></svg>',
  };

  /* -- Datas ----------------------------------------------------------------
   * As mesmas convenções do site do estudo: datas são sempre lidas como hora
   * local (evita o deslocamento de fuso do parser ISO), e "hoje" é sempre
   * hoje no fuso da igreja — não no fuso de quem está olhando.
   * ------------------------------------------------------------------- */

  const toDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const withTime = (iso, hora) => {
    const h = /^\d{1,2}:\d{2}$/.test(hora || '') ? hora.padStart(5, '0') : '00:00';
    const dt = new Date(`${iso}T${h}:00${CFG.fuso || '-03:00'}`);
    if (!isNaN(dt)) return dt;
    const local = toDate(iso);
    const [hh, mi] = h.split(':').map(Number);
    local.setHours(hh, mi, 0, 0);
    return local;
  };

  function hojeNoFuso() {
    const m = String(CFG.fuso || '-03:00').match(/^([+-])(\d{2}):?(\d{2})$/);
    const min = m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : -180;
    return new Date(Date.now() + min * 60000).toISOString().slice(0, 10);
  }

  const addDias = (iso, n) => {
    const d = toDate(iso);
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const nomeDia = (d) => {
    const dow = DIAS[d.getDay()];
    return dow === 'domingo' || dow === 'sábado' ? dow : `${dow}-feira`;
  };

  const fmtDia = (iso) => {
    const d = toDate(iso);
    return `${nomeDia(d)}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
  };

  // Data única ou intervalo, por extenso: "domingo, 6 de setembro" ou
  // "sexta-feira, 25 a sábado, 26 de setembro".
  function fmtPeriodo(e) {
    if (e.fim === e.data) return fmtDia(e.data);
    const a = toDate(e.data), b = toDate(e.fim);
    if (a.getMonth() === b.getMonth()) {
      return `${nomeDia(a)}, ${a.getDate()} a ${nomeDia(b)}, ${b.getDate()} de ${MESES[a.getMonth()]}`;
    }
    return `${nomeDia(a)}, ${a.getDate()} de ${MESES[a.getMonth()]} a ${nomeDia(b)}, ${b.getDate()} de ${MESES[b.getMonth()]}`;
  }

  /* -- Normalização ---------------------------------------------------------- */

  const categorias = new Map((DATA.categorias || []).map((c) => [c.id, c]));
  const HOJE = hojeNoFuso();

  const eventos = (DATA.eventos || [])
    .filter((e) => e && e.data && categorias.has(e.categoria))
    .map((e, i) => {
      const cat = categorias.get(e.categoria);
      const fim = e.fim || e.data;
      const diaInteiro = !e.horario;
      const inicio = withTime(e.data, e.horario);
      const fimReal = e.horarioFim ? withTime(fim, e.horarioFim)
        : diaInteiro ? withTime(fim, '23:59') : new Date(inicio.getTime() + 90 * 60000);
      return {
        ...e,
        id: i,
        fim,
        cat,
        titulo: e.titulo || cat.nome,
        local: e.local || CFG.localPadrao || '',
        diaInteiro,
        inicio,
        fimReal,
        passado: fim < HOJE,
        terminou: fimReal < new Date(),
      };
    })
    .sort((a, b) => (a.data === b.data ? a.id - b.id : a.data < b.data ? -1 : 1));

  // Índice por dia — cada dia de um evento de múltiplos dias aparece aqui.
  const porDia = new Map();
  for (const e of eventos) {
    let d = e.data;
    while (d <= e.fim) {
      if (!porDia.has(d)) porDia.set(d, []);
      porDia.get(d).push(e);
      d = addDias(d, 1);
    }
  }

  const proximo = eventos.find((e) => e.fim >= HOJE) || null;
  const idxDe = new Map(eventos.map((e, i) => [e.id, i]));

  const hojeD = toDate(HOJE);
  const ui = {
    view: 'calendario',
    busca: '',
    categoria: 'todos',
    ano: proximo ? toDate(proximo.data).getFullYear() : hojeD.getFullYear(),
    mes: proximo ? toDate(proximo.data).getMonth() : hojeD.getMonth(),
    diaAberto: null,
    mostrarPassado: false,
  };

  const correspondeCategoria = (e) => ui.categoria === 'todos' || e.categoria === ui.categoria;

  /* ======================================================================
     HERÓI — próximo evento
     ==================================================================== */

  function renderHero() {
    const host = $('#hero');
    if (!host) return;

    if (!proximo) {
      host.innerHTML = `
        <div class="wrap">
          <p class="eyebrow" style="margin-bottom:var(--s-3)">Agenda de eventos</p>
          <h1 class="hero__title">Nada agendado no momento.</h1>
          <p class="hero__resumo">Assim que um novo evento entrar na agenda, ele aparece aqui em destaque.</p>
        </div>`;
      return;
    }

    const e = proximo;
    const hoje = e.data <= HOJE && HOJE <= e.fim;
    const quando = hoje ? (e.fim === HOJE ? 'Hoje' : 'Acontecendo agora') : fmtPeriodo(e);

    const meta = [];
    if (e.diaInteiro) meta.push('Dia inteiro'); else meta.push(e.horario + (e.horarioFim ? `–${e.horarioFim}` : ''));
    if (e.local) meta.push(e.local);

    host.innerHTML = `
      <div class="wrap">
        <div class="hero__grid">
          <div data-reveal>
            <p class="hero__tag"><span class="dot"></span>Próximo evento</p>
            <p class="hero__date"><b>${escape(quando)}</b> · ${meta.map(escape).join(' · ')}</p>
            <h1 class="hero__title">
              <span class="tag" style="--tag-bg:${e.cat.cor};--tag-fg:${e.cat.texto}">${escape(e.cat.nome)}</span>
              <span>${escape(e.titulo)}</span>
            </h1>
            ${e.descricao ? `<p class="hero__resumo">${escape(e.descricao)}</p>` : ''}
            <div class="hero__actions">
              <button class="btn btn--primary" data-ics="${e.id}">${ico.cal} Adicionar à agenda</button>
              <button class="btn btn--quiet" data-goto="${e.data}">${ico.list} Ver na agenda</button>
              ${e.link ? `<a class="btn btn--quiet" href="${escape(e.link)}" target="_blank" rel="noopener">${ico.ext} Mais informações</a>` : ''}
            </div>
          </div>

          <aside class="hero__side" data-reveal style="--reveal-delay:110ms">
            <div class="countdown">
              <p class="eyebrow">${hoje ? 'Em andamento' : 'Faltam'}</p>
              <div class="countdown__clock" id="clock" role="timer"></div>
            </div>
          </aside>
        </div>
      </div>`;

    tickClock();
    setInterval(tickClock, 1000);
  }

  function tickClock() {
    const host = $('#clock');
    if (!host || !proximo) return;
    const e = proximo;

    const alvo = e.diaInteiro ? withTime(e.data, '00:00') : e.inicio;
    const diff = alvo - new Date();

    if (diff <= 0) {
      const acabou = new Date() > e.fimReal;
      host.innerHTML = acabou
        ? `<p class="countdown__live">Encerrado</p>`
        : `<p class="countdown__live">${e.fim === HOJE ? 'Acontecendo hoje' : 'Em andamento'}</p>`;
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1000);

    const unit = (n, label) =>
      `<div><span class="countdown__n">${String(n).padStart(2, '0')}</span><span class="countdown__u">${label}</span></div>`;

    host.innerHTML = d > 0
      ? unit(d, d === 1 ? 'dia' : 'dias') + unit(h, 'horas') + unit(m, 'min')
      : unit(h, 'horas') + unit(m, 'min') + unit(s, 'seg');
  }

  /* ======================================================================
     FILTROS — categorias
     ==================================================================== */

  function renderFiltros() {
    const host = $('#toolCategorias');
    if (!host) return;
    const todas = `
      <button class="chip chip--tudo" type="button" data-categoria="todos" aria-pressed="${ui.categoria === 'todos'}">
        Todas
      </button>`;
    const chips = [...categorias.values()].map((c) => `
      <button class="chip" type="button" data-categoria="${c.id}" aria-pressed="${ui.categoria === c.id}">
        <i class="chip__dot" style="background:${c.cor}"></i>${escape(c.nome)}
      </button>`).join('');
    host.innerHTML = todas + chips;
  }

  /* ======================================================================
     AGENDA (lista)
     ==================================================================== */

  function visiveis() {
    const q = ui.busca.trim().toLowerCase();
    return eventos.filter((e) => {
      if (!correspondeCategoria(e)) return false;
      if (!q) return true;
      const hay = [e.titulo, e.cat.nome, e.local, e.descricao, fmtDia(e.data)]
        .filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  function porMes(lista) {
    const grupos = [];
    let atual = null;
    for (const e of lista) {
      const d = toDate(e.data);
      const chave = `${d.getFullYear()}-${d.getMonth()}`;
      if (!atual || atual.chave !== chave) {
        atual = { chave, mes: MESES[d.getMonth()], ano: d.getFullYear(), itens: [] };
        grupos.push(atual);
      }
      atual.itens.push(e);
    }
    return grupos.map((g) => `
      <section class="month-group">
        <h3 class="month-group__label">${g.mes} <span>${g.ano}</span></h3>
        ${g.itens.map(evtHTML).join('')}
      </section>`).join('');
  }

  function renderAgenda() {
    const host = $('#agenda');
    if (!host) return;
    const lista = visiveis();

    if (!lista.length) {
      host.innerHTML = `
        <div class="empty">
          <h3>Nada por aqui</h3>
          <p>Nenhum evento corresponde a esse filtro. Tente outra palavra ou volte para “Todas”.</p>
        </div>`;
      return;
    }

    const neutro = ui.categoria === 'todos' && !ui.busca.trim();
    const passados = neutro ? lista.filter((e) => e.passado) : [];
    const adiante = neutro ? lista.filter((e) => !e.passado) : lista;

    let html = '';
    if (passados.length && adiante.length) {
      html += `
        <button class="past-toggle" type="button" id="verPassado" aria-expanded="${ui.mostrarPassado}">
          <span class="past-toggle__chev">${ico.chev}</span>
          <span>${ui.mostrarPassado ? 'Ocultar' : 'Ver'} os ${passados.length} eventos anteriores</span>
          <span class="past-toggle__rule"></span>
        </button>`;
      if (ui.mostrarPassado) html += porMes(passados);
    } else {
      html += porMes(passados);
    }
    html += porMes(adiante);

    host.innerHTML = html;
    if (ui.diaAberto) abrirEvento(ui.diaAberto, false);
  }

  function evtHTML(e) {
    const d = toDate(e.data);
    const ehProximo = proximo && proximo.id === e.id;

    const classes = ['enc'];
    if (e.passado) classes.push('enc--past');
    if (ehProximo) classes.push('enc--next');

    const sub = [];
    sub.push(e.diaInteiro ? 'Dia inteiro' : e.horario + (e.horarioFim ? `–${e.horarioFim}` : ''));
    if (e.local) sub.push(escape(e.local));
    if (e.fim !== e.data) sub.push('vários dias');

    return `
      <article class="${classes.join(' ')}" id="evt-${e.id}" data-evt="${e.id}">
        <h4>
          <button class="enc__btn" aria-expanded="false" aria-controls="body-${e.id}">
            <span class="enc__day">
              <b>${String(d.getDate()).padStart(2, '0')}</b>
              <small>${DIAS_CURTOS[(d.getDay() + 6) % 7]}</small>
            </span>
            <span class="enc__main">
              <span class="enc__title">
                <span class="tag" style="--tag-bg:${e.cat.cor};--tag-fg:${e.cat.texto}">${escape(e.cat.nome)}</span>
                ${e.titulo !== e.cat.nome ? `<span>${escape(e.titulo)}</span>` : ''}
              </span>
              <span class="enc__sub">${sub.map((s, i) => (i ? `<span class="sep">·</span>${s}` : s)).join('')}</span>
            </span>
            <span class="enc__aside">
              ${ehProximo ? `<span class="badge badge--next">Próximo</span>` : ''}
              <span class="enc__chev">${ico.chev}</span>
            </span>
          </button>
        </h4>
        <div class="enc__body" id="body-${e.id}" role="region">
          <div><div class="enc__inner enc__inner--solo"></div></div>
        </div>
      </article>`;
  }

  function montarInterior(e, host) {
    if (host.dataset.ready) return;
    host.dataset.ready = '1';

    host.innerHTML = e.descricao
      ? `<p class="enc__resumo">${escape(e.descricao)}</p>`
      : `<p class="enc__empty">Sem descrição adicional para este evento.</p>`;

    const facts = [
      `<div class="fact"><dt>Data</dt><dd>${escape(fmtPeriodo(e))}</dd></div>`,
      `<div class="fact"><dt>Horário</dt><dd class="num">${e.diaInteiro ? 'Dia inteiro' : e.horario + (e.horarioFim ? `–${e.horarioFim}` : '')}</dd></div>`,
    ];
    if (e.local) facts.push(`<div class="fact"><dt>Local</dt><dd>${escape(e.local)}</dd></div>`);
    host.insertAdjacentHTML('beforeend', `<dl class="enc__facts">${facts.join('')}</dl>`);

    const links = [];
    if (!e.terminou) links.push(`<button class="btn btn--quiet" data-ics="${e.id}">${ico.cal} Adicionar à agenda</button>`);
    if (e.link) links.push(`<a class="btn btn--quiet" href="${escape(e.link)}" target="_blank" rel="noopener">${ico.ext} Mais informações</a>`);
    if (links.length) host.insertAdjacentHTML('beforeend', `<div class="enc__links">${links.join('')}</div>`);
  }

  function abrirEvento(id, mover = true) {
    const art = document.getElementById(`evt-${id}`);
    if (!art) return;
    if (ui.diaAberto && ui.diaAberto !== id) fecharEvento(ui.diaAberto);

    const e = eventos[idxDe.get(id)];
    if (e) montarInterior(e, $('.enc__inner', art));

    art.classList.add('is-open');
    $('.enc__btn', art).setAttribute('aria-expanded', 'true');
    ui.diaAberto = id;

    if (mover) {
      requestAnimationFrame(() => {
        art.scrollIntoView({ behavior: prefersMotion() ? 'smooth' : 'auto', block: 'start' });
      });
    }
  }

  function fecharEvento(id) {
    const art = document.getElementById(`evt-${id}`);
    if (!art) return;
    art.classList.remove('is-open');
    $('.enc__btn', art).setAttribute('aria-expanded', 'false');
    if (ui.diaAberto === id) ui.diaAberto = null;
  }

  function alternarEvento(id) {
    if (ui.diaAberto === id) fecharEvento(id);
    else abrirEvento(id, false);
  }

  // Leva a interface até a data de um evento, desfazendo filtros se preciso.
  function irParaData(iso) {
    const doDia = porDia.get(iso) || [];
    if (!doDia.length) return;

    setView('agenda');
    ui.busca = '';
    if (ui.categoria !== 'todos' && !doDia.some((e) => e.categoria === ui.categoria)) ui.categoria = 'todos';
    if (doDia.every((e) => e.passado)) ui.mostrarPassado = true;

    const busca = $('#busca');
    if (busca) { busca.value = ''; $('.search').classList.remove('has-value'); }
    renderFiltros();
    renderAgenda();
    abrirEvento(doDia[0].id, true);
  }

  /* ======================================================================
     CALENDÁRIO — grade do mês
     ==================================================================== */

  function renderCalendario() {
    const host = $('#calendario');
    if (!host) return;

    const primeiro = new Date(ui.ano, ui.mes, 1);
    const offset = (primeiro.getDay() + 6) % 7; // semana começa na segunda
    const diasNoMes = new Date(ui.ano, ui.mes + 1, 0).getDate();
    const totalCel = Math.ceil((offset + diasNoMes) / 7) * 7;

    const diasAntes = new Date(ui.ano, ui.mes, 0).getDate();

    let celulas = '';
    for (let i = 0; i < totalCel; i++) {
      const nDia = i - offset + 1;
      if (nDia < 1) {
        celulas += `<div class="day-cell day-cell--fora"><b>${diasAntes + nDia}</b></div>`;
      } else if (nDia > diasNoMes) {
        celulas += `<div class="day-cell day-cell--fora"><b>${nDia - diasNoMes}</b></div>`;
      } else {
        celulas += diaHTML(nDia);
      }
    }

    host.innerHTML = `
      <div class="cal__top">
        <div class="monthpick">
          <button class="icon-btn" id="mesAnt" aria-label="Mês anterior">${ico.arrowL}</button>
          <span class="monthpick__m">${MESES[ui.mes]} <b>${ui.ano}</b></span>
          <button class="icon-btn" id="mesProx" aria-label="Próximo mês">${ico.arrowR}</button>
          <button class="btn btn--quiet monthpick__hoje" type="button" id="irHoje">${ico.today} Hoje</button>
        </div>
      </div>
      <div class="weekdays">${DIAS_CURTOS.map((d) => `<span>${d}</span>`).join('')}</div>
      <div class="grid-cal">${celulas}</div>`;

    $('#mesAnt').addEventListener('click', () => mudarMes(-1));
    $('#mesProx').addEventListener('click', () => mudarMes(1));
    $('#irHoje').addEventListener('click', () => {
      ui.ano = hojeD.getFullYear();
      ui.mes = hojeD.getMonth();
      renderCalendario();
    });
  }

  function mudarMes(delta) {
    ui.mes += delta;
    if (ui.mes < 0) { ui.mes = 11; ui.ano--; }
    if (ui.mes > 11) { ui.mes = 0; ui.ano++; }
    renderCalendario();
  }

  function diaHTML(n) {
    const iso = `${ui.ano}-${String(ui.mes + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
    const todosDoDia = porDia.get(iso) || [];
    const doDia = todosDoDia.filter(correspondeCategoria);

    const classes = ['day-cell'];
    if (iso === HOJE) classes.push('is-today');
    if (iso < HOJE) classes.push('is-past');
    if (doDia.length) classes.push('has-events');

    const MAX = 3;
    const pills = doDia.slice(0, MAX).map((e) => `
      <span class="evt-pill" style="--tag-bg:${e.cat.cor};--tag-fg:${e.cat.texto}"
            data-tip-titulo="${escape(e.titulo)}"
            data-tip-nota="${escape([e.diaInteiro ? 'dia inteiro' : e.horario, e.local].filter(Boolean).join(' · '))}">
        ${escape(e.titulo)}
      </span>`).join('');
    const mais = doDia.length > MAX ? `<span class="evt-more">+${doDia.length - MAX} mais</span>` : '';

    return `
      <button type="button" class="${classes.join(' ')}" ${doDia.length ? `data-day="${iso}"` : 'disabled'}
              aria-label="${escape(`${fmtDia(iso)}${doDia.length ? ' — ' + doDia.map((e) => e.titulo).join(', ') : ''}`)}">
        <b>${n}</b>
        <span class="day-cell__evts">${pills}${mais}</span>
      </button>`;
  }

  /* -- Dica flutuante (mesmo padrão do calendário do estudo) ---------------- */

  const tip = document.createElement('div');
  tip.className = 'tip';
  document.body.appendChild(tip);

  function mostrarTip(alvo) {
    if (!alvo.dataset.tipTitulo) return;
    tip.innerHTML = `<b>${escape(alvo.dataset.tipTitulo)}</b>${alvo.dataset.tipNota ? `<i>${escape(alvo.dataset.tipNota)}</i>` : ''}`;
    const r = alvo.getBoundingClientRect();
    tip.classList.add('is-on');
    const w = tip.offsetWidth;
    tip.style.left = `${Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8)}px`;
    tip.style.top = `${r.bottom + 8}px`;
  }
  const esconderTip = () => tip.classList.remove('is-on');

  /* -- Detalhe do dia (dialog) ------------------------------------------- */

  let dlg;

  function montarDialog() {
    dlg = document.createElement('dialog');
    dlg.className = 'daydlg';
    dlg.innerHTML = `
      <div class="daydlg__bar">
        <p class="daydlg__titulo"></p>
        <button class="icon-btn daydlg__fechar" type="button" aria-label="Fechar">${ico.x}</button>
      </div>
      <div class="daydlg__lista"></div>`;
    document.body.appendChild(dlg);
    $('.daydlg__fechar', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (ev) => { if (ev.target === dlg) dlg.close(); });
  }

  function abrirDia(iso) {
    if (!dlg) montarDialog();
    const doDia = (porDia.get(iso) || []).filter(correspondeCategoria);
    if (!doDia.length) return;

    $('.daydlg__titulo', dlg).textContent = fmtDia(iso);
    $('.daydlg__lista', dlg).innerHTML = doDia.map((e) => `
      <article class="daydlg__evt">
        <span class="tag" style="--tag-bg:${e.cat.cor};--tag-fg:${e.cat.texto}">${escape(e.cat.nome)}</span>
        <h4>${escape(e.titulo)}</h4>
        <p class="daydlg__meta">
          ${ico.clock}${e.diaInteiro ? 'Dia inteiro' : escape(e.horario + (e.horarioFim ? `–${e.horarioFim}` : ''))}
          ${e.fim !== e.data ? ` · até ${escape(fmtDia(e.fim))}` : ''}
        </p>
        ${e.local ? `<p class="daydlg__meta">${ico.pin}${escape(e.local)}</p>` : ''}
        ${e.descricao ? `<p class="daydlg__desc">${escape(e.descricao)}</p>` : ''}
        <div class="enc__links">
          ${!e.terminou ? `<button class="btn btn--quiet" data-ics="${e.id}">${ico.cal} Adicionar à agenda</button>` : ''}
          ${e.link ? `<a class="btn btn--quiet" href="${escape(e.link)}" target="_blank" rel="noopener">${ico.ext} Mais informações</a>` : ''}
        </div>
      </article>`).join('');

    dlg.showModal();
  }

  /* ======================================================================
     TROCA DE VISTA
     ==================================================================== */

  function setView(v, foco = false) {
    ui.view = v;
    $$('.seg button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.view === v)));
    $('#panelAgenda').hidden = v !== 'agenda';
    $('#panelCalendario').hidden = v !== 'calendario';
    posicionarPill();
    if (v === 'calendario') renderCalendario();
    if (foco) $('#programa').scrollIntoView({ behavior: prefersMotion() ? 'smooth' : 'auto', block: 'start' });
  }

  function posicionarPill() {
    const ativo = $('.seg button[aria-selected="true"]');
    const pill = $('.seg__pill');
    if (!ativo || !pill) return;
    pill.style.width = `${ativo.offsetWidth}px`;
    pill.style.transform = `translateX(${ativo.offsetLeft - 3}px)`;
  }

  /* ======================================================================
     .ICS — adicionar à agenda pessoal
     ==================================================================== */

  function baixarIcs(id) {
    const e = eventos[idxDe.get(id)];
    if (!e) return;

    const zData = (iso) => iso.replace(/-/g, '');
    const zHora = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const desc = e.descricao ? e.descricao.replace(/[,;]/g, '\\$&') : '';

    const linhas = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Comunidade Manifesto//Agenda//PT-BR',
      'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      `UID:${e.id}-${e.data}-agenda@comunidademanifesto.com`,
      `DTSTAMP:${zHora(new Date())}`,
    ];

    if (e.diaInteiro) {
      linhas.push(`DTSTART;VALUE=DATE:${zData(e.data)}`);
      linhas.push(`DTEND;VALUE=DATE:${zData(addDias(e.fim, 1))}`);
    } else {
      linhas.push(`DTSTART:${zHora(e.inicio)}`);
      linhas.push(`DTEND:${zHora(e.fimReal)}`);
    }

    linhas.push(`SUMMARY:${e.titulo.replace(/[,;]/g, '\\$&')}`);
    if (desc) linhas.push(`DESCRIPTION:${desc}`);
    if (e.local) linhas.push(`LOCATION:${e.local.replace(/[,;]/g, '\\$&')}`);
    linhas.push('END:VEVENT', 'END:VCALENDAR');

    const ics = linhas.filter(Boolean).join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `agenda-${e.data}-${e.categoria}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ======================================================================
     UTILITÁRIOS
     ==================================================================== */

  function escape(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  const prefersMotion = () => !matchMedia('(prefers-reduced-motion: reduce)').matches;

  let io;
  function observarReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      return;
    }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.03 });
    $$('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
  }

  function aplicarTema(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('agenda:tema', t); } catch (_) {}
  }

  /* ======================================================================
     LIGAÇÕES
     ==================================================================== */

  function bind() {
    document.addEventListener('click', (ev) => {
      const encBtn = ev.target.closest('.enc__btn');
      if (encBtn) { alternarEvento(Number(encBtn.closest('.enc').dataset.evt)); return; }

      const dia = ev.target.closest('[data-day]');
      if (dia) { esconderTip(); abrirDia(dia.dataset.day); return; }

      const goto = ev.target.closest('[data-goto]');
      if (goto) { irParaData(goto.dataset.goto); return; }

      if (ev.target.closest('#verPassado')) {
        ui.mostrarPassado = !ui.mostrarPassado;
        renderAgenda();
        return;
      }

      const catChip = ev.target.closest('[data-categoria]');
      if (catChip) {
        ui.categoria = catChip.dataset.categoria;
        renderFiltros();
        if (ui.view === 'agenda') renderAgenda(); else renderCalendario();
        return;
      }

      const ics = ev.target.closest('[data-ics]');
      if (ics) { baixarIcs(Number(ics.dataset.ics)); return; }

      const seg = ev.target.closest('.seg button');
      if (seg) { setView(seg.dataset.view); return; }

      if (ev.target.closest('#limpar')) {
        ui.busca = '';
        $('#busca').value = '';
        $('.search').classList.remove('has-value');
        renderAgenda();
        $('#busca').focus();
        return;
      }

      if (ev.target.closest('#tema')) {
        aplicarTema(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
      }
    });

    let t;
    $('#busca').addEventListener('input', (ev) => {
      const v = ev.target.value;
      $('.search').classList.toggle('has-value', v.length > 0);
      clearTimeout(t);
      t = setTimeout(() => { ui.busca = v; renderAgenda(); }, 130);
    });

    const cal = $('#calendario');
    cal.addEventListener('mouseover', (ev) => {
      const p = ev.target.closest('.evt-pill');
      if (p) mostrarTip(p);
    });
    cal.addEventListener('mouseout', esconderTip);
    addEventListener('scroll', esconderTip, { passive: true });

    addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && ui.diaAberto) fecharEvento(ui.diaAberto);
      if (ev.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        ev.preventDefault();
        setView('agenda');
        $('#busca').focus();
      }
    });

    const head = $('.head');
    addEventListener('scroll', () => {
      head.classList.toggle('is-stuck', scrollY > 8);
    }, { passive: true });

    addEventListener('resize', posicionarPill);
  }

  /* ======================================================================
     INÍCIO
     ==================================================================== */

  function init() {
    $('#tema').innerHTML = ico.sun + ico.moon;
    $('.search').insertAdjacentHTML('afterbegin', ico.search);
    $('#limpar').innerHTML = ico.x;
    $('[data-view="agenda"]').insertAdjacentHTML('afterbegin', ico.list);
    $('[data-view="calendario"]').insertAdjacentHTML('afterbegin', ico.cal);

    renderHero();
    renderFiltros();
    renderAgenda();
    setView('calendario');
    bind();
    observarReveal();

    const alvo = location.hash.replace('#', '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(alvo) && porDia.has(alvo)) {
      setTimeout(() => irParaData(alvo), 240);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
