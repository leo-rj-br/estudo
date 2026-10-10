/* =============================================================================
 *  Funções compartilhadas pela API da automação de vídeos.
 *  (Arquivos em api/_lib não viram endpoints na Vercel — só são importados.)
 * ========================================================================== */

'use strict';

const vm = require('vm');

const REPO = process.env.GITHUB_REPO || 'leo-rj-br/estudo';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const ARQUIVO = 'data/calendario.js';
const URL_PUBLICA = 'https://estudo.comunidademanifesto.com/data/calendario.js';

/** Executa o calendario.js num sandbox e devolve window.ESTUDO. */
function avaliar(codigo) {
  const ctx = { window: {} };
  vm.runInNewContext(codigo, ctx, { timeout: 1000, filename: ARQUIVO });
  if (!ctx.window.ESTUDO) throw new Error('window.ESTUDO não foi definido pelo arquivo.');
  return ctx.window.ESTUDO;
}

function cabecalhosGitHub() {
  const h = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'estudo-manifesto-automacao',
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

/**
 * Lê o calendario.js direto do GitHub (sempre a versão mais nova da main).
 * Devolve { codigo, sha }. Se o GitHub falhar e `permitirFallback` for true,
 * cai para a cópia publicada no site (sem sha — só serve para leitura).
 */
async function lerCalendario({ permitirFallback = false } = {}) {
  const url = `https://api.github.com/repos/${REPO}/contents/${ARQUIVO}?ref=${encodeURIComponent(BRANCH)}`;
  try {
    const r = await fetch(url, { headers: cabecalhosGitHub() });
    if (!r.ok) throw new Error(`GitHub respondeu ${r.status}: ${(await r.text()).slice(0, 300)}`);
    const j = await r.json();
    return { codigo: Buffer.from(j.content, 'base64').toString('utf8'), sha: j.sha, origem: 'github' };
  } catch (e) {
    if (!permitirFallback) throw e;
    const r = await fetch(URL_PUBLICA, { cache: 'no-store' });
    if (!r.ok) throw new Error(`Falha no GitHub (${e.message}) e no site (${r.status}).`);
    return { codigo: await r.text(), sha: null, origem: 'site', avisoGithub: e.message };
  }
}

/** Grava o calendario.js na main com um commit. */
async function gravarCalendario({ codigo, sha, mensagem }) {
  const url = `https://api.github.com/repos/${REPO}/contents/${ARQUIVO}`;
  const r = await fetch(url, {
    method: 'PUT',
    headers: { ...cabecalhosGitHub(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: mensagem,
      content: Buffer.from(codigo, 'utf8').toString('base64'),
      sha,
      branch: BRANCH,
    }),
  });
  const texto = await r.text();
  if (!r.ok) {
    const err = new Error(`GitHub recusou o commit (${r.status}): ${texto.slice(0, 500)}`);
    err.status = r.status;
    throw err;
  }
  const j = JSON.parse(texto);
  return { commit: j.commit && j.commit.sha, url: j.commit && j.commit.html_url };
}

/**
 * Regra de nome padrão das gravações (a mesma usada nos arquivos do Drive):
 *
 *   Aula N - <capítulo sem o número> (pt.K) - AAAA/MM/DD - <responsável>
 *
 *   N = posição do encontro dentro do módulo, em ordem de data, começando em 1.
 *   K = posição do encontro entre os do mesmo capítulo, no mesmo módulo.
 *       O "(pt.K)" só aparece quando o capítulo ocupa mais de um encontro.
 *   O responsável só entra se estiver preenchido no calendário.
 *
 *   Ex.: "Aula 10 - Ambição: como um vício se tornou uma virtude (pt.1) - 2026/09/29 - Bel"
 */
function nomeDoEncontro(ESTUDO, data) {
  const encontros = ESTUDO.encontros || [];
  const alvo = encontros.find((e) => e.data === data);
  if (!alvo) return null;

  const doModulo = encontros
    .filter((e) => e.modulo === alvo.modulo)
    .sort((a, b) => a.data.localeCompare(b.data));
  const aula = doModulo.findIndex((e) => e.data === data) + 1;

  const capitulo = (alvo.capitulo || '').trim();
  const titulo = capitulo.replace(/^\d+\.\s*/, '') || 'Encontro';
  const mesmoCapitulo = doModulo.filter((e) => (e.capitulo || '').trim() === capitulo);
  const parte = mesmoCapitulo.length > 1 ? ` (pt.${mesmoCapitulo.findIndex((e) => e.data === data) + 1})` : '';

  const dataBarra = data.replace(/-/g, '/');
  const resp = (alvo.responsavel || '').trim();
  const nomeArquivo = `Aula ${aula} - ${titulo}${parte} - ${dataBarra}${resp ? ` - ${resp}` : ''}`;

  const modulo = (ESTUDO.modulos || []).find((m) => m.id === alvo.modulo) || {};
  return {
    data,
    modulo: alvo.modulo,
    moduloTitulo: modulo.titulo || alvo.modulo,
    moduloAutor: modulo.autor || null,
    aula,
    capitulo: capitulo || null,
    responsavel: resp || null,
    nomeArquivo,
    jaTemVideo: Boolean(alvo.video),
    videoAtual: alvo.video || null,
  };
}

/**
 * Coloca (ou troca) o campo `video` do encontro da data informada, mexendo só
 * nas linhas daquele encontro para o diff ficar limpo.
 */
function definirVideo(codigo, data, videoUrl) {
  const linhas = codigo.split('\n');
  const reInicio = new RegExp(`^(\\s*)data:\\s*['"]${data.replace(/-/g, '\\-')}['"],?\\s*$`);
  const iData = linhas.findIndex((l) => reInicio.test(l));
  if (iData < 0) throw new Error(`Encontro ${data} não encontrado no texto do arquivo.`);
  const indent = linhas[iData].match(reInicio)[1];

  // O objeto do encontro começa na linha "{" logo acima e fecha no "}," com
  // a indentação do "{" (um nível acima dos campos).
  let iAbre = iData - 1;
  while (iAbre >= 0 && !/^\s*\{\s*$/.test(linhas[iAbre])) iAbre--;
  if (iAbre < 0) throw new Error('Não achei a abertura do encontro.');
  const indentObj = linhas[iAbre].match(/^(\s*)/)[1];
  let iFecha = iData + 1;
  const reFecha = new RegExp(`^${indentObj}\\},?\\s*$`);
  while (iFecha < linhas.length && !reFecha.test(linhas[iFecha])) iFecha++;
  if (iFecha >= linhas.length) throw new Error('Não achei o fechamento do encontro.');

  const linhaVideo = `${indent}video: '${videoUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',`;
  const reVideo = new RegExp(`^${indent}video:`);
  const iVideo = linhas.slice(iData, iFecha).findIndex((l) => reVideo.test(l));

  if (iVideo >= 0) {
    // Campo já existe: troca a linha (assume valor numa linha só, como no resto do arquivo).
    linhas[iData + iVideo] = linhaVideo;
  } else {
    // Insere logo depois de `foto:` (padrão dos encontros existentes) ou de `responsavel:`.
    const procurar = (campo) =>
      linhas.slice(iData, iFecha).findIndex((l) => new RegExp(`^${indent}${campo}:`).test(l));
    let pos = procurar('foto');
    if (pos < 0) pos = procurar('responsavel');
    const iInsere = pos >= 0 ? iData + pos + 1 : iFecha;
    linhas.splice(iInsere, 0, linhaVideo);
  }
  return linhas.join('\n');
}

module.exports = { avaliar, lerCalendario, gravarCalendario, nomeDoEncontro, definirVideo, REPO, BRANCH };
