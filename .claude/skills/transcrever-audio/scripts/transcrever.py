#!/usr/bin/env python3
"""Transcreve um áudio (ex.: mensagem de voz do WhatsApp) com o Whisper, localmente.

Uso:
    python3 transcrever.py ARQUIVO [--modelo small] [--idioma pt] [--tempos] [--saida texto.txt]

ARQUIVO pode ser o próprio áudio (.opus, .ogg, .m4a, .mp3, .wav...) ou um arquivo de
texto com o conteúdo em base64 — inclusive a resposta JSON salva da ferramenta
download_file_content do Google Drive. Nesse caso o áudio é decodificado antes.
"""

import argparse
import base64
import binascii
import json
import os
import re
import subprocess
import sys
import tempfile

# Assinaturas dos formatos de áudio mais comuns, para saber se o arquivo já é áudio.
ASSINATURAS = (b"OggS", b"ID3", b"RIFF", b"fLaC", b"\x1a\x45\xdf\xa3", b"\xff\xf1", b"\xff\xf9", b"\xff\xfb", b"\xff\xf3")


def parece_audio(cabecalho):
    return cabecalho.startswith(ASSINATURAS) or cabecalho[4:8] == b"ftyp"


def maior_base64(valor):
    """Procura, dentro de um JSON qualquer, a maior string que pareça base64."""
    if isinstance(valor, str):
        return valor
    candidatos = []
    if isinstance(valor, dict):
        candidatos = [maior_base64(v) for v in valor.values()]
    elif isinstance(valor, list):
        candidatos = [maior_base64(v) for v in valor]
    candidatos = [c for c in candidatos if c]
    return max(candidatos, key=len) if candidatos else ""


def decodificar_base64(caminho):
    with open(caminho, encoding="utf-8", errors="ignore") as f:
        texto = f.read().strip()
    try:
        texto = maior_base64(json.loads(texto))
        # A resposta do MCP pode vir com o JSON do Drive embrulhado dentro de um texto.
        if texto.lstrip().startswith("{"):
            texto = maior_base64(json.loads(texto))
    except json.JSONDecodeError:
        pass
    texto = re.sub(r"^data:[^,]*,", "", texto.strip())
    texto = re.sub(r"\s+", "", texto)
    try:
        dados = base64.b64decode(texto + "=" * (-len(texto) % 4), altchars=b"-_" if "-" in texto or "_" in texto else None)
    except (binascii.Error, ValueError):
        sys.exit(f"Erro: {caminho} não é um áudio nem contém base64 válido.")
    if not parece_audio(dados[:12]):
        sys.exit(f"Erro: o base64 de {caminho} não decodificou para um formato de áudio conhecido.")
    destino = tempfile.NamedTemporaryFile(prefix="audio-", suffix=".bin", delete=False)
    destino.write(dados)
    destino.close()
    return destino.name


def garantir_faster_whisper():
    try:
        import faster_whisper  # noqa: F401
    except ImportError:
        print("Instalando faster-whisper (só na primeira vez da sessão)...", file=sys.stderr)
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", "faster-whisper"], check=True)


def carregar_audio(caminho):
    """Decodifica com o ffmpeg para 16 kHz mono. Evita o PyAV, cuja versão varia entre
    ambientes e já quebrou o decode interno do faster-whisper."""
    import shutil

    import numpy as np

    if not shutil.which("ffmpeg"):
        return caminho
    bruto = subprocess.run(
        ["ffmpeg", "-nostdin", "-loglevel", "error", "-i", caminho, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
        capture_output=True,
    )
    if bruto.returncode != 0:
        sys.exit(f"Erro: o ffmpeg não conseguiu ler o áudio: {bruto.stderr.decode(errors='ignore').strip()}")
    return np.frombuffer(bruto.stdout, np.int16).astype(np.float32) / 32768.0


def duracao(segundos):
    m, s = divmod(int(segundos), 60)
    return f"{m:02d}:{s:02d}"


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("arquivo")
    p.add_argument("--modelo", default="small", help="tiny, base, small (padrão), medium, large-v3-turbo")
    p.add_argument("--idioma", default="pt", help="código do idioma; 'auto' para detectar (padrão: pt)")
    p.add_argument("--tempos", action="store_true", help="inclui a marcação de tempo de cada trecho")
    p.add_argument("--saida", help="também grava a transcrição neste arquivo")
    args = p.parse_args()

    if not os.path.isfile(args.arquivo):
        sys.exit(f"Erro: arquivo não encontrado: {args.arquivo}")
    with open(args.arquivo, "rb") as f:
        audio = args.arquivo if parece_audio(f.read(12)) else decodificar_base64(args.arquivo)

    garantir_faster_whisper()
    from faster_whisper import WhisperModel

    try:
        modelo = WhisperModel(args.modelo, device="cpu", compute_type="int8", cpu_threads=os.cpu_count() or 4)
    except Exception as e:  # o download do modelo é o ponto que mais falha
        sys.exit(
            f"Erro ao carregar o modelo '{args.modelo}': {e}\n"
            "Os modelos vêm de huggingface.co. Se a rede do ambiente bloquear esse domínio, "
            "libere-o em Network access → Allowed domains nas configurações do ambiente."
        )

    segmentos, info = modelo.transcribe(
        carregar_audio(audio),
        language=None if args.idioma == "auto" else args.idioma,
        vad_filter=True,
        beam_size=5,
    )
    linhas = []
    for seg in segmentos:
        texto = seg.text.strip()
        linhas.append(f"[{duracao(seg.start)}] {texto}" if args.tempos else texto)

    resultado = "\n".join(linhas) if args.tempos else " ".join(linhas)
    print(f"# Duração: {duracao(info.duration)} · idioma: {info.language} · modelo: {args.modelo}", file=sys.stderr)
    print(resultado)
    if args.saida:
        with open(args.saida, "w", encoding="utf-8") as f:
            f.write(resultado + "\n")
    if audio != args.arquivo:
        os.unlink(audio)


if __name__ == "__main__":
    main()
