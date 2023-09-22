
// element selectors
var scoreDisplay = document.querySelector("#custom-score");
var timerDisplay = document.querySelector("#custom-timer");
var titleDisplay = document.querySelector("#custom-header");
var startButton = document.querySelector("#start-button");
var scoreButton = document.querySelector("#score-button");
var questionDisplay = document.querySelector("#question-display");
var quizQuestion = document.querySelector("#quiz-question");
var quizCode = document.querySelector("#quiz-code");
var answerOne = document.querySelector("#answer1");
var answerTwo = document.querySelector("#answer2");
var answerThree = document.querySelector("#answer3");
var answerFour = document.querySelector("#answer4");
var gameOverDisplay = document.querySelector("#game-over");
var gameOverOverlay = document.querySelector("#overlay-background");
var gameOverScore = document.querySelector("#game-over-score");
var gameOverSplash = document.querySelector("#game-over-splash");
var userNameForm = document.querySelector("#name-form");
var userName = document.querySelector("#userName");
var HighScoreList = document.querySelector("#score-list");
var dynamicList = document.querySelector("#dynamic-list");
var submitBtn = document.querySelector("#submit-btn");
var letsGoAgain = document.querySelector("#go-again");
var clearHighScores = document.querySelector("#clear-scores");
var retakeQuiz = document.querySelector("#retake-quiz");
var footer = document.querySelector("#footer");

var timerInterval; // make interval global
var currentTime = 300; //  start with a minute on the clock
var score = 0; // score start
var currentQuestion = 0; // keep adding to it to access others in the quiz Index
var questionTimeLeft = 20;
var multiplicadorDePontos = 20;
var scoreList = []; // empty score list

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

