/* POST /api/update-video
 * Headers: x-webhook-secret: <WEBHOOK_SECRET>
 * Body:    { "date": "AAAA-MM-DD", "videoUrl": "https://..." }
 *
 * Coloca o link no campo `video` do encontro e commita direto na main do
 * repositório (via GitHub Contents API, com o GITHUB_TOKEN da Vercel).
 * Antes de commitar, confere que o arquivo continua válido e que NADA além
 * do vídeo daquele encontro mudou. */

'use strict';

const crypto = require('crypto');
const { avaliar, lerCalendario, gravarCalendario, nomeDoEncontro, definirVideo } = require('./_lib/calendario');

function segredoConfere(recebido) {
  const esperado = process.env.WEBHOOK_SECRET || '';
  if (!esperado || !recebido) return false;
  const a = Buffer.from(String(recebido));
  const b = Buffer.from(esperado);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function lerCorpo(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const partes = [];
  for await (const p of req) partes.push(p);
  return JSON.parse(Buffer.concat(partes).toString('utf8') || '{}');
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!segredoConfere(req.headers['x-webhook-secret'])) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ error: 'missing_github_token' });
  }

  let body;
  try {
    body = await lerCorpo(req);
  } catch {
    return res.status(400).json({ error: 'bad_json' });
  }
  const date = String(body.date || '').trim();
  const videoUrl = String(body.videoUrl || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'bad_date' });
  if (!/^https:\/\/(www\.)?(youtube\.com|youtu\.be|drive\.google\.com)\//.test(videoUrl) || /['"\s\\]/.test(videoUrl)) {
    return res.status(400).json({ error: 'bad_video_url', message: 'Aceita só links https do YouTube ou do Drive.' });
  }

  try {
    const { codigo, sha } = await lerCalendario();
    const antes = avaliar(codigo);
    const info = nomeDoEncontro(antes, date);
    if (!info) return res.status(404).json({ error: 'date_not_found' });

    if (info.videoAtual === videoUrl) {
      return res.status(200).json({ ok: true, alterado: false, message: 'O encontro já tem esse vídeo.', ...info });
    }

    const novoCodigo = definirVideo(codigo, date, videoUrl);

    // Conferência: o arquivo novo precisa ser válido e só o vídeo do encontro pode ter mudado.
    const depois = avaliar(novoCodigo);
    const normal = (E, comVideoDe) =>
      JSON.stringify({
        ...E,
        encontros: E.encontros.map((e) => (e.data === comVideoDe ? { ...e, video: undefined } : e)),
      });
    const alvoDepois = depois.encontros.find((e) => e.data === date);
    if (!alvoDepois || alvoDepois.video !== videoUrl || normal(antes, date) !== normal(depois, date)) {
      return res.status(500).json({ error: 'validation_failed', message: 'A edição mudaria mais do que o vídeo; nada foi commitado.' });
    }

    const verbo = info.videoAtual ? 'Troca' : 'Adiciona';
    const { commit, url } = await gravarCalendario({
      codigo: novoCodigo,
      sha,
      mensagem: `${verbo} a gravação de ${date.split('-').reverse().join('/')} — ${info.nomeArquivo}\n\n${videoUrl}`,
    });
    return res.status(200).json({ ok: true, alterado: true, commit, commitUrl: url, videoAnterior: info.videoAtual, ...info, videoAtual: videoUrl });
  } catch (e) {
    return res.status(e.status === 409 ? 409 : 500).json({ error: 'internal', message: e.message });
  }
};
