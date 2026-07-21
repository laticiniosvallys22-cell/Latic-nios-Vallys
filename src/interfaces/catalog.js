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