var quizQuestionsArray = [
    {
        question: "TV digital, enciclopédias digitais e simuladores interativos são de qual tipo de interface?",
        answers: [
            "Móvel",
            "Gráfica",
            "Multimídia",
            "Multimodal"
            
            
        ],
        optrue:  "Multimídia",
        code: "",
    },
    {
        question: "Qual é a principal característica da interface do tipo multimídia?",
        answers: [
          "Combina diferentes meios de comunicação dentro de uma única interface",
          "Permite que o usuário veja padrões e tendências para obter uma melhor compreensão",
          "Permite que o usuário veja anomalias e erros para poder corrigi-los",
          "Inclui as interfaces de máquina e dispositivos físicos usados em casa",
          
        ],
        optrue:  "Combina diferentes meios de comunicação dentro de uma única interface",
        code: "",
    },
    {
      question: "São exemplos de eletrônicos de consumo e eletrodomésticos:",
      answers: [
        "Vassouras, microondas, sofás",
        "Pás, armários, ventiladores",
        "Criados-mudos, pendrives, nichos",
        "Controles remotos, geladeiras, máquinas de lavar"
      ],
      optrue: "Controles remotos, geladeiras, máquinas de lavar",
      code: "",
    },
    {
        question: "Qual é a principal característica da interface Touch?",
        answers: [
            
            "Captura feita através de sensores de movimentos e profundidade",
            "Detecção da presença e localização de uma pessoa pelo toque na tela, bem como a opção seleiconada (caixas eletrônicos, smartphones, tablets)",
            "Sensibilidade ao tato",
            "Utilização de diferentes modalidades de interação: tatos, visão, som, fala"
        ],
        optrue: "Sensibilidade ao tato",
        code: "",
    },
    {
        question: "A Siri se encaixa em qual tipo de interface?",
        answers: [
            "Móvel",
            "Fala",
            "Menu Interativo",
            "Multimodal"
            
        ],
        optrue: "Fala",
        code: "",
    },
    {
        question: "Pokemon Go se encaixa em qual tipo de interface?",
        answers: [
            "Realidade Virtual",
            "Realidade aumentada e mista",
            "Multiusuário",
            "Inteligência Artificial"
            
        ],
        optrue: "Realidade aumentada e mista",
        code: "",
    },
    {
        question: "Qual dessas peças é responsável pelo armazenamento de dados da máquina?",
        answers: [
            "Hard Disk (HD)",
            "Memória RAM",
            "Placa-Mãe (MB)",
            "Processador (CPU)",
           
        ],
        optrue: "Hard Disk (HD)",
        code:"",
    },
    {
        question: "Os hardwares podem se dividir em 4 categorias, sendo elas:",
        answers: [
            "Dispositivos de entrada, Dispositivos de saída, Dispositivos de captura, Dispositivos de imagem",
            "Dispositivos internos, Dispositivos de saída",
            "Dispositivos de armazenamento secundário, Componentes internos, Dispositivos de saída, Dispositivos de entrada",
            "Dispositivos de som, Dispositivos de texto, Dispositivos de imagem, Dispositivos de movimento"
        ],
        optrue: "Dispositivos de entrada, Dispositivos de saída, Dispositivos de captura, Dispositivos de imagem",
        code:"",
    },
    {
        question: "Na informática, existe um sistema de medidas que é medido em números e letras. Baseando-se nessa afirmação, qual das alternativas representa uma dessas medidas?",
        answers: [
            "10KG",
            "A4",
            "U2",
            "1GB"
        ],
        optrue: "1GB",
        code:"",
    },
    {
        question: "Qual desses Sistemas Operacionais é pertencente à Microsoft?",
        answers: [
            "Windows",
            "Mac",
            "Ubuntu",
            "Android"
        ],
        optrue: "Windows",
        code: "",
    },
    {
        question: "Qual destas senhas é a mais frequentemente utilizada na internet, sendo também a primeira na lista rockyou.txt?",
        answers: [
            "a1b2c3",
            "654321",
            "abcdef",
            "123456"
        ],
        optrue: "123456",
        code: "",
    },
    {
        question: "A sigla DTI quer dizer:",
        answers: [
            "Departamento de Tecnologia de Inteligência",
            "Departamento de Traição Intelectual",
            "Departamento de Tecnologia da Informação",
            "Departamento de Tráfego de Informação",
            
        ],
        optrue: "Departamento de Tecnologia da Informação",
        code: "",
    },
    {
        question: "O que são dados, no contexto da informática?",
        answers: [
            "São as partes de programas",
            "São resquícios de arquivos corrompidos",
            "São informações desencontradas",
            "São testes de intrusão invasores"
        ],
        optrue: "São as partes de programas",
        code: "",
    },
    {
        question: "Na falta de qual destes componentes, você não consegue utilizar um computador?",
        answers: [
            "Teclado",
            "Caixas de Som",
            "Placa-Mãe",
            "Cabo de Força"
        ],
        optrue: "Cabo de Força",
        code: "",
    },
    {
        question: "Ѕãо exemplos de Hardware, somente:",
        answers: [
            "Placa de Vídeo, Word e Paint",
            "Monitor, Excel, Cabo de Força",
            "Memória, Leitor de Código de Barras e Placa de Rede",
            "MSDos, Thinclient, Word"
        ],
        optrue: "Memória, Leitor de Código de Barras e Placa de Rede",
        code: "",
    },
    {
        question: "É o principal componente de um computador:",
        answers: [
            "Memória",
            "Processador",
            "Monitor",
            "Usuário"
        ],
        optrue: "Processador",
        code: "",
    },
    {
        question: "O que significa a sigla “WWW” na internet?",
        answers: [
            "World Wide Web",
            "Web World Wide",
            "Web Wide World",
            "World War Won"
        ],
        optrue: "World Wide Web",
        code: "",
    },
    {
        question: "Qual foi a primeira rede social da história da internet?",
        answers: [
            "MySpace",
            "Classmate",
            "Orkut",
            "Facebook"
        ],
        optrue: "Classmate",
        code: "",
    },
    {
        question: "Qual a resolução de uma imagem Full HD?",
        answers: [
            "1280 x 720",
            "2560 x 1440",
            "1920 x 1080",
            "1260 x 1080"
        ],
        optrue: "1920 x 1080",
        code: "",
    },
    {
        question: "Software é o:",
        answers: [
            "Conjunto de programas que permitem o funcionamento e utilização da máquina",
            "Conjunto de componentes que permitem o funcionamento e utilização do sistema operacional",
            "Conjunto de programas que permitem o funcionamento e utilização do navegador",
            "Conjunto de componentes que formam a parte física do computador"
        ],
        optrue: "Conjunto de programas que permitem o funcionamento e utilização da máquina",
        code: "",
    },
    {
        question: "Sobre o gabinete do computador, assinale a alternativa correta:",
        answers: [
            "É a 'caixa' do computador, onde ficam seus elementos (hardware)",
            "Nele encontram-se a placa mãe, a fonte, as unidades de discos, a CPU, as memórias, o HD etc",
            "Ele pode ser horizontal ou vertical e, nesse último caso, é chamado de torre",
            "Gabinete e CPU são sinônimos",
        ],
        optrue: "Gabinete e CPU são sinônimos",
        code: "",
    },
    {
        question: "O Disco Rígido, do inglês Hard Disk, também conhecido como HD, serve como:",
        answers: [
            "Transporte de dados",
            "Unidade de armazenamento permanente, guardando dados e programas",
            "Programa de edição de textos",
            "Navegador para acesso à internet",
            "Armazenamento de memória volátil, que se perde com o desligamento do computador"
        ],
        optrue: "Unidade de armazenamento permanente, guardando dados e programas",
        code: "",
    },
    {
        question: "Random Access Memory é mais conhecida como:",
        answers: [
            "Memória ROM",
            "Memória interna",
            "Memória externa",
            "Memória RAM",
            "Memória Permantente"
        ],
        optrue: "Memória RAM",
        code: "",
    },
    {
        question: "A Fonte de Energia do Computador:",
        answers: [
            "É responsável por converter a voltagem da energia elétrica, que chega pelas tomadas, em voltagens maiores, capazes de ser suportadas pelos componentes do computador",
            "É responsável por converter a voltagem da energia elétrica, que chega pelas tomadas, em voltagens menores, capazes de ser suportadas pelos componentes do computador",
            "É responsável por converter a voltagem da energia elétrica, que chega pelas baterias, em voltagens maiores",
            "É um recurso que possibilita alterar o tamanho e o formato das letras em programas de edição de texto",
            "É um recurso que possibilita alterar a voltagem da energia elétrica a fim de sobrecarregar os componentes do computador"
        ],
        optrue: "É responsável por converter a voltagem da energia elétrica, que chega pelas baterias, em voltagens maiores",
        code: "",
    },
    {
        question: "Sobre o Pendrive, é incorreto afirmar que:",
        answers: [
            "É a mídia portátil mais utilizada pelos usuários de computadores atualmente",
            "Ele precisa recarregar energia para manter os dados armazenados",
            "É seguro e estável, ao contrário dos antigos Disquetes",
            "É usado através de uma porta USB",
            "É constituído por Memória Flash"
        ],
        optrue: "Ele precisa recarregar energia para manter os dados armazenados",
        code: "",
    },
    {
        question: "A área de trabalho também é conhecida como:",
        answers: [
            "Documentos",
            "Desktop",
            "Word",
            "Internet",
            "HD"
        ],
        optrue: "Desktop",
        code: "",
    },
    {
        question: "Buscador da internet mais utilizado atualmente:",
        answers: [
            "Google",
            "Bing",
            "Youtube",
            "Yahoo",
            "ASK"
        ],
        optrue: "Google",
        code: "",
    },
    {
        question: "Entre os vários tipos de buscadores, qual deles tem o propósito de conectar profissionais a oportunidades de emprego?",
        answers: [
            "Facebook",
            "Twitter",
            "Instagram",
            "LinkedIn"
        ],
        optrue: "LinkedIn",
        code: "",
    },
    {
        question: "Quais são as teclas de atalho para criar uma nova pasta no computador?",
        answers: [
            "Ctrl+N",
            "Ctrl+T",
            "Ctrl+Shift+N",
            "Ctrl+Shift+M",
           
        ],
        optrue: "Ctrl+Shift+N",
        code: "",
    },
    {
        question: "O que é animação no PowerPoint?",
        answers: [
            "Efeito de um slide para o outro",
            "Efeitos que podem fazer objetos aparecer, desaparecer ou se mover",
            "São os designs coloridos internos que podem ser aplicados às apresentações",
            "Designs coloridos"
        ],
        optrue: "Efeitos que podem fazer objetos aparecer, desaparecer ou se mover",
        code: "",
    },
    {
        question: "Download é:",
        answers: [
            "Enviar vírus para outro computador",
            "Cadastrar-se em um site",
            "Ato de enviar arquivos",
            "Baixar qualquer arquivo da internet",
            
        ],
        optrue: "Baixar qualquer arquivo da internet",
        code: "",
    },
    {
        question: "O que é internet?",
        answers: [
            "Uma conexão sem fio",
            "Uma rede global de computadores",
            "Correio eletrônico internacional",
            "Aplicativo para envio de documentos"
        ],
        optrue: "Uma rede global de computadores",
        code: "",
    },
    {
        question: "Qual é a melhor definição para o Microsoft Power Point?",
        answers: [
            "Software destinado apenas a efeitos de slides",
            "Aplicativo utilizado para criar apresentações gráficas atrativas e eficientes",
            "Aplicativo destinado à criação de vetores profissionais",
            "Aplicativo utilizado para criar planilhas gráficas atrativas e eficientes"
        ],
        optrue: "Aplicativo utilizado para criar apresentações gráficas atrativas e eficientes",
        code: "",
    },
    {
        question: "Quem distribui a energia elétrica para todo o computador?",
        answers: [
            "A Fonte",
            "O Estabilizador/Transformador",
            "O Cabo de Energia",
            "A Placa-Mãe",
            "O Processador"
        ],
        optrue: "O Estabilizador/Transformador",
        code: "",
    },
    {
        question: "O que significa a sigla PC, no contexto da informática?",
        answers: [
            "Placa Compacta",
            "Projeto Conjunto",
            "Computador Pessoal",
            "Processamento Computadorizado"
        ],
        optrue: "Computador Pessoal",
        code: "",
    },
    {
        question: "O que é antivírus de computador?",
        answers: [
            "É um software que consiste num conjunto de malwares, firewalls e ransomwares que atuam no computador",
            "É um hardware que protege o computador contra vírus",
            "É um software que protege o computador contra vírus",
            "É um software que protege os seres humanos contra vírus",
            "É um programa que prejudica o computador"
        ],
        optrue: "É um software que protege o computador contra vírus",
        code: "",
    },
    {
        question: "Arquivos de Vídeo podem ter extensão:",
        answers: [
            "MKV, MPG",
            "AVI, TXT",
            "DOC, MPG",
            "TXT AVI",
            "Nenhuma alternativa acima está correta"
        ],
        optrue: "MKV, MPG",
        code: "",
    },
    {
        question: "Ctrl+C + Crl+V é um comando utilizado para:",
        answers: [
            "Copiar todo o texto da página",
            "Criar um novo arquivo",
            "Copiar e colar um texto au arquivo para outro local",
            "Recortar textos e arquivos de uma pasta",
            "Deletar arquivos definitivamente"
        ],
        optrue: "Copiar e colar um texto au arquivo para outro local",
        code: "",
    },
    {
        question: "Qual extensão abaixo geralmente designa um arquivo de imagem?",
        answers: [
            "AVI",
            "JPEG",
            "MP4",
            "MP2",
            "3G2"
        ],
        optrue: "JPEG",
        code: "",
    },
    {
        question: "Qual é a função da memória RAM?:",
        answers: [
            "Armazenar arquivos do sistema",
            "Controlar o processador e torná-lo mais eficiente",
            "Criar grande capacidade de armazenamento em disco",
            "Armazenar dados de programas quando este está em execução, aumentando a velocidade do processamento na próxima utilização",
            "Aumentar a capacidade de processamento da CPU, tornando mais precisa e eficaz a execução de aplicativos do sistema"
        ],
        optrue: "Armazenar dados de programas quando este está em execução, aumentando a velocidade do processamento na próxima utilização",
        code: "",
    },
    {
        question: "O que é informática?",
        answers: [
            "É a habilidade de invadir um sistema",
            "É o conjunto das ciências da informação",
            "É o conjunto de componentes de hardware",
            "É um determinado conjunto de programas de computador",
            "É a disciplina que estuda os meios de comunicação"
        ],
        optrue: "É o conjunto das ciências da informação",
        code: "",
    },
    {
        question: "Qual desses nomes pertence ao inventor da Microsoft e que também já recebeu o título de homem mais rico do mundo?",
        answers: [
            "Jeff Bezos",
            "Martin Luther King",
            "Bill Gates",
            "Elon Musk"
            
        ],
        optrue: "Bill Gates",
        code: "",
    },
    {
        question: "O que é a Internet das Coisas (IoT)?",
        answers: [
            "Tecnologia exclusiva de indústrias para conexão de equipamentos",
            "Objetos cotidianos conectados à internet e que conversam entre si",
            "Tecnologia que mantém as redes sociais funcionando",
            "Venda de produtos eletrônicos na internet"
        ],
        optrue: "Objetos cotidianos conectados à internet e que conversam entre si",
        code: "",
    },
    {
        question: "Inteligência Artificial (IA):",
        answers: [
            "É uma inteligência que não é real",
            "É um dispositivo tecnológico programado para aprender e reproduzir padrões",
            "Imita a inteligência humana para executar tarefas",
            "São máquinas programadas por outras máquinas",
            "Já superou a inteligência humana em todos aspectos"
        ],
        optrue: "Imita a inteligência humana para executar tarefas",
        code: "",
    },
    {
        question: "O que é algoritmo?",
        answers: [
            "É a operação inversa da exponencial utilizada para o cálculo de equações exponenciais que não possuem soluções imediatas",
            "Sistema programado por máquinas que toma decisões pelos humanos",
            "É o processo de converter o código escrito em uma linguagem de programação para código binário",
            "Instrumento tecnológico que emprega técnicas de levantamento de dados e formas de processá-los, por meio de instruções claras e bem definidas"
        ],
        optrue: "Instrumento tecnológico que emprega técnicas de levantamento de dados e formas de processá-los, por meio de instruções claras e bem definidas",
        code: "",
    },
    {
        question: "Machine Learning consiste em:",
        answers: [
            "Instrumento tecnológico usado em sala de aula para melhorar o aprendizado dos alunos",
            "Computadores criados especialmente para o mercado de educação",
            "Máquinas que aprendem sozinhas analisando dados e detectando padrões",
            "Prêmio especial dado para alunos-destaque no término da formação do Programa OxeTech"
        ],
        optrue: "Máquinas que aprendem sozinhas analisando dados e detectando padrões",
        code: "",
    }, 
    {
        question: "O que é o Reconhecimento Facial?",
        answers: [
            "Identifica pessoas usando biometria facial, mesmo que estejam em meio a uma multidão",
            "Identifica pessoas usando biometria facial, mas não funciona em multidões",
            "Tecnologia usada por governos para aumentar a privacidade dos cidadãos",
            "Tecnologia usada pelo Centro de Inovações para permitir apenas que alagoanos possam entrar"
        ],
        optrue: "Identifica pessoas usando biometria facial, mesmo que estejam em meio a uma multidão",
        code: "",
    },
    {
        question: "O que é Big Data?",
        answers: [
            "Problema previsto para ocorrer em todos os sistemas informatizados na passagem do ano de 1999 para 2000, também conhecido como Bug do Milênio",
            "Grande volume de dados que pode gerar percepções e planejamentos para empresas",
            "Nome dado à data da inauguração da primeira Apple Store na cidade de Nova Iorque (Big Apple)",
            "Linguagem de programação com foco na estruturação de dados"
        ],
        optrue: "Grande volume de dados que pode gerar percepções e planejamentos para empresas",
        code: "",
    },
    {
        question: "O que é Criptomoeda?",
        answers: [
            "Moeda virtual controlada e regulada por instituições financeiras e bancos centrais",
            "Moeda que pode ser feita por qualquer um no computador e impressa para uso real",
            "Moeda virtual que só pode ser usada para compras na internet",
            "Moeda virtual com transações validadas e asseguradas por blockchain (registro digital)"
        ],
        optrue: "Moeda virtual com transações validadas e asseguradas por blockchain (registro digital)",
        code: "",
    },
    {
        question: "O que é Computação Quântica?",
        answers: [
            "Termo inventado no cinema, mas que não existe no mundo real",
            "Computadores mais lentos, mas com grande capacidade de processamento e armazenamento",
            "Máquinas muito mais rápidas que solucionam problemas que não poderiam ser resolvidos por computadores convencionais",
            "Computadores com foco único na soma de quantias, utilizando operações exponenciais de alta complexidade"
            
        ],
        optrue: "Máquinas muito mais rápidas que solucionam problemas que não poderiam ser resolvidos por computadores convencionais",
        code: "",
    },
    {
        question: "O que é Realidade Virtual?",
        answers: [
            "Tecnologia usada para transportar atores para os cenários computadorizados que vemos em filmes",
            "Tecnologia de interface para imersão em um ambiente virtual",
            "Tecnologia que utiliza o input de usuário para gerar imagens por meio de inteligência artificial",
            "Tecnologia que transforma pensamentos em imagens em tempo real por meio de inteligência artificial"
        ],
        optrue: "Tecnologia de interface para imersão em um ambiente virtual",
        code: "",
    },
    {
        question: "O que é Realidade Aumentada?",
        answers: [
            "Tecnologia usada nos óculos 3D em cinemas",
            "Lupa digital capaz de aumentar mil vezes uma imagem sem distorção",
            "Imersão em ambiente virtual com dispositivo VR",
            "Tecnologia que mistura o mundo virtual ao real"
        ],
        optrue: "Tecnologia que mistura o mundo virtual ao real",
        code: "",
    },
    {
        question: "O que é Computação em Nuvem?",
        answers: [
            "Servidores em balões que hospedam arquivos de companhias",
            "Instrumento usado por meteorologistas para conseguir predizer o clima ",
            "Arquivos, aplicativos e sistemas podem ser acessados de qualquer lugar do mundo",
            "Arquivos, aplicativos e sistemas hospedados na internet, mas que só podem ser acessados a partir do local de upload"
        ],
        optrue: "Arquivos, aplicativos e sistemas podem ser acessados de qualquer lugar do mundo",
        code: "",
    },
    {
        question: "Atualmente (novembro de 2022), qual o youtuber com mais inscritos (111 milhões) em seu canal?",
        answers: [
            "MrBeast",
            "Pewdiepie",
            "Casemiro",
            "KondZilla"
        ],
        optrue: "Pewdiepie",
        code: "",
    },
    {
        question: "Qual o nome do sistema operacional mobile mais utilizado hoje em dia?",
        answers: [
            "Windows",
            "iOS",
            "Linux",
            "Android"
        ],
        optrue: "Android",
        code: "",
    },
    {
        question: "O que significa a sigla NASA traduzida?",
        answers: [
            "Administração Nacional da Aeronáutica e do Esporte",
            "Administração Nacional da Automobilística e do Еѕраçо",
            "Administração Nacional da Aeronáutica e do Еѕраçо",
            "Administração Internacional da Aeronáutica e Еѕраçо",
            "Administração Nacional de Automobilismo Espacial"
        ],
        optrue: "Administração Nacional da Aeronáutica e do Еѕраçо",
        code: "",
    },
    {
        question: "Qual é o projeto da NASA que tem o objetivo de levar o ser humano à lua atualmente?",
        answers: [
            "Gemini",
            "Apollo",
            "Artemis",
            "Alpha",
            
        ],
        optrue: "Artemis",
        code: "",
    },
    {
        question: "Quem foi o criador do Facebook?",
        answers: [
            "David Karp",
            "Mark Zuckerberg",
            "Mike Krieger",
            "Reid Hoffman"
        ],
        optrue: "Mark Zuckerberg",
        code: "",
    },
    {
        question: "Quantos e-mails são enviados diariamente em todo mundo?",
        answers: [
            "100 milhões",
            "200 milhões",
            "500 milhões",
            "100 bilhões",
            "200 bilhões"
        ],
        optrue: "100 bilhões",
        code: "",
    },
    {
        question: "Qual o lugar no mundo onde há maior acesso à internet por sua população (com 92% de cobertura)?",
        answers: [
            "Estados Unidos",
            "Japão",
            "Canadá",
            "Groenlândia",
            "Brasil"
        ],
        optrue: "Groenlândia",
        code: "",
    },
    {
        question: "Quando a internet foi inventada (por motivos de estratégia de guerra) e quando foi liberada ao público geral (por motivos de popularização e potencialidade de uso)?",
        answers: [
            "1957-1976",
            "1969-1989",
            "1975-2000",
            "1985-2001",
            "1996-2005"
        ],
        optrue: "1969-1989",
        code: "",
    },
    {
        question: "Quantas páginas existem na Web atualmente (número não-estático, cresce a cada minuto)?",
        answers: [
            "Mais de 590 milhões",
            "Mais de 2.5 bilhões",
            "Mais de 4.5 bilhões",
            "Mais de 1.2 trilhão"
        ],
        optrue: "Mais de 4.5 bilhões",
        code: "",
    },
    {
        question: "Quantas árvores seriam necessárias para imprimir o conteúdo de toda a internet?",
        answers: [
            "Mais de 61 milhões",
            "Mais de 84 milhões",
            "Mais de 120 milhões",
            "Mais de 145 milhões",
            "Mais de 300 milhões"
        ],
        optrue: "Mais de 61 milhões",
        code: "",
    },
    {
        question: "O que significa IP?",
        answers: [
            "Internet Pack",
            "Internet Protocol",
            "Internet Production",
            "Internet Provider",
            "Internet de Propaganda"
        ],
        optrue: "Internet Protocol",
        code: "",
    },
    {
        question: "O que são provedores?",
        answers: [
            "Empresa que provê recursos para as pessoas",
            "Empresa que fornece o acesso à internet",
            "Empresa que administra a internet",
            "Empresários que criaram a internet",
            "Sites de pesquisa"
        ],
        optrue: "Empresa que fornece o acesso à internet",
        code: "",
    },
    {
        question: "Quais desses são navegadores de internet?",
        answers: [
            "Internet Explorer, Firefox, Chrome",
            "Photoshop, CorelDraw!, Gimp",
            "LibreOffice.Calc, Excel, Lotus 123",
            "Word, Excel, PowerPoint",
            "Wordpad, Microsoft Word, OpenOffice.Write"
        ],
        optrue: "Internet Explorer, Firefox, Chrome",
        code: "",
    },
    {
        question: "O que são hyperlinks?",
        answers: [
            "Páginas de Emoticons",
            "Links fortes, ou seja, links protegidos por criptografia",
            "Redes de compartilhamento de imagens",
            "Palavras-chave ou partes de texto que fazem conexão entre uma página e outra da internet para complemento de informação",
            
        ],
        optrue: "Palavras-chave ou partes de texto que fazem conexão entre uma página e outra da internet para complemento de informação",
        code: "",
    },
    {
        question: "O que é URL?",
        answers: [
            "Endereço de um documento",
            "Endereço de uma página",
            "Endereço da sua placa-mãe",
            "Endereço do seu modem",
            "Endereço do seu computador"
        ],
        optrue: "Endereço de uma página",
        code: "",
    },
    {
        question: "O que são Cookies?",
        answers: [
            "Bibliotecas para aplicações de delivery de comida",
            "Falha ou erro no código de um programa",
            "Ferramenta que armazena as preferências dos usuários em um determinado site",
            "Um fragmento prejudicial de software"
        ],
        optrue: "Ferramenta que armazena as preferências dos usuários em um determinado site",
        code: "",
    },
];

