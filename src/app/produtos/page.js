"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/PageHero";
import { productCategories, getCategoryStyle } from "@/interfaces/catalog";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const [category, setCategory] = useState("Todos");
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

  return (
    <main className="bg-[#e8f1f6] min-h-screen pb-16">
      <PageHero title="Produtos" waveColor="#e8f1f6" />
      
      {/* Ícones Decorativos */}
      <div className="flex justify-center items-center gap-16 md:gap-32 py-6 md:py-10">
        {/* Usando imagens que já existem ou placeholders estilizados como ícones minimalistas */}
        <div className="w-10 h-10 md:w-12 md:h-12 relative opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
          <Image src="/icons/bebidas.png" alt="Leite" fill className="object-contain drop-shadow-sm" />
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 relative opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
          <Image src="/icons/queijos.png" alt="Queijo" fill className="object-contain drop-shadow-sm" />
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 relative opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
          <Image src="/icons/manteigas.png" alt="Manteiga" fill className="object-contain drop-shadow-sm" />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8">

      {/* Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {["Todos", ...productCategories].map((item) => {
          const style = getCategoryStyle(item);
          return (
            <button
              key={item}
              type="button"
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                category === item
                  ? style.buttonActive
                  : "border-gray-200 bg-white text-[#1a1a4e] hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          );
        })}
      </div>

      {loading && <p className="text-center text-muted">Carregando catálogo...</p>}
      {error && <p className="text-center text-red-600">Erro: {error.message}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-muted py-8">Nenhum produto cadastrado no catálogo.</p>
      )}

      {/* Structured Category Lists */}
      {!loading && !error && (
        <div className="space-y-12">
          {categoriesToRender.map((cat) => {
            const items = productsByCategory[cat] || [];
            if (items.length === 0) return null;
            const style = getCategoryStyle(cat);

            return (
              <div key={cat} className="border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                {/* Section Title */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 relative mb-4 hover:scale-110 transition-transform duration-300">
                    <Image
                      src={cat.includes("Queijo") ? "/icons/queijos.png" : cat.includes("Bebida") || cat.includes("Iogurte") ? "/icons/bebidas.png" : cat.includes("Manteiga") ? "/icons/manteigas.png" : "/logo.png"}
                      alt={`Ícone ${cat}`}
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                  <h3 className={`font-caveat text-4xl font-semibold tracking-wide ${style.textStatic}`}>
                    Linha {cat}
                  </h3>
                  <div className={`w-[100px] h-[1px] mt-2 ${style.lineStatic}`}></div>
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
