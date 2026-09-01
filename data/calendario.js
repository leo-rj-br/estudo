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
      subtitulo: 'Por uma vida cristã comum',
      autor: 'Michael Horton',
      periodo: '2026 · 2º semestre',
      // Capa do livro (arquivo em assets/img, sem o tamanho e a extensão).
      livro: 'livro-simplesmente-crente',
      // Foto de ambiente, usada quando um encontro não define a sua.
      capa: 'quintal',
      epigrafe:
        'Deus não nos chamou para sermos radicais, revolucionários ou extraordinários. Ele nos chamou para uma fidelidade comum, sustentável, que dura a vida inteira.',
    },
    {
      id: 'conspiracao-divina',
      titulo: 'A Conspiração Divina',
      subtitulo: 'Redescobrindo nossa vida oculta em Deus',
      autor: 'Dallas Willard',
      periodo: '2026 · 1º semestre',
      livro: 'livro-a-conspiracao-divina',
      capa: 'oracao',
      epigrafe:
        'O Reino de Deus não é um lugar para onde se vai depois de morrer, mas o governo real de Deus disponível aqui e agora, para quem quiser aprender a viver nele.',
    },
    {
      id: 'aconselhando-uns-aos-outros',
      titulo: 'Aconselhando uns aos outros',
      subtitulo: '8 maneiras de cultivar relacionamentos saudáveis dentro da igreja',
      autor: 'Edward T. Welch',
      periodo: '2025 · 2º semestre',
      livro: 'livro-aconselhando-uns-aos-outros',
      capa: 'mesa',
      epigrafe:
        'Deus toma a iniciativa e se aproxima de nós; nós tomamos a iniciativa e nos aproximamos de outras pessoas — um ensino simples com incontáveis aplicações.',
    },
    {
      id: 'brecha-em-nossa-santidade',
      titulo: 'A Brecha em Nossa Santidade',
      autor: 'Kevin DeYoung',
      periodo: '2025 · 2º semestre',
      livro: 'livro-brecha-em-nossa-santidade',
      capa: 'travessia',
      epigrafe: 'A brecha em sua santidade é que você não se importa muito com ela.',
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
      responsavel: 'Bel',
      foto: 'montanha',
      video: 'https://youtu.be/txmvDB4Ern0',
      resumo:
        '“Radical. Épico. Revolucionário. Transformador.” Horton abre listando os adjetivos que viraram ruído de fundo na igreja, e cita Rod Dreher: “A mesmice é meu problema. É fácil pensar no que você faria se estourasse uma guerra… Muito mais difícil é saber como vai passar o dia de hoje sem se desesperar.” O alerta da primeira aula é duro: mudar o mundo pode ser justamente a forma de fugir das pessoas reais que Deus colocou à nossa frente — transformadas em “elenco de coadjuvantes para o filme da nossa vida”.',
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
      video: 'https://youtu.be/X8DZCiBS8b8',
      resumo:
        'Horton encara a objeção óbvia: isso não é acomodação disfarçada? Ele separa o ídolo do conforto do contentamento bíblico e conta o caso de um colega de faculdade que se esgotou tentando ser extraordinário até sofrer uma crise nervosa. Daí vem a virada do capítulo: contra o mantra do “tempo de qualidade”, ele defende o tempo de quantidade — apelidos inventados, a pergunta do filho no carro voltando da igreja, toques aparentemente insignificantes. É ali que a maior parte da vida é vivida.',
    },
    {
      data: '2026-08-11',
      modulo: 'simplesmente-crente',
      capitulo: '2. Corriqueiro não é o mesmo que medíocre',
      topicos: ['Introdução (p. 43–44)', 'Excelência distorcida (p. 44–53)'],
      responsavel: 'Eduardo',
      foto: 'mesa',
      video: 'https://youtu.be/xy0rhPH7ooI',
      resumo:
        '“Se as pessoas apreciarem o que é comum, não haveria gente como Steve Jobs, nem Martin Luther King Jr.” Horton antecipa a objeção e responde de frente: comum não é medíocre, e o livro não pede para fazer menos. Com Agostinho — o pecado como estar virado para dentro de si mesmo — ele mostra que excelência sem um objeto digno é inútil; ela só se sustenta no “glorificar a Deus e gozá-lo para sempre” do Breve Catecismo de Westminster.',
    },
    {
      data: '2026-08-18',
      modulo: 'simplesmente-crente',
      capitulo: '2. Corriqueiro não é o mesmo que medíocre',
      topicos: [
        'Excelência versus perfeccionismo (p. 53–59)',
        'Chamado à ação (p. 59–68)',
      ],
      responsavel: 'Bel',
      foto: 'mesa',
      video: 'https://youtu.be/JZihXB5ZuTo',
      resumo:
        'Dois perfeccionismos, e os dois adoecem. O aspirante se fecha e desiste quando falta aprovação; o iludido se intoxica com a ilusão da autojustiça quando o sucesso vem. Ambos vivem do aplauso de outros pecadores em vez da justificação em Cristo. Na segunda metade, o chamado à ação: “corriqueiro” não quer dizer passivo, mas o ativismo não perdoa pecados nem ressuscita mortos — quem faz isso é o evangelho (Rm 1.16).',
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
      video: 'https://www.youtube.com/watch?v=XYeKGqlg9oQ',
      resumo:
        '“Agora somos todos adolescentes. Quando é que vamos crescer?” Com Thomas Bergler, Horton conta como as igrejas criaram grupos de jovens, depois cederam a eles e por fim viraram eles. Contra isso, Efésios 4: crescer até “não mais sermos como meninos, agitados de um lado para outro”. E a lógica pactual — Atos 2.39, a Páscoa de Êxodo 12 — em que os mais velhos entregam aos mais novos aquilo que viram e ouviram.',
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
        'Por trás do culto à experiência imediata mora um niilismo: “comamos e bebamos, que amanhã morreremos”. Horton contrapõe o catecismo de Nietzsche ao de Agostinho e expõe a contradição que nos parte ao meio: exigimos autonomia total e ao mesmo tempo ansiamos por comunidade — e não dá para ter as duas. Daí a imagem que ficou do livro: vivemos numa era de jet-ski, deslizando pela superfície de muita coisa, quando o que forma alguém é mergulhar fundo.',
    },
    {
      data: '2026-09-08',
      modulo: 'simplesmente-crente',
      capitulo: '4. A próxima grande coisa',
      topicos: [
        'Introdução (p. 101–106)',
        'A próxima grande coisa é uma tradição (p. 106–112)',
      ],
      responsavel: 'Bel',
      foto: 'transito',
      resumo:
        'Setembro de 2003: a revista Adbusters lança seu próprio tênis “subversivo”. Dali em diante, diz Horton, ficou claro que a rebeldia não ameaça o sistema — ela é o sistema. E vem a ironia que dá nome ao capítulo: criado num meio que se julgava sem tradição, ele mostra que a corrida pela Próxima Grande Coisa é, ela mesma, uma tradição antiga, herdada do avivamentismo norte-americano.',
    },
    {
      data: '2026-09-15',
      modulo: 'simplesmente-crente',
      capitulo: '4. A próxima grande coisa',
      topicos: ['Ansiando por avivamento (p. 112–122)'],
      responsavel: 'Alamo',
      foto: 'transito',
      resumo:
        'Há duas maneiras de entender o avivamento. A de Edwards: uma “surpreendente obra de Deus”, bênção extraordinária sobre os seus meios ordinários de graça. E a de Finney: algo sob nosso controle, que se produz com os passos certos. Horton mostra que a segunda é uma abordagem tecnológica da religião — se até Deus obedece a causa e efeito, o culto vira técnica. Encontro desconfortável, e dos mais esclarecedores do semestre.',
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
        'A alternativa que Horton propõe: nutrição pactual — crescimento lento na mesma direção, em vez de picos no gráfico. E a pergunta que dá título à seção, “como foi a igreja hoje?”, que nossos antepassados não entenderiam, porque ninguém pergunta como foram as refeições da semana. O ponto é que no culto comum acontece algo nada comum: quem está presente é Deus, que julga, justifica, lava e alimenta pelos meios que prometeu usar.',
    },
    {
      data: '2026-09-29',
      modulo: 'simplesmente-crente',
      capitulo: '5. Ambição: como um vício se tornou uma virtude',
      topicos: ['Introdução (p. 132–134)', 'Ambição na Escritura (p. 134–141)'],
      responsavel: 'Bel',
      foto: 'multidao',
      resumo:
        'Palavras trocam de valor com o tempo: “inquieto” já significou instável e pouco confiável. Com a ambição foi igual — virou virtude. Horton volta ao grego eritheia, lembra que os filósofos tinham a humildade como postura de escravo, e mostra em Filipenses 2 a “completa revolução moral” que muda tudo: onde a humanidade sobe em ambição, Deus desce em humildade.',
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
        'Ícaro, na versão de Ovídio: as asas de cera derretem porque o filho quis subir até o sol, além do curso do pai. Horton usa a lenda para dizer o que a Escritura não permite negociar — a ambição egoísta não é um impulso que se canalize para o bem; está no coração do velho homem, que precisa morrer e ressuscitar em Cristo. Não é maquiagem. E a tragédia maior é que as igrejas ajudaram a promover a troca.',
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
        'Paulo diante dos “superapóstolos” de Corinto, e os discípulos discutindo qual deles era o maior — ao que Jesus responde: “o maior entre vós seja como o menor” (Lc 22.24-27). Horton mostra que a idolatria de líderes é antiga e cara. Hebreus 13.7 manda imitar a fé deles, não a personalidade; Jerônimo e Ambrósio lembravam que os presbíteros eram “todos iguais”; e Gregório Magno se ofendeu ao ser chamado de “papa universal”.',
    },
    {
      data: '2026-10-20',
      modulo: 'simplesmente-crente',
      capitulo: '6. Praticar o que pregamos: não temos mais superapóstolos',
      topicos: [
        'Submeter versus reinar em ambição (p. 171–179)',
        '“Não temais, pequeno rebanho” (p. 180–182)',
      ],
      responsavel: 'Bel',
      foto: 'travessia',
      resumo:
        '“Trata-se do ministério, não do ministro.” Pastores vêm e vão, e são iguais e mutuamente responsáveis: a igreja é de Cristo, que governa por sua Palavra através de homens falíveis. O capítulo fecha tirando um peso das costas — “Eu edificarei a minha igreja” (Mt 16.18). Não é o seu ministério, sua igreja, seu povo. Encontro especialmente bom para quem serve em algum ministério e anda cansado.',
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
        'A cura para a ambição inquieta é o contentamento — e Horton pega emprestado o vocabulário da ecologia: fé sustentável é a que não consome os próprios recursos. Com os dados de Tim Kasser (a renda por pessoa nos EUA dobrou desde 1957, enquanto a fatia dos que se dizem muito felizes caiu de 35% para 29%), ele expõe a ganância como irmã gêmea da ambição. A virada do capítulo é a distinção entre contrato e pacto: tratar o casamento — ou Deus — como contrato é tratar o outro como prestador de serviço.',
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
        '“Deus é um estranho economista, pelo menos segundo os nossos padrões.” O contentamento se desdobra em três direções: com Cristo e seu reino, com o modo comum como Deus sustenta a criação e com o modo comum como ele salva. O argumento decisivo é a encarnação — o Espírito operando por meios criaturais — e a resposta de Maria, “que se cumpra em mim conforme a tua palavra”, como retrato do ordinário que Deus escolheu para si.',
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
      responsavel: 'Bel',
      foto: 'oracao',
      resumo:
        'Horton começa discordando do próprio título: heróis são necessários, mas a coisa foi longe demais — e Cristo acaba reduzido a Herói Máximo, quando é muito mais que isso por nós. O capítulo questiona a linguagem de “transformar a cultura”, faz um balanço franco do fracasso da Direita Cristã e propõe a troca: serviço por amor, dentro do chamado comum que já temos. Encontro importante para quem trabalha, estuda ou cria.',
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
        '“Amar o próximo é mais difícil do que amar as causas.” É fácil transformar pessoas em atores coadjuvantes do filme da nossa vida; amar o vizinho concreto, todo dia, é bem mais corriqueiro e bem mais duro. Horton lembra 1Coríntios 1.26 — Deus escolheu as coisas loucas e fracas — e dá exemplos que não abalam o mundo: a mãe que decide levar a filha ao médico, a história antes de dormir, a ronda do enfermeiro, os trabalhos que o professor corrige.',
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
        'Cada tradição imagina o Reino à sua maneira: escada, mosteiro, escola, mercado. Deus o imagina como jardim. E jardim não tem atalho — solo profundo, mato arrancado, poda, e um Mestre da Vinha que não quebra o ramo ferido (Is 42.3). O sábado entra como o “cinturão verde” que protege esse tempo do cultivo predatório, e o capítulo fecha com uma fórmula prática: reduzir as distrações, reutilizar o que Deus já nos deu, reciclar.',
    },
    {
      data: '2026-12-01',
      modulo: 'simplesmente-crente',
      capitulo: '9. O ecossistema de Deus',
      topicos: [
        'Disciplinas pessoais (p. 266–269)',
        'Ramos emergentes (p. 269–280)',
      ],
      responsavel: 'Bel',
      foto: 'rua',
      resumo:
        'A igreja antiga cresceu contra todos os prognósticos por meio da catequese: instrução paciente, em perguntas e respostas, que os novos aprendiam e os mais velhos aprofundavam. Horton cita Packer e Parrett — “jamais nos movemos saindo do Evangelho; vamos em frente para o Evangelho”. Depois trata dos filhos como ramos emergentes, num contraste que incomoda: o mercado sabe muito bem quanto vale formar alguém desde cedo.',
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
        '“Vocês não vão mudar o mundo, portanto nem tentem” — a provocação de um discurso de formatura abre o capítulo mais direto do livro. Horton separa pessoas de projetos com uma pergunta que fica: será que gostamos do nosso vizinho? É bem mais fácil servi-lo do que ter prazer nele. Depois distingue os dois sacrifícios do Antigo Testamento, ação de graças e culpa, para mostrar que o Dia do Senhor é receber um reino — não construí-lo.',
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
        '“A Próxima Grande Coisa é a volta de Cristo.” O livro devolve a palavra revolução ao seu dono: nenhuma proclamação é mais radical quanto à miséria humana, nem mais alegre quanto a um cosmos inteiramente renovado (Ap 21.5). E responde à velha pergunta da igreja em que Horton cresceu — o que você faria se Jesus voltasse amanhã? — com a macieira atribuída a Lutero e com a última vocação de todas: morrer bem. Encerramento do semestre.',
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
      video: 'https://drive.google.com/file/d/1ZTGZ5Ox5q0GoqwFd0BGA03T0uI48tHRY/view?usp=sharing',
      resumo:
        'Willard abre o livro com um diagnóstico incômodo: vivemos num mundo que perdeu a capacidade de enxergar a realidade espiritual, e por isso trata a vida com Deus como assunto particular e sem consequências. A primeira aula estabelece a pergunta que atravessa todo o estudo — o que Jesus realmente ofereceu quando disse que o Reino estava próximo?',
    },
    {
      data: '2026-01-13',
      modulo: 'conspiracao-divina',
      capitulo: '1. Entrando desde já no tipo eterno de vida',
      topicos: ['Mensagem sobre uma realidade diferente (p. 34–46)'],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1gBSmSKOcdGL93kN4O4_ijdqloBy9hhQ6/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1pcyueQSD9YeDf5aXQk-vWb3j--pHbk7t/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1gHPzafXt1seM1OWO0ruPXSWipvl-MG4M/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1H_W63Y57pMb8KZmBGOJlmRNWd9ks5WkI/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1pZYu2SAEnNcEm4cxQejt66mpqq2XDI2J/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1Zl-L0aVB4S4w0w0URFSJjBtdI8RWrrFF/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1pY1ajzRyXFCgYF-xWf9MtOdes6hLVrLk/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1fwXpUh8jWKJPs-nPnGQD5jKrJAoqkhGN/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1KZIO9g6un1XzRJSTQ9zQuSCQCaS58Ztm/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1D4GwnVVLSJ4qfhzatyws6bJEgf_B9-Gk/view?usp=sharing',
      resumo:
        '“Se a vossa justiça não exceder a dos escribas e fariseus…” — Jesus não pede mais esforço na mesma direção, mas uma justiça de outra natureza, que nasce do coração e não do cumprimento externo da norma.',
    },
    {
      data: '2026-03-31',
      modulo: 'conspiracao-divina',
      capitulo: '5. A justiça e o coração do Reino',
      topicos: ['No caldeirão da ira e do desprezo (p. 198–212)'],
      responsavel: 'Alamo',
      video: 'https://drive.google.com/file/d/1qNwj0-Ghbi41niNhV_Ob9aVraw5pij4r/view?usp=sharing',
      resumo:
        'Ira e desprezo são tratados por Jesus como parentes próximos do homicídio. Willard mostra por que o desprezo — o gesto de reduzir alguém a nada — é especialmente destrutivo para a comunidade cristã, e o que significa desmontá-lo na prática.',
    },
    {
      data: '2026-04-07',
      modulo: 'conspiracao-divina',
      capitulo: '5. A justiça e o coração do Reino',
      topicos: ['O poder destrutivo do desejo fantasioso (p. 212–229)'],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1J8qbbAggSWnyWMh7r9kRRRGsnqwdT02y/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1-bNV9ZgoWLsSCd7pYxp0hjQlgp14RS7Q/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1dhe9eXBm-8X2GatlPRMsqBWU98ouxwgr/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/16NSs1SyXxyrjf3BdxP89v0Px4RqAiPNH/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1zhdq1wdIMJcXtuE-03Rf_ZyflGQGHKDw/view?usp=sharing',
      resumo:
        'Como uma comunidade deixa de condenar sem deixar de discernir? Willard separa o julgamento que destrói do discernimento que cuida — e mostra que a oração de petição é o que mantém a comunidade humilde diante de Deus.',
    },
    {
      data: '2026-05-12',
      modulo: 'conspiracao-divina',
      capitulo: '7. A comunidade de amor e oração',
      topicos: ['A oração no contexto cósmico (p. 306–324)'],
      responsavel: 'Alamo',
      video: 'https://drive.google.com/file/d/10FIOwbcrZDnQlfjwrynjL_a9dyxyv2Wh/view?usp=sharing',
      resumo:
        'Se Deus já sabe de tudo, por que orar? A resposta do autor é que a oração é o meio pelo qual Deus nos faz participantes reais do seu governo — não um ritual de persuasão, mas uma conversa que de fato move a história.',
    },
    {
      data: '2026-05-19',
      modulo: 'conspiracao-divina',
      capitulo: '7. A comunidade de amor e oração',
      topicos: ['A maior oração de todas (p. 325–344)'],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1kICjIRNie3s3XooaARGKkZ9pvmBIndXN/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1cDOPj5i-Lb8PSMjJ9qX4uZfkw7TzTFUS/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1gcGuQr2voZYHuRjKUaGKBXY4PkBmMlNG/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1fGCWWzmjAfi3ec8J4tuU6q2xevmvT-T0/view?usp=sharing',
      resumo:
        'Transformação não acontece por acidente. Willard propõe um currículo — dois objetivos claros, e meios concretos para alcançá-los — para quem quer levar a sério o convite de aprender com Jesus.',
    },
    {
      data: '2026-06-16',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: ['Três áreas indispensáveis de clareza intelectual (p. 412–431)'],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1ls8KTE24vbx4J_PUd1onNyfYfkRT8tL_/view?usp=sharing',
      resumo:
        'Não basta querer mudar; é preciso enxergar corretamente quem Deus é, quem somos e onde estamos. Este encontro trata das convicções que sustentam — ou sabotam — qualquer tentativa de crescimento espiritual.',
    },
    {
      data: '2026-06-23',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: ['Adquirindo hábitos de bondade (p. 431–445)'],
      responsavel: 'Alamo',
      video: 'https://drive.google.com/file/d/1cBGWqAZs8WHain2XzdS_FhRDUTgO-TjI/view?usp=sharing',
      resumo:
        'Caráter é hábito consolidado. A proposta é substituir a tentativa de “tentar mais” pelo treino inteligente — aquilo que fazemos fora do momento da prova é o que nos sustenta durante a prova.',
    },
    {
      data: '2026-06-30',
      modulo: 'conspiracao-divina',
      capitulo: '9. Um currículo para a imitação de Cristo',
      topicos: ['Plano de disciplinas para um novo coração (p. 445–459)'],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1tvpDV0MCLUDPs0Qwh9BjC8NePWTt1g6Z/view?usp=sharing',
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
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1lMBqyaVxkDKZcICL637SZTFGXfc48sVy/view?usp=sharing',
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
      video: 'https://drive.google.com/file/d/1IRZrLBRhUUJpW5OEybi_OjT9F7XGS-7_/view?usp=sharing',
      resumo:
        'O livro termina olhando para a frente: a esperança cristã não é fuga do mundo, mas a promessa de que este mundo será restaurado — e de que o trabalho fiel de hoje tem lugar nesse futuro.',
    },
    {
      data: '2026-07-21',
      modulo: 'conspiracao-divina',
      capitulo: 'Aula de conclusão do livro',
      topicos: ['Retrospectiva geral e conversa aberta'],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1PW3Wh8fMO2LNOElGmUaV_MzdG7kLTxuA/view?usp=sharing',
      resumo:
        'Encerramento do semestre: uma retomada dos fios principais do livro e um espaço aberto para o que ficou pendente, o que incomodou e o que já começou a mudar na prática de cada um.',
    },
    {
      data: '2025-11-04',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '1. Com toda a humildade',
      topicos: [
        'Nossa necessidade de cuidado',
        'Humildade como base da comunidade (Ef 4.1-3)',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1g3-BBfpG305jeYaLml3Ype2yX-ogeAsG/view?usp=sharing',
      resumo:
        'O cuidado uns dos outros começa pela humildade de admitir a própria necessidade de cuidado — por isso a primeira prática sugerida é simplesmente pedir que orem por nós. Paulo ora por esse tipo de comunidade em Efésios 3 e ensina como alcançá-la: "com toda a humildade e mansidão... suportando-vos uns aos outros em amor" (Ef 4.1-3).',
    },
    {
      data: '2025-11-11',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '2. Aproxime-se das pessoas',
      topicos: [
        'Deus se aproxima primeiro (Ez 34.11; Jo 4)',
        'A parábola da ovelha perdida (Lc 15.4-6)',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1EchufBk8zW6QJPPj_VcXcmvpHeCVYnT1/view?usp=sharing',
      resumo:
        'Deus sempre dá o primeiro passo — busca as ovelhas perdidas (Ez 34.11), vai ao encontro da mulher samaritana (Jo 4) e sai à procura de quem se desgarrou (Lc 15.4-6). Por isso também nos aproximamos uns dos outros: reis recebem visitas, mas o Rei Jesus é quem vai até nós.',
    },
    {
      data: '2025-11-18',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '3. Conheça o coração',
      topicos: [
        'Além da conversa trivial',
        'O coração como raízes, águas profundas e tesouro (Jr 17.5-8; Pv 20.5; Mt 6.20)',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1kLvVZF48YlKFOAV-LhEmuHSCtbfMUyzm/view?usp=sharing',
      resumo:
        'Conhecer alguém de verdade exige ir além dos cumprimentos de praxe e chegar ao domínio do coração — comparado às raízes de uma árvore (Jr 17.5-8), a águas profundas (Pv 20.5) e a um tesouro a ser buscado (Mt 6.20). É um terreno vasto, que pede tempo e confiança para ser revelado.',
    },
    {
      data: '2025-11-25',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '4. Conheça as influências decisivas',
      topicos: [
        'O diagrama do coração e o mundo ao redor',
        'O impacto de outras pessoas e do corpo',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/10zwRb6_cPOc-yHY3qQma8gXndKmhQENA/view?usp=sharing',
      resumo:
        'Para ajudar sabiamente é preciso conhecer não só o coração, mas o que mais o influencia — sobretudo as outras pessoas e o próprio corpo. Um diagrama de setas em dois sentidos mostra mundo e coração em constante transação, com Deus acima e no meio de tudo.',
    },
    {
      data: '2025-12-02',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '5. Seja pessoal e ore',
      topicos: [
        'Ser pessoal como Deus é pessoal',
        'Oração como habilidade a dominar',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/19uResDrbdMX7Z4k9270SXwngLckUn6eW/view?usp=sharing',
      resumo:
        'A ajuda de verdade raramente vem de grandes insights, mas do envolvimento pessoal, do foco em Cristo e da oração. Ser pessoal significa imitar o próprio Deus, que se aproxima, fala, ouve e se deixa influenciar pelo que dizemos.',
    },
    {
      data: '2025-12-09',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '6. Converse sobre sofrimento',
      topicos: [
        'A narrativa do êxodo como história-mestra',
        'Aflições são únicas, mas todas doloridas',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1iTaMvhCVYqOCM6P9dTJLBzrORO3jg5Z_/view?usp=sharing',
      resumo:
        'Como a Escritura fala de sofrimento em quase cada página, a narrativa do êxodo — a compaixão de Deus ouvindo o clamor do povo (Êx 2.23-24) — serve de história-mestra para conversar sobre aflição. Toda aflição é única, mas todas compartilham a mesma dor, o que explica por que um único salmo consegue falar de tantas tribulações diferentes.',
    },
    {
      data: '2025-12-16',
      modulo: 'aconselhando-uns-aos-outros',
      capitulo: '7. Converse sobre pecado / 8. Lembre-se e reflita',
      topicos: [
        'Falar do que há de bom antes do pecado (1Co 1.4-7)',
        'Retomada de Efésios 4.1-3 e 4.11-14',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/15gyGI8ruml1h1cf9dKn8bAdqP8q5FJGH/view?usp=sharing',
      resumo:
        'Conversar sobre pecado pede a mesma cautela que conversar sobre sofrimento: primeiro se reconhece o que há de bom, como Paulo faz antes de tratar dos pecados graves da igreja de Corinto (1Co 1.4-7). O livro se encerra retomando Efésios 4 — o chamado a "desempenhar o serviço" de uns para com os outros, com toda a humildade, um passo de cada vez, até a edificação de todo o corpo de Cristo.',
    },
    {
      data: '2025-08-26',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '1. Preocupe-se com o vazio',
      topicos: [
        '"Santidade é o novo camping" (a metáfora do título)',
        'A diferença entre moralismo e evangelho que transforma',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1Z2tW7tAW2kIN5NFJHHmJQv_j3KqrZlUx/view?usp=sharing',
      resumo:
        'O título do livro nasce de uma imagem: santidade virou "o novo camping" — algo bom para os outros, mas que não é bem a sua praia. A brecha não é falta de discurso sobre pecado (há moralismo sobrando), mas a falta de uma exortação apaixonada e movida pelo evangelho para buscar a santidade.',
    },
    {
      data: '2025-09-02',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '2. O que motivou a redenção',
      topicos: [
        'Por que Deus nos salvou, além do amor e do louvor (Ef 1)',
        'A condição humana antes da graça (Ef 2.1-3; Rm 5.12-21)',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/105U4cF-p_g6p1peTwEs_bkbGZ2xeT6Jg/view?usp=sharing',
      resumo:
        'Por que Deus nos salvou? Além de nos amar (Jo 3.16) e buscar louvor ao seu nome (Ef 1.6,12,14), Efésios 1 revela um terceiro motivo, tão bíblico quanto os outros: Deus te salvou para que você fosse santo.',
    },
    {
      data: '2025-09-09',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '3. O padrão da piedade',
      topicos: [
        'Santidade como separação (Lv 11.44-45; 1Pe 1.15-16)',
        '"Já, mas ainda crescendo"',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1mKecd6mi5Q2bMoTU-9K9wXvaMIEikF60/view?usp=sharing',
      resumo:
        'Santidade, no sentido mais básico, significa separação — a palavra aparece mais de 600 vezes na Bíblia. Somos chamados a ser santos porque Deus é santo (Lv 11.44-45; 1Pe 1.15-16): já santos em Cristo, mas ainda em processo de crescer nisso.',
    },
    {
      data: '2025-09-16',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '4. Impetuosidade para com os imperativos',
      topicos: [
        'A lei como presente, não como fardo (C.S. Lewis, Reflections on the Psalms)',
        'O atalho que sai caro: obedecer é a rota mais rápida',
      ],
      responsavel: 'Joventine',
      video: 'https://drive.google.com/file/d/1dJev8r5nNJYADQLa-3dp9kLGBG99bHap/view?usp=sharing',
      resumo:
        'Assim como um atalho lamacento numa corrida acaba sendo mais lento que o caminho certo, os mandamentos de Deus não são um freio à liberdade, mas um presente que ajuda a correr até o fim. C. S. Lewis descreveu o deleite do salmista na lei como o deleite de sentir o asfalto firme debaixo dos pés depois de se enredar num atalho lamacento.',
    },
    {
      data: '2025-09-23',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '5. O prazer de Deus e a possibilidade de piedade',
      topicos: [
        'Os padrões de 1 Timóteo 3 e Tito 1: metas, não perfeição',
        'Deus se agrada da obediência imperfeita',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1gDon31dIJz_TUprfm3x-rG3S-Asun_pk/view?usp=sharing',
      resumo:
        'Nenhum presbítero — nem John MacArthur, nem Billy Graham — cumpre à risca os padrões de liderança de 1 Timóteo 3 e Tito 1. Mas isso não significa que a piedade seja inatingível: Paulo esperava exemplos reais, não uma perfeição messiânica, e Deus se agrada da obediência ainda imperfeita.',
    },
    {
      data: '2025-09-30',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '6. Empenho energizado pelo Espírito, impelido pelo evangelho e abastecido pela fé',
      topicos: [
        'Contra os clichês espirituais vazios',
        'John Owen: santidade por força própria é "a alma de toda falsa religião"',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1lGqkQjYfqVJ-fg81HCJu8eRuPN40ClC2/view?usp=sharing',
      resumo:
        'As entrevistas esportivas de após-jogo, cheias de clichês vazios, servem de espelho para conselhos espirituais igualmente genéricos — "entregue tudo a Deus", mas como? Citando John Owen, para quem buscar santidade pela própria força é "a alma de toda falsa religião", o capítulo defende uma santificação que Deus opera em nós à medida que colocamos a salvação em ação (Fl 2.12-13; 1Pe 4.11).',
    },
    {
      data: '2025-10-07',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '7. Seja quem você é',
      topicos: [
        'A troca de uma preposição: de "com" Jesus para "em" Jesus',
        'União com Cristo como base da semelhança com Cristo',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1_ru6YnQiyhIwwNj68oI5OOOX1gNeNf9G/view?usp=sharing',
      resumo:
        'Quando seu filho de cinco anos disse, admirado, "só o senhor e Jesus conseguem fazer isso", DeYoung percebe que uma única preposição trocada vira TNT teológica: não é ser como Jesus operando "com" ele, mas a partir de estar "em" Jesus. A semelhança com Cristo só é possível a partir da união com Cristo.',
    },
    {
      data: '2025-10-14',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '8. Os santos e a imoralidade sexual',
      topicos: [
        'Não humilhar, mas encorajar no caminho de Deus',
        'Padrões que valem para dentro da igreja, não só "lá fora"',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/10Uwf9vqjpuB1tpQQrH0Wt1EheMmfMClk/view?usp=sharing',
      resumo:
        'Ao contrário do tom de humilhação comum quando se fala de santidade, o capítulo diz que seu propósito não é afundar ninguém, mas encorajar. E o assunto não é a cultura sexualizada "lá fora", mas como nós, cristãos, de fato estamos vivendo.',
    },
    {
      data: '2025-10-21',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '9. Permanecer e obedecer',
      topicos: [
        'Buscar uma Pessoa, não uma coisa',
        'União (irrevogável) e comunhão (variável) com Cristo — a analogia do casamento',
      ],
      responsavel: 'Bel',
      video: 'https://drive.google.com/file/d/1DLoBrXKwUgVdiwPMNU6PWs1wg2ovDJGR/view?usp=sharing',
      resumo:
        'Buscar santidade não é ir atrás de uma coisa, mas de uma Pessoa — o Santo em quem fomos declarados santos. O capítulo distingue união com Cristo, irrevogável como um casamento, de comunhão com Cristo, que pode esfriar com o pecado, ainda que a união permaneça intacta.',
    },
    {
      data: '2025-10-28',
      modulo: 'brecha-em-nossa-santidade',
      capitulo: '10. Que todos vejam o seu progresso',
      topicos: [
        '1 Timóteo 4.15-16: exemplo e progresso, não perfeição',
        'Encerramento: santidade como caminhada, não linha de chegada',
      ],
      responsavel: 'Eduardo',
      video: 'https://drive.google.com/file/d/1dPNWaTvVeWyNvQqClkPUToJfMvbh77bk/view?usp=sharing',
      resumo:
        '1 Timóteo 4.15 pede a Timóteo que seja exemplo "para que todos vejam o seu progresso" — não perfeição imediata, mas progresso visível. Passagem que DeYoung descreve como fonte tanto de consolo quanto de leve desânimo: fecha o livro lembrando que a santidade é caminhada, não linha de chegada.',
    },
  ],
};