quizQuestionsArray = shuffle(quizQuestionsArray);

// setting display visibility
if (scoreDisplay) { scoreDisplay.hidden = true; } //  hide score, timer, and q&a areas
if (timerDisplay) { timerDisplay.hidden = true; }
if (questionDisplay) { questionDisplay.hidden = true; }
if (gameOverDisplay) { gameOverDisplay.hidden = true; } // hide all end screens
if (gameOverOverlay) { gameOverOverlay.hidden = true; }
if (HighScoreList) { HighScoreList.hidden = true; }
if (letsGoAgain) { letsGoAgain.hidden = true; }

// begin script
init();

// retrieves list of previous scores in local storage
function init() {
    // need to parse array of user score objects

    var storedScoreList = [];
    if (localStorage.getItem("scoresList") !== null) {
        storedScoreList = JSON.parse(atob(localStorage.getItem("scoresList").replaceAll("GGG", "F")));
    }

    // assign the parsed array to scoreList array to render later
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    // prepare the score list to show later
    renderScoreList();
    // we are at start of the quiz
    currentQuestion = 0;
}


function showScore(event) {
    event.preventDefault();
    HighScoreList.hidden = false;
    footer.hidden = true;
    titleDisplay.hidden = true;
    startButton.hidden = true;
    scoreButton.hidden = true;
    gameOverOverlay.hidden = false;
    gameOverDisplay.hidden = false;
    userNameForm.hidden = true;
    gameOverSplash.hidden = true;
    letsGoAgain.hidden = false;
    clearHighScores.hidden = false;
    renderScoreList();
}

