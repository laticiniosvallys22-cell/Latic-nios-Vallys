"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Package, ChevronRight } from "lucide-react";
import { getProductById, getProducts } from "@/services/firebase";
import { getCategoryStyle } from "@/interfaces/catalog";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [foundProduct, allProducts] = await Promise.all([
          getProductById(id),
          getProducts(),
        ]);

        if (!foundProduct) {
          setError("Produto não encontrado.");
          return;
        }

        setProduct(foundProduct);

        // Produtos relacionados: mesma categoria, excluindo o atual
        let cat = foundProduct.category;
        if (cat === "Iogurtes") cat = "Bebidas Lácteas";

        const related = allProducts
          .filter((p) => {
            const pCat = p.category === "Iogurtes" ? "Bebidas Lácteas" : p.category;
            return pCat === cat && p.id !== foundProduct.id;
          })
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (err) {
        setError(err.message || "Erro ao carregar produto.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const style = useMemo(
    () => (product ? getCategoryStyle(product.category) : null),
    [product]
  );

  const handleWhatsApp = () => {
    if (!product) return;
    const text = encodeURIComponent(
      `Olá! Gostaria de saber mais informações sobre o produto: *${product.name}* (Linha: ${product.category}).`
    );
    window.open(`https://wa.me/5533999838182?text=${text}`, "_blank");
  };

  // Extrai a cor hex do cardBg (ex: "bg-[#1a2a6c]" → "#1a2a6c")
  const categoryColor = useMemo(() => {
    if (!style?.cardBg) return "#1a2a6c";
    const match = style.cardBg.match(/#[0-9a-fA-F]{6}/);
    return match ? match[0] : "#1a2a6c";
  }, [style]);

  // ─── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f7ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-[#00b1f4] rounded-full animate-spin" />
          <p className="text-[#1a2a6c] font-semibold text-sm">Carregando produto...</p>
        </div>
      </main>
    );
  }

  // ─── Erro / Não encontrado ────────────────────────────────────
  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-sky-50 rounded-full flex items-center justify-center">
            <Package size={36} className="text-[#00b1f4]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1a2a6c] mb-3">
            {error || "Produto não encontrado"}
          </h1>
          <p className="text-[#5a5a8a] mb-8">
            Não conseguimos localizar esse produto. Ele pode ter sido removido ou o link está incorreto.
          </p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a2a6c] text-white font-bold text-sm hover:bg-[#111c47] transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar aos Produtos
          </Link>
        </div>
      </main>
    );
  }

  const displayCategory =
    product.category === "Iogurtes" || product.category === "Iogurte"
      ? "Bebida Láctea"
      : product.category;

  // ─── Página de detalhes ───────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#f5f7ff]">
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-[#5a5a8a]">
            <Link href="/" className="hover:text-[#00b1f4] transition-colors">
              Início
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link href="/produtos" className="hover:text-[#00b1f4] transition-colors">
              Produtos
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-[#1a2a6c] font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Hero do Produto ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradiente da categoria */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 40%, ${categoryColor}99 100%)`,
          }}
        />
        {/* Pattern sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/dairy-pattern.png')",
            backgroundSize: "300px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-12 lg:py-20">
            {/* Imagem do produto - Entra pela esquerda da tela até a posição correta */}
            <div className="relative w-full max-w-[420px] lg:max-w-[500px] aspect-square flex-shrink-0">
              {/* Glow atrás do produto */}
              <div
                className="absolute inset-[15%] rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: "#ffffff" }}
              />
              <motion.div
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full z-10"
              >
                <Image
                  src={product.image || "/logo.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
                  className="object-contain drop-shadow-2xl p-4"
                  priority
                />
              </motion.div>
            </div>

            {/* Informações */}
            <div className="flex-1 text-center lg:text-left w-full">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white/15 text-white/90 backdrop-blur-sm mb-5 border border-white/10">
                {displayCategory}
              </span>

              {/* Nome */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-5 drop-shadow-sm"
                style={{ fontFamily: '"Arial Rounded MT Bold", "Nunito", sans-serif' }}
              >
                {product.name}
              </h1>

              {/* Preço */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-yellow-300 mb-8 drop-shadow-sm">
                {product.price || "Sob Consulta"}
              </p>

              {/* Separador */}
              <div className="w-16 h-[2px] bg-white/30 mx-auto lg:mx-0 mb-8" />

              {/* Descrição */}
              {product.description && (
                <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                  {product.description}
                </p>
              )}

              {/* Ações */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base hover:bg-[#20ba5a] active:scale-[0.97] transition-all shadow-lg shadow-black/20 cursor-pointer"
                >
                  <MessageCircle size={22} />
                  Fazer Pedido / WhatsApp
                </button>

                <Link
                  href="/produtos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-base hover:bg-white/10 transition-all"
                >
                  <ArrowLeft size={18} />
                  Voltar aos Produtos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Onda decorativa na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80V40C240 10 480 0 720 20C960 40 1200 50 1440 30V80H0Z"
              fill="#f5f7ff"
            />
          </svg>
        </div>
      </section>

      {/* ── Produtos Relacionados ──────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="font-caveat text-3xl sm:text-4xl font-semibold text-[#1a2a6c] italic mb-3">
              Outros produtos da linha {displayCategory}
            </h2>
            <p className="text-[#5a5a8a] text-sm">
              Conheça também esses produtos da mesma categoria
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => {
              const relatedStyle = getCategoryStyle(related.category);
              const relatedColor = relatedStyle?.cardBg?.match(/#[0-9a-fA-F]{6}/)?.[0] || "#1a2a6c";

              return (
                <Link
                  key={related.id}
                  href={`/produtos/${related.id}`}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(160deg, ${relatedColor} 0%, ${relatedColor}cc 100%)`,
                    }}
                  />

                  <div className="relative z-10 p-6 flex flex-col items-center text-center">
                    {/* Imagem */}
                    <div className="relative w-full h-[180px] mb-4 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={related.image || "/logo.png"}
                        alt={related.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 250px"
                        className="object-contain drop-shadow-lg"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-base font-bold text-white leading-tight line-clamp-2 mb-2">
                      {related.name}
                    </h3>
                    <p className="text-sm text-white/70 font-semibold">
                      {related.price || "Sob consulta"}
                    </p>

                    {/* CTA sutil */}
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-white/60 uppercase tracking-wider group-hover:text-white/90 transition-colors">
                      Ver detalhes
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
