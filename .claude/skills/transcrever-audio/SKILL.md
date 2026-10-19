---
name: transcrever-audio
description: Transcreve áudios — principalmente mensagens de voz do WhatsApp — com o Whisper rodando localmente, sem API paga. Use quando o usuário pedir para ouvir, transcrever ou resumir um áudio, uma mensagem de voz, um "zap"/"áudio do WhatsApp", ou mencionar um arquivo .opus/.ogg/.m4a/.mp3/.wav, esteja ele no Google Drive ou na sessão.
---

# Transcrever áudio (WhatsApp e outros)

O Claude não ouve áudio diretamente. Esta skill baixa o arquivo, transcreve com o
Whisper (`faster-whisper`, rodando na CPU da sessão, de graça) e devolve o texto.

## Como o usuário envia o áudio

No WhatsApp: pressionar o áudio → **Compartilhar** (ou Encaminhar → compartilhar
fora do app) → **Google Drive**. O arquivo costuma chegar com nome
`PTT-AAAAMMDD-WA0001.opus` ou `WhatsApp Audio ....ogg`/`.opus`.

## Passo a passo

1. **Achar o arquivo no Drive.** Se o usuário não deu nome nem link, procure os mais
   recentes com `search_files` (Google Drive), `excludeContentSnippets: true`:

   ```
   mimeType contains 'audio/' and modifiedTime > '<hoje menos 2 dias, RFC 3339>'
   ```

   Se nada aparecer, tente `title contains 'PTT' or title contains 'WhatsApp'`.
   Havendo mais de um candidato, pegue o mais recente e diga qual foi usado.
   Com link do Drive, o ID é o trecho depois de `/d/`.
   **Confira `fileSize` antes de baixar:** acima de ~3 MB (≈ 20 min de áudio do
   WhatsApp), avise o usuário antes, porque a resposta em base64 fica enorme.

2. **Baixar.** Chame `download_file_content` com o `fileId`. A resposta vem em
   base64. Se ela for grande, o Claude Code a salva em um arquivo e devolve o
   caminho: use esse arquivo. Se vier inline (áudio curto), grave a string
   base64 exatamente como veio em um `.b64` no scratchpad, com Write. O script
   aceita o áudio puro, o base64 puro ou o JSON da resposta e decodifica sozinho.

   Áudio que já está na sessão (anexado ou no repositório): pule direto para o passo 3.

3. **Transcrever.**

   ```bash
   python3 .claude/skills/transcrever-audio/scripts/transcrever.py <arquivo> [--modelo small] [--tempos]
   ```

   - Na primeira vez da sessão o script instala o `faster-whisper` e baixa o modelo
     (`small` ≈ 480 MB, de `huggingface.co`). Use timeout de 10 minutos.
   - Modelos: `small` (padrão, bom para português), `medium` (mais preciso e mais
     lento), `large-v3-turbo` (o melhor, ~1,6 GB). `tiny`/`base` só para testes.
   - `--tempos` marca o minuto de cada trecho; use em áudios longos.
   - `--idioma auto` se o áudio não estiver em português.
   - Se aparecer *403 Forbidden* ao carregar o modelo, a rede do ambiente bloqueia
     `huggingface.co`: diga ao usuário para liberar esse domínio em **Network access →
     Allowed domains** nas configurações do ambiente.

4. **Responder.** Entregue a transcrição fiel (sem "corrigir" o que a pessoa disse,
   só pontuação) e, depois, o que o usuário pediu: resumo, pontos de ação, uma
   resposta sugerida etc. Se não pediu nada, mande a transcrição e um resumo de
   1 a 3 linhas. Marque trechos incompreensíveis como `[inaudível]` em vez de
   inventar.

## Privacidade

Mensagens de voz são conversas pessoais. Não grave a transcrição no repositório
nem faça commit do áudio; use o scratchpad da sessão para arquivos temporários.
