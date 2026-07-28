# Estudo · Comunidade Manifesto

Site do calendário do estudo — `estudo.comunidademanifesto.com`.

A próxima aula fica sempre em destaque no topo. Abaixo, o programa pode ser visto como
**agenda** (lista cronológica) ou como **calendário** — que mostra apenas os dias de
estudo, as terças-feiras, e não o mês inteiro. Ao abrir qualquer data aparecem o resumo
do tema, os tópicos da semana, quem conduz e — nos encontros já realizados — o **player
do vídeo, que toca dentro da própria página**, sem precisar sair para o Drive.

---

## Como atualizar o site

**Só existe um arquivo para editar: [`data/calendario.js`](data/calendario.js).**
Não é preciso mexer em HTML, CSS ou JavaScript.

### Publicar a gravação de um encontro

1. No Google Drive, botão direito no arquivo → **Compartilhar**
2. Em *Acesso geral*, escolha **"Qualquer pessoa com o link"** — sem isso o vídeo não
   carrega para quem não é da equipe
3. **Copiar link** e colar no campo `video` do encontro:

```js
{
  data: '2026-08-04',
  modulo: 'simplesmente-crente',
  capitulo: '1. O Novo Radical',
  topicos: ['Tempo de quantidade (p. 32–42)'],
  responsavel: 'Alamo',
  foto: 'montanha',
  resumo: 'Um parágrafo curto sobre o tema da semana…',
  video: 'https://drive.google.com/file/d/1AbC…/view?usp=sharing',
},
```

O site converte o link sozinho para o formato de player. **Links do YouTube também
funcionam** (`watch?v=`, `youtu.be/`, `/live/`).

### Campos de cada encontro

| Campo | Obrigatório | Descrição |
|---|---|---|
| `data` | sim | `"AAAA-MM-DD"` |
| `modulo` | sim | id de um item da lista `modulos` |
| `capitulo` | — | título do capítulo; o número inicial vira a pílula colorida |
| `topicos` | — | seções/páginas tratadas na semana |
| `responsavel` | — | quem conduz o encontro |
| `resumo` | — | parágrafo curto sobre o tema da semana |
| `foto` | — | nome de uma imagem de `assets/img`, sem tamanho nem extensão |
| `video` | — | link do Drive ou YouTube da gravação |
| `meet` | — | link do Meet, se diferente do padrão |
| `material` | — | PDF, slides ou página do Notion |

Campos vazios não quebram nada: sem `capitulo` o encontro aparece como *"Tema a
confirmar"*; sem `foto` cai na capa do módulo; sem `video` mostra a foto do capítulo
com um aviso de que a gravação ainda não saiu.

### Fotos disponíveis

`fogueira` · `jovens` · `mesa` · `montanha` · `multidao` · `oracao` · `quintal` ·
`rua` · `transito` · `travessia` · `vizinhanca`

Cada uma existe em dois tamanhos (`-800.webp` e `-1400.webp`) e o site escolhe o certo
para a tela. Para acrescentar outra, salve os dois tamanhos em `assets/img` com o mesmo
padrão de nome.

### Começar um livro novo

Adicione um item em `modulos` (`id`, `titulo`, `autor`, `periodo`, `capa`, `epigrafe`) e
use esse `id` no campo `modulo` dos encontros. O site agrupa e destaca automaticamente.

### Configuração geral

No bloco `config`:

- `horario` — horário dos encontros (usado no destaque, na contagem regressiva e no `.ics`)
- `duracaoMin` — duração em minutos, para o evento de calendário
- `meetPadrao` — **link fixo da sala do Meet.** Enquanto estiver vazio (`''`), o botão
  *"Entrar no Meet"* não aparece. Preencha para ativá-lo em todos os encontros.

---

## O que o site faz

- **Próxima aula em destaque** com contagem regressiva ao vivo e botão para entrar no Meet
- **Agenda** que abre já na próxima aula — os encontros anteriores ficam recolhidos a um clique
- **Calendário só com os dias de estudo**, agrupados por mês; clicar em qualquer dia
  leva direto ao encontro
- **Player embutido** do Drive/YouTube, carregado só quando se clica em assistir
- **Busca** por tema, capítulo, data ou responsável (atalho: tecla `/`)
- **Filtros**: próximos, anteriores, com gravação
- **"Adicionar à agenda"** — baixa um `.ics` que funciona no Google Agenda, Apple e Outlook
- **Link direto para uma data**: `estudo.comunidademanifesto.com/#2026-10-27`
- Tema claro e escuro, com a preferência do sistema respeitada e memorizada
- Navegação por teclado, `prefers-reduced-motion` respeitado e versão de impressão limpa

---

## Design

O sistema visual segue a linguagem do Notion, a partir das referências fornecidas:
canvas off-white quente (`#f6f5f4`), superfícies brancas separadas por fios de 1px em
vez de sombras, cantos de 12px nos cartões e 8px nos botões, tipografia Inter com
tracking negativo nos tamanhos grandes, e **um único azul estrutural** (`#0075de`)
reservado para a ação principal. A paleta colorida (amarelo, coral, azul-céu, turquesa,
violeta, laranja) só decora — ela numera os capítulos e nunca pinta um botão.

Newsreader entra como serifada editorial em poucos momentos — resumos e citações —
no papel que a referência reserva à Lyon Text.

---

## Estrutura

```
index.html               página única
data/calendario.js       ← o conteúdo (o único arquivo a editar)
assets/css/app.css       sistema visual
assets/css/fonts.css     @font-face das fontes locais
assets/fonts/            Inter e Newsreader (OFL 1.1)
assets/img/              fotos em WebP, dois tamanhos cada
assets/js/app.js         interface
CNAME                    domínio para o GitHub Pages
```

Sem build, sem dependências, sem CDN externo — fontes e imagens são servidas pelo
próprio site, então nada quebra se um serviço de terceiros sair do ar.

**Fotografias:** Brooke Cagle, Carlos Kenobi, Dan Gold, Dylan Gillis, Evan Wise,
Felipe Vieira, Helena Lopes, Ryoji Iwata, Samuel Martins, Shane Dawson e Timon Studler,
no Unsplash.

---

## Publicar

**GitHub Pages** — em *Settings → Pages*, publicar a partir da branch desejada (raiz `/`).
O arquivo `CNAME` já aponta para `estudo.comunidademanifesto.com`; no DNS, criar um
`CNAME` de `estudo` para `<usuário>.github.io`.

**Vercel / Netlify / Cloudflare Pages** — importar o repositório, sem comando de build,
com o diretório de saída na raiz. Depois adicionar o domínio no painel.

### Rodar localmente

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

---

## Notas sobre o conteúdo

**Simplesmente Crente (2026.2)** — os 21 encontros vieram do CSV exportado do Notion:
datas, capítulos, tópicos e responsáveis conferem linha a linha com o original. Uma
correção foi feita: na linha de 01/09 o Notion tinha dois tópicos colados numa só linha
(*"Queremos tudo… (págs. 88-90)- Mergulhar em mares profundos…"*), que aqui aparecem
separados. Vale corrigir também no Notion.

**Resumos** — escritos a partir da estrutura de capítulos e seções do livro, não do PDF
(que não chegou junto com os outros anexos). Se quiser que sejam derivados do texto
integral, é só enviar o arquivo que eu refaço.

**A Conspiração Divina (2026.1)** — os 28 encontros do semestre anterior estão completos
e servem de referência de preenchimento.
