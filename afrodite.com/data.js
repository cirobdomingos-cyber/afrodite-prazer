/* ============================================================
 * Afrodite, prazer. — Fonte única de dados do site estático
 * ------------------------------------------------------------
 * COMO EDITAR:
 *  • BANNER promocional: edite AFRODITE.banner abaixo.
 *      - active: true/false liga/desliga a barra do topo.
 *      - slides: cada item vira um quadro do carrossel (rotaciona sozinho).
 *      - autoplay_ms: tempo entre os quadros (em milissegundos).
 *  • PRODUTOS: edite AFRODITE.products (preço, texto editorial, link).
 *  • SEÇÕES: edite AFRODITE.sections (título, subtítulo, ordem dos SKUs).
 * ============================================================ */
window.AFRODITE = {
  "banner": {
    "active": true,
    "autoplay_ms": 5000,
    "slides": [
      {
        "eyebrow": "Edição Dia dos Namorados",
        "title": "Para presentear o desejo",
        "subtitle": "Uma curadoria a dois — óleos beijáveis, toques e descobertas para junho",
        "cta_label": "Ver seleção",
        "cta_href": "#dia-dos-namorados",
        "theme": "namorados",
        "img": ""
      },
      {
        "eyebrow": "Guia gratuito",
        "title": "Baixe o Guia do Prazer — sem custo",
        "subtitle": "Um mapa honesto para começar no seu ritmo",
        "cta_label": "Baixar guia",
        "cta_href": "guia.html",
        "img": ""
      },
      {
        "eyebrow": "Curadoria",
        "title": "Produtos escolhidos a dedo, com critério",
        "subtitle": "Saúde íntima, prazer e autoconhecimento",
        "cta_label": "Ver curadoria",
        "cta_href": "#por-onde-comecar",
        "img": ""
      }
    ]
  },
  "darkMedia": [],
  "sections": [
    {
      "id": "dia-dos-namorados",
      "homeTheme": "theme-namorados",
      "title": "Para os namorados",
      "subtitle": "Junho é dos namorados — e do toque, do gosto, do tempo a dois. Uma seleção para presentear, ou se presentear, sem pressa.",
      "skus": [
        "LV007",
        "LV021",
        "LV017",
        "LV022",
        "LV009",
        "IA406",
        "IA453R",
        "AS341"
      ],
      "theme": "vinho",
      "label": "Namorados",
      "accent": "#C77E60"
    },
    {
      "id": "por-onde-comecar",
      "homeTheme": "theme-luz",
      "title": "Por onde começar",
      "subtitle": "Cuidado íntimo de base — a rotina que dá conforto, hidrata, protege. Sem mistério, sem promessa exagerada.",
      "skus": [
        "DS006",
        "DS009",
        "DS005",
        "DS018",
        "DS002",
        "DS004",
        "DS001",
        "DS007",
        "DS008",
        "DS012",
        "DS020",
        "DS003"
      ],
      "theme": "luz",
      "label": "Cuidado",
      "accent": "#B8862E"
    },
    {
      "id": "para-os-sentidos",
      "homeTheme": "theme-roxo",
      "title": "Para os sentidos",
      "subtitle": "Óleos beijáveis, géis, mousses — convites discretos ao toque, ao gosto, à brincadeira. Sozinha ou a dois.",
      "skus": [
        "LV017",
        "LV019",
        "LV020",
        "LV018",
        "LV021",
        "LV022",
        "LV023",
        "LV007",
        "LV008",
        "LV009",
        "LV001",
        "LV002",
        "LV005",
        "LV006",
        "LV011",
        "LV010",
        "LV003",
        "LV004"
      ],
      "theme": "roxo",
      "label": "Sentidos",
      "accent": "#E3A6C7"
    },
    {
      "id": "conhecer-pelo-toque",
      "homeTheme": "theme-verde",
      "title": "Conhecer pelo toque",
      "subtitle": "Cápsulas, dedeiras, estimuladores — pequenos, discretos, fáceis de entender. Por onde começar a explorar.",
      "skus": [
        "IA406",
        "IA363",
        "IA362",
        "IA360",
        "IA407",
        "IA453R",
        "IA453L",
        "IA420AZ",
        "IA420VE",
        "IA450S",
        "IA450V"
      ],
      "theme": "verde",
      "label": "Toque",
      "accent": "#A8C0A0"
    },
    {
      "id": "novas-descobertas",
      "homeTheme": "theme-vinho",
      "title": "Novas descobertas",
      "subtitle": "Coisas que você talvez não soubesse que existiam — disco menstrual, toalha compacta, lubrificante diário, gel em gotas. Pequenas adições, grande efeito.",
      "skus": [
        "AS359",
        "AS360",
        "IA410",
        "IA411",
        "PC051",
        "AS341"
      ],
      "theme": "vinho",
      "label": "Descobertas",
      "accent": "#E0A48A"
    }
  ],
  "products": {
    "DS006": {
      "sku": "DS006",
      "name": "Sabonete Líquido Íntimo para Região Anal Dermosex — 200ml",
      "brand": "Dermosex",
      "price": 56.8,
      "img": "products/DS006_hero.png",
      "editorial": "Para quem cuida de toda a região íntima com atenção. Formulado especificamente para a mucosa anal — mais sensível, precisa de um pH diferente.",
      "url": "https://meuhotlink.com.br/AlkymWYCM"
    },
    "DS009": {
      "sku": "DS009",
      "name": "Sabonete Íntimo em Barra Hidratante Dermosex — 90g",
      "brand": "Dermosex",
      "price": 29.8,
      "img": "products/DS009_hero.png",
      "editorial": "Formato sólido para quem quer menos embalagem. Hidrata enquanto limpa, compacto o suficiente para a mala de viagem.",
      "url": "https://meuhotlink.com.br/Alki_HytD"
    },
    "DS005": {
      "sku": "DS005",
      "name": "Espuma Higienizadora Íntima Dermosex — 50ml",
      "brand": "Dermosex",
      "price": 75.8,
      "img": "products/DS005_hero.png",
      "editorial": "Formato mousse, aplicação fácil. Para o dia a dia que precisa de praticidade sem abrir mão do cuidado específico.",
      "url": "https://meuhotlink.com.br/AlkoNfZku"
    },
    "DS018": {
      "sku": "DS018",
      "name": "Sabonete Íntimo Hidratante Feminino Dermosex — 210ml",
      "brand": "Dermosex",
      "price": 69.8,
      "img": "products/DS018_hero.png",
      "editorial": "O básico bem-feito. Espuma leve, ação hidratante real — para a rotina diária que merece mais do que sabonete comum.",
      "url": "https://meuhotlink.com.br/AlkTVRDTI"
    },
    "DS002": {
      "sku": "DS002",
      "name": "Esfoliante Hidratante para Região Pélvica Dermosex — 120ml",
      "brand": "Dermosex",
      "price": 79.8,
      "img": "products/DS002_hero.png",
      "editorial": "Uma vez por semana, no banho. Suavidade na esfoliação e hidratação na sequência — para textura, viço, pele renovada.",
      "url": "https://meuhotlink.com.br/AlkoNonSn"
    },
    "DS004": {
      "sku": "DS004",
      "name": "Creme Clareador para Virilha Dermosex — 60g",
      "brand": "Dermosex",
      "price": 65.8,
      "img": "products/DS004_hero.png",
      "editorial": "Clareamento gradual, sem apressar o processo. Uso noturno, resultado em semanas — aceitar o ritmo já é parte do cuidado.",
      "url": "https://meuhotlink.com.br/AlkXVZjBL"
    },
    "DS001": {
      "sku": "DS001",
      "name": "Creme Hidratante para Região Pélvica Dermosex — 60g",
      "brand": "Dermosex",
      "price": 69.8,
      "img": "products/DS001_hero.png",
      "editorial": "Hidratação localizada, leve, sem brilho. Pode entrar na rotina de pele como um sérum facial — uso diário, gesto curto.",
      "url": "https://meuhotlink.com.br/AlkLchlnP"
    },
    "DS007": {
      "sku": "DS007",
      "name": "Gel Lubrificante e Hidratante Pélvico Dermosex — 220ml",
      "brand": "Dermosex",
      "price": 74.8,
      "img": "products/DS007_hero.png",
      "editorial": "Lubrificante para uso diário — não só para o sexo, mas para o conforto de existir no próprio corpo. Sem perfume, base aquosa.",
      "url": "https://meuhotlink.com.br/AlklRDZcO"
    },
    "DS008": {
      "sku": "DS008",
      "name": "Desodorante Íntimo Feminino Dermosex — 100ml/60g",
      "brand": "Dermosex",
      "price": 64.8,
      "img": "products/DS008_hero.png",
      "editorial": "Sensação limpa, sem cobrir o natural. Para o dia longo, o movimento, o calor — presença discreta.",
      "url": "https://meuhotlink.com.br/AlksXmwUg"
    },
    "DS012": {
      "sku": "DS012",
      "name": "Óleo Mineral para Massagem Sensual Dermosex — 145ml",
      "brand": "Dermosex",
      "price": 59.8,
      "img": "products/DS012_hero.png",
      "editorial": "Óleo leve para massagem sensual. Escorrega bem, absorve sem grudar — para rituais a dois ou para você mesma.",
      "url": "https://meuhotlink.com.br/AlkF_H_bT"
    },
    "DS020": {
      "sku": "DS020",
      "name": "Talco Íntimo Dermosex — 100g",
      "brand": "Dermosex",
      "price": 56.8,
      "img": "products/DS020_hero.png",
      "editorial": "Para o atrito, o calor, o dia longo. Sem perfume forte, sem excesso — conforto que se coloca e se esquece.",
      "url": "https://meuhotlink.com.br/AlkjdecZY"
    },
    "DS003": {
      "sku": "DS003",
      "name": "Tônico Purificante para Região Pélvica Dermosex — 120ml",
      "brand": "Dermosex",
      "price": 69.8,
      "img": "products/DS003_hero.png",
      "editorial": "Borrife após o banho, deixe secar. Dez segundos de gesto, dias de diferença.",
      "url": "https://meuhotlink.com.br/AlkVyfnqi"
    },
    "LV017": {
      "sku": "LV017",
      "name": "Óleo Beijável Olove Sentidos Chiclete — 30ml",
      "brand": "Olove",
      "price": 24,
      "img": "products/LV017_hero.png",
      "editorial": "Doce mas não enjoativo. Pequeno o suficiente pra caber na nécessaire — discreto o suficiente pra ser surpresa.",
      "url": "https://meuhotlink.com.br/AlkQE-Jem"
    },
    "LV019": {
      "sku": "LV019",
      "name": "Óleo Beijável Olove Sentidos Morango — 30ml",
      "brand": "Olove",
      "price": 24,
      "img": "products/LV019_hero.png",
      "editorial": "Leve, beijável, frutado. Intercambiável com o chiclete — depende do humor do dia.",
      "url": "https://meuhotlink.com.br/AlkiniHEV"
    },
    "LV020": {
      "sku": "LV020",
      "name": "Óleo Beijável Olove Sentidos Algodão Doce — 30ml",
      "brand": "Olove",
      "price": 24,
      "img": "products/LV020_hero.png",
      "editorial": "Doce de um jeito suave, quase tímido. Para quem quer algo presente sem ser intenso.",
      "url": "https://meuhotlink.com.br/AlkvaJQTk"
    },
    "LV018": {
      "sku": "LV018",
      "name": "Óleo Beijável Olove Sentidos Menta Ice — 30ml",
      "brand": "Olove",
      "price": 24,
      "img": "products/LV018_hero.png",
      "editorial": "O toque refrescante da linha. Sensação mentolada que surpreende — começar com pouco é a regra.",
      "url": "https://meuhotlink.com.br/AlkJ-AOOQ"
    },
    "LV021": {
      "sku": "LV021",
      "name": "Óleo Beijável Olove Sentidos Mel — 30ml",
      "brand": "Olove",
      "price": 24,
      "img": "products/LV021_hero.png",
      "editorial": "O mais clássico da linha. Sabor natural, quase não precisa de apresentação — combina com tudo.",
      "url": "https://meuhotlink.com.br/AlkrlVSnq"
    },
    "LV022": {
      "sku": "LV022",
      "name": "Gel Excitante Beijável Loveshock Morango Olove — 15g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV022_hero.png",
      "editorial": "Gel excitante com sabor morango e efeito esquenta. Loveshock é a linha mais concentrada da Olove — pouco serve.",
      "url": "https://meuhotlink.com.br/AlkUSYXxA"
    },
    "LV023": {
      "sku": "LV023",
      "name": "Gel Excitante Beijável Loveshock Chiclete Olove — 15g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV023_hero.png",
      "editorial": "Mesmo efeito Loveshock, sabor chiclete. Para quem prefere o doce conhecido em vez do frutado.",
      "url": "https://meuhotlink.com.br/AlkCXTXYZ"
    },
    "LV007": {
      "sku": "LV007",
      "name": "Óleo para Massagem Sensual Olove Massage — 120ml",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV007_hero.png",
      "editorial": "Mais encorpado que os óleos Sentidos, desenvolvido para deslizamento. Para rituais mais longos.",
      "url": "https://meuhotlink.com.br/AlkUsqEdS"
    },
    "LV008": {
      "sku": "LV008",
      "name": "Desodorante Íntimo Olove Seduction — 60g/100ml",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV008_hero.png",
      "editorial": "Cheiro discreto, longa duração — pensado pra ser percebido só quando se quer ser percebida.",
      "url": "https://meuhotlink.com.br/AlkRTrgNq"
    },
    "LV009": {
      "sku": "LV009",
      "name": "Mousse Corporal Efervescente Olove Explosion — 100g/150ml",
      "brand": "Olove",
      "price": 89.8,
      "img": "products/LV009_hero.png",
      "editorial": "Aplica na pele e efervesce sob o toque. Sensação inesperada, brincadeira boa — vale o passo extra.",
      "url": "https://meuhotlink.com.br/AlkGYEOgB"
    },
    "LV001": {
      "sku": "LV001",
      "name": "Gel Excitante Olove Beijável Amoracita — 10g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV001_hero.png",
      "editorial": "Gel excitante com efeito mais suave. Boa entrada para quem está começando a explorar essa categoria.",
      "url": "https://meuhotlink.com.br/AlkVNMwOG"
    },
    "LV002": {
      "sku": "LV002",
      "name": "Gel Excitante Olove Beijável Melancita — 10g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV002_hero.png",
      "editorial": "Sabor melancia com efeito excitante. Para quem gosta de combinar o sensorial com o lúdico.",
      "url": "https://meuhotlink.com.br/AlknAAANe"
    },
    "LV005": {
      "sku": "LV005",
      "name": "Gel Excitante Olove Strong — 10g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV005_hero.png",
      "editorial": "A versão mais intensa dos excitantes Olove. Não é o começo — é o próximo nível para quem já conhece.",
      "url": "https://meuhotlink.com.br/AlkFQWzoZ"
    },
    "LV006": {
      "sku": "LV006",
      "name": "Gel Prolongador Olove Control+ — 10g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV006_hero.png",
      "editorial": "Gel prolongador — diminui a hipersensibilidade sem eliminar o prazer. Para quem quer durar mais no próprio ritmo.",
      "url": "https://meuhotlink.com.br/AlkTbCdPP"
    },
    "LV011": {
      "sku": "LV011",
      "name": "Spray Bucal Olove Gulosa Chiclete — 15ml",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV011_hero.png",
      "editorial": "Refrescância de chiclete num spray pequeno. Para o beijo longo, para começar bem o dia.",
      "url": "https://meuhotlink.com.br/AlkNxNAxi"
    },
    "LV010": {
      "sku": "LV010",
      "name": "Refrescante Bucal Extra Forte Olove Refresh — 30ml",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV010_hero.png",
      "editorial": "Refrescante bucal mais duradouro que o spray. Para quando o momento precisa de mais presença.",
      "url": "https://meuhotlink.com.br/AlkQoLnaK"
    },
    "LV003": {
      "sku": "LV003",
      "name": "Gel Lubrificante Beijável Olove Gelatto Morango — 30g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV003_hero.png",
      "editorial": "Lubrifica, hidrata, tem gosto bom. Três coisas em 30g — à base d'água, seguro com preservativo.",
      "url": "https://meuhotlink.com.br/AlkVTSiTO"
    },
    "LV004": {
      "sku": "LV004",
      "name": "Gel Excitante Beijável Olove Muchacha — 10g",
      "brand": "Olove",
      "price": 49.8,
      "img": "products/LV004_hero.png",
      "editorial": "Gel excitante beijável com sabor tropical. Um dos favoritos da linha — pela combinação de aroma e efeito.",
      "url": "https://meuhotlink.com.br/AlkmgiXyz"
    },
    "IA406": {
      "sku": "IA406",
      "name": "Cápsula Vibratória Multivelocidade Recarregável Go Vibe Pink",
      "brand": "Go Vibe",
      "price": 179,
      "img": "products/IA406_hero.png",
      "editorial": "Clássica. Pequena, silenciosa, eficaz — por onde começar a explorar. Em rosa.",
      "url": "https://meuhotlink.com.br/AlkfPKIlb"
    },
    "IA363": {
      "sku": "IA363",
      "name": "Dedeira Vibratória Recarregável Go Vibe Bia — 9,1 cm × 3 cm",
      "brand": "Go Vibe",
      "price": 99,
      "img": "products/IA363_hero.png",
      "editorial": "Dedeira vibratória recarregável — você guia, você decide a pressão. Compacta (9 cm), discreta, fácil de usar.",
      "url": "https://meuhotlink.com.br/AlkyX_Xgt"
    },
    "IA362": {
      "sku": "IA362",
      "name": "Estimulador de Clitóris Recarregável Go Vibe Yes",
      "brand": "Go Vibe",
      "price": 320,
      "img": "products/IA362_hero.png",
      "editorial": "Estimulador de clitóris recarregável — uma sensação diferente da cápsula. O passo seguinte natural, da Go Vibe.",
      "url": "https://meuhotlink.com.br/AlktoeDfo"
    },
    "IA360": {
      "sku": "IA360",
      "name": "Cápsula Vibratória Multivelocidade Recarregável Go Vibe Purple",
      "brand": "Go Vibe",
      "price": 179,
      "img": "products/IA360_hero.png",
      "editorial": "A versão roxa da Go Vibe. Clássica no desempenho, com personalidade visual.",
      "url": "https://meuhotlink.com.br/AlkzdKUcK"
    },
    "IA407": {
      "sku": "IA407",
      "name": "Vibrador de Calcinha Recarregável Go Vibe Lis",
      "brand": "Go Vibe",
      "price": 299,
      "img": "products/IA407_hero.png",
      "editorial": "Vibrador de calcinha recarregável, com controle. Discreto sob a roupa — sozinha ou a dois.",
      "url": "https://meuhotlink.com.br/AlkQHmgXv"
    },
    "IA453R": {
      "sku": "IA453R",
      "name": "Dedeira Vibratória Recarregável Sweet Vibe Cafuné — Rosa",
      "brand": "Sweet Vibe",
      "price": 129,
      "img": "products/IA453R_hero.png",
      "editorial": "Dedeira recarregável — você guia, você decide a pressão. Silicone macio, várias intensidades, bateria boa. Em rosa.",
      "url": "https://meuhotlink.com.br/AlkmbhLEd"
    },
    "IA453L": {
      "sku": "IA453L",
      "name": "Dedeira Vibratória Recarregável Sweet Vibe Cafuné — Lilás",
      "brand": "Sweet Vibe",
      "price": 129,
      "img": "products/IA453L_hero.png",
      "editorial": "O mesmo Cafuné em lilás. Mesmo desempenho — a cor é da preferência.",
      "url": "https://meuhotlink.com.br/AlkrYkWaK"
    },
    "IA420AZ": {
      "sku": "IA420AZ",
      "name": "Vibrador Multivelocidade Recarregável Sweet Vibe Dengo — Verde",
      "brand": "Sweet Vibe",
      "price": 125,
      "img": "products/IA420AZ_hero.png",
      "editorial": "Vibrador pequeno e versátil, fácil de usar. Formato concentrado, vários modos de vibração. Em verde.",
      "url": "https://meuhotlink.com.br/AlkLqcTLA"
    },
    "IA420VE": {
      "sku": "IA420VE",
      "name": "Vibrador Multivelocidade Recarregável Sweet Vibe Dengo — Azul",
      "brand": "Sweet Vibe",
      "price": 125,
      "img": "products/IA420VE_hero.png",
      "editorial": "Dengo na versão azul. Compacto, discreto — entrega bem.",
      "url": "https://meuhotlink.com.br/AlkZnFGUr"
    },
    "IA450S": {
      "sku": "IA450S",
      "name": "Estimulador de Clitóris Recarregável Sweet Vibe Xêro — Lilás",
      "brand": "Sweet Vibe",
      "price": 149,
      "img": "products/IA450S_hero.png",
      "editorial": "Estimulador de clitóris recarregável. Para quem quer uma sensação diferente da cápsula — o passo seguinte natural. Em lilás.",
      "url": "https://meuhotlink.com.br/AlkQZCGKG"
    },
    "IA450V": {
      "sku": "IA450V",
      "name": "Estimulador de Clitóris Recarregável Sweet Vibe Xêro — Verde",
      "brand": "Sweet Vibe",
      "price": 149,
      "img": "products/IA450V_hero.png",
      "editorial": "Xêro na versão verde. Mesma entrega, mais discrição visual.",
      "url": "https://meuhotlink.com.br/AlkvdhkAj"
    },
    "AS359": {
      "sku": "AS359",
      "name": "Gel Lubrificante Hidra Confort Feminist — 220g",
      "brand": "Feminist",
      "price": 69.8,
      "img": "products/AS359_hero.png",
      "editorial": "Lubrificante hidratante para uso diário. A versão grande — para ter em casa, sem preocupação com acabar. Base aquosa, seguro para todos os tipos de uso.",
      "url": "https://meuhotlink.com.br/AlkbnuN-R"
    },
    "AS360": {
      "sku": "AS360",
      "name": "Gel Lubrificante Hidra Confort Feminist — 70g",
      "brand": "Feminist",
      "price": 34.8,
      "img": "products/AS360_hero.png",
      "editorial": "A versão compacta do Hidra Confort. Mesmo gel hidratante, formato de bolsa — para a viagem, a nécessaire, o fora de casa.",
      "url": "https://meuhotlink.com.br/AlkwsgdKi"
    },
    "IA410": {
      "sku": "IA410",
      "name": "Disco Menstrual Feminist A — 30ml",
      "brand": "Feminist",
      "price": 43.75,
      "img": "products/IA410_hero.png",
      "editorial": "Para fluxo leve a moderado. Silicone médico, até 12 horas de uso — menos lixo, menos custo recorrente do que o absorvente.",
      "url": "https://meuhotlink.com.br/AlkxVizpZ"
    },
    "IA411": {
      "sku": "IA411",
      "name": "Disco Menstrual Feminist B — 50ml",
      "brand": "Feminist",
      "price": 43.75,
      "img": "products/IA411_hero.png",
      "editorial": "Capacidade maior para fluxo intenso. Mesmo silicone, mesmo tempo de uso — a versão para os dias mais cheios.",
      "url": "https://meuhotlink.com.br/AlkaTxbuw"
    },
    "PC051": {
      "sku": "PC051",
      "name": "Toalha Compacta Descartável para Higiene Feminist — 10 un",
      "brand": "Feminist",
      "price": 27.8,
      "img": "products/PC051_hero.png",
      "editorial": "Toalha compactada descartável — expande com água. Para o ginásio, a viagem, o carro. Discreta no fundo da bolsa.",
      "url": "https://meuhotlink.com.br/AlktcAIEh"
    },
    "AS341": {
      "sku": "AS341",
      "name": "Gel Excitante Feminino em Gotas My Secret — 15ml",
      "brand": "Cosméticos & Acessórios",
      "price": 49.8,
      "img": "products/AS341_hero.png",
      "editorial": "Concentrado em gotas, efeito esquenta-esfria localizado. Uma gota serve — para quem quer um detalhe novo sem grande entrada.",
      "url": "https://meuhotlink.com.br/AlkBGJduJ"
    }
  }
};
