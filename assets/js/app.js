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

  /* -- Ícones (SVG de traço único — nunca emoji) --------------------------- */
  const ico = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M7 4.5v15M17 4.5v15M2.5 12h19M2.5 8.2h4.5M2.5 15.8h4.5M17 8.2h4.5M17 15.8h4.5"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
  };

  /* -- Datas --------------------------------------------------------------- */

  // "2026-07-28" -> Date local (evita o deslocamento de fuso do parser ISO)
  const toDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  // O horário do encontro é sempre o de Brasília (config.fuso), não o de quem
  // acessa: quem estiver viajando ou fora do país vê a contagem regressiva certa
  // e recebe um .ics com o instante correto.
  const withTime = (iso) => {
    const hora = /^\d{1,2}:\d{2}$/.test(CFG.horario || '') ? CFG.horario : '20:00';
    const dt = new Date(`${iso}T${hora.padStart(5, '0')}:00${CFG.fuso || '-03:00'}`);
    if (!isNaN(dt)) return dt;

    const local = toDate(iso); // recurso de segurança se o fuso vier inválido
    const [h, mi] = hora.split(':').map(Number);
    local.setHours(h, mi, 0, 0);
    return local;
  };

  // "Hoje" é sempre hoje no fuso da igreja — não no fuso de quem está olhando.
  function hojeNoFuso() {
    const m = String(CFG.fuso || '-03:00').match(/^([+-])(\d{2}):?(\d{2})$/);
    const min = m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : -180;
    return new Date(Date.now() + min * 60000).toISOString().slice(0, 10);
  }

  const fmtLong = (iso) => {
    const d = toDate(iso);
    const dow = DIAS[d.getDay()];
    const nome = dow === 'domingo' || dow === 'sábado' ? dow : `${dow}-feira`;
    return `${nome}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
  };

  /* -- Capítulo: separa o número do título para virar pílula --------------- */

  function partesCap(txt) {
    if (!txt) return null;
    const m = String(txt).match(/^\s*(\d+)\s*[.)]\s*(.+)$/s);
    return m ? { n: m[1], titulo: m[2].trim() } : { n: null, titulo: String(txt).trim() };
  }

  const pillHTML = (n) =>
    n ? `<span class="pill-num" data-c="${((Number(n) - 1) % 6) + 1}" aria-hidden="true">${n}</span>` : '';

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
    if (m) {
      // playsinline evita que o iOS assuma a tela inteira sozinho; rel=0 mantém
      // as sugestões do fim dentro do próprio canal.
      return `https://www.youtube-nocookie.com/embed/${m[1]}` +
             '?rel=0&modestbranding=1&playsinline=1&color=white';
    }

    if (/^[\w-]{20,}$/.test(s)) return `https://drive.google.com/file/d/${s}/preview`;
    return s;
  }

  /* -- Imagens ------------------------------------------------------------- */

  function imgHTML(slug, alt, sizes) {
    if (!slug) return '';
    return `<img src="assets/img/${slug}-800.webp"
                 srcset="assets/img/${slug}-800.webp 800w, assets/img/${slug}-1400.webp 1400w"
                 sizes="${sizes}" alt="${escape(alt)}" loading="lazy" decoding="async">`;
  }

  /* -- Normalização dos encontros ------------------------------------------ */

  const modulos = new Map((DATA.modulos || []).map((m) => [m.id, m]));
  const HOJE = hojeNoFuso();

  const encontros = (DATA.encontros || [])
    .filter((e) => e && e.data)
    .map((e) => {
      const inicio = withTime(e.data);
      const mod = modulos.get(e.modulo) || null;
      const cap = partesCap(e.capitulo);
      return {
        ...e,
        topicos: (e.topicos || []).filter(Boolean),
        inicio,
        fim: new Date(inicio.getTime() + (CFG.duracaoMin || 90) * 60000),
        modInfo: mod,
        cap,
        foto: e.foto || (mod && mod.capa) || null,
        video: embedUrl(e.video),
        videoRaw: e.video || null,
        videoTipo: /youtu\.?be/.test(e.video || '') ? 'youtube'
                 : /drive\.google/.test(e.video || '') ? 'drive' : 'outro',
        meet: e.meet || CFG.meetPadrao || '',
        tbd: !e.capitulo,
        // "passado" agrupa por data, para o encontro de hoje seguir no topo até
        // a virada do dia; "terminou" é o instante real do fim da aula, e é ele
        // que decide se ainda faz sentido oferecer o Meet.
        passado: e.data < HOJE,
        terminou: new Date(inicio.getTime() + (CFG.duracaoMin || 90) * 60000) < new Date(),
      };
    })
    .sort((a, b) => a.inicio - b.inicio);

  const proximo = encontros.find((e) => e.fim >= new Date()) || null;
  const idxDe = new Map(encontros.map((e, i) => [e.data, i]));

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
          <p class="eyebrow" style="margin-bottom:var(--s-3)">Calendário do estudo</p>
          <h1 class="hero__title">Até o próximo semestre.</h1>
          <p class="hero__resumo">Não há encontros agendados no momento. O acervo das aulas
             anteriores continua disponível abaixo.</p>
        </div>`;
      return;
    }

    const e = proximo;
    const quando = e.data === HOJE ? 'Hoje' : fmtLong(e.data);

    const titulo = e.tbd
      ? `<em>Tema a confirmar</em>`
      : `${pillHTML(e.cap.n)}<span>${escape(e.cap.titulo)}</span>`;

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
            <p class="hero__tag"><span class="dot"></span>Próxima aula</p>
            <p class="hero__date"><b>${escape(quando)}</b> · ${escape(CFG.horario || '')}${
              e.responsavel ? ` · com ${escape(e.responsavel)}` : ''}</p>
            <h1 class="hero__title">${titulo}</h1>
            ${resumo}
            ${topicos}
            <div class="hero__actions">
              ${e.meet ? `<a class="btn btn--primary" href="${escape(e.meet)}" target="_blank" rel="noopener">${ico.video} Entrar no Meet</a>` : ''}
              <button class="btn ${e.meet ? 'btn--ghost' : 'btn--primary'}" data-goto="${e.data}">${ico.list} Ver detalhes da aula</button>
              <button class="btn btn--quiet" data-ics="${e.data}">${ico.cal} Adicionar à agenda</button>
            </div>
          </div>

          <aside class="hero__side" data-reveal style="--reveal-delay:110ms">
            <div class="countdown">
              <p class="eyebrow">Faltam</p>
              <div class="countdown__clock" id="clock" role="timer"></div>
            </div>
            ${e.modInfo ? bookletHTML(e.modInfo) : ''}
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
    const capa = mod.livro
      ? `<img class="booklet__capa"
             src="assets/img/${mod.livro}-400.webp"
             srcset="assets/img/${mod.livro}-400.webp 400w, assets/img/${mod.livro}-696.webp 696w"
             sizes="7rem"
             alt="Capa de ${escape(mod.titulo)}"
             width="400" height="575" loading="lazy" decoding="async">`
      : '';

    return `
      <div class="booklet">
        <div class="booklet__top">
          ${capa}
          <div class="booklet__ident">
            <p class="eyebrow">Estudando agora</p>
            <p class="booklet__title">${escape(mod.titulo)}</p>
            ${mod.subtitulo ? `<p class="booklet__sub">${escape(mod.subtitulo)}</p>` : ''}
            <p class="booklet__author">${escape(mod.autor || '')}</p>
          </div>
        </div>
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

    const diff = proximo.inicio - new Date();
    if (diff <= 0) {
      host.innerHTML = `<p class="countdown__live">Acontecendo agora</p>`;
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

    // Na visão completa o passado fica recolhido, para que a próxima aula
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
          <span class="past-toggle__rule"></span>
        </button>`;
      if (ui.mostrarPassado) html += porMes(passados);
    } else {
      html += porMes(passados);
    }
    html += porMes(adiante);

    host.innerHTML = html;
    if (ui.aberto) abrir(ui.aberto, false);
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

    const titulo = e.tbd
      ? `<span>Tema a confirmar</span>`
      : `${pillHTML(e.cap.n)}<span>${escape(e.cap.titulo)}</span>`;

    return `
      <article class="${classes.join(' ')}" id="enc-${e.data}" data-enc="${e.data}">
        <h4>
          <button class="enc__btn" aria-expanded="false" aria-controls="body-${e.data}">
            <span class="enc__day">
              <b>${String(d.getDate()).padStart(2, '0')}</b>
              <small>${DIAS[d.getDay()].slice(0, 3)}</small>
            </span>
            <span class="enc__main">
              <span class="enc__title">${titulo}</span>
              <span class="enc__sub">${sub.map((s, i) => (i ? `<span class="sep">·</span>${s}` : s)).join('')}</span>
            </span>
            <span class="enc__aside">
              ${badges.join('')}
              <span class="enc__chev">${ico.chev}</span>
            </span>
          </button>
        </h4>
        <div class="enc__body" id="body-${e.data}" role="region">
          <div><div class="enc__inner"></div></div>
        </div>
      </article>`;
  }

  // O conteúdo pesado (imagem, player) só é montado quando o item abre.
  function montarInterior(e, host) {
    if (host.dataset.ready) return;
    host.dataset.ready = '1';

    const col1 = document.createElement('div');
    col1.innerHTML = e.resumo
      ? `<p class="enc__resumo">${escape(e.resumo)}</p>`
      : `<p class="enc__empty">O resumo desta semana ainda não foi publicado.</p>`;

    if (e.topicos.length) {
      col1.insertAdjacentHTML('beforeend',
        `<ul class="topicos">${e.topicos.map((t) => `<li>${escape(t)}</li>`).join('')}</ul>`);
    }

    const facts = [
      `<div class="fact"><dt>Data</dt><dd>${fmtLong(e.data)}</dd></div>`,
      `<div class="fact"><dt>Horário</dt><dd class="num">${CFG.horario || '—'}</dd></div>`,
    ];
    if (e.responsavel) facts.push(`<div class="fact"><dt>Conduzido por</dt><dd>${escape(e.responsavel)}</dd></div>`);
    if (e.modInfo) facts.push(`<div class="fact"><dt>Livro</dt><dd>${escape(e.modInfo.titulo)}</dd></div>`);
    col1.insertAdjacentHTML('beforeend', `<dl class="enc__facts">${facts.join('')}</dl>`);

    const links = [];
    if (!e.terminou && e.meet) {
      links.push(`<a class="btn btn--primary" href="${escape(e.meet)}" target="_blank" rel="noopener">${ico.video} Entrar no Meet</a>`);
    }
    if (!e.terminou) links.push(`<button class="btn btn--quiet" data-ics="${e.data}">${ico.cal} Adicionar à agenda</button>`);
    if (e.material) links.push(`<a class="btn btn--quiet" href="${escape(e.material)}" target="_blank" rel="noopener">${ico.ext} Material</a>`);
    if (links.length) col1.insertAdjacentHTML('beforeend', `<div class="enc__links">${links.join('')}</div>`);

    const col2 = document.createElement('div');
    col2.appendChild(midiaEl(e));

    host.append(col1, col2);
  }

  const SIZES_MEDIA = '(max-width: 58rem) 92vw, 34rem';

  function midiaEl(e) {
    // Sem gravação: mostra a foto do capítulo (ou nada, se não houver).
    if (!e.video) {
      const nota = e.passado
        ? 'A gravação deste encontro ainda não foi publicada.'
        : 'A gravação fica disponível aqui depois do encontro.';

      if (!e.foto) {
        const box = document.createElement('div');
        box.className = 'media--none';
        box.innerHTML = `${ico.film}<p>${nota}</p>`;
        return box;
      }
      const box = document.createElement('div');
      box.className = 'media';
      box.innerHTML = `
        <div class="media__frame">${imgHTML(e.foto, '', SIZES_MEDIA)}</div>
        <p class="media__note">${nota}</p>`;
      return box;
    }

    const wrap = document.createElement('div');
    wrap.className = 'player';
    wrap.innerHTML = `
      <div class="player__frame">
        <button class="player__poster" type="button"
                aria-label="Reproduzir a gravação de ${escape(fmtLong(e.data))}">
          ${imgHTML(e.foto, '', SIZES_MEDIA)}
          <span class="player__cta">
            <span class="player__play">${ico.play}</span>
            <span class="player__hint">Assistir à gravação</span>
          </span>
        </button>
      </div>
      <div class="player__foot"><span>Gravação do encontro</span></div>`;

    // O player do Drive precisa de espaço: dentro da coluna do encontro os
    // controles se amontoam, ainda mais no celular. Por isso a gravação abre
    // num visor grande, por cima da página.
    $('.player__poster', wrap).addEventListener('click', () => abrirVisor(e));

    return wrap;
  }

  /* -- Visor da gravação ---------------------------------------------------- */

  let visor;

  function montarVisor() {
    visor = document.createElement('dialog');
    visor.className = 'lb';
    visor.innerHTML = `
      <div class="lb__bar">
        <p class="lb__titulo"></p>
        <div class="lb__acoes">
          <a class="icon-btn lb__drive" target="_blank" rel="noopener"
             title="Abrir no Google Drive" aria-label="Abrir no Google Drive">${ico.ext}</a>
          <button class="icon-btn lb__fechar" type="button" autofocus
                  aria-label="Fechar a gravação">${ico.x}</button>
        </div>
      </div>
      <div class="lb__frame"></div>
      <p class="lb__dica">Para assistir maior, toque em tela cheia no player e gire o aparelho.</p>`;
    document.body.appendChild(visor);

    $('.lb__fechar', visor).addEventListener('click', () => visor.close());
    // clicar fora do conteúdo fecha
    visor.addEventListener('click', (ev) => { if (ev.target === visor) visor.close(); });
    // ao fechar, remove o iframe para a reprodução parar de fato
    visor.addEventListener('close', () => { $('.lb__frame', visor).innerHTML = ''; });
  }

  function abrirVisor(e) {
    if (!visor) montarVisor();

    $('.lb__titulo', visor).textContent = e.tbd ? fmtLong(e.data) : e.cap.titulo;

    // O player do Drive precisa de altura sobrando para montar seus controles;
    // o do YouTube se vira bem em 16:9 e sobrepõe os controles ao vídeo.
    visor.dataset.tipo = e.videoTipo;

    const saida = $('.lb__drive', visor);
    saida.href = e.videoRaw;
    const onde = e.videoTipo === 'youtube' ? 'no YouTube' : 'no Google Drive';
    saida.title = `Abrir ${onde}`;
    saida.setAttribute('aria-label', `Abrir ${onde}`);

    const f = document.createElement('iframe');
    f.src = e.video;
    f.title = `Gravação — ${e.capitulo || fmtLong(e.data)}`;
    f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    $('.lb__frame', visor).replaceChildren(f);

    visor.showModal();
  }

  /* -- Abrir / fechar ------------------------------------------------------- */

  function abrir(iso, mover = true) {
    const art = document.getElementById(`enc-${iso}`);
    if (!art) return;

    if (ui.aberto && ui.aberto !== iso) fechar(ui.aberto);

    const e = encontros[idxDe.get(iso)];
    if (e) montarInterior(e, $('.enc__inner', art));

    art.classList.add('is-open');
    $('.enc__btn', art).setAttribute('aria-expanded', 'true');
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

  // Leva a interface até uma data qualquer, desfazendo filtros e abrindo a
  // seção de encontros anteriores quando for preciso.
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
     CALENDÁRIO — apenas os dias de estudo
     ==================================================================== */

  const anos = [...new Set(encontros.map((e) => toDate(e.data).getFullYear()))].sort();

  function renderCalendario() {
    const host = $('#calendario');
    const ano = ui.ano;
    const i = anos.indexOf(ano);

    const doAno = encontros.filter((e) => toDate(e.data).getFullYear() === ano);

    // Só os meses que têm encontro — nada de grade vazia.
    const meses = [];
    for (const e of doAno) {
      const m = toDate(e.data).getMonth();
      let g = meses.find((x) => x.m === m);
      if (!g) meses.push((g = { m, itens: [] }));
      g.itens.push(e);
    }

    host.innerHTML = `
      <div class="cal__top">
        <div class="yearpick">
          <button class="icon-btn" id="anoAnt" aria-label="Ano anterior" ${i <= 0 ? 'disabled' : ''}>${ico.arrowL}</button>
          <span class="yearpick__y">${ano}</span>
          <button class="icon-btn" id="anoProx" aria-label="Próximo ano" ${i >= anos.length - 1 ? 'disabled' : ''}>${ico.arrowR}</button>
        </div>
        <div class="legend">
          <span><i class="k-next"></i>Próxima aula</span>
          <span><i class="k-video"></i>Com gravação</span>
          <span><i class="k-past"></i>Já aconteceu</span>
          <span><i class="k-future"></i>Agendada</span>
        </div>
      </div>
      <div class="cal__grid">${meses.map(mesHTML).join('')}</div>`;

    $('#anoAnt').addEventListener('click', () => { ui.ano = anos[i - 1]; renderCalendario(); });
    $('#anoProx').addEventListener('click', () => { ui.ano = anos[i + 1]; renderCalendario(); });
  }

  function mesHTML(g) {
    const n = g.itens.length;

    const chips = g.itens.map((e) => {
      const d = toDate(e.data);
      const cls = ['dchip'];
      if (e.data === HOJE) cls.push('is-today');
      if (proximo && proximo.data === e.data) cls.push('is-next');
      else if (e.video) cls.push('has-video');
      else if (e.passado) cls.push('is-past');

      const rotulo = e.tbd ? 'tema a confirmar' : e.capitulo;
      const nota = [e.responsavel, e.video ? 'gravação disponível' : ''].filter(Boolean).join(' · ');

      return `<button class="${cls.join(' ')}" type="button" data-day="${e.data}"
                 data-title="${escape(e.tbd ? 'Tema a confirmar' : e.capitulo)}"
                 data-note="${escape(nota)}"
                 aria-label="${escape(`${fmtLong(e.data)} — ${rotulo}`)}">
                <b>${String(d.getDate()).padStart(2, '0')}</b>
                <small>${DIAS[d.getDay()].slice(0, 3)}</small>
                ${e.video ? `<span class="dchip__play">${ico.play}</span>` : ''}
              </button>`;
    }).join('');

    return `
      <div class="mon">
        <h4 class="mon__name"><span>${MESES[g.m]}</span><b>${n} ${n === 1 ? 'encontro' : 'encontros'}</b></h4>
        <div class="mon__days">${chips}</div>
      </div>`;
  }

  /* -- Dica flutuante ------------------------------------------------------- */

  const tip = document.createElement('div');
  tip.className = 'tip';
  document.body.appendChild(tip);

  function mostrarTip(alvo) {
    const iso = alvo.dataset.day;
    if (!idxDe.has(iso)) return;
    tip.innerHTML = `<b>${escape(alvo.dataset.title)}</b>
      <i>${escape(fmtLong(iso))}${alvo.dataset.note ? ' · ' + escape(alvo.dataset.note) : ''}</i>`;
    const r = alvo.getBoundingClientRect();
    tip.classList.add('is-on');
    const w = tip.offsetWidth;
    tip.style.left = `${Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8)}px`;
    tip.style.top = `${r.bottom + 8}px`;
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
      e.meet ? 'LOCATION:Google Meet' : '',
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
    try { localStorage.setItem('estudo:tema', t); } catch (_) {}
  }

  /* ======================================================================
     LIGAÇÕES
     ==================================================================== */

  function bind() {
    document.addEventListener('click', (ev) => {
      const encBtn = ev.target.closest('.enc__btn');
      if (encBtn) { alternar(encBtn.closest('.enc').dataset.enc); return; }

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

    let t;
    $('#busca').addEventListener('input', (ev) => {
      const v = ev.target.value;
      $('.search').classList.toggle('has-value', v.length > 0);
      clearTimeout(t);
      t = setTimeout(() => { ui.busca = v; renderAgenda(); }, 130);
    });

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

    // Navegação por setas entre os dias de estudo
    cal.addEventListener('keydown', (ev) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(ev.key)) return;
      const atual = ev.target.closest('[data-day]');
      if (!atual) return;
      const todos = $$('[data-day]', cal);
      const alvo = todos[todos.indexOf(atual) + (ev.key === 'ArrowRight' ? 1 : -1)];
      if (alvo) { ev.preventDefault(); alvo.focus(); }
    });

    addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && ui.aberto) { fechar(ui.aberto); esconderTip(); }
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
    renderAgenda();
    setView('agenda');
    bind();
    observarReveal();

    // Link direto para uma data: estudo.comunidademanifesto.com/#2026-05-19
    const alvo = location.hash.replace('#', '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(alvo) && idxDe.has(alvo)) {
      setTimeout(() => irPara(alvo), 240);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
