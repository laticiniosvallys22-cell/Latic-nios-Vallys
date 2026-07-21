"use client";

import { useMemo, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Clock, ChefHat, DollarSign, ArrowLeft, Search, Coffee, UtensilsCrossed, Sandwich, CakeSlice } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { Badge } from "@/components/ui/badge";
import { recipeCategories } from "@/interfaces/catalog";
import { useRecipes } from "@/hooks/useRecipes";

const categoryIcons = {
  "Cafe da manha": Coffee,
  "Lanches": Sandwich,
  "Sobremesas": CakeSlice,
  "Pratos quentes": UtensilsCrossed,
};

function RecipesContent() {
  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const { recipes, loading, error } = useRecipes();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeRecipeId = searchParams.get("id");

  const selectedRecipe = useMemo(() => {
    if (!activeRecipeId) return null;
    return recipes.find((r) => r.id === activeRecipeId);
  }, [recipes, activeRecipeId]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const categoryMatches = category === "Todas" || recipe.category === category;
      const searchMatches = recipe.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatches && searchMatches;
    });
  }, [category, recipes, search]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-muted">Carregando receitas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  if (selectedRecipe) {
    const ingredientsList = selectedRecipe.ingredients
      ? selectedRecipe.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
      : [];
    const stepsList = selectedRecipe.instructions
      ? selectedRecipe.instructions.split(". ").map((s) => s.trim()).filter(Boolean)
      : [];

    const getIngredientEmoji = (name) => {
      const n = name.toLowerCase();
      if (n.includes("sal")) return "🧂";
      if (n.includes("água") || n.includes("agua")) return "💧";
      if (n.includes("leite")) return "🥛";
      if (n.includes("manteiga")) return "🧈";
      if (n.includes("queijo") || n.includes("mussarela")) return "🧀";
      if (n.includes("carne") || n.includes("presunto")) return "🥩";
      if (n.includes("farinha") || n.includes("milharina")) return "🌽";
      if (n.includes("mandioca")) return "🍠";
      if (n.includes("cebola")) return "🧅";
      if (n.includes("alho")) return "🧄";
      if (n.includes("ovo")) return "🥚";
      if (n.includes("tapioca") || n.includes("polvilho")) return "🫓";
      if (n.includes("goiabada")) return "🟥";
      if (n.includes("mel")) return "🍯";
      if (n.includes("maracujá") || n.includes("maracuja")) return "🍊";
      if (n.includes("açúcar") || n.includes("acucar") || n.includes("leite condensado")) return "🍬";
      if (n.includes("creme de leite")) return "🥛";
      if (n.includes("orégano") || n.includes("oregano") || n.includes("hortelã") || n.includes("hortela")) return "🌿";
      if (n.includes("óleo") || n.includes("oleo")) return "🫗";
      return "🔸";
    };

    const highlightKeyWords = (text) => {
      const keywords = [
        "sal", "água", "agua", "leite", "manteiga", "requeijão", "requeijao", 
        "mussarela", "queijo", "mandioca", "carne seca", "cebola", "alho",
        "cuscuzeira", "forno", "panela", "refratário", "refratario", "fogo", "vapor",
        "tapioca", "polvilho", "presunto", "goiabada", "mel", "maracujá", "maracuja",
        "açúcar", "acucar", "leite condensado", "creme de leite", "orégano", "oregano",
        "hortelã", "hortela", "geladeira", "micro-ondas", "frigideira", "liquidificador"
      ];
      
      let result = text;
      keywords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, "gi");
        result = result.replace(regex, `<span class="text-[#8b1a1a] font-semibold">$1</span>`);
      });
      
      return <span dangerouslySetInnerHTML={{ __html: result }} />;
    };

    return (
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-14 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => { window.location.href = "/receitas"; }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b1a1a] hover:underline mb-8 bg-transparent border-none cursor-pointer relative z-20"
        >
          <ArrowLeft size={16} />
          Voltar para receitas
        </button>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <Badge variant="accent">{selectedRecipe.category}</Badge>
            <h1 className="text-4xl font-extrabold text-[#5a2d0c] leading-tight">
              {selectedRecipe.title}
            </h1>
            <p className="text-muted leading-relaxed font-medium">
              {selectedRecipe.description}
            </p>
          </div>
          {selectedRecipe.image && (
            <div className="relative w-full max-w-[280px] aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-2 shadow-inner shrink-0 border border-gray-100">
              <Image
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                fill
                className="object-contain"
                sizes="280px"
              />
            </div>
          )}
        </div>

        {/* Metadata Grey Bar */}
        <div className="bg-[#8b1a1a] rounded-2xl p-5 flex items-center justify-around gap-4 text-sm font-semibold text-white mb-10 shadow-md">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-amber-300" />
            <span>{selectedRecipe.prepTime || "15min"}</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat size={20} className="text-amber-300" />
            <span>{selectedRecipe.difficulty || "Fácil"}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-amber-300" />
            <span>Custo médio</span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-[#5a2d0c] mb-6 flex items-center gap-2">
            Ingredientes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            {ingredientsList.map((ingredient, idx) => (
              <div key={idx} className="flex items-center gap-3 py-1">
                <span className="text-2xl w-8 h-8 flex items-center justify-center bg-amber-50 rounded-full shrink-0">
                  {getIngredientEmoji(ingredient)}
                </span>
                <span className="text-sm font-semibold text-gray-700">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Method */}
        <div className="mb-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-2xl font-extrabold text-[#5a2d0c]">Modo de preparo</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <Clock size={16} className="text-[#8b1a1a]" />
              <span>Preparo: {selectedRecipe.prepTime || "15min"}</span>
            </div>
          </div>
          <div className="space-y-6">
            {stepsList.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#8b1a1a] text-white font-extrabold text-sm flex items-center justify-center shadow-md shrink-0">
                  {idx + 1}
                </div>
                <div className="text-sm leading-relaxed text-gray-600 pt-1 font-semibold">
                  {highlightKeyWords(step)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <main 
      className="bg-[#faf5f0] min-h-screen relative"
      style={{ backgroundImage: "url('/dairy-pattern.png')", backgroundSize: "400px", backgroundRepeat: "repeat", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-white/60 pointer-events-none z-0"></div>
      {/* Hero Section - Full width background image with overlay */}
      <div className="relative w-full h-[500px] sm:h-[550px] lg:h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/receitas-divider.png"
            alt="Receitas Vallys"
            fill
            className="object-cover"
            priority
          />
          {/* Dark warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5a1a0a]/90 via-[#7a2010]/80 to-[#8b1a1a]/70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-caveat text-5xl sm:text-6xl lg:text-8xl text-[#f5e6d3] font-bold leading-tight drop-shadow-lg max-w-3xl italic">
            Descubra Receitas de laticínios
          </h1>
          <p className="mt-4 text-[#e8d5c4] text-base sm:text-lg max-w-xl font-medium">
            Encontre as receitas perfeitas de queijo, leite e iogurte.
          </p>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-lg relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b1a1a]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar receita..."
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-[#f5e6d3]/90 backdrop-blur-sm text-[#5a2d0c] placeholder-[#8b1a1a]/40 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg border border-[#e8d5c4]"
            />
          </div>
        </div>
      </div>

      {/* Category Cards - Overlapping the hero */}
      <div className="relative z-20 -mt-14 sm:-mt-16 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {recipeCategories.map((cat) => {
            const Icon = categoryIcons[cat] || UtensilsCrossed;
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(isActive ? "Todas" : cat)}
                className={`flex flex-col items-center justify-center gap-2 sm:gap-3 py-5 sm:py-6 px-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md cursor-pointer ${
                  isActive
                    ? "bg-[#5a1a0a] text-amber-200 shadow-lg scale-105"
                    : "bg-[#8b1a1a] text-[#f5e6d3] hover:bg-[#6d1515] hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                <Icon size={24} className={isActive ? "text-amber-300" : "text-amber-200/80"} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-14 pb-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px] bg-[#d4c4b0]"></div>
          <h2 className="font-caveat text-3xl sm:text-4xl text-[#5a2d0c] font-bold italic whitespace-nowrap">
            Receitas Destaque
          </h2>
          <div className="flex-1 h-[1px] bg-[#d4c4b0]"></div>
        </div>
      </div>

      {/* Recipe Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8 pb-20">
        {filteredRecipes.length === 0 && (
          <p className="text-center text-gray-400 py-12 text-lg">Nenhuma receita encontrada.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-muted">Carregando...</p>
      </div>
    }>
      <RecipesContent />
    </Suspense>
  );
}
