/* GET /api/get-video-name?date=AAAA-MM-DD
 * Devolve o nome padrão da gravação daquele encontro, calculado a partir de
 * data/calendario.js (veja a regra em api/_lib/calendario.js). */

'use strict';

const { avaliar, lerCalendario, nomeDoEncontro } = require('./_lib/calendario');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const date = String((req.query && req.query.date) || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'bad_date', message: 'Use ?date=AAAA-MM-DD' });
  }
  try {
    const { codigo, origem, avisoGithub } = await lerCalendario({ permitirFallback: true });
    const info = nomeDoEncontro(avaliar(codigo), date);
    if (!info) {
      return res.status(404).json({
        error: 'date_not_found',
        message: `Não há encontro em ${date} no data/calendario.js.`,
      });
    }
    return res.status(200).json({ ...info, fonte: origem, ...(avisoGithub ? { avisoGithub } : {}) });
  } catch (e) {
    return res.status(500).json({ error: 'internal', message: e.message });
  }
};