// start or restarting quiz; reset all visible sections and variables
function startQuiz(event) {
    event.preventDefault();
    footer.hidden = true;
    gameOverSplash.hidden = true;
    titleDisplay.hidden = true;
    startButton.hidden = true;
    scoreButton.hidden = true;
    score = 0; // reset score
    currentTime = 300; //reset clock
    currentQuestion = 0; // reset to start of quiz
    questionDisplay.hidden = false; // show Q&A
    // display score and timer
    scoreDisplay.textContent = "Pontuação: 00" + score;
    scoreDisplay.hidden = false;
    timerDisplay.textContent = "Tempo: " + currentTime;
    timerDisplay.hidden = false; // could be put in function instead

    // initialize countdown timer
    setTime();
    // render Q&A
    renderQuestion();
}

// this function taken from class activities
// begins the countdown
function setTime() {
    timerInterval = setInterval(function () {
        questionTimeLeft--;
        console.log(questionTimeLeft);
        console.log(multiplicadorDePontos);

        if (questionTimeLeft <= 5) {
            multiplicadorDePontos = 5;
        }
        if (questionTimeLeft <= 2) {
            questionTimeLeft = 1;
        }

        currentTime--;
        timerDisplay.textContent = "Tempo: " + currentTime;

        // Time is up, game over
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            questionTimeLeft = 20;
            multiplicadorDePontos = 20;
            gameOver();
        }
        // if you have less than 10 secs left
        // display a red shadow around the timer
        if (currentTime <= 10) {
            timerDisplay.setAttribute("style", "box-shadow: 0px 5px 2px red");
        }
    }, 1000);
}

