"use client";

import Image from "next/image";
import { useState } from "react";
import { X, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { createPortal } from "react-dom";
import { getCategoryStyle } from "@/interfaces/catalog";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";

export default function ProductCard({ product, isProductPage = false }) {
  const [showModal, setShowModal] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const style = getCategoryStyle(product.category);
  const { settings } = useSettings();
  const productsStyle = settings?.productsStyle || "style1";

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de saber mais informações sobre o produto: *${product.name}* (Linha: ${product.category}).`
    );
    window.open(`https://wa.me/5533999838182?text=${text}`, "_blank");
  };

  const renderCardStyle1 = () => (
    <article className="group relative w-full flex flex-col items-center justify-center text-center px-4 py-8 lg:p-6 lg:h-[380px] select-none cursor-pointer" onClick={() => setShowModal(true)}>
      {/* Card background (always visible so it works on /produtos on mobile) */}
      <div className={`absolute inset-0 rounded-[2rem] ${style.cardBg} lg:shadow-sm transition-all duration-300 -z-10`} />

      {/* Product Image */}
      <div className={`relative w-full ${isProductPage ? "h-[200px] mb-4" : "h-[280px] sm:h-[350px] mb-8"} lg:h-[180px] lg:mb-4 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
        <Image src={product.image || "/logo.png"} alt={product.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain drop-shadow-2xl lg:drop-shadow-lg" />
      </div>
      
      <div className="lg:w-full lg:text-left lg:flex lg:flex-col lg:items-start lg:mt-auto lg:flex-grow lg:justify-end">
        {/* Subtitle / Phrase */}
        <p className={`${isProductPage ? "text-xs mb-4" : "text-lg sm:text-xl mb-10"} font-bold text-white tracking-widest uppercase drop-shadow-sm opacity-90 lg:text-[11px] lg:mb-1 lg:opacity-80 lg:drop-shadow-none`}>
          <span className="lg:hidden">{product.category === "Iogurtes" ? "Para você treinar com gosto!" : `A melhor escolha em ${product.category}`}</span>
          <span className="hidden lg:inline">CONSULTE</span>
        </p>

        {/* Product Name (styled as a logo/large text) */}
        <h3 className={`${isProductPage ? "text-2xl mb-4" : "text-3xl sm:text-4xl md:text-5xl mb-4"} font-black text-white tracking-tighter drop-shadow-md line-clamp-2 leading-tight lg:text-base lg:font-bold lg:tracking-normal lg:drop-shadow-none lg:mb-4`} style={{ fontFamily: '"Arial Rounded MT Bold", "Nunito", sans-serif' }}>
          {product.name}
        </h3>
        
        {/* Button */}
        <button type="button" className={`border-[3px] border-white text-white font-bold tracking-wider hover:bg-white hover:text-slate-900 transition-colors duration-300 shadow-sm active:scale-95 ${isProductPage ? "px-6 py-2 text-sm" : "px-12 py-3.5 text-lg"} lg:w-full lg:mt-auto lg:py-2.5 lg:bg-white/20 lg:border-[2px] lg:border-white lg:hover:bg-white lg:hover:text-[#1a1a4e] lg:text-white lg:text-sm lg:rounded-xl lg:tracking-normal`}>
          <span className="lg:hidden">SAIBA MAIS</span>
          <span className="hidden lg:inline">Detalhes</span>
        </button>
      </div>
    </article>
  );

  const renderCardStyle2 = () => (
    <article onClick={() => setShowModal(true)} className={cn("group w-full rounded-[2rem] p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white shadow-sm flex flex-col justify-between h-[380px]", style.cardBg)}>
      <div className="flex flex-col items-center">
        <div className="relative w-full h-[200px] mb-4 group-hover:scale-110 transition-transform duration-500">
          <Image src={product.image || "/logo.png"} alt={product.name} fill sizes="(max-width: 768px) 100vw, 350px" className="object-contain drop-shadow-lg" />
        </div>
        <div className="text-center w-full">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white mb-2 backdrop-blur-sm uppercase">{product.category}</span>
          <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-sm text-white/80 font-semibold">{product.price || "Sob consulta"}</p>
        </div>
      </div>
    </article>
  );

  const renderCardStyle3 = () => (
    <article 
      onClick={() => setShowModal(true)} 
      className="group relative w-full h-[420px] rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-[60%] bg-gradient-to-b from-gray-50 to-white z-0 group-hover:scale-105 transition-transform duration-700" />
      
      <div className="relative z-10 w-full h-[55%] flex items-center justify-center p-8 mt-4 group-hover:-translate-y-4 transition-transform duration-500 ease-out">
        <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700">
          <Image src={product.image || "/logo.png"} alt={product.name} fill sizes="(max-width: 768px) 100vw, 350px" className="object-contain drop-shadow-xl" />
        </div>
      </div>
      
      <div className="relative z-20 flex-grow bg-white px-8 pb-8 pt-4 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-3">
          <span className={cn(
            "text-xs font-black uppercase tracking-widest",
            style.textColor || "text-slate-500"
          )}>
            {product.category}
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-[#00b1f4] text-white flex items-center justify-center shadow-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#00b1f4] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-slate-400">
          {product.price || "Preço sob consulta"}
        </p>
      </div>
    </article>
  );

  return (
    <>
      {productsStyle === "style1" && renderCardStyle1()}
      {productsStyle === "style2" && renderCardStyle2()}
      {productsStyle === "style3" && renderCardStyle3()}

      {/* Details Modal using React Portal */}
      {showModal && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className={cn("relative w-full max-w-lg md:max-w-4xl lg:max-w-5xl xl:max-w-6xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh] overflow-y-auto text-white", style.cardBg)} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors shadow-sm cursor-pointer backdrop-blur-sm">
              <X size={22} />
            </button>
            <div className="relative w-full md:w-[58%] min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[600px] bg-black/10 flex items-center justify-center p-8 md:p-12 lg:p-16">
              <div className="absolute inset-0">
                <Image src={product.image || "/logo.png"} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 500px, 800px" className="object-contain p-4 md:p-8" />
              </div>
            </div>
            <div className="w-full md:w-[42%] p-6 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4 bg-white/20 text-white">
                  {product.category === "Iogurtes" || product.category === "Iogurte" ? "Bebida Láctea" : product.category}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-2 md:mb-4">{product.name}</h2>
                <p className="text-lg md:text-xl lg:text-2xl font-extrabold text-yellow-300 mb-4 md:mb-6">{product.price || "Sob Consulta"}</p>
                <div className="border-t border-white/20 pt-4 md:pt-6 mb-6 md:mb-8">
                  <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="flex items-center justify-between w-full text-left focus:outline-none group/desc cursor-pointer">
                    <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/60 group-hover/desc:text-white transition-colors">Descrição</h4>
                    <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all px-2.5 py-1 rounded-lg text-xs font-bold">
                      <span>{descExpanded ? "Recolher" : "Ver Detalhes"}</span>
                      {descExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </button>
                  {descExpanded && (
                    <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/95 max-h-[150px] md:max-h-[250px] lg:max-h-[350px] overflow-y-auto pr-2 mt-4 animate-in fade-in slide-in-from-top-3 duration-300">
                      {product.description || "Sem descrição disponível."}
                    </p>
                  )}
                </div>
              </div>
              <button type="button" onClick={handleWhatsAppContact} className="w-full h-12 md:h-14 flex items-center justify-center gap-2 rounded-[12px] bg-[#25D366] text-white font-bold text-[15px] md:text-lg hover:bg-[#20ba5a] active:scale-95 transition-all shadow-lg shadow-black/20 cursor-pointer mt-4 md:mt-6">
                <MessageCircle size={20} />Fazer Pedido / WhatsApp
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
