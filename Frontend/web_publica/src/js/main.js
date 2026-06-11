// get/allcategorias
window.CATEGORIES = [
  "Cremosos", 
  "Frutas", 
  "Nuts", 
  "Milkshakes", 
  "Sundaes", 
  "Clássicos"
];

// get/alltamanhos
window.SIZES = ["P", "M", "G"];


// get/allingredientes
window.INGREDIENT_OPTIONS = [
  "Leite integral", "Creme de leite", "Chocolate belga", "Baunilha de Madagascar",
  "Morango fresco", "Pistache siciliano", "Avelã torrada", "Cookies",
  "Caramelo salgado", "Doce de leite", "Frutas vermelhas", "Açaí",
  "Menta fresca", "Granola crocante", "Chantilly", "Açúcar orgânico"
];

// get/allprodutos
window.PRODUCTS = [
  {
    id: "chocolate-supremo",
    name: "Chocolate Supremo",
    flavor: "Chocolate belga 70%",
    category: "Cremosos",
    price: 18.9,
    rating: 4.9,
    image: "assets/ice-chocolate.jpg",
    description: "Um sorvete intensamente cremoso feito com chocolate belga 70% cacau, leite fresco e um toque de baunilha de Madagascar. Cada colherada derrete devagar, liberando notas profundas e levemente amargas.",
    ingredients: ["Chocolate belga 70%", "Leite integral", "Creme de leite fresco", "Açúcar orgânico", "Baunilha de Madagascar"],
    tag: "Em Alta"
  },
  {
    id: "morango-nevado",
    name: "Morango Nevado",
    flavor: "Morango fresco",
    category: "Frutas",
    price: 16.5,
    rating: 4.8,
    image: "assets/ice-strawberry.jpg",
    description: "Sorvete artesanal de morango com pedaços reais da fruta selecionada. Refrescante, leve e levemente azedinho — perfeito para os dias quentes.",
    ingredients: ["Morangos frescos", "Creme de leite", "Leite integral", "Açúcar demerara", "Limão siciliano"],
    tag: "Novo"
  },
  {
    id: "pistache-premium",
    name: "Pistache Premium",
    flavor: "Pistache siciliano",
    category: "Nuts",
    price: 22.0,
    rating: 4.9,
    image: "assets/ice-pistachio.jpg",
    description: "Receita italiana com pistaches sicilianos torrados e moídos artesanalmente. Textura sedosa e sabor sofisticado em cada colherada.",
    ingredients: ["Pasta de pistache siciliano", "Leite", "Creme fresco", "Açúcar", "Pistaches crocantes"]
  },
  {
    id: "baunilha-cream",
    name: "Baunilha Cream",
    flavor: "Baunilha de Madagascar",
    category: "Clássicos",
    price: 15.9,
    rating: 4.7,
    image: "assets/ice-vanilla.jpg",
    description: "A clássica baunilha reinventada. Favas de Madagascar infusionadas lentamente em creme fresco para uma experiência delicada e perfumada.",
    ingredients: ["Favas de baunilha de Madagascar", "Creme de leite fresco", "Leite", "Gema de ovo", "Açúcar"]
  },
  {
    id: "cookies-cream",
    name: "Cookies & Cream",
    flavor: "Biscoito chocolate",
    category: "Cremosos",
    price: 17.5,
    rating: 4.8,
    image: "assets/ice-cookies.jpg",
    description: "Sorvete de creme com generosos pedaços de cookies de chocolate. O equilíbrio perfeito entre crocante e cremoso.",
    ingredients: ["Creme de leite", "Cookies de chocolate", "Leite", "Açúcar", "Baunilha"]
  },
  {
    id: "milkshake-ovomaltine",
    name: "Milkshake de Ovomaltine",
    flavor: "Ovomaltine crocante",
    category: "Milkshakes",
    price: 24.9,
    rating: 5.0,
    image: "assets/ice-milkshake.jpg",
    description: "Milkshake encorpado batido na hora com sorvete de creme e flocos crocantes de Ovomaltine. Servido com chantilly e calda.",
    ingredients: ["Sorvete de creme", "Leite gelado", "Ovomaltine flocos", "Chantilly", "Calda de chocolate"],
    tag: "Mais pedido"
  },
  {
    id: "acai-tropical",
    name: "Açaí Tropical",
    flavor: "Açaí com frutas",
    category: "Frutas",
    price: 21.0,
    rating: 4.6,
    image: "assets/ice-acai.jpg",
    description: "Polpa pura de açaí amazônico batida com banana e finalizada com granola, frutas frescas e mel orgânico.",
    ingredients: ["Polpa de açaí", "Banana", "Granola crocante", "Mel orgânico", "Frutas frescas"]
  },
  {
    id: "sundae-caramelo",
    name: "Sundae Caramelo",
    flavor: "Caramelo salgado",
    category: "Sundaes",
    price: 23.5,
    rating: 4.9,
    image: "assets/ice-sundae.jpg",
    description: "Sundae com sorvete de creme, calda artesanal de caramelo salgado, amêndoas torradas e chantilly fresco.",
    ingredients: ["Sorvete de creme", "Caramelo salgado", "Amêndoas torradas", "Chantilly", "Flor de sal"]
  },
  {
    id: "menta-glacial",
    name: "Menta Glacial",
    flavor: "Menta com chocolate",
    category: "Cremosos",
    price: 17.9,
    rating: 4.7,
    image: "assets/ice-vanilla.jpg",
    description: "Refrescância intensa de menta fresca com lascas de chocolate amargo. Sensação gelada em cada colherada.",
    ingredients: ["Menta fresca", "Chocolate amargo", "Creme de leite", "Leite", "Açúcar"]
  },
  {
    id: "frutas-vermelhas",
    name: "Frutas Vermelhas",
    flavor: "Mix de berries",
    category: "Frutas",
    price: 19.5,
    rating: 4.8,
    image: "assets/ice-strawberry.jpg",
    description: "Mix de framboesa, amora e mirtilo com creme suave. Sabor intenso e cor vibrante.",
    ingredients: ["Framboesa", "Amora", "Mirtilo", "Creme de leite", "Açúcar"]
  },
  {
    id: "avela-italiana",
    name: "Avelã Italiana",
    flavor: "Avelã torrada",
    category: "Nuts",
    price: 22.5,
    rating: 4.9,
    image: "assets/ice-pistachio.jpg",
    description: "Avelãs italianas torradas e moídas com creme aveludado. Sofisticação em cada colher.",
    ingredients: ["Pasta de avelã", "Leite", "Creme fresco", "Açúcar mascavo", "Avelãs torradas"]
  },
  {
    id: "doce-de-leite",
    name: "Doce de Leite",
    flavor: "Doce de leite argentino",
    category: "Clássicos",
    price: 18.5,
    rating: 4.8,
    image: "assets/ice-sundae.jpg",
    description: "Sorvete cremoso com doce de leite argentino artesanal e raspas de chocolate.",
    ingredients: ["Doce de leite", "Creme de leite", "Leite", "Chocolate", "Açúcar"]
  },
  {
    id: "milkshake-morango",
    name: "Milkshake de Morango",
    flavor: "Morango fresco",
    category: "Milkshakes",
    price: 23.9,
    rating: 4.7,
    image: "assets/ice-milkshake.jpg",
    description: "Milkshake aveludado de morango fresco com chantilly e calda da casa.",
    ingredients: ["Sorvete de morango", "Leite gelado", "Morangos frescos", "Chantilly", "Calda"]
  },
  {
    id: "banana-split",
    name: "Banana Split",
    flavor: "Banana caramelizada",
    category: "Sundaes",
    price: 24.5,
    rating: 4.9,
    image: "assets/ice-sundae.jpg",
    description: "Banana caramelizada, três bolas de sorvete, calda quente de chocolate e nozes.",
    ingredients: ["Banana", "Sorvete de creme", "Chocolate quente", "Nozes", "Chantilly"]
  },
  {
    id: "cookies-duplo",
    name: "Cookies Duplo",
    flavor: "Cookies & brownie",
    category: "Cremosos",
    price: 19.9,
    rating: 4.9,
    image: "assets/ice-cookies.jpg",
    description: "Sorvete cremoso com pedaços de cookies e brownie em dose dupla.",
    ingredients: ["Cookies", "Brownie", "Creme de leite", "Chocolate", "Açúcar"]
  },
  {
    id: "manga-tropical",
    name: "Manga Tropical",
    flavor: "Manga madura",
    category: "Frutas",
    price: 18.0,
    rating: 4.6,
    image: "assets/ice-acai.jpg",
    description: "Manga madura selecionada com toque de maracujá. Refrescante e tropical.",
    ingredients: ["Manga", "Maracujá", "Creme de leite", "Açúcar", "Limão"]
  }
];

// Funções utilitárias e manipulações do array
window.PRODUCTS.forEach((p, i) => {
  p.sizes = ["P", "M", "G"];
  if (i % 3 === 0) {
    p.oldPrice = Math.round(p.price * 1.25 * 10) / 10;
  }
});

//substituir pelo search de nome depois
window.getProduct = (id) => window.PRODUCTS.find((p) => p.id === id);

window.formatarPreco = (n) => "R$ " + n.toFixed(2).replace(".", ",");

//Altera certos caracteres em entidades html, impedindo alguns erros de segurança (xss - Cross Site Scripting) que o innerhtml traz
window.escapeHtml = (s) => 
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));