// populates the question and answer fields
function renderQuestion() {
    // did we run out of questions? if so, game over.
    if (currentQuestion >= quizQuestionsArray.length) {
        gameOver();
        return;
    }
    // reset all of the stylings from right/wrong answers and displays
    answerOne.removeAttribute("style");
    answerTwo.removeAttribute("style");
    answerThree.removeAttribute("style");
    answerFour.removeAttribute("style");
    scoreDisplay.removeAttribute("style");
    timerDisplay.removeAttribute("style");

    //reset to default 4 choices
    answerOne.hidden = false;
    answerTwo.hidden = false;
    answerThree.hidden = false;
    answerFour.hidden = false;
    // perhaps will implement true of false questions
    if (quizQuestionsArray[currentQuestion].answers.length < 4) {
        //true of false question
        answerThree.hidden = true;
        answerFour.hidden = true;
    }

    //   populate next question and its answer choices
    quizQuestion.textContent = quizQuestionsArray[currentQuestion].question;
    quizCode.innerHTML = quizQuestionsArray[currentQuestion].code;

    // go print list of answers for however many answers there are
    // only <p> elements are the possible answer choices
    var listOfAnswers = document.querySelectorAll("p");
    for (var i = 0; i < quizQuestionsArray[currentQuestion].answers.length; i++) {
        listOfAnswers[i].textContent =
            quizQuestionsArray[currentQuestion].answers[i];
    }
}

