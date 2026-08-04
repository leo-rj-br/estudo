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

O site converte o link sozinho para o formato de player. A gravação abre num visor
grande sobre a página — no celular, ocupa a tela inteira —, porque os controles do
Drive não cabem bem numa moldura pequena.

### Prefira o YouTube ao Drive

Os dois funcionam — `drive.google.com/file/d/…`, `watch?v=`, `youtu.be/`, `/live/` —
mas para gravações de hora e meia o YouTube é bem melhor, por dois motivos:

- **Não trava.** O Drive entrega sempre o arquivo original, do tamanho em que foi
  gravado; se a conexão de quem assiste não acompanhar, o vídeo engasga. O YouTube
  reprocessa em várias qualidades e escolhe a que cabe na conexão do momento.
- **O player é decente em qualquer tamanho.** O do Drive quebra o próprio layout em
  molduras baixas: joga a barra de progresso para cima do vídeo e esconde os botões.

Suba como **"não listado"**: não aparece em buscas nem no canal, só abre por link —
mesma privacidade do Drive com link aberto. Depois é só colar o link no campo `video`.

O site reconhece o provedor sozinho e ajusta o visor: o YouTube fica em 16:9, e o
Drive recebe toda a altura da tela no celular, que é o que ele precisa para montar
os controles. Os embeds do YouTube usam o domínio `youtube-nocookie.com`.

**Nos vídeos do YouTube o cartaz é a própria miniatura publicada lá.** Não é preciso
enviar imagem nenhuma: trocou a capa no YouTube, o site acompanha. Ele busca a versão
em maior qualidade e, se ela não existir, tenta as menores; se nenhuma responder, cai
na foto do capítulo. Essa é a única imagem do site que vem de fora (`i.ytimg.com`), e
ela é pedida sem enviar o endereço da página. Gravações no Drive continuam usando a
foto do capítulo como cartaz, porque o Drive não publica miniatura.

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

Adicione um item em `modulos` e use esse `id` no campo `modulo` dos encontros. O site
agrupa e destaca automaticamente.

| Campo do módulo | Descrição |
|---|---|
| `id` | identificador usado no campo `modulo` dos encontros |
| `titulo` | nome do livro |
| `subtitulo` | subtítulo da capa, se houver |
| `autor` | autor |
| `periodo` | ex.: `2026 · 2º semestre` |
| `livro` | **capa do livro**, exibida no cartão "Estudando agora" |
| `capa` | foto de ambiente, usada quando um encontro não define a sua |
| `epigrafe` | frase curta que resume a tese do livro |

Para a capa, salve duas larguras em `assets/img` — `<nome>-400.webp` e `<nome>-696.webp` —
e informe só o nome-base em `livro`. Uma foto reta da capa, sem moldura nem fundo, é o
que funciona: o site já aplica o canto arredondado e a sombra que dão volume de livro.

### Configuração geral

No bloco `config`:

- `horario` — horário dos encontros (`19:00`), usado no destaque, na contagem
  regressiva e no `.ics`
- `duracaoMin` — duração em minutos, para o evento de calendário
- `fuso` — fuso dos encontros (`-03:00`). O `horario` é sempre lido neste fuso, então
  quem acessar de fora do Brasil vê a contagem regressiva certa e recebe um `.ics`
  no instante correto — e "hoje" continua sendo hoje em Brasília
- `meetPadrao` — link fixo da sala do Meet, aplicado a todos os encontros. Deixe vazio
  (`''`) para esconder o botão *"Entrar no Meet"*. Um encontro pode sobrescrevê-lo com
  o próprio campo `meet`.

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

### Logotipo

Três recortes do material da marca, todos em SVG:

| Arquivo | Onde aparece |
|---|---|
| `assets/img/marca.svg` | monograma do globo, no cabeçalho |
| `assets/img/selo.svg` | selo circular, no rodapé |
| `assets/img/lockup.svg` | lockup horizontal, usado no cartão social |
| `assets/favicon.svg` | globo branco sobre o quadrado escuro da marca |

Os dois primeiros são aplicados como **máscara CSS** com `background: currentColor`,
e não como `<img>`. Assim um único arquivo serve os temas claro e escuro: o logotipo
herda a cor da tinta e inverte sozinho, sem precisar de uma versão branca e outra preta.

O monograma do cabeçalho teve o símbolo `©` removido — nas dimensões em que ele aparece
viraria um borrão de um pixel. O selo e o lockup mantêm a arte original.

`assets/img/og.jpg` é o cartão que aparece quando o link é compartilhado no WhatsApp
ou nas redes: lockup da igreja, o nome do estudo e a capa do livro do semestre. Ao
trocar de livro, vale regerá-lo com o novo título e a nova capa — 1200×630.

O favicon continua sendo o globo da Comunidade Manifesto, e não a capa do livro. O
site atravessa vários semestres e vários livros; o ícone da aba é a identidade que
permanece.

---

## Estrutura

```
index.html               página única
data/calendario.js       ← o conteúdo (o único arquivo a editar)
assets/css/app.css       sistema visual
assets/css/fonts.css     @font-face das fontes locais
assets/fonts/            Inter e Newsreader (OFL 1.1)
assets/img/              fotos em WebP, logotipos em SVG e o cartão social
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

**Resumos** — escritos a partir do texto integral do livro. O PDF foi lido e mapeado
seção a seção (59 seções, do capítulo 1 ao 11), e cada resumo cobre exatamente as
seções que o Notion atribui àquela semana, citando as imagens e os argumentos que
Horton de fato usa ali.

**A Conspiração Divina (2026.1)** — os 28 encontros do semestre anterior estão completos
e servem de referência de preenchimento.
