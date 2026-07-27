# Estudo · Comunidade Manifesto

Site do calendário do estudo do livro — `estudo.comunidademanifesto.com`.

A próxima aula fica sempre em destaque no topo. Abaixo, o programa completo pode ser
visto como **agenda** (lista cronológica) ou como **calendário anual** (os 12 meses do
ano de uma vez). Ao abrir qualquer data aparecem o resumo do tema, os tópicos da semana,
quem conduz e — nos encontros já realizados — o **player do vídeo, que toca dentro da
própria página**, sem precisar sair para o Drive.

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
  capitulo: '1. O maior drama já contado',
  topicos: ['A história em quatro atos (p. 15–32)'],
  responsavel: 'Eduardo',
  resumo: 'Um parágrafo curto sobre o tema da semana…',
  video: 'https://drive.google.com/file/d/1AbC…/view?usp=sharing',
},
```

O site converte o link sozinho para o formato de player. **Links do YouTube também
funcionam** (`watch?v=`, `youtu.be/`, `/live/`), caso algum encontro seja transmitido por lá.

### Preencher um encontro futuro

Basta completar `capitulo`, `topicos` e `resumo`. Enquanto estiverem vazios, o site
mostra o encontro como *"Tema a confirmar"* — a página continua funcionando normalmente.

### Campos de cada encontro

| Campo | Obrigatório | Descrição |
|---|---|---|
| `data` | sim | `"AAAA-MM-DD"` |
| `modulo` | sim | id de um item da lista `modulos` |
| `capitulo` | — | título do capítulo do livro |
| `topicos` | — | lista das seções/páginas tratadas na semana |
| `responsavel` | — | quem conduz o encontro |
| `resumo` | — | parágrafo curto sobre o tema da semana |
| `video` | — | link do Drive ou YouTube da gravação |
| `meet` | — | link do Meet, se diferente do padrão |
| `material` | — | PDF, slides ou página do Notion |

### Começar um livro novo

Adicione um item em `modulos` (com `id`, `titulo`, `autor`, `periodo`, `epigrafe`) e
use esse `id` no campo `modulo` dos encontros. O site agrupa e destaca automaticamente.

### Configuração geral

No bloco `config`, no início do arquivo:

- `horario` — horário dos encontros (usado no destaque, no arquivo `.ics` e na contagem regressiva)
- `duracaoMin` — duração em minutos, para o evento de calendário
- `meetPadrao` — **link fixo da sala do Meet.** Enquanto estiver vazio (`''`), o botão
  *"Entrar no Meet"* não aparece. Preencha para ativá-lo em todos os encontros.

---

## O que o site faz

- **Próxima aula em destaque** com contagem regressiva ao vivo e botão para entrar no Meet
- **Agenda** que abre já na próxima aula — os encontros anteriores ficam recolhidos a um clique
- **Calendário anual** com os 12 meses; clicar em qualquer dia leva direto ao encontro
- **Player embutido** do Drive/YouTube, carregado só quando se clica em assistir
- **Busca** por tema, capítulo, data ou responsável (atalho: tecla `/`)
- **Filtros**: próximos, anteriores, com gravação
- **"Adicionar à agenda"** — baixa um `.ics` que funciona no Google Agenda, Apple e Outlook
- **Link direto para uma data**: `estudo.comunidademanifesto.com/#2026-05-19`
- Tema claro e escuro, com a preferência do sistema respeitada e memorizada
- Navegação por teclado, `prefers-reduced-motion` respeitado, e uma versão de impressão limpa

---

## Estrutura

```
index.html               página única
data/calendario.js       ← o conteúdo (o único arquivo a editar)
assets/css/app.css       sistema visual
assets/css/fonts.css     @font-face das fontes locais
assets/fonts/            Fraunces, Newsreader, Inter (OFL 1.1)
assets/js/app.js         interface
CNAME                    domínio para o GitHub Pages
```

Sem build, sem dependências, sem CDN externo — as fontes são servidas pelo próprio site,
então nada quebra se um serviço de terceiros sair do ar.

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

## Pendências de conteúdo

O calendário de **Simplesmente Crente** (2026.2) está com as datas criadas — terças-feiras,
a partir de 28/07/2026, seguindo o ritmo do semestre anterior — mas **sem capítulos, tópicos
e resumos**, que precisam vir do Notion. Confirmar também o **horário** (hoje `20:00`) e o
**link da sala do Meet**.

O semestre de **A Conspiração Divina** (2026.1) está completo, com os 28 encontros, e serve
de referência de preenchimento.
