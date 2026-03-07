// Lista para gerar os campos na ficha
const listaPericias = [
    "Animais", "Arte", "Ciencia", "Crime", "Esporte",
    "Idiomas", "Investigação", "Maquinas",
    "Manipulação", "Medicina", "Sobrevivencia"
];

// Banco de dados de descrições
const skillDescriptions = {
    "Animais": `Você sabe cuidar de animais e tratar de seus ferimentos, evitar animais perigosos, e até domar animais selvagens (mas se deseja ter um animal treinado, vai precisar também da vantagem Aliado). Em mundos de fantasia, esta perícia também permite falar a língua dos animais. A critério do mestre, a perícia também pode se aplicar a monstros e outras criaturas fantásticas.
    <br><br>
    <b>Doma:</b> você sabe domar animais selvagens.
    <br>
    <b>Montaria:</b> você sabe montar cavalos e outros animais de montaria, como elefantes e camelos.
    <br>
    <b>Tratamento:</b> você sabe alimentar e cuidar de animais. Pode também perceber se um animal está doente.
    <br>
    <b>Treinamento:</b> você sabe treinar animais domésticos para fazer truques simples, como andar, parar, sentar, guardar e atacar.
    <br>
    <b>Veterinária:</b> você pode fazer diagnósticos, prestar primeiros socorros e fazer cirurgias em animais. Funciona como Medicina, mas apenas para animais.`,
    
    "Arte": `Você tem sensibilidade e talento para artes. Sabe cantar, dançar, desenhar, pintar, fazer esculturas, tocar instrumentos musicais...
    <br><br>
    <b>Atuação:</b> você é um ator. Pode simular emoções que não está sentindo.
    <br>
    <b>Falsificação:</b> você sabe criar cópias de cartas, documentos, obras de arte e outros objetos, e também reconhecer peças falsificadas.
    <br>
    <b>Fotografia:</b> você sabe tirar fotos profissionais e, se tiver acesso a um laboratório, revelar fotos.
    <br>
    <b>Instrumentos Musicais:</b> você sabe tocar instrumentos musicais de vários tipos.
    <br>
    <b>Prestidigitação:</b> você pode fazer truques com pequenos objetos, fazendo sumir moedas, lenços e cartas de baralho como se fosse mágica.
    <br>
    <b>Redação:</b> você sabe produzir textos profissionais: relatórios, poesias, romances, reportagens, cartas de amor...
    <br>
    <b>Outras Especializações:</b> Canto, Culinária, Dança, Desenho, Escultura, Pintura, Joalheria...`,
    
    "Ciencia": `Você tem grandes conhecimentos sobre ciências em geral, incluindo os mais obscuros.
    <br></br>
    <b>Astronomia:</b> você sabe reconhecer estrelas e constelações, ler mapas estelares e saber se existem planetas à volta de uma estrela.
    <br>
    <b>Biologia:</b> você sabe tudo sobre plantas e animais. Sabe dizer quais são comestíveis, venenosos, medicinais...
    <br>
    <b>Ciências Proibidas:</b> você conhece coisas que não deveria: ocultismo, ufologia...
    <br>
    <b>Geografia:</b> você sabe fazer mapas e reconhecer lugares através da paisagem.
    <br>
    <b>História:</b> você sabe sobre os fatos notáveis ocorridos na história da humanidade.
    <br>
    <b>Meteorologia:</b> você sabe prever o clima nos dias ou horas seguintes.
    <br>
    <b>Psicologia:</b> você conhece a mente humana e, se tiver informações suficientes, pode prever o comportamento de uma pessoa ou grupo de pessoas.
    <br>
    <b>Outras Especializações:</b> Antropologia, Arqueologia, Criminalística, Ecologia, Genética, Literatura, Metalografia, Química...`,
    
    "Crime": `Você é um ladrão, espião, falsário, arrombador ou outro tipo de criminoso. Consulte o mestre para saber se esta perícia está disponível para personagens jogadores.
    <br></br>
    <b>Armadilhas:</b> você sabe construir, armas e desarmar armadilhas, explosivos e aparelhos de detecção.
    <br>
    <b>Arrombamento:</b> você sabe como forçar portas e abrir fechaduras trancadas.
    <br>
    <b>Criptografia:</b> você sabe criar e decifrar mensagens secretas.
    <br>
    <b>Disfarce:</b> você sabe se parecer com outra pessoa, ou apenas ocultar a própria aparência.
    <br>
    <b>Falsificação:</b> você sabe criar cópias de cartas, documentos, obras de arte e outros objetos — e também reconhecer peças falsificadas.
    <br>
    <b>Furtividade:</b> você sabe se esconder e também moverse em silêncio e sem ser visto.
    <br>
    <b>Intimidação:</b> você convence as pessoas usando ameaças e coação.
    <br>
    <b>Punga:</b> você sabe bater carteiras.
    <br>
    <b>Rastreio:</b> você sabe seguir pistas e pegadas.`,
    
    "Esporte": `Você sabe praticar vários tipos de esportes e conhece suas regras. Esta perícia não afeta seu desempenho em combate, mesmo quando se trata de esportes como artes marciais, boxe ou arquearia.
    <br><br>
    <b>Acrobacia:</b> você pode equilibrar-se em pequenas superfícies, andar sobre cordas, fazer malabarismos e realizar movimentos corporais complexos.
    <br>
    <b>Alpinismo:</b> você sabe escalar montanhas, subir muros altos, árvores e até edifícios.
    <br>
    <b>Arquearia:</b> você sabe usar arco e flecha em atividades esportivas ou recreativas.
    <br>
    <b>Corrida:</b> você é um corredor de curta e longa distância, sabendo controlar ritmo, resistência e velocidade.
    <br>
    <b>Jogos:</b> você conhece muitos jogos, como cartas, jogos de tabuleiro, videogames e RPGs, além de suas regras e estratégias.
    <br>
    <b>Mergulho:</b> você sabe usar equipamento de mergulho e se locomover com segurança debaixo d'água.
    <br>
    <b>Natação:</b> você sabe nadar e se movimentar na água com eficiência.
    <br>
    <b>Pilotagem:</b> você sabe pilotar aviões, helicópteros, barcos e navios, além de veículos de competição como carros de corrida.
    <br>
    <b>Outras Especializações:</b> Arremesso, Artes Marciais, Boxe, Caça, Parkour, Pesca, Paraquedismo, Salto...`,

    "Idiomas": `Você é poliglota. Conhece várias línguas e aprende novas com facilidade, mesmo as mais obscuras. Se você não possui esta perícia, saberá falar apenas o idioma mais comum no local da campanha e, caso pertença a alguma raça não humana, também seu idioma nativo. Cada língua conta como uma especialização. Personagens com esta perícia não precisam de testes para aprender novas magias.
    <br><br>
    <b>Código Morse:</b> você sabe transmitir e receber mensagens compostas de pontos e traços.
    <br>
    <b>Criptografia:</b> você sabe criar e decifrar mensagens secretas.
    <br>
    <b>Leitura Labial:</b> você sabe descobrir o que alguém está dizendo observando os movimentos de sua boca.
    <br>
    <b>Linguagem de Sinais:</b> você pode se comunicar sem emitir sons, utilizando gestos.
    <br>
    <b>Outras Especializações:</b> Inglês, Francês, Italiano, Alemão, Espanhol e demais idiomas.`,

    "Investigação": `Você é um policial, detetive ou agente secreto, e conhece técnicas de investigação. Sabe seguir pegadas, procurar impressões digitais, usar disfarces, instalar explosivos, decifrar códigos secretos, destrancar fechaduras e desarmar armadilhas.
    <br><br>
    <b>Armadilhas:</b> você sabe construir, armar e desarmar armadilhas, explosivos e aparelhos de detecção.
    <br>
    <b>Arrombamento:</b> você sabe como forçar portas e abrir fechaduras trancadas.
    <br>
    <b>Criptografia:</b> você sabe produzir e decifrar mensagens secretas.
    <br>
    <b>Disfarce:</b> você sabe se parecer com outra pessoa ou ocultar a própria aparência.
    <br>
    <b>Falsificação:</b> você sabe criar cópias de cartas, documentos, obras de arte e outros objetos — e também reconhecer peças falsificadas.
    <br>
    <b>Furtividade:</b> você sabe se esconder e também mover-se em silêncio e sem ser visto.
    <br>
    <b>Interrogatório:</b> com perguntas habilidosas e muita pressão emocional, você pode conseguir de uma pessoa aquilo que deseja.
    <br>
    <b>Intimidação:</b> você convence as pessoas usando ameaças e coação.
    <br>
    <b>Leitura Labial:</b> você sabe descobrir o que alguém está dizendo observando os movimentos de sua boca.
    <br>
    <b>Rastreio:</b> você sabe seguir pistas e pegadas.`,

    "Máquinas": `Você é bom com máquinas, veículos e computadores. Sabe operar, pilotar, dirigir, construir e consertar qualquer coisa, desde que tenha as peças e ferramentas certas.
    <br><br>
    <b>Armadilhas:</b> você sabe construir, armar e desarmar armadilhas, explosivos e aparelhos de detecção.
    <br>
    <b>Computação:</b> você sabe operar computadores, navegar na internet, quebrar senhas e penetrar em sistemas protegidos.
    <br>
    <b>Condução:</b> você sabe dirigir veículos terrestres como carros, ônibus e motos.
    <br>
    <b>Eletrônica:</b> você sabe consertar (mas não construir) aparelhos eletrônicos como telefones, rádios e computadores.
    <br>
    <b>Engenharia:</b> você sabe construir (mas não consertar) máquinas, veículos, armas e aparelhos eletrônicos.
    <br>
    <b>Mecânica:</b> você sabe consertar (mas não construir) máquinas, veículos e armas. Consertar um construto é uma tarefa Média (teste de Habilidade +1) e restaura 1 PV em meia hora. Em caso de falha, uma nova tentativa leva mais meia hora. A critério do mestre, pode-se restaurar todos os PVs de um mecha em 8 horas, sem testes.
    <br>
    <b>Pilotagem:</b> você sabe pilotar aeronaves, barcos e veículos de competição como carros de corrida, barcos, helicópteros e aviões. Você pode usar a manobra comando de Aliados (veja em “Combate”) para controlar qualquer máquina que não tenha vontade própria e não esteja sendo controlada por outra pessoa.`,

    "Manipulação": `Você sabe obter favores de outras pessoas por diversos meios, usando truques, engodos ou ameaças para influenciar decisões e comportamentos.
    <br><br>
    <b>Hipnose:</b> você pode afetar a mente de uma pessoa e torná-la mais fácil de manipular.
    <br>
    <b>Interrogatório:</b> com perguntas habilidosas e muita pressão emocional, você pode conseguir de alguém aquilo que deseja.
    <br>
    <b>Lábia:</b> como Intimidação, mas usa bajulação, charme e conversa mole em vez de ameaças.
    <br>
    <b>Intimidação:</b> você convence as pessoas usando ameaças e coação.
    <br>
    <b>Sedução:</b> você sabe fingir sentimentos românticos em relação à vítima para influenciá-la.`,

    "Medicina": `Você sabe dizer que tipo de doença um paciente tem, como curá-la, e também pode fazer cirurgias. Quando alguém precisa de cuidados médicos, você pode providenciar.
    <br><br>
    <b>Cirurgia:</b> você sabe tratar de doenças e ferimentos internos. Restaurar 1 PV é uma tarefa Média, mas é permitido apenas um teste por dia para cada paciente.
    <br>
    <b>Diagnose:</b> você sabe dizer se uma pessoa está doente, reconhecer a doença e determinar a maneira de curá-la.
    <br>
    <b>Primeiros Socorros:</b> você sabe fazer curativos, reduzir fraturas, deter sangramentos e outras coisas que se deve fazer — ou não fazer — em caso de acidentes com vítimas. Pode ajudar na recuperação de personagens que estejam com 0 PVs, dependendo da gravidade de seus ferimentos.
    <br>
    <b>Psiquiatria:</b> você sabe lidar com traumas e doenças mentais. Quando um personagem Insano falha em seu teste para resistir à loucura, você pode tentar ajudá-lo a superar a crise como uma tarefa Difícil (mas não poderá curá-lo totalmente de sua insanidade).
    <br>
    <b>Veterinária:</b> você pode fazer diagnósticos, prestar primeiros socorros e fazer cirurgias em animais.`,

    "Sobrevivencia": `Você consegue sobreviver em lugares selvagens. Sabe caçar, pescar, seguir pistas e encontrar comida e abrigo para você e seus amigos. Cada tipo de região conta como uma especialização.
    <br><br>
    <b>Alpinismo:</b> você sabe escalar em montanhas, subir em muros altos, árvores e até edifícios.
    <br>
    <b>Armadilhas:</b> você sabe construir, armar e desarmar armadilhas, explosivos e aparelhos de detecção.
    <br>
    <b>Arquearia:</b> você sabe usar arco e flecha.
    <br>
    <b>Furtividade:</b> você sabe se esconder e também mover-se em silêncio e sem ser visto.
    <br>
    <b>Meteorologia:</b> você sabe prever o clima nos dias ou horas seguintes.
    <br>
    <b>Navegação:</b> você sabe dizer onde está e em que direção deve seguir.
    <br>
    <b>Pesca:</b> você sabe pegar peixes e outros animais aquáticos com linha e anzol, rede ou arpão.
    <br>
    <b>Rastreio:</b> você sabe seguir pistas e pegadas.
    <br>
    <b>Outras Especializações:</b> mesmas da vantagem Arena.`,
    };  