// this function checks for right or wrong responses
function verifyResponse(event) {
    event.preventDefault();
    // grab this element being clicked
    var thisAnswer = event.target;
    // this variable holds the return value of setTimeout()
    var timeOutId = 0;

    if (
        // correct choice!
        thisAnswer.textContent === quizQuestionsArray[currentQuestion].optrue
    ) {
        // se acertar em menos de 3 segundos então obterá menos pontuação
        if (questionTimeLeft > 17) {
            multiplicadorDePontos = 1;
        }

        // disabled double click
        thisAnswer.setAttribute(
            // change style to green to indicate correct choice
            "style",
            "background-color: rgb(104, 226, 56); color: white; box-shadow: 0px 5px 2px rgb(104, 226, 56);pointer-events:none"
        );
        score = score + questionTimeLeft * multiplicadorDePontos; // get 377 points
        currentQuestion++; // go to next question index
        // update score, flash green
        scoreDisplay.textContent = "Pontuação: " + score;
        scoreDisplay.setAttribute(
            "style",
            "box-shadow: 0px 5px 3px rgb(104, 226, 56)"
        );
        // this function sets a delay, so we can see if you got it right or wrong
        // then render the next question after the short delay
        timeOutId = window.setTimeout(renderQuestion, 600);
    } else {
        // wrong choice!
        //  disabled double click
        thisAnswer.setAttribute(
            // style this answer with red to indicate incorrect response
            "style",
            "background-color: red; color: white; box-shadow: 0px 5px 2px red;pointer-events:none"
        );
        // flash timer display with yellow to indicated penalty
        timerDisplay.setAttribute("style", "box-shadow: 0px 5px 3px yellow");
        currentTime = currentTime - 14; // penalty, you got it wrong!
        currentQuestion++; // next question
        // delay to show the color indication right or wrong
        timeOutId = window.setTimeout(renderQuestion, 600);
    }

    // reseta multiplicador e tempo restante apos resposta recebida
    multiplicadorDePontos = 20;
    questionTimeLeft = 20;
}

