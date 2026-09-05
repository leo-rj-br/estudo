#!/usr/bin/env node
/* =============================================================================
 * Valida data/agenda.js antes de publicar.
 *
 * Roda automaticamente a cada push, via .github/workflows/pages.yml. Se este
 * script falhar, a publicação é BLOQUEADA — a agenda continua no ar na
 * última versão boa, em vez de ficar em branco por causa de um erro de
 * digitação (mesma rede de segurança de validar-calendario.js).
 *
 * Rodar manualmente: node scripts/validar-agenda.js
 * ========================================================================== */

'use strict';

const path = require('path');

const raiz = path.join(__dirname, '..');
const erros = [];
const avisos = [];

let AGENDA;
try {
  global.window = {};
  require(path.join(raiz, 'data/agenda.js'));
  AGENDA = global.window.AGENDA;
} catch (e) {
  console.error('✗ data/agenda.js tem erro de sintaxe — a agenda inteira ficaria em branco.\n');
  console.error(e.message);
  process.exit(1);
}

if (!AGENDA) erros.push('window.AGENDA não foi definido pelo arquivo.');

const cfg = (AGENDA && AGENDA.config) || {};
if (!/^[+-]\d{2}:?\d{2}$/.test(cfg.fuso || '')) erros.push(`config.fuso inválido: "${cfg.fuso}"`);

const categorias = (AGENDA && AGENDA.categorias) || [];
if (!categorias.length) erros.push('categorias está vazio.');

const reCor = /^#[0-9a-fA-F]{6}$/;
const idsCategoria = new Set();
for (const c of categorias) {
  if (!c.id) { erros.push('Uma categoria está sem id.'); continue; }
  if (idsCategoria.has(c.id)) erros.push(`id de categoria duplicado: "${c.id}"`);
  idsCategoria.add(c.id);
  if (!c.nome) erros.push(`Categoria "${c.id}" está sem nome.`);
  if (!reCor.test(c.cor || '')) erros.push(`Categoria "${c.id}": cor inválida "${c.cor}" (use #rrggbb).`);
  if (!reCor.test(c.texto || '')) erros.push(`Categoria "${c.id}": texto inválido "${c.texto}" (use #rrggbb).`);
}

const eventos = (AGENDA && AGENDA.eventos) || [];
if (!eventos.length) erros.push('eventos está vazio.');

const reData = /^\d{4}-\d{2}-\d{2}$/;
const reHora = /^\d{1,2}:\d{2}$/;
const reUrl = /^https?:\/\//;

// Datas de calendário existem de verdade (rejeita "2026-02-30").
function dataValida(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

for (const [i, e] of eventos.entries()) {
  const rotulo = e.data ? `${e.data} (${e.categoria || 'sem categoria'})` : `eventos[${i}]`;

  if (!e.data || !reData.test(e.data) || !dataValida(e.data)) {
    erros.push(`${rotulo}: data ausente, fora do formato AAAA-MM-DD ou inexistente.`);
  }

  if (e.fim !== undefined) {
    if (!reData.test(e.fim) || !dataValida(e.fim)) {
      erros.push(`${rotulo}: fim "${e.fim}" fora do formato AAAA-MM-DD ou inexistente.`);
    } else if (e.data && e.fim < e.data) {
      erros.push(`${rotulo}: fim (${e.fim}) é anterior a data (${e.data}).`);
    }
  }

  if (!e.categoria || !idsCategoria.has(e.categoria)) {
    erros.push(`${rotulo}: categoria "${e.categoria}" não existe em categorias.`);
  }

  if (e.horario !== undefined && !reHora.test(e.horario)) {
    erros.push(`${rotulo}: horario "${e.horario}" inválido (use "HH:MM").`);
  }
  if (e.horarioFim !== undefined) {
    if (!reHora.test(e.horarioFim)) erros.push(`${rotulo}: horarioFim "${e.horarioFim}" inválido (use "HH:MM").`);
    if (e.horario === undefined) avisos.push(`${rotulo}: horarioFim definido sem horario.`);
  }

  if (e.link !== undefined && (typeof e.link !== 'string' || !reUrl.test(e.link))) {
    erros.push(`${rotulo}: link não é uma URL http(s) válida: ${JSON.stringify(e.link)}`);
  }
}

if (avisos.length) {
  console.warn(`⚠ ${avisos.length} aviso(s) — não impedem a publicação:`);
  avisos.forEach((a) => console.warn('  - ' + a));
  console.warn('');
}

if (erros.length) {
  console.error(`✗ ${erros.length} problema(s) em data/agenda.js — publicação bloqueada:\n`);
  erros.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}

console.log(
  `✓ data/agenda.js válido — ${eventos.length} evento(s), ${categorias.length} categoria(s).`
);
