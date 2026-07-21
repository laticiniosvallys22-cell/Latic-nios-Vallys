export const productCategories = [
  "Queijos",
  "Bebidas Lácteas",
  "Manteigas",
];

export const categoryStyles = {
  "Leites": {
    text: "text-[#1a2a6c] group-hover:text-[#111c47]",
    textStatic: "text-[#1a2a6c]",
    icon: "text-[#1a2a6c] group-hover:text-[#111c47]",
    line: "bg-[#1a2a6c]/30 group-hover:bg-[#1a2a6c]/50",
    lineStatic: "bg-[#1a2a6c]/20",
    badge: "bg-[#1a2a6c]/10 text-[#1a2a6c]",
    buttonActive: "border-[#1a2a6c] bg-[#1a2a6c] text-white shadow-sm",
    cardBg: "bg-[#1a2a6c]",
  },
  "Queijos": {
    text: "text-[#1a2a6c] group-hover:text-[#111c47]",
    textStatic: "text-[#1a2a6c]",
    icon: "text-[#1a2a6c] group-hover:text-[#111c47]",
    line: "bg-[#1a2a6c]/30 group-hover:bg-[#1a2a6c]/50",
    lineStatic: "bg-[#1a2a6c]/20",
    badge: "bg-[#1a2a6c]/10 text-[#1a2a6c]",
    buttonActive: "border-[#1a2a6c] bg-[#1a2a6c] text-white shadow-sm",
    cardBg: "bg-[#1a2a6c]",
  },
  "Bebidas Lácteas": {
    text: "text-[#2c3384] group-hover:text-[#1f245c]",
    textStatic: "text-[#2c3384]",
    icon: "text-[#2c3384] group-hover:text-[#1f245c]",
    line: "bg-[#2c3384]/30 group-hover:bg-[#2c3384]/50",
    lineStatic: "bg-[#2c3384]/20",
    badge: "bg-[#2c3384]/10 text-[#2c3384]",
    buttonActive: "border-[#2c3384] bg-[#2c3384] text-white shadow-sm",
    cardBg: "bg-[#2c3384]",
  },
  "Doces": {
    text: "text-[#2c3384] group-hover:text-[#1f245c]",
    textStatic: "text-[#2c3384]",
    icon: "text-[#2c3384] group-hover:text-[#1f245c]",
    line: "bg-[#2c3384]/30 group-hover:bg-[#2c3384]/50",
    lineStatic: "bg-[#2c3384]/20",
    badge: "bg-[#2c3384]/10 text-[#2c3384]",
    buttonActive: "border-[#2c3384] bg-[#2c3384] text-white shadow-sm",
    cardBg: "bg-[#2c3384]",
  },
  "Manteigas": {
    text: "text-[#154687] group-hover:text-[#0e315e]",
    textStatic: "text-[#154687]",
    icon: "text-[#154687] group-hover:text-[#0e315e]",
    line: "bg-[#154687]/30 group-hover:bg-[#154687]/50",
    lineStatic: "bg-[#154687]/20",
    badge: "bg-[#154687]/10 text-[#154687]",
    buttonActive: "border-[#154687] bg-[#154687] text-white shadow-sm",
    cardBg: "bg-[#154687]",
  },
};

export function getCategoryStyle(category) {
  let cat = category;
  if (cat === "Iogurtes") {
    cat = "Bebidas Lácteas";
  }
  return categoryStyles[cat] || {
    text: "text-amber-500 group-hover:text-amber-600",
    textStatic: "text-amber-500",
    icon: "text-amber-500 group-hover:text-amber-600",
    line: "bg-gray-300 group-hover:bg-gray-400",
    lineStatic: "bg-gray-200",
    badge: "bg-orange-50 text-orange-600",
    buttonActive: "border-orange-500 bg-orange-500 text-white shadow-sm",
    cardBg: "bg-sky-500",
  };
}

export const recipeCategories = [
  "Cafe da manha",
  "Lanches",
  "Sobremesas",
  "Pratos quentes",
];

export const demoProducts = [];