// this function is called when
// A. time is up, or B. we ran out of questions
function gameOver() {
    gameOverOverlay.hidden = false; // display overlay and game over screen
    gameOverDisplay.hidden = false;
    gameOverSplash.hidden = false; // prompt user name
    userNameForm.hidden = false; // display scores and buttons
    clearHighScores.hidden = true;
    retakeQuiz.hidden = false;
    letsGoAgain.hidden = false;
    HighScoreList.hidden = false;
    answerOne.hidden = true;
    answerTwo.hidden = true;
    answerThree.hidden = true;
    answerFour.hidden = true;

    clearInterval(timerInterval); // freeze time
    // display final score
    gameOverScore.textContent = "FIM do desafio! Você conseguiu " + score + " pontos!";
}

// this function is called to store a new entry
function storeScores() {
    localStorage.setItem("scoresList", btoa(JSON.stringify(scoreList)).replace("F", "GGG"));
}

// this function renders the score list
function renderScoreList() {
    // first clear everything
    if (dynamicList)
        dynamicList.innerHTML = "";
    if (scoreList) {
        // ordenando por pontuação mais alta
        scoreList.sort(function (a, b) {
            if (a.highScore > b.highScore) {
                return -1
            }

            if (a.highScore === b.highScore) {
                return 0
            }

            if (a.highScore < b.highScore) {
                return 1
            }
        });
    }


    if (scoreList) {
        // loop through the stored scores and print them onto li elements
        for (var i = 0; i < scoreList.length; i++) {
            var storedScores = scoreList[i];
            var tr = document.createElement("tr");

            var td = document.createElement("td");
            td.textContent = i + 1;
            tr.appendChild(td);

            var td = document.createElement("td");
            td.textContent = scoreList[i].name
            tr.appendChild(td);

            var td = document.createElement("td");
            tr.appendChild(td);
            var span = document.createElement("span");
            span.textContent = scoreList[i].highScore;
            td.appendChild(span);

            dynamicList.appendChild(tr);
        }
    }
}


