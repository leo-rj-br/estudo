/* =============================================================================
 *  CALENDÁRIO DO ESTUDO — Comunidade Manifesto
 *  -----------------------------------------------------------------------
 *  Este é o ÚNICO arquivo que precisa ser editado para atualizar o site.
 *  Não é preciso mexer em HTML, CSS ou JavaScript.
 *
 *  COMO ADICIONAR O LINK DE UM VÍDEO (encontro que já aconteceu)
 *  -------------------------------------------------------------
 *  1. No Google Drive, clique com o botão direito no arquivo → Compartilhar
 *  2. Em "Acesso geral", escolha "Qualquer pessoa com o link"
 *  3. Copie o link e cole no campo `video` do encontro. Ex.:
 *        video: "https://drive.google.com/file/d/1AbC.../view?usp=sharing"
 *     O site converte sozinho para o player e exibe o vídeo na própria página.
 *     Links do YouTube também funcionam.
 *
 *  CAMPOS DE CADA ENCONTRO
 *  -----------------------
 *    data        "AAAA-MM-DD"  (obrigatório)
 *    modulo      id do módulo em `modulos` abaixo (obrigatório)
 *    capitulo    título do capítulo do livro
 *    topicos     lista de seções/páginas tratadas na semana
 *    responsavel quem conduz o encontro
 *    resumo      parágrafo curto sobre o tema da semana
 *    foto        nome de uma imagem em assets/img (sem o tamanho e a extensão)
 *    video       link do Drive/YouTube da gravação (encontros passados)
 *    meet        link da sala do Meet (se diferente do padrão)
 *    material    link para PDF, slides ou página do Notion (opcional)
 * ========================================================================== */

