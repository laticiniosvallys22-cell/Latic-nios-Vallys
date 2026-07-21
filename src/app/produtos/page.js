"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { productCategories, getCategoryStyle } from "@/interfaces/catalog";
import { useProducts } from "@/hooks/useProducts";
import { Search, Milk, ChevronsRight } from "lucide-react";

const categoryData = {
  "Queijos": { icon: "/icons/queijos.png", label: "Queijos" },
  "Bebidas Lácteas": { icon: "/icons/bebidas.png", label: "Bebidas Lácteas" },
  "Manteigas": { icon: "/icons/manteigas.png", label: "Manteigas" },
};

export default function ProductsPage() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const { products, loading, error } = useProducts();

  // Group products by category
  const productsByCategory = useMemo(() => {
    const groups = {};
    products.forEach((product) => {
      let cat = product.category || "Outros";
      if (cat === "Iogurtes") {
        cat = "Bebidas Lácteas";
      }
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(product);
    });
    return groups;
  }, [products]);

  // Determine what to display based on selected category
  const categoriesToRender = useMemo(() => {
    if (category === "Todos") {
      return Object.keys(productsByCategory).filter((cat) =>
        productCategories.includes(cat)
      );
    }
    return productsByCategory[category] && productCategories.includes(category)
      ? [category]
      : [];
  }, [category, productsByCategory]);

  // Filter by search
  const filterBySearch = (items) => {
    if (!search.trim()) return items;
    return items.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <main className="bg-[#e8f1f6] min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[480px] sm:h-[520px] lg:h-[560px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Produtos Vallys"
            fill
            className="object-cover"
            priority
          />
          {/* Blue overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a6c]/90 via-[#2c3384]/80 to-[#154687]/70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-caveat text-5xl sm:text-6xl lg:text-8xl text-white font-bold leading-tight drop-shadow-lg max-w-3xl italic">
            Conheça Nossos Produtos
          </h1>
          <p className="mt-4 text-sky-200 text-base sm:text-lg max-w-xl font-medium">
            Queijos, bebidas lácteas e manteigas produzidos com o mais puro sabor da fazenda.
          </p>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-lg relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2c3384]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto..."
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/90 backdrop-blur-sm text-[#1a2a6c] placeholder-[#2c3384]/40 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-lg border border-sky-100"
            />
          </div>
        </div>
      </div>

      {/* Category Cards - Overlapping the hero */}
      <div className="relative z-20 -mt-14 sm:-mt-16 mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {productCategories.map((cat) => {
            const data = categoryData[cat];
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(isActive ? "Todos" : cat)}
                className={`flex flex-col items-center justify-center gap-2 sm:gap-3 py-5 sm:py-7 px-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md cursor-pointer ${
                  isActive
                    ? "bg-[#0a1c4e] text-sky-200 shadow-lg scale-105 ring-2 ring-sky-400"
                    : "bg-[#2c3384] text-white hover:bg-[#1a2a6c] hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                  <Image src={data?.icon || "/logo.png"} alt={cat} fill className="object-contain drop-shadow-md" />
                </div>
                <span>{data?.label || cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-8">

        {loading && <p className="text-center text-muted py-12">Carregando catálogo...</p>}
        {error && <p className="text-center text-red-600 py-12">Erro: {error.message}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-muted py-12">Nenhum produto cadastrado no catálogo.</p>
        )}

        {/* Structured Category Lists */}
        {!loading && !error && (
          <div className="space-y-16">
            {categoriesToRender.map((cat) => {
              const allItems = productsByCategory[cat] || [];
              const items = filterBySearch(allItems);
              if (items.length === 0) return null;
              const style = getCategoryStyle(cat);

              return (
                <div key={cat}>
                  {/* Section Title */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex-1 h-[1px] bg-[#c8d8e8]"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative shrink-0">
                        <Image
                          src={cat.includes("Queijo") ? "/icons/queijos.png" : cat.includes("Bebida") || cat.includes("Iogurte") ? "/icons/bebidas.png" : cat.includes("Manteiga") ? "/icons/manteigas.png" : "/logo.png"}
                          alt={`Ícone ${cat}`}
                          fill
                          className="object-contain drop-shadow-md"
                        />
                      </div>
                      <h3 className="font-caveat text-3xl sm:text-4xl font-semibold tracking-wide text-[#1a2a6c] italic whitespace-nowrap">
                        Linha {cat}
                      </h3>
                    </div>
                    <div className="flex-1 h-[1px] bg-[#c8d8e8]"></div>
                  </div>

                  {/* Grid layout wrapper */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full place-items-center sm:place-items-stretch">
                    {items.map((product) => (
                      <div key={product.id} className="w-full flex">
                        <ProductCard product={product} isProductPage={true} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