// double submit capability
// with enter or clicking submit button
function submitScores(event) {
    event.preventDefault();
    // grab user input name
    var user = userName.value.trim();
    // clear the input field
    userName.value = "";
    // if empty string, don't submit
    if (user === "") {
        return;
    }

    user = user.toLowerCase();

    const arr = user.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    user = arr.join(" ");

    // create a new object containing user and score pair
    var userScore = {
        name: user,
        highScore: score,
    };

    let user_added = true;
    for (var i = 0; i < scoreList.length; i++) {
        if (scoreList[i].name === user) {
            alert("O seu nome já está na lista!");
            user_added = false;
            break;
        }
    }

    if (user_added) {
        // push new user-score pair into score list array
        scoreList.push(userScore);
        // now store, then display score list
        storeScores();
        userNameForm.hidden = true;
        gameOverSplash.hidden = true;
        HighScoreList.hidden = false;
        letsGoAgain.hidden = false;
        renderScoreList();
    }

}
// this function erases local storage, score list,
// and clears global array variable
function clearScores(event) {
    // need to clear local storage too
    event.preventDefault();

    let pw = prompt("Digite a senha para zerar o placar: ");

    if (pw === "inovacaoal") {
        dynamicList.innerHTML = "";
        localStorage.clear();
        scoreList = [];
    } else {
        if (!!pw)
            alert("Senha invalida!")
    }

}

// event listeners for buttons and submit
if (startButton)
    startButton.addEventListener("mouseup", startQuiz);
if (scoreButton)
    scoreButton.addEventListener("mouseup", showScore);
if (answerOne)
    answerOne.addEventListener("click", verifyResponse);
if (answerTwo)
    answerTwo.addEventListener("click", verifyResponse);
if (answerThree)
    answerThree.addEventListener("click", verifyResponse);
if (answerFour)
    answerFour.addEventListener("click", verifyResponse);
if (submitBtn)
    submitBtn.addEventListener("click", submitScores);
if (userNameForm)
    userNameForm.addEventListener("submit", submitScores);
if (clearHighScores)
    clearHighScores.addEventListener("mouseup", clearScores);
// retake the quiz, go to start of application
if (retakeQuiz) {
    retakeQuiz.addEventListener("mouseup", function (event) {
        event.preventDefault();
        gameOverDisplay.hidden = true;
        gameOverOverlay.hidden = true;
        questionDisplay.hidden = true;
        scoreDisplay.hidden = true;
        timerDisplay.hidden = true;
        footer.hidden = false;
        titleDisplay.hidden = false;
        startButton.hidden = false;
        scoreButton.hidden = false;

        // reseta multiplicador e tempo restante apos clicar em voltar
        questionTimeLeft = 20;
        multiplicadorDePontos = 20;
    });
}