window.ESTUDO = {
  config: {
    igreja: 'Comunidade Manifesto',
    horario: '19:00',
    duracaoMin: 90,
    // Fuso dos encontros. O horário acima é sempre lido neste fuso, então quem
    // acessar de fora do Brasil vê a contagem regressiva e o .ics corretos.
    fuso: '-03:00',
    // Sala fixa do Meet usada por padrão em todos os encontros.
    // Deixe vazio ('') para esconder o botão "Entrar no Meet".
    meetPadrao: 'https://meet.google.com/fhc-qomq-ggb',
  },

  modulos: [
    {
      id: 'simplesmente-crente',
      titulo: 'Simplesmente Crente',
      autor: 'Michael Horton',
      periodo: '2026 · 2º semestre',
      capa: 'quintal',
      epigrafe:
        'Deus não nos chamou para sermos radicais, revolucionários ou extraordinários. Ele nos chamou para uma fidelidade comum, sustentável, que dura a vida inteira.',
    },
    {
      id: 'conspiracao-divina',
      titulo: 'A Conspiração Divina',
      autor: 'Dallas Willard',
      periodo: '2026 · 1º semestre',
      capa: 'oracao',
      epigrafe:
        'O Reino de Deus não é um lugar para onde se vai depois de morrer, mas o governo real de Deus disponível aqui e agora, para quem quiser aprender a viver nele.',
    },
  ],

  encontros: [
    /* -------------------------------------------------------------------
     * 2026.2 — SIMPLESMENTE CRENTE (Michael Horton)
     * ---------------------------------------------------------------- */
    {
      data: '2026-07-28',
      modulo: 'simplesmente-crente',
      capitulo: '1. O Novo Radical',
      topicos: ['Introdução (p. 17–24)', 'Meu problema é a mesmice (p. 24–29)'],
      responsavel: 'Bell',
      foto: 'montanha',
      resumo:
        'Horton abre o livro nomeando o clima que nos formou: uma espiritualidade que só se sente legítima quando é radical, épica, revolucionária. “Mesmice” virou sinônimo de fracasso — e é exatamente aí que ele coloca o dedo. Primeira aula do semestre: vale chegar de coração aberto, porque o diagnóstico é sobre nós.',
    },
    {
      data: '2026-08-04',
      modulo: 'simplesmente-crente',
      capitulo: '1. O Novo Radical',
      topicos: [
        'Isso não seria uma desculpa para nos manter confortáveis? (p. 29–32)',
        'Tempo de quantidade (p. 32–42)',
      ],
      responsavel: 'Alamo',
      foto: 'montanha',
      resumo:
        'A objeção mais óbvia ao livro — “isso não é acomodação disfarçada?” — é enfrentada de frente. Horton responde que o oposto do radicalismo não é a preguiça, mas a fidelidade que dura. E apresenta uma de suas imagens centrais: maturidade e vínculo não se constroem em momentos intensos, e sim em tempo de quantidade.',
    },
    {
      data: '2026-08-11',
      modulo: 'simplesmente-crente',
      capitulo: '2. Corriqueiro não é o mesmo que medíocre',
      topicos: ['Introdução (p. 43–44)', 'Excelência distorcida (p. 44–53)'],
      responsavel: 'Eduardo',
      foto: 'mesa',
      resumo:
        'O capítulo desfaz o mal-entendido que mais atrapalha a tese do livro: ser comum não é ser relaxado. Horton mostra como a cultura da “excelência” acabou produzindo o contrário do que prometia — comparação, ansiedade e gente exausta dentro da igreja.',
    },
    {
      data: '2026-08-18',
      modulo: 'simplesmente-crente',
      capitulo: '2. Corriqueiro não é o mesmo que medíocre',
      topicos: [
        'Excelência versus perfeccionismo (p. 53–59)',
        'Chamado à ação (p. 59–68)',
      ],
      responsavel: 'Bell',
      foto: 'mesa',
      resumo:
        'A diferença entre buscar excelência e viver refém do perfeccionismo. Encontro bem prático: termina com um chamado à ação que redefine o que conta como uma vida cristã bem-sucedida.',
    },
    {
      data: '2026-08-25',
      modulo: 'simplesmente-crente',
      capitulo: '3. Jovens e inquietos',
      topicos: [
        'Introdução (p. 69–71)',
        'Jovem é inquietação (p. 71–72)',
        'Amadurecer (p. 72–78)',
        'As gerações de Deus e nossas gerações (p. 78–83)',
      ],
      responsavel: 'Alamo',
      foto: 'jovens',
      resumo:
        'Por que a igreja passou a organizar tanto da sua vida em torno da linguagem da juventude — e o que se perde quando amadurecer deixa de ser um objetivo. Horton contrapõe a lógica das “gerações” de mercado à visão bíblica de gerações que recebem e entregam uma herança.',
    },
    {
      data: '2026-09-01',
      modulo: 'simplesmente-crente',
      capitulo: '3. Jovens e inquietos',
      topicos: [
        'O paradoxo hedonista (p. 83–88)',
        'Queremos tudo: autonomia e comunidade (p. 88–90)',
        'Mergulhar em mares profundos numa era de jet-ski (p. 90–99)',
      ],
      responsavel: 'Eduardo',
      foto: 'jovens',
      resumo:
        'Queremos autonomia total e comunidade profunda ao mesmo tempo — e as duas coisas não cabem juntas. A imagem do jet-ski contra o mergulho é uma das mais lembradas do livro: passamos a vida deslizando pela superfície de muita coisa, sem descer fundo em nada.',
    },
    {
      data: '2026-09-08',
      modulo: 'simplesmente-crente',
      capitulo: '4. A próxima grande coisa',
      topicos: [
        'Introdução (p. 101–106)',
        'A próxima grande coisa é uma tradição (p. 106–112)',
      ],
      responsavel: 'Bell',
      foto: 'transito',
      resumo:
        'A ironia que dá título ao capítulo: a obsessão pelo novo já é, ela mesma, uma tradição antiga. Horton faz aqui um trabalho histórico que ajuda a entender por que estamos sempre esperando o próximo avivamento, o próximo método, a próxima onda.',
    },
    {
      data: '2026-09-15',
      modulo: 'simplesmente-crente',
      capitulo: '4. A próxima grande coisa',
      topicos: ['Ansiando por avivamento (p. 112–122)'],
      responsavel: 'Alamo',
      foto: 'transito',
      resumo:
        'Uma leitura cuidadosa — e desconfortável — da história dos avivamentos. A pergunta de fundo é se buscamos a Deus ou buscamos a experiência, e o que acontece com uma igreja quando o extraordinário vira o padrão esperado.',
    },
    {
      data: '2026-09-22',
      modulo: 'simplesmente-crente',
      capitulo: '4. A próxima grande coisa',
      topicos: [
        'Conversação e nutrição pactual (p. 122–124)',
        'Como foi a igreja hoje? (p. 124–129)',
      ],
      responsavel: 'Eduardo',
      foto: 'transito',
      resumo:
        'A alternativa que Horton propõe: a nutrição pactual — aquilo que Deus prometeu usar de maneira ordinária: Palavra, mesa, oração, comunidade. A pergunta que fecha o capítulo (“como foi a igreja hoje?”) reorganiza o que esperamos de um domingo.',
    },
    {
      data: '2026-09-29',
      modulo: 'simplesmente-crente',
      capitulo: '5. Ambição: como um vício se tornou uma virtude',
      topicos: ['Introdução (p. 132–134)', 'Ambição na Escritura (p. 134–141)'],
      responsavel: 'Bell',
      foto: 'multidao',
      resumo:
        'A Escritura trata ambição como vício — e nós a transformamos em virtude, inclusive dentro da igreja. Encontro que costuma incomodar, porque exige olhar para as próprias motivações no trabalho, no ministério e nos planos de vida.',
    },
    {
      data: '2026-10-06',
      modulo: 'simplesmente-crente',
      capitulo: '5. Ambição: como um vício se tornou uma virtude',
      topicos: [
        'Asas derretidas e como um vício se tornou virtude (p. 141–152)',
        'Morte e ressurreição, não maquiagem (p. 152–155)',
      ],
      responsavel: 'Alamo',
      foto: 'multidao',
      resumo:
        'Ícaro como parábola da nossa cultura de alta performance. Horton fecha o capítulo recusando qualquer solução cosmética: o evangelho não ajusta a ambição, ele a mata e ressuscita o desejo em outra direção.',
    },
    {
      data: '2026-10-13',
      modulo: 'simplesmente-crente',
      capitulo: '6. Praticar o que pregamos: não temos mais superapóstolos',
      topicos: [
        'Introdução (p. 157–158)',
        'Paulo e os “superapóstolos” (p. 159–167)',
        'Idolatrando nossos líderes (p. 167–171)',
      ],
      responsavel: 'Eduardo',
      foto: 'travessia',
      resumo:
        'Paulo enfrentando os “superapóstolos” de Corinto: líderes espetaculares, eloquentes, com currículo de poder. Horton usa o texto para falar da nossa própria idolatria de líderes — e do preço que pastores e igrejas pagam por ela.',
    },
    {
      data: '2026-10-20',
      modulo: 'simplesmente-crente',
      capitulo: '6. Praticar o que pregamos: não temos mais superapóstolos',
      topicos: [
        'Submeter versus reinar em ambição (p. 171–179)',
        '“Não temais, pequeno rebanho” (p. 180–182)',
      ],
      responsavel: 'Bell',
      foto: 'travessia',
      resumo:
        'O contraste entre a liderança que se submete e a que reina. Termina com uma palavra de consolo para igrejas pequenas: “não temais, pequeno rebanho” — tamanho nunca foi a medida da fidelidade.',
    },
    {
      data: '2026-10-27',
      modulo: 'simplesmente-crente',
      capitulo: '7. Contentamento',
      topicos: [
        'Introdução (p. 187–188)',
        'Sustentabilidade (p. 189–190)',
        'Ganância: irmã gêmea da ambição (p. 190–193)',
        'Pacto, não contrato (p. 193–202)',
        'Contentes com nosso Pai (p. 202–204)',
      ],
      responsavel: 'Alamo',
      foto: 'fogueira',
      resumo:
        'O capítulo mais longo do livro, e talvez o mais necessário. Contentamento aqui não é resignação: é a liberdade de quem parou de tratar a fé como contrato — “eu faço, Deus retribui” — e voltou a viver como filho dentro de um pacto.',
    },
    {
      data: '2026-11-03',
      modulo: 'simplesmente-crente',
      capitulo: '7. Contentamento',
      topicos: [
        'Contentes com Cristo e seu reino (p. 204–208)',
        'Contentes com os meios comuns de operação na criação e providência de Deus (p. 208–215)',
        'Contentes com o modo comum de Deus operar a redenção (p. 215–225)',
      ],
      responsavel: 'Eduardo',
      foto: 'fogueira',
      resumo:
        'A segunda metade desdobra o contentamento em três direções: com Cristo, com o modo comum como Deus sustenta a criação e com o modo comum como ele salva. É aqui que a tese do livro fica mais nítida — o ordinário é o lugar escolhido por Deus.',
    },
    {
      data: '2026-11-10',
      modulo: 'simplesmente-crente',
      capitulo: '8. Não precisamos de mais um herói',
      topicos: [
        'Introdução (p. 227–232)',
        'Chamados ordinários: transformação cultural ou serviço por amor (p. 232–236)',
        'Reformar nossa teologia da cultura (p. 236–240)',
      ],
      responsavel: 'Bell',
      foto: 'oracao',
      resumo:
        'Horton questiona a linguagem de “transformar a cultura” e propõe algo menor e mais difícil: servir por amor, no lugar onde já estamos. Encontro importante para quem trabalha, estuda ou cria — é sobre vocação comum.',
    },
    {
      data: '2026-11-17',
      modulo: 'simplesmente-crente',
      capitulo: '8. Não precisamos de mais um herói',
      topicos: [
        'Amar o próximo é mais difícil do que amar as causas (p. 240–246)',
        'Gente comum (p. 246–250)',
      ],
      responsavel: 'Alamo',
      foto: 'oracao',
      resumo:
        'A frase que resume o livro inteiro: é mais fácil se dedicar a uma causa do que ao vizinho concreto, com nome, que às vezes nos irrita. Horton mostra por que Deus insiste em nos santificar através de gente comum.',
    },
    {
      data: '2026-11-24',
      modulo: 'simplesmente-crente',
      capitulo: '9. O ecossistema de Deus',
      topicos: [
        'Introdução (p. 251)',
        'O Reino como um jardim (p. 252–257)',
        'De que maneira o jardim de Deus cresce? (p. 257–261)',
        'O sábado como cinturão verde de Deus (p. 261–262)',
        '“Reduzir, reutilizar, reciclar” (p. 262–266)',
      ],
      responsavel: 'Eduardo',
      foto: 'rua',
      resumo:
        'A imagem do Reino como jardim: cresce devagar, por meios ordinários, num ritmo que não controlamos. O sábado aparece como o “cinturão verde” que protege a vida do cultivo predatório — um contraponto direto à nossa pressa.',
    },
    {
      data: '2026-12-01',
      modulo: 'simplesmente-crente',
      capitulo: '9. O ecossistema de Deus',
      topicos: [
        'Disciplinas pessoais (p. 266–269)',
        'Ramos emergentes (p. 269–280)',
      ],
      responsavel: 'Bell',
      foto: 'rua',
      resumo:
        'As disciplinas pessoais no lugar certo: não como motor da vida cristã, mas como o cuidado diário de quem já foi plantado. Encontro prático, com aplicação para começar na mesma semana.',
    },
    {
      data: '2026-12-08',
      modulo: 'simplesmente-crente',
      capitulo: '10. Pare de sonhar e ame o próximo',
      topicos: [
        'Introdução (p. 281–282)',
        'Vá em frente, menina! (p. 282–286)',
        'Pessoas versus projetos (p. 286–288)',
        'Dois tipos de sacrifício (p. 288–294)',
        'Entrando no descanso de Deus (p. 294–296)',
        'Impossível de parar? (p. 296–299)',
      ],
      responsavel: 'Alamo',
      foto: 'vizinhanca',
      resumo:
        'O convite mais direto do livro: parar de sonhar com o impacto que teríamos e amar quem está na nossa frente. Horton separa pessoas de projetos e distingue dois tipos de sacrifício — o que edifica e o que apenas nos consome.',
    },
    {
      data: '2026-12-15',
      modulo: 'simplesmente-crente',
      capitulo: '11. Depois do corriqueiro: antevendo a revolução',
      topicos: [
        'Introdução (p. 301–302)',
        'Não tão bom quanto vai ser (p. 302–304)',
        'O próximo grande evento — não, o verdadeiro acontecimento (p. 304–306)',
        'Se você soubesse que Jesus voltaria amanhã (p. 306–308)',
        'Última chamada: morrer como vocação (p. 308–313)',
      ],
      responsavel: 'Eduardo',
      foto: 'quintal',
      resumo:
        'O encerramento devolve a palavra “revolução” ao seu dono. A verdadeira grande coisa não é o próximo movimento, mas a volta de Cristo — e é ela que dá sentido a uma vida comum, fiel até o fim. Última aula do semestre.',
    },

    /* -------------------------------------------------------------------
     * 2026.1 — A CONSPIRAÇÃO DIVINA (Dallas Willard) — encerrado
     * ---------------------------------------------------------------- */
    {
      data: '2026-01-06',
      modulo: 'conspiracao-divina',
      capitulo: '1. Entrando desde já no tipo eterno de vida',
      topicos: ['Vida no escuro (p. 22–34)'],
      responsavel: 'Eduardo',
      resumo:
        'Willard abre o livro com um diagnóstico incômodo: vivemos num mundo que perdeu a capacidade de enxergar a realidade espiritual, e por isso trata a vida com Deus como assunto particular e sem consequências. A primeira aula estabelece a pergunta que atravessa todo o estudo — o que Jesus realmente ofereceu quando disse que o Reino estava próximo?',
    },
    {
      data: '2026-01-13',
      modulo: 'conspiracao-divina',
      capitulo: '1. Entrando desde já no tipo eterno de vida',
      topicos: ['Mensagem sobre uma realidade diferente (p. 34–46)'],
      responsavel: 'Bell',
      resumo:
        'O evangelho não é uma mensagem sobre como escapar deste mundo, mas o anúncio de uma realidade diferente disponível agora. Aqui o autor distingue a vida eterna como qualidade de vida presente — conhecer a Deus — da ideia reduzida de sobrevivência após a morte.',
    },
    {
      data: '2026-01-20',
      modulo: 'conspiracao-divina',
      capitulo: '1. Entrando desde já no tipo eterno de vida',
      topicos: [
        'Feitos para reinar (p. 46–55)',
        'No meio de muitos reinos (p. 55–61)',
      ],
      responsavel: 'Alamo',
      resumo:
        'Fomos criados para governar — não para dominar pessoas, mas para exercer responsabilidade criativa sobre aquilo que nos foi confiado. Willard mostra que todo ser humano já administra um pequeno reino, e que a questão decisiva é se esse reino está ou não sob o Reino de Deus.',
    },
    {
      data: '2026-01-27',
      modulo: 'conspiracao-divina',
      capitulo: '2. Evangelho de administração de pecados',
      topicos: [
        'O convite diminuído (p. 63–71)',
        'O evangelho de direita (p. 71–80)',
      ],
      responsavel: 'Eduardo',
      resumo:
        'Um dos capítulos mais confrontadores do livro. Quando o evangelho é reduzido à gestão da culpa, ele passa a responder apenas à pergunta “como ser perdoado?” e deixa de responder “como viver?”. O resultado é uma fé que garante o destino final sem transformar o cotidiano.',
    },
    {
      data: '2026-02-03',
      modulo: 'conspiracao-divina',
      capitulo: '2. Evangelho de administração de pecados',
      topicos: [
        'O evangelho de esquerda (p. 80–87)',
        'Rumo à integração de vida e fé (p. 87–92)',
      ],
      responsavel: 'Bell',
      resumo:
        'A crítica agora vira para o outro lado: a fé reduzida a ação social sem transformação interior. Willard recusa os dois atalhos e propõe a integração — uma vida em que crer, ser e agir deixam de ocupar compartimentos separados.',
    },
    {
      data: '2026-02-10',
      modulo: 'conspiracao-divina',
      capitulo: '3. O que Jesus sabia: um mundo impregnado de Deus',
      topicos: [
        'Uma nova perspectiva de Deus e do seu mundo (p. 94–100)',
        'O céu como habitat humano (p. 100–109)',
      ],
      responsavel: 'Alamo',
      resumo:
        'Se Deus está realmente presente e ativo neste mundo, isso muda tudo — inclusive a maneira como oramos, trabalhamos e tomamos decisões. Este encontro recupera a visão bíblica dos “céus” como o espaço imediatamente ao nosso redor, e não como um endereço distante.',
    },
    {
      data: '2026-02-24',
      modulo: 'conspiracao-divina',
      capitulo: '3. O que Jesus sabia: um mundo impregnado de Deus',
      topicos: [
        'Espaço habitado por Deus (p. 109–115)',
        'Todas as coisas visíveis e invisíveis (p. 115–122)',
      ],
      responsavel: 'Eduardo',
      resumo:
        'A realidade é maior do que aquilo que se pode medir. Willard argumenta que a fé cristã não pede que ignoremos o mundo material, mas que paremos de tratá-lo como se fosse tudo o que existe.',
    },
    {
      data: '2026-03-03',
      modulo: 'conspiracao-divina',
      capitulo: '3. O que Jesus sabia: um mundo impregnado de Deus',
      topicos: [
        'A negação da morte (p. 123–128)',
        'Que lado está realmente certo? (p. 128–131)',
        'Jesus: Senhor do intelecto (p. 131–137)',
      ],
      responsavel: 'Bell',
      resumo:
        'Uma afirmação central e frequentemente esquecida: Jesus é a pessoa mais inteligente que já viveu. Reconhecer isso significa deixar de tratar a fé como sentimento privado e passar a confiar em Cristo também naquilo que pensamos sobre a realidade.',
    },
    {
      data: '2026-03-10',
      modulo: 'conspiracao-divina',
      capitulo: '4. Quem é realmente afortunado? — As bem-aventuranças',
      topicos: [
        'O enigma das bem-aventuranças (p. 139–151)',
        'Lidando com a profundidade da alma (p. 151–160)',
      ],
      responsavel: 'Alamo',
      resumo:
        'As bem-aventuranças não são uma lista de virtudes a conquistar, nem um manual de comportamento exemplar. Willard as lê como o anúncio escandaloso de que o Reino está disponível justamente para quem o mundo considera descartável.',
    },
    {
      data: '2026-03-17',
      modulo: 'conspiracao-divina',
      capitulo: '4. Quem é realmente afortunado? — As bem-aventuranças',
      topicos: [
        'O verdadeiro propósito de Jesus com as bem-aventuranças (p. 160–169)',
        'Tornando a mensagem pessoal para nós (p. 169–175)',
      ],
      responsavel: 'Eduardo',
      resumo:
        'Depois de desfazer a leitura moralista, o autor devolve o texto ao ouvinte: quem, hoje, na nossa cidade e na nossa igreja, ocuparia o lugar dos “pobres de espírito”? Um encontro que costuma reposicionar a forma como enxergamos os que estão à margem.',
    },
    {
      data: '2026-03-24',
      modulo: 'conspiracao-divina',
      capitulo: '5. A justiça e o coração do Reino',
      topicos: [
        'Mestre do entendimento moral (p. 177–189)',
        'Lei e alma (p. 189–198)',
      ],
      responsavel: 'Bell',
      resumo:
        '“Se a vossa justiça não exceder a dos escribas e fariseus…” — Jesus não pede mais esforço na mesma direção, mas uma justiça de outra natureza, que nasce do coração e não do cumprimento externo da norma.',
    },
    {
      data: '2026-03-31',
      modulo: 'conspiracao-divina',
      capitulo: '5. A justiça e o coração do Reino',
      topicos: ['No caldeirão da ira e do desprezo (p. 198–212)'],
      responsavel: 'Alamo',
      resumo:
        'Ira e desprezo são tratados por Jesus como parentes próximos do homicídio. Willard mostra por que o desprezo — o gesto de reduzir alguém a nada — é especialmente destrutivo para a comunidade cristã, e o que significa desmontá-lo na prática.',
    },
    {
      data: '2026-04-07',
      modulo: 'conspiracao-divina',
      capitulo: '5. A justiça e o coração do Reino',
      topicos: ['O poder destrutivo do desejo fantasioso (p. 212–229)'],
      responsavel: 'Eduardo',
      resumo:
        'Sobre a concupiscência e a vida da imaginação. O ponto do autor é pastoral e direto: o problema não é o desejo em si, mas o hábito de cultivar mentalmente aquilo que não devemos viver — e o modo como esse hábito corrói o caráter em silêncio.',
    },
    {
      data: '2026-04-14',
      modulo: 'conspiracao-divina',
      capitulo: '5. A justiça e o coração do Reino',
      topicos: [
        'Palavras transparentes e amor inextinguível (p. 230–240)',
        'A bondade é amor (p. 240–244)',
      ],
      responsavel: 'Bell',
      resumo:
        'Falar a verdade sem juramentos, amar sem cálculo de retorno. O encerramento do capítulo mais longo do livro amarra tudo numa tese simples: a justiça do Reino é, no fim, amor em ação.',
    },
    {
      data: '2026-04-21',
      modulo: 'conspiracao-divina',
      capitulo: '6. Investindo nos céus',
      topicos: [
        'Introdução (p. 246–247)',
        'A armadilha da respeitabilidade (p. 247–264)',
      ],
      responsavel: 'Alamo',
      resumo:
        'A religiosidade praticada para ser vista já recebeu sua recompensa. Este encontro expõe como a busca por reputação — inclusive reputação de piedade — esvazia por dentro a vida com Deus.',
    },
    {
      data: '2026-04-28',
      modulo: 'conspiracao-divina',
      capitulo: '6. Investindo nos céus',
      topicos: [
        'A escravidão das riquezas (p. 264–276)',
        'Neste mundo vocês terão aflições (p. 276–277)',
      ],
      responsavel: 'Eduardo',
      resumo:
        'Não se trata de condenar o dinheiro, mas de identificar a ansiedade que ele promete curar e nunca cura. Willard trata a confiança na provisão do Pai como a alternativa concreta — e difícil — à lógica do acúmulo.',
    },
    {
      data: '2026-05-05',
      modulo: 'conspiracao-divina',
      capitulo: '7. A comunidade de amor e oração',
      topicos: [
        'Nenhuma condenação (p. 279–292)',
        'Quando o bom se transforma em algo mortal (p. 293–296)',
        'Petição como a essência da comunhão (p. 297–306)',
      ],
      responsavel: 'Bell',
      resumo:
        'Como uma comunidade deixa de condenar sem deixar de discernir? Willard separa o julgamento que destrói do discernimento que cuida — e mostra que a oração de petição é o que mantém a comunidade humilde diante de Deus.',
    },
    {
      data: '2026-05-12',
      modulo: 'conspiracao-divina',
      capitulo: '7. A comunidade de amor e oração',
      topicos: ['A oração no contexto cósmico (p. 306–324)'],
      responsavel: 'Alamo',
      resumo:
        'Se Deus já sabe de tudo, por que orar? A resposta do autor é que a oração é o meio pelo qual Deus nos faz participantes reais do seu governo — não um ritual de persuasão, mas uma conversa que de fato move a história.',
    },
    {
      data: '2026-05-19',
      modulo: 'conspiracao-divina',
      capitulo: '7. A comunidade de amor e oração',
      topicos: ['A maior oração de todas (p. 325–344)'],
      responsavel: 'Eduardo',
      resumo:
        'Uma leitura frase a frase do Pai Nosso. Vale a pena revisitar este encontro: a oração que a maioria de nós repete de cor é reapresentada como o mapa completo da vida no Reino.',
    },
    {
      data: '2026-05-26',
      modulo: 'conspiracao-divina',
      capitulo: '8. Sobre ser um discípulo de Jesus',
      topicos: [
        'Quem é o nosso mestre? (p. 346–357)',
        'Como ser um discípulo (p. 358–369)',
      ],
      responsavel: 'Bell',
      resumo:
        'Discípulo é aprendiz: alguém que está com Jesus para aprender a viver como ele viveria em seu lugar. Aqui o livro faz sua virada mais prática — do que cremos para como efetivamente se aprende.',
    },
    {
      data: '2026-06-02',
      modulo: 'conspiracao-divina',
      capitulo: '8. Sobre ser um discípulo de Jesus',
      topicos: [
        'Como tornar-se um discípulo (p. 370–379)',
        'Ajudando outros a encontrar seu caminho para o discipulado (p. 379–392)',
      ],
      responsavel: 'Alamo',
      resumo:
        'A crítica de Willard à igreja contemporânea aparece com toda a força: fizemos convertidos sem fazer discípulos. O encontro trata do que muda na vida da comunidade quando o discipulado deixa de ser um programa opcional.',
    },
    {
      data: '2026-06-09',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: [
        'O programa de estudo na Master Class (p. 394–404)',
        'Esclarecendo objetivos (p. 404–407)',
        'Uma mente deslumbrada com Deus (p. 408–412)',
      ],
      responsavel: 'Eduardo',
      resumo:
        'Transformação não acontece por acidente. Willard propõe um currículo — dois objetivos claros, e meios concretos para alcançá-los — para quem quer levar a sério o convite de aprender com Jesus.',
    },
    {
      data: '2026-06-16',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: ['Três áreas indispensáveis de clareza intelectual (p. 412–431)'],
      responsavel: 'Bell',
      resumo:
        'Não basta querer mudar; é preciso enxergar corretamente quem Deus é, quem somos e onde estamos. Este encontro trata das convicções que sustentam — ou sabotam — qualquer tentativa de crescimento espiritual.',
    },
    {
      data: '2026-06-23',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: ['Adquirindo hábitos de bondade (p. 431–445)'],
      responsavel: 'Alamo',
      resumo:
        'Caráter é hábito consolidado. A proposta é substituir a tentativa de “tentar mais” pelo treino inteligente — aquilo que fazemos fora do momento da prova é o que nos sustenta durante a prova.',
    },
    {
      data: '2026-06-30',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: ['Plano de disciplinas para um novo coração (p. 445–459)'],
      responsavel: 'Eduardo',
      resumo:
        'As disciplinas espirituais como treino, e não como mérito: solitude, silêncio, jejum, estudo, serviço. Um dos encontros mais aplicáveis do semestre, com sugestões que dá para começar na mesma semana.',
    },
    {
      data: '2026-07-07',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: [
        'Medidas práticas para alcançar os dois objetivos do currículo (p. 459–462)',
        'Visão geral do progresso: de hoje para a eternidade (p. 462–465)',
        'O currículo e a vida da igreja (p. 465–469)',
      ],
      responsavel: 'Bell',
      resumo:
        'Como uma igreja inteira — e não apenas indivíduos motivados — organiza sua vida em torno da formação de discípulos. Encontro especialmente relevante para quem serve em algum ministério.',
    },
    {
      data: '2026-07-14',
      modulo: 'conspiracao-divina',
      capitulo: '10. A restauração de todas as coisas',
      topicos: [
        'Por que devemos enxergar um futuro (p. 471–493)',
        'Mudanças que virão (p. 494–500)',
      ],
      responsavel: 'Alamo',
      resumo:
        'O livro termina olhando para a frente: a esperança cristã não é fuga do mundo, mas a promessa de que este mundo será restaurado — e de que o trabalho fiel de hoje tem lugar nesse futuro.',
    },
    {
      data: '2026-07-21',
      modulo: 'conspiracao-divina',
      capitulo: 'Aula de conclusão do livro',
      topicos: ['Retrospectiva geral e conversa aberta'],
      responsavel: 'Eduardo',
      resumo:
        'Encerramento do semestre: uma retomada dos fios principais do livro e um espaço aberto para o que ficou pendente, o que incomodou e o que já começou a mudar na prática de cada um.',
    },
  ],
};
