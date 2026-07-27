/* =============================================================================
   Estudo · Comunidade Manifesto
   Toda a interface é derivada de data/calendario.js. Nenhum estado é duplicado.
   ========================================================================== */

(() => {
  'use strict';

  const DATA = window.ESTUDO;
  if (!DATA) return;

  const CFG = DATA.config || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  /* -- Ícones (SVG inline, traço único — nada de emoji) -------------------- */
  const ico = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M7 4.5v15M17 4.5v15M2.5 12h19M2.5 8.2h4.5M2.5 15.8h4.5M17 8.2h4.5M17 15.8h4.5"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
  };

  /* -- Datas --------------------------------------------------------------- */

  // "2026-07-28" -> Date local (evita o deslocamento de fuso do parser ISO)
  const toDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const withTime = (iso) => {
    const dt = toDate(iso);
    const [h, mi] = (CFG.horario || '20:00').split(':').map(Number);
    dt.setHours(h || 0, mi || 0, 0, 0);
    return dt;
  };

  const isoOf = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const fmtLong = (iso) => {
    const d = toDate(iso);
    return `${DIAS[d.getDay()]}-feira, ${d.getDate()} de ${MESES[d.getMonth()]}`
      .replace('domingo-feira', 'domingo')
      .replace('sábado-feira', 'sábado');
  };

  /* -- Vídeo: normaliza Drive / YouTube em URL de player -------------------- */

  function embedUrl(raw) {
    if (!raw) return null;
    const s = String(raw).trim();
    if (!s) return null;

    let m = s.match(/drive\.google\.com\/file\/d\/([\w-]{10,})/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;

    m = s.match(/drive\.google\.com\/(?:open|uc)\?[^#]*[?&]?id=([\w-]{10,})/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;

    m = s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0`;

    // ID solto do Drive
    if (/^[\w-]{20,}$/.test(s)) return `https://drive.google.com/file/d/${s}/preview`;

    return s; // já é uma URL de embed
  }

  /* -- Normalização dos encontros ------------------------------------------ */

  const modulos = new Map((DATA.modulos || []).map((m) => [m.id, m]));
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const encontros = (DATA.encontros || [])
    .filter((e) => e && e.data)
    .map((e) => {
      const inicio = withTime(e.data);
      const fim = new Date(inicio.getTime() + (CFG.duracaoMin || 90) * 60000);
      const topicos = (e.topicos || []).filter(Boolean);
      return {
        ...e,
        topicos,
        inicio,
        fim,
        modInfo: modulos.get(e.modulo) || null,
        video: embedUrl(e.video),
        videoRaw: e.video || null,
        meet: e.meet || CFG.meetPadrao || '',
        // "a definir" enquanto o tema não foi publicado
        tbd: !e.capitulo,
        passado: toDate(e.data) < hoje,
      };
    })
    .sort((a, b) => a.inicio - b.inicio);

  const proximo = encontros.find((e) => e.fim >= new Date()) || null;
  const idxDe = new Map(encontros.map((e, i) => [e.data, i]));

  /* -- Estado da interface -------------------------------------------------- */

  const ui = {
    view: 'agenda',
    busca: '',
    filtro: 'todos',
    ano: (proximo ? proximo.inicio : new Date()).getFullYear(),
    aberto: null,
    mostrarPassado: false,
  };

  /* ======================================================================
     HERÓI — próxima aula
     ==================================================================== */

  function renderHero() {
    const host = $('#hero');
    if (!proximo) {
      host.innerHTML = `
        <div class="wrap">
          <p class="eyebrow" style="margin-bottom:1rem">Calendário do estudo</p>
          <h1 class="hero__title">Até o próximo semestre.</h1>
          <p class="hero__resumo">Não há encontros agendados no momento. O acervo das aulas
             anteriores continua disponível abaixo.</p>
        </div>`;
      return;
    }

    const e = proximo;
    const mod = e.modInfo;
    const hojeIso = isoOf(new Date());
    const quando = e.data === hojeIso ? 'hoje' : fmtLong(e.data);

    const titulo = e.tbd
      ? `<em>Tema da semana<br>a ser confirmado</em>`
      : escape(e.capitulo);

    const resumo = e.resumo
      ? `<p class="hero__resumo">${escape(e.resumo)}</p>`
      : `<p class="hero__resumo">O tema desta semana será publicado assim que o roteiro
           de leitura for divulgado. O horário e o link do encontro já estão confirmados.</p>`;

    const topicos = e.topicos.length
      ? `<ul class="hero__topicos">${e.topicos.map((t) => `<li>${escape(t)}</li>`).join('')}</ul>`
      : '';

    host.innerHTML = `
      <div class="wrap">
        <div class="hero__grid">
          <div data-reveal>
            <p class="hero__tag"><span class="pulse"></span><span class="eyebrow">Próxima aula</span></p>
            <p class="hero__date">${quando} · ${CFG.horario || ''}</p>
            <h1 class="hero__title">${titulo}</h1>
            ${resumo}
            ${topicos}
            <div class="hero__actions">
              ${e.meet ? `<a class="btn btn--solid" href="${escape(e.meet)}" target="_blank" rel="noopener">${ico.video} Entrar no Meet</a>` : ''}
              <button class="btn btn--ghost" data-goto="${e.data}">${ico.list} Ver no calendário</button>
              <button class="btn btn--ghost" data-ics="${e.data}">${ico.cal} Adicionar à agenda</button>
            </div>
          </div>

          <aside class="hero__side" data-reveal style="--reveal-delay:120ms">
            <div class="countdown">
              <p class="eyebrow countdown__label">Faltam</p>
              <div class="countdown__clock" id="clock" role="timer" aria-live="off"></div>
            </div>
            ${mod ? bookletHTML(mod) : ''}
          </aside>
        </div>
      </div>`;

    tickClock();
    setInterval(tickClock, 1000);

    const done = encontros.filter((x) => x.modulo === e.modulo && x.passado).length;
    const total = encontros.filter((x) => x.modulo === e.modulo).length;
    const fill = $('#meterFill');
    if (fill) {
      requestAnimationFrame(() => { fill.style.width = `${Math.round((done / total) * 100)}%`; });
      $('#meterText').textContent = `Encontro ${done + 1} de ${total}`;
    }
  }

  function bookletHTML(mod) {
    return `
      <div class="booklet">
        <p class="eyebrow booklet__kicker">Estudando agora</p>
        <p class="booklet__title">${escape(mod.titulo)}</p>
        <p class="booklet__author">${escape(mod.autor || '')}</p>
        ${mod.epigrafe ? `<p class="booklet__quote">${escape(mod.epigrafe)}</p>` : ''}
        <div class="meter">
          <div class="meter__track"><div class="meter__fill" id="meterFill"></div></div>
          <p class="meter__text" id="meterText"></p>
        </div>
      </div>`;
  }

  function tickClock() {
    const host = $('#clock');
    if (!host || !proximo) return;

    let diff = proximo.inicio - new Date();
    if (diff <= 0) {
      host.innerHTML = `<p class="hero__date" style="margin:0">Acontecendo agora</p>`;
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1000);

    const unit = (n, label) =>
      `<div class="countdown__unit"><span class="countdown__n num">${String(n).padStart(2, '0')}</span><span class="countdown__u">${label}</span></div>`;

    host.innerHTML = d > 0
      ? unit(d, d === 1 ? 'dia' : 'dias') + unit(h, 'horas') + unit(m, 'min')
      : unit(h, 'horas') + unit(m, 'min') + unit(s, 'seg');
  }

  /* ======================================================================
     AGENDA
     ==================================================================== */

  function visiveis() {
    const q = ui.busca.trim().toLowerCase();
    return encontros.filter((e) => {
      if (ui.filtro === 'proximos' && e.passado) return false;
      if (ui.filtro === 'anteriores' && !e.passado) return false;
      if (ui.filtro === 'gravados' && !e.video) return false;

      if (!q) return true;
      const hay = [
        e.capitulo, e.resumo, e.responsavel, e.modInfo && e.modInfo.titulo,
        e.modInfo && e.modInfo.autor, fmtLong(e.data), ...e.topicos,
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  // Agrupa por mês, mantendo a ordem cronológica.
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
        ${g.itens.map(encHTML).join('')}
      </section>`).join('');
  }

  function renderAgenda() {
    const host = $('#agenda');
    const lista = visiveis();

    if (!lista.length) {
      host.innerHTML = `
        <div class="empty">
          <h3>Nada por aqui</h3>
          <p>Nenhum encontro corresponde a esse filtro. Tente outra palavra ou volte para “Todos”.</p>
        </div>`;
      return;
    }

    // Na visão completa, o passado fica recolhido para que a próxima aula
    // apareça de imediato — sem esconder nada: é um clique para abrir.
    const neutro = ui.filtro === 'todos' && !ui.busca.trim();
    const passados = neutro ? lista.filter((e) => e.passado) : [];
    const adiante = neutro ? lista.filter((e) => !e.passado) : lista;

    let html = '';
    if (passados.length && adiante.length) {
      html += `
        <button class="past-toggle" type="button" id="verPassado" aria-expanded="${ui.mostrarPassado}">
          <span class="past-toggle__chev">${ico.chev}</span>
          <span>${ui.mostrarPassado ? 'Ocultar' : 'Ver'} os ${passados.length} encontros anteriores</span>
          <span class="past-toggle__rule" aria-hidden="true"></span>
        </button>`;
      if (ui.mostrarPassado) html += porMes(passados);
    } else {
      html += porMes(passados);
    }
    html += porMes(adiante);

    host.innerHTML = html;

    // Reabre o item que estava aberto (ex.: após uma busca)
    if (ui.aberto) abrir(ui.aberto, false);
    observarReveal(host);
  }

  function encHTML(e) {
    const d = toDate(e.data);
    const ehProximo = proximo && proximo.data === e.data;
    const classes = ['enc'];
    if (e.passado) classes.push('enc--past');
    if (ehProximo) classes.push('enc--next');
    if (e.tbd) classes.push('enc--tbd');

    const badges = [];
    if (ehProximo) badges.push(`<span class="badge badge--next">Próxima</span>`);
    if (e.video) badges.push(`<span class="badge badge--video">${ico.film}<span>Gravação</span></span>`);

    const sub = [];
    if (e.modInfo) sub.push(escape(e.modInfo.titulo));
    if (e.responsavel) sub.push(escape(e.responsavel));
    if (e.topicos.length) sub.push(`${e.topicos.length} ${e.topicos.length === 1 ? 'seção' : 'seções'}`);

    return `
      <article class="${classes.join(' ')}" id="enc-${e.data}" data-enc="${e.data}">
        <h4>
          <button class="enc__btn" aria-expanded="false" aria-controls="body-${e.data}">
            <span class="enc__day">
              <b class="num">${String(d.getDate()).padStart(2, '0')}</b>
              <small>${DIAS[d.getDay()].slice(0, 3)}</small>
            </span>
            <span class="enc__main">
              <span class="enc__title">${e.tbd ? 'Tema a confirmar' : escape(e.capitulo)}</span>
              <span class="enc__sub">${sub.map((s, i) => (i ? `<i class="dot"></i>${s}` : s)).join('')}</span>
            </span>
            <span class="enc__aside">
              ${badges.join('')}
              <span class="enc__chev">${ico.chev}</span>
            </span>
          </button>
        </h4>
        <div class="enc__body" id="body-${e.data}" role="region">
          <div><div class="enc__inner" data-lazy="${e.data}"></div></div>
        </div>
      </article>`;
  }

  // O conteúdo pesado (player) só é montado quando o item abre.
  function montarInterior(e, host) {
    if (host.dataset.ready) return;
    host.dataset.ready = '1';

    const col1 = document.createElement('div');
    if (e.resumo) {
      col1.innerHTML = `<p class="enc__resumo">${escape(e.resumo)}</p>`;
    } else {
      col1.innerHTML = `<p class="enc__empty">O resumo desta semana ainda não foi publicado.</p>`;
    }

    if (e.topicos.length) {
      col1.insertAdjacentHTML('beforeend',
        `<ul class="topicos">${e.topicos.map((t) => `<li>${escape(t)}</li>`).join('')}</ul>`);
    }

    const facts = [];
    facts.push(`<div class="fact"><dt>Data</dt><dd>${fmtLong(e.data)}</dd></div>`);
    facts.push(`<div class="fact"><dt>Horário</dt><dd class="num">${CFG.horario || '—'}</dd></div>`);
    if (e.responsavel) facts.push(`<div class="fact"><dt>Conduzido por</dt><dd>${escape(e.responsavel)}</dd></div>`);
    if (e.modInfo) facts.push(`<div class="fact"><dt>Livro</dt><dd>${escape(e.modInfo.titulo)}</dd></div>`);
    col1.insertAdjacentHTML('beforeend', `<dl class="enc__facts">${facts.join('')}</dl>`);

    const links = [];
    if (!e.passado && e.meet) {
      links.push(`<a class="btn btn--solid" href="${escape(e.meet)}" target="_blank" rel="noopener">${ico.video} Entrar no Meet</a>`);
    }
    if (!e.passado) links.push(`<button class="btn btn--ghost" data-ics="${e.data}">${ico.cal} Adicionar à agenda</button>`);
    if (e.material) links.push(`<a class="btn btn--ghost" href="${escape(e.material)}" target="_blank" rel="noopener">${ico.ext} Material</a>`);
    if (links.length) col1.insertAdjacentHTML('beforeend', `<div class="enc__links">${links.join('')}</div>`);

    const col2 = document.createElement('div');
    col2.appendChild(playerEl(e));

    host.append(col1, col2);
  }

  function playerEl(e) {
    if (!e.video) {
      const box = document.createElement('div');
      box.className = 'player--empty';
      box.innerHTML = `${ico.film}<p>${e.passado
        ? 'A gravação deste encontro ainda não foi publicada.'
        : 'A gravação fica disponível aqui depois do encontro.'}</p>`;
      return box;
    }

    const wrap = document.createElement('div');
    wrap.className = 'player';
    wrap.innerHTML = `
      <div class="player__frame">
        <button class="player__poster" type="button"
                aria-label="Reproduzir a gravação de ${escape(fmtLong(e.data))}">
          <span class="player__play">${ico.play}</span>
          <span class="player__hint">Assistir à gravação</span>
        </button>
      </div>
      <div class="player__foot">
        <span>Gravação do encontro</span>
        <a href="${escape(e.videoRaw)}" target="_blank" rel="noopener">Abrir no Drive &rarr;</a>
      </div>`;

    const frame = $('.player__frame', wrap);
    $('.player__poster', wrap).addEventListener('click', () => {
      if (frame.classList.contains('is-live')) return;
      const f = document.createElement('iframe');
      f.src = e.video;
      f.title = `Gravação — ${e.capitulo || fmtLong(e.data)}`;
      f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      f.allowFullscreen = true;
      f.loading = 'lazy';
      frame.prepend(f);
      frame.classList.add('is-live');
    }, { once: false });

    return wrap;
  }

  /* -- Abrir / fechar ------------------------------------------------------- */

  function abrir(iso, mover = true) {
    const art = document.getElementById(`enc-${iso}`);
    if (!art) return;

    if (ui.aberto && ui.aberto !== iso) fechar(ui.aberto);

    const btn = $('.enc__btn', art);
    const inner = $('.enc__inner', art);
    const e = encontros[idxDe.get(iso)];
    if (e) montarInterior(e, inner);

    art.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    ui.aberto = iso;
    history.replaceState(null, '', `#${iso}`);

    if (mover) {
      requestAnimationFrame(() => {
        art.scrollIntoView({ behavior: prefersMotion() ? 'smooth' : 'auto', block: 'start' });
      });
    }
  }

  function fechar(iso) {
    const art = document.getElementById(`enc-${iso}`);
    if (!art) return;
    art.classList.remove('is-open');
    $('.enc__btn', art).setAttribute('aria-expanded', 'false');
    if (ui.aberto === iso) ui.aberto = null;
  }

  // Leva a interface até uma data qualquer, desfazendo filtros e
  // abrindo a seção de encontros anteriores se for preciso.
  function irPara(iso) {
    const e = encontros[idxDe.get(iso)];
    if (!e) return;

    setView('agenda');
    ui.filtro = 'todos';
    ui.busca = '';
    if (e.passado) ui.mostrarPassado = true;

    const busca = $('#busca');
    if (busca) { busca.value = ''; $('.search').classList.remove('has-value'); }
    $$('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filtro === 'todos')));

    renderAgenda();
    abrir(iso, true);
  }

  function alternar(iso) {
    if (ui.aberto === iso) {
      fechar(iso);
      history.replaceState(null, '', location.pathname + location.search);
    } else {
      abrir(iso, false);
    }
  }

  /* ======================================================================
     CALENDÁRIO ANUAL
     ==================================================================== */

  const anos = [...new Set(encontros.map((e) => toDate(e.data).getFullYear()))].sort();

  function renderCalendario() {
    const host = $('#calendario');
    const ano = ui.ano;
    const i = anos.indexOf(ano);

    const meses = Array.from({ length: 12 }, (_, m) => mesHTML(ano, m)).join('');

    host.innerHTML = `
      <div class="cal__top">
        <div class="yearpick">
          <button class="icon-btn" id="anoAnt" aria-label="Ano anterior" ${i <= 0 ? 'disabled' : ''}>${ico.arrowL}</button>
          <span class="yearpick__y num">${ano}</span>
          <button class="icon-btn" id="anoProx" aria-label="Próximo ano" ${i >= anos.length - 1 ? 'disabled' : ''}>${ico.arrowR}</button>
        </div>
        <div class="legend">
          <span><i class="k-next"></i>Próxima aula</span>
          <span><i class="k-video"></i>Com gravação</span>
          <span><i class="k-past"></i>Já aconteceu</span>
          <span><i class="k-future"></i>Agendada</span>
        </div>
      </div>
      <div class="cal__grid">${meses}</div>`;

    $('#anoAnt').addEventListener('click', () => { ui.ano = anos[i - 1]; renderCalendario(); });
    $('#anoProx').addEventListener('click', () => { ui.ano = anos[i + 1]; renderCalendario(); });
  }

  function mesHTML(ano, mes) {
    const primeiro = new Date(ano, mes, 1);
    const dias = new Date(ano, mes + 1, 0).getDate();
    const pad = primeiro.getDay();
    const hojeIso = isoOf(new Date());

    let cells = '';
    for (let p = 0; p < pad; p++) cells += `<span class="day day--pad" aria-hidden="true"></span>`;

    let temEncontro = false;

    for (let dia = 1; dia <= dias; dia++) {
      const iso = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const e = encontros[idxDe.get(iso)];
      const cls = ['day'];
      if (iso === hojeIso) cls.push('day--today');

      if (e) {
        temEncontro = true;
        cls.push('day--enc');
        if (proximo && proximo.data === iso) cls.push('is-next');
        else if (e.video) cls.push('has-video');
        else if (e.passado) cls.push('is-past');

        const rotulo = e.tbd ? 'tema a confirmar' : e.capitulo;
        cells += `<button class="${cls.join(' ')}" type="button" data-day="${iso}"
                     data-title="${escape(e.tbd ? 'Tema a confirmar' : e.capitulo)}"
                     data-note="${escape([e.responsavel, e.video ? 'gravação disponível' : ''].filter(Boolean).join(' · '))}"
                     aria-label="${escape(`${fmtLong(iso)} — ${rotulo}`)}">${dia}</button>`;
      } else {
        cells += `<span class="${cls.join(' ')}">${dia}</span>`;
      }
    }

    return `
      <div class="mon${temEncontro ? '' : ' mon--empty'}">
        <h4 class="mon__name">${MESES[mes]}</h4>
        <div class="mon__dows" aria-hidden="true">${DOW.map((d) => `<span>${d}</span>`).join('')}</div>
        <div class="mon__days">${cells}</div>
      </div>`;
  }

  /* -- Dica flutuante ------------------------------------------------------- */

  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.setAttribute('role', 'presentation');
  document.body.appendChild(tip);

  function mostrarTip(alvo) {
    const iso = alvo.dataset.day;
    const e = encontros[idxDe.get(iso)];
    if (!e) return;
    tip.innerHTML = `<b>${escape(alvo.dataset.title)}</b>
      <i>${escape(fmtLong(iso))}${alvo.dataset.note ? ' · ' + escape(alvo.dataset.note) : ''}</i>`;
    const r = alvo.getBoundingClientRect();
    tip.classList.add('is-on');
    const w = tip.offsetWidth;
    tip.style.left = `${Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8)}px`;
    tip.style.top = `${r.bottom + 10}px`;
  }
  const esconderTip = () => tip.classList.remove('is-on');

  /* ======================================================================
     TROCA DE VISTA
     ==================================================================== */

  function setView(v, foco = false) {
    ui.view = v;
    $$('.seg button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.view === v)));
    $('#panelAgenda').hidden = v !== 'agenda';
    $('#panelCalendario').hidden = v !== 'calendario';
    $('#toolFiltros').hidden = v !== 'agenda';
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

  function baixarIcs(iso) {
    const e = encontros[idxDe.get(iso)];
    if (!e) return;

    const z = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const titulo = e.tbd
      ? `Estudo — ${e.modInfo ? e.modInfo.titulo : 'Comunidade Manifesto'}`
      : `Estudo — ${e.capitulo}`;
    const desc = [e.resumo, ...e.topicos].filter(Boolean).join('\\n\\n');

    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Comunidade Manifesto//Estudo//PT-BR',
      'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      `UID:${iso}-estudo@comunidademanifesto.com`,
      `DTSTAMP:${z(new Date())}`,
      `DTSTART:${z(e.inicio)}`,
      `DTEND:${z(e.fim)}`,
      `SUMMARY:${titulo.replace(/[,;]/g, '\\$&')}`,
      desc ? `DESCRIPTION:${desc.replace(/[,;]/g, '\\$&')}` : '',
      e.meet ? `URL:${e.meet}` : '',
      e.meet ? `LOCATION:Google Meet` : '',
      'END:VEVENT', 'END:VCALENDAR',
    ].filter(Boolean).join('\r\n');

    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudo-${iso}.ics`;
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
  function observarReveal(root = document) {
    if (!('IntersectionObserver' in window)) return;
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    $$('[data-reveal]:not(.is-in)', root).forEach((el) => io.observe(el));
  }

  /* ======================================================================
     TEMA
     ==================================================================== */

  function aplicarTema(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('estudo:tema', t); } catch (_) {}
  }

  /* ======================================================================
     LIGAÇÕES
     ==================================================================== */

  function bind() {
    // Delegação única para tudo que é clicável.
    document.addEventListener('click', (ev) => {
      const encBtn = ev.target.closest('.enc__btn');
      if (encBtn) {
        alternar(encBtn.closest('.enc').dataset.enc);
        return;
      }

      const dia = ev.target.closest('[data-day]');
      if (dia) { esconderTip(); irPara(dia.dataset.day); return; }

      const goto = ev.target.closest('[data-goto]');
      if (goto) { irPara(goto.dataset.goto); return; }

      if (ev.target.closest('#verPassado')) {
        ui.mostrarPassado = !ui.mostrarPassado;
        renderAgenda();
        return;
      }

      const navFiltro = ev.target.closest('[data-nav-filtro]');
      if (navFiltro) {
        ev.preventDefault();
        setView('agenda');
        ui.filtro = navFiltro.dataset.navFiltro;
        $$('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filtro === ui.filtro)));
        renderAgenda();
        $('#programa').scrollIntoView({ behavior: prefersMotion() ? 'smooth' : 'auto', block: 'start' });
        return;
      }

      const ics = ev.target.closest('[data-ics]');
      if (ics) { baixarIcs(ics.dataset.ics); return; }

      const seg = ev.target.closest('.seg button');
      if (seg) { setView(seg.dataset.view); return; }

      const chip = ev.target.closest('.chip');
      if (chip) {
        ui.filtro = chip.dataset.filtro;
        $$('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        renderAgenda();
        return;
      }

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

    // Busca com debounce
    let t;
    $('#busca').addEventListener('input', (ev) => {
      const v = ev.target.value;
      $('.search').classList.toggle('has-value', v.length > 0);
      clearTimeout(t);
      t = setTimeout(() => { ui.busca = v; renderAgenda(); }, 140);
    });

    // Dica do calendário (mouse e teclado)
    const cal = $('#calendario');
    cal.addEventListener('mouseover', (ev) => {
      const d = ev.target.closest('[data-day]');
      if (d) mostrarTip(d);
    });
    cal.addEventListener('mouseout', esconderTip);
    cal.addEventListener('focusin', (ev) => {
      const d = ev.target.closest('[data-day]');
      if (d) mostrarTip(d);
    });
    cal.addEventListener('focusout', esconderTip);
    addEventListener('scroll', esconderTip, { passive: true });

    // Navegação por setas dentro de um mês
    cal.addEventListener('keydown', (ev) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(ev.key)) return;
      const atual = ev.target.closest('[data-day]');
      if (!atual) return;
      const todos = $$('[data-day]', cal);
      const i = todos.indexOf(atual);
      const alvo = todos[i + (ev.key === 'ArrowRight' ? 1 : -1)];
      if (alvo) { ev.preventDefault(); alvo.focus(); }
    });

    addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && ui.aberto) { fechar(ui.aberto); esconderTip(); }
      // "/" foca a busca, como nos apps que a gente gosta de usar
      if (ev.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        ev.preventDefault();
        setView('agenda');
        $('#busca').focus();
      }
    });

    // Cabeçalho que encolhe
    const head = $('.head');
    addEventListener('scroll', () => {
      head.classList.toggle('is-stuck', scrollY > 12);
    }, { passive: true });

    addEventListener('resize', posicionarPill);
  }

  /* ======================================================================
     INÍCIO
     ==================================================================== */

  function init() {
    // Ícones do chrome
    $('#tema').innerHTML = ico.sun + ico.moon;
    $('.search svg')?.remove();
    $('.search').insertAdjacentHTML('afterbegin', ico.search);
    $('#limpar').innerHTML = ico.x;
    $('[data-view="agenda"]').insertAdjacentHTML('afterbegin', ico.list);
    $('[data-view="calendario"]').insertAdjacentHTML('afterbegin', ico.cal);

    renderHero();
    renderAgenda();
    setView('agenda');
    bind();
    observarReveal();

    // Link direto para uma data: estudo.comunidademanifesto.com/#2026-05-19
    const alvo = location.hash.replace('#', '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(alvo) && idxDe.has(alvo)) {
      setTimeout(() => irPara(alvo), 260);
    }

    document.body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