export const demoRecipes = [
  {
    id: "pao-com-manteiga-vallys",
    title: "Pão com Manteiga Vallys na Chapa",
    category: "Cafe da manha",
    description:
      "O clássico pão francês quentinho e tostado uniformemente com o sabor irresistível da Manteiga com Sal Vallys.",
    prepTime: "10 min",
    difficulty: "Facil",
    ingredients: "2 pães franceses, 2 colheres de sopa de Manteiga com Sal Vallys.",
    instructions:
      "Corte os pães ao meio. Espalhe uma colher de sopa de Manteiga Vallys em cada pão. Aqueça uma frigideira ou chapa em fogo médio. Coloque o pão com a parte da manteiga voltada para baixo. Deixe dourar até formar uma casquinha crocante. Sirva quentinho com café!",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1000&q=80",
    featured: true,
  },
  {
    id: "pizza-mussarela-vallys",
    title: "Pizza Suprema de Mussarela Vallys",
    category: "Pratos quentes",
    description:
      "Massa artesanal coberta com o derretimento perfeito da Mussarela Vallys e bordas recheadas de Requeijão Cremoso Vallys.",
    prepTime: "30 min",
    difficulty: "Media",
    ingredients: "1 disco de massa de pizza pré-assado, 300g de Mussarela Vallys ralada, 150g de Requeijão Cremoso Vallys, 4 colheres de molho de tomate caseiro, orégano a gosto.",
    instructions:
      "Preaqueça o forno a 220°C. Com a bisnaga de Requeijão Vallys, faça uma linha de recheio ao redor da borda da massa e dobre a massa sobre o requeijão, pressionando para selar. Espalhe o molho de tomate no centro da massa. Distribua a Mussarela Vallys por cima. Polvilhe orégano e asse por 15 minutos até gratinar.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    featured: true,
  },
  {
    id: "escondidinho-carne-seca-vallys",
    title: "Escondidinho de Carne Seca com Requeijão Vallys",
    category: "Pratos quentes",
    description:
      "Purê cremoso de mandioca recheado com carne seca refogada e uma camada generosa de Requeijão e Mussarela Vallys para gratinar.",
    prepTime: "45 min",
    difficulty: "Media",
    ingredients: "1kg de mandioca cozida e espremida, 500g de carne seca dessalgada e desfiada, 1 pote de Requeijão Cremoso Vallys, 200g de Mussarela Vallys ralada, 1 colher de Manteiga Vallys, 1 cebola.",
    instructions:
      "Refogue a cebola e a carne seca na Manteiga Vallys. Misture a mandioca espremida com um pouco de leite para fazer o purê. Em um refratário, coloque metade do purê, a carne seca, espalhe o Requeijão Vallys e cubra com o restante do purê. Finalize cobrindo com a Mussarela Vallys ralada e asse a 200°C por 20 minutos até dourar.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    featured: true,
  },
  // ─── Lanches ──────────────────────────────────────────────────
  {
    id: "misto-quente-mussarela-vallys",
    title: "Misto Quente Gratinado com Mussarela Vallys",
    category: "Lanches",
    description:
      "O clássico misto quente levado a outro nível com fatias generosas de Mussarela Vallys derretida e um toque de Manteiga Vallys na chapa.",
    prepTime: "15 min",
    difficulty: "Facil",
    ingredients: "2 fatias de pão de forma, 3 fatias de Mussarela Vallys, 2 fatias de presunto, 1 colher de sopa de Manteiga Vallys, orégano a gosto.",
    instructions:
      "Monte o sanduíche alternando camadas de presunto e Mussarela Vallys entre as fatias de pão. Espalhe a Manteiga Vallys na parte externa de cada fatia. Aqueça uma frigideira em fogo médio-baixo. Grelhe o sanduíche pressionando com uma espátula até dourar dos dois lados. A Mussarela deve ficar completamente derretida e elástica. Polvilhe orégano por cima e sirva quente.",
    image: "/receitas/misto-quente.png",
    featured: true,
  },
  {
    id: "pao-de-queijo-vallys",
    title: "Pão de Queijo Mineiro com Queijo Vallys",
    category: "Lanches",
    description:
      "Receita tradicional mineira de pão de queijo feito com polvilho e queijo Mussarela Vallys ralado, crocante por fora e macio por dentro.",
    prepTime: "40 min",
    difficulty: "Media",
    ingredients: "500g de polvilho azedo, 1 xícara de leite, 1/2 xícara de óleo, 2 ovos, 200g de Mussarela Vallys ralada, 1 colher de chá de sal.",
    instructions:
      "Aqueça o leite com o óleo e o sal até ferver. Despeje sobre o polvilho e mexa bem até escaldar. Deixe esfriar um pouco e acrescente os ovos, um de cada vez, misturando bem. Adicione a Mussarela Vallys ralada e amasse até formar uma massa homogênea. Modele bolinhas com as mãos untadas e coloque em uma assadeira. Asse em forno preaquecido a 180°C por 25 minutos até dourar.",
    image: "/receitas/pao-de-queijo.png",
    featured: true,
  },
  {
    id: "crepioca-queijo-vallys",
    title: "Crepioca Recheada com Requeijão Vallys",
    category: "Lanches",
    description:
      "Crepioca leve e saudável recheada com Requeijão Cremoso Vallys e Mussarela derretida — perfeita para um lanche rápido e nutritivo.",
    prepTime: "10 min",
    difficulty: "Facil",
    ingredients: "2 colheres de sopa de tapioca granulada, 1 ovo, 2 colheres de sopa de Requeijão Cremoso Vallys, 50g de Mussarela Vallys ralada, sal a gosto.",
    instructions:
      "Misture a tapioca granulada com o ovo e uma pitada de sal. Aqueça uma frigideira antiaderente em fogo médio. Despeje a massa e espalhe formando um disco fino. Quando a parte de baixo firmar, espalhe o Requeijão Vallys e distribua a Mussarela ralada. Dobre ao meio e deixe por mais 1 minuto até o queijo derreter. Sirva imediatamente.",
    image: "/receitas/crepioca-queijo.png",
    featured: true,
  },
  // ─── Sobremesas ───────────────────────────────────────────────
  {
    id: "pudim-leite-vallys",
    title: "Pudim de Leite com Manteiga Vallys",
    category: "Sobremesas",
    description:
      "Pudim cremoso e aveludado feito com leite fresco e um toque especial de Manteiga Vallys na calda caramelizada.",
    prepTime: "50 min",
    difficulty: "Media",
    ingredients: "1 lata de leite condensado, 1 lata de leite (mesma medida), 3 ovos, 1 colher de sopa de Manteiga Vallys, 1 xícara de açúcar para a calda.",
    instructions:
      "Prepare a calda derretendo o açúcar em uma panela com a Manteiga Vallys até ficar dourado. Despeje na forma e gire para cobrir o fundo e as laterais. No liquidificador, bata o leite condensado, o leite e os ovos por 3 minutos. Despeje a mistura na forma caramelizada. Cubra com papel alumínio e asse em banho-maria a 180°C por 40 minutos. Deixe esfriar completamente antes de desenformar e leve à geladeira por 4 horas.",
    image: "/receitas/pudim-leite.png",
    featured: true,
  },
  {
    id: "mousse-maracuja-requeijao-vallys",
    title: "Mousse de Maracujá com Requeijão Vallys",
    category: "Sobremesas",
    description:
      "Mousse leve e refrescante de maracujá com uma base cremosa de Requeijão Vallys que dá textura aveludada única.",
    prepTime: "20 min",
    difficulty: "Facil",
    ingredients: "1 lata de leite condensado, 1 lata de creme de leite, 1/2 xícara de suco de maracujá concentrado, 3 colheres de sopa de Requeijão Cremoso Vallys, sementes de maracujá para decorar.",
    instructions:
      "No liquidificador, bata o leite condensado, o creme de leite, o suco de maracujá e o Requeijão Cremoso Vallys até ficar homogêneo. Distribua em taças individuais. Leve à geladeira por pelo menos 3 horas até firmar. Decore com sementes de maracujá fresco antes de servir.",
    image: "/receitas/mousse-maracuja.png",
    featured: true,
  },
  {
    id: "romeu-julieta-vallys",
    title: "Romeu e Julieta com Queijo Vallys",
    category: "Sobremesas",
    description:
      "A clássica combinação brasileira de queijo fresco com goiabada, usando Mussarela Vallys levemente derretida sobre fatias de goiabada cascão.",
    prepTime: "10 min",
    difficulty: "Facil",
    ingredients: "200g de Mussarela Vallys em fatias grossas, 200g de goiabada cascão em fatias, mel a gosto, folhas de hortelã para decorar.",
    instructions:
      "Corte a Mussarela Vallys e a goiabada em fatias de espessura semelhante. Monte em um prato alternando fatias de queijo e goiabada. Se desejar, leve ao micro-ondas por 20 segundos para o queijo amolecer levemente. Regue com um fio de mel e decore com folhas de hortelã fresca. Sirva como sobremesa ou acompanhamento do café.",
    image: "/receitas/romeu-julieta.png",
    featured: true,
  },
];

export const demoHighlights = [
  {
    id: "mussarela-vallys",
    image: "/hero/img1.png",
    titleLeft: "Mussarela Vallys",
    subtitleLeft: "Derretimento Perfeito",
    textRight: "QUALIDADE QUE DERRETE",
    badge: "100% Puro & Natural",
  },
  {
    id: "requeijao-cremoso",
    image: "/hero/img2.png",
    titleLeft: "Requeijão Cremoso",
    subtitleLeft: "Bisnaga de 1.8kg",
    textRight: "MAIS SABOR NAS RECEITAS",
    badge: "Qualidade Premium",
  },
  {
    id: "requeijao-de-pote",
    image: "/hero/img4.png",
    titleLeft: "Requeijão de Pote",
    subtitleLeft: "Cremoso & Suave",
    textRight: "O VERDADEIRO REQUEIJÃO",
    badge: "Muito mais Sabor",
  },
];
