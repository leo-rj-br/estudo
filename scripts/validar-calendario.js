#!/usr/bin/env node
/* =============================================================================
 * Valida data/calendario.js antes de publicar.
 *
 * Roda automaticamente a cada push, via .github/workflows/pages.yml. Se este
 * script falhar, a publicação é BLOQUEADA — o site continua no ar na última
 * versão boa, em vez de ficar em branco por causa de um erro de digitação.
 *
 * Rodar manualmente: node scripts/validar-calendario.js
 * ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const erros = [];
const avisos = [];

// 1. O arquivo precisa nem sequer ter erro de sintaxe. Isso sozinho já
//    cobre o caso que derrubou o site: uma vírgula faltando quebra a
//    leitura do arquivo inteiro, não só do encontro editado.
let ESTUDO;
try {
  global.window = {};
  require(path.join(raiz, 'data/calendario.js'));
  ESTUDO = global.window.ESTUDO;
} catch (e) {
  console.error('✗ data/calendario.js tem erro de sintaxe — o site inteiro ficaria em branco.\n');
  console.error(e.message);
  process.exit(1);
}

if (!ESTUDO) erros.push('window.ESTUDO não foi definido pelo arquivo.');

const cfg = ESTUDO.config || {};
if (!/^\d{1,2}:\d{2}$/.test(cfg.horario || '')) erros.push(`config.horario inválido: "${cfg.horario}"`);
if (!Number.isFinite(cfg.duracaoMin)) erros.push('config.duracaoMin ausente ou não numérico.');

const modulos = ESTUDO.modulos || [];
if (!modulos.length) erros.push('modulos está vazio.');

const idsModulo = new Set();
for (const m of modulos) {
  if (!m.id) { erros.push('Um módulo está sem id.'); continue; }
  if (idsModulo.has(m.id)) erros.push(`id de módulo duplicado: "${m.id}"`);
  idsModulo.add(m.id);
  if (!m.titulo) erros.push(`Módulo "${m.id}" está sem titulo.`);
}

const encontros = ESTUDO.encontros || [];
if (!encontros.length) erros.push('encontros está vazio.');

const reData = /^\d{4}-\d{2}-\d{2}$/;
const reUrl = /^https?:\/\//;
const datasVistas = new Set();

function existeImagem(prefixo, sufixo) {
  if (!prefixo) return true; // campo opcional — nada a checar
  return fs.existsSync(path.join(raiz, 'assets/img', `${prefixo}-${sufixo}.webp`));
}

for (const [i, e] of encontros.entries()) {
  const rotulo = e.data || `encontros[${i}]`;

  if (!e.data || !reData.test(e.data)) {
    erros.push(`${rotulo}: data ausente ou fora do formato AAAA-MM-DD.`);
  } else if (datasVistas.has(e.data)) {
    erros.push(`${e.data}: data duplicada — dois encontros na mesma data.`);
  } else {
    datasVistas.add(e.data);
  }

  if (!e.modulo || !idsModulo.has(e.modulo)) {
    erros.push(`${rotulo}: modulo "${e.modulo}" não existe em modulos.`);
  }

  if (e.video !== undefined && (typeof e.video !== 'string' || !reUrl.test(e.video))) {
    erros.push(`${rotulo}: video não é uma URL http(s) válida: ${JSON.stringify(e.video)}`);
  }

  if (e.topicos !== undefined && !Array.isArray(e.topicos)) {
    erros.push(`${rotulo}: topicos deveria ser uma lista.`);
  }

  if (!existeImagem(e.foto, '800')) {
    avisos.push(`${rotulo}: foto "${e.foto}" não encontrada em assets/img/.`);
  }
}

for (const m of modulos) {
  if (!existeImagem(m.capa, '800')) avisos.push(`módulo "${m.id}": capa "${m.capa}" não encontrada.`);
  if (!existeImagem(m.livro, '400')) avisos.push(`módulo "${m.id}": livro "${m.livro}" não encontrado.`);
}

if (avisos.length) {
  console.warn(`⚠ ${avisos.length} aviso(s) — não impedem a publicação:`);
  avisos.forEach((a) => console.warn('  - ' + a));
  console.warn('');
}

if (erros.length) {
  console.error(`✗ ${erros.length} problema(s) em data/calendario.js — publicação bloqueada:\n`);
  erros.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}

const comVideo = encontros.filter((e) => e.video).length;
console.log(
  `✓ data/calendario.js válido — ${encontros.length} encontros, ${modulos.length} módulos, ${comVideo} com gravação.`
);
