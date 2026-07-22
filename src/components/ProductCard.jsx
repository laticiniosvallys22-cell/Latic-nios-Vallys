"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategoryStyle } from "@/interfaces/catalog";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";

export default function ProductCard({ product, isProductPage = false }) {
  const style = getCategoryStyle(product.category);
  const { settings } = useSettings();
  const productsStyle = settings?.productsStyle || "style1";

  const productUrl = `/produtos/${product.id}`;

  const renderCardStyle1 = () => (
    <Link href={productUrl} className="block w-full">
      <article className="group/card relative z-0 w-full flex flex-col items-center justify-center text-center px-4 py-5 sm:py-8 lg:p-6 lg:h-[440px] select-none cursor-pointer">
        {/* Card background */}
        <div className={`absolute inset-0 rounded-sm ${style.cardBg} lg:shadow-sm transition-all duration-300 -z-10`} />

        {/* Product Image */}
        <div className={`relative w-full ${isProductPage ? "h-[220px] sm:h-[260px] mb-3 sm:mb-4" : "h-[280px] sm:h-[340px] mb-4 sm:mb-8"} lg:h-[260px] lg:mb-4 transition-transform duration-500 ease-out flex items-center justify-center group-hover/card:scale-105 group-hover/card:-translate-y-3 group-hover/card:-rotate-2`}>
          <Image src={product.image || "/logo.png"} alt={product.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain drop-shadow-2xl lg:drop-shadow-lg" />
        </div>
        
        <div className="lg:w-full lg:text-left lg:flex lg:flex-col lg:items-start lg:mt-auto lg:flex-grow lg:justify-end">
          {/* Subtitle / Phrase */}
          <p className={`${isProductPage ? "text-xs mb-3 sm:mb-4" : "text-sm sm:text-lg md:text-xl mb-4 sm:mb-10"} font-bold text-white tracking-widest uppercase drop-shadow-sm opacity-90 lg:text-[11px] lg:mb-1 lg:opacity-80 lg:drop-shadow-none`}>
            <span className="lg:hidden">{product.category === "Iogurtes" ? "Para você treinar com gosto!" : `A melhor escolha em ${product.category}`}</span>
            <span className="hidden lg:inline">CONSULTE</span>
          </p>

          {/* Product Name */}
          <h3 className={`${isProductPage ? "text-xl sm:text-2xl mb-3 sm:mb-4" : "text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4"} font-black text-white tracking-tighter drop-shadow-md line-clamp-2 leading-tight lg:text-base lg:font-bold lg:tracking-normal lg:drop-shadow-none lg:mb-4`} style={{ fontFamily: '"Arial Rounded MT Bold", "Nunito", sans-serif' }}>
            {product.name}
          </h3>
          
          {/* Button */}
          <span className={`border-[3px] border-white text-white font-bold tracking-wider group-hover/card:bg-white group-hover/card:text-slate-900 transition-colors duration-300 shadow-sm ${isProductPage ? "px-5 py-2.5 text-sm sm:px-6" : "px-8 py-2.5 text-base sm:px-12 sm:py-3.5 sm:text-lg"} lg:w-full lg:mt-auto lg:py-2.5 lg:bg-white/20 lg:border-[2px] lg:border-white lg:group-hover/card:bg-white lg:group-hover/card:text-[#1a1a4e] lg:text-white lg:text-sm rounded-sm lg:tracking-normal inline-flex items-center justify-center`}>
            <span className="lg:hidden">SAIBA MAIS</span>
            <span className="hidden lg:inline">Detalhes</span>
          </span>
        </div>
      </article>
    </Link>
  );

  const renderCardStyle2 = () => (
    <Link href={productUrl} className="block w-full">
      <article className={cn("group w-full rounded-[2rem] p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white shadow-sm flex flex-col justify-between h-[380px]", style.cardBg)}>
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
    </Link>
  );

  const renderCardStyle3 = () => (
    <Link href={productUrl} className="block w-full">
      <article 
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
    </Link>
  );

  return (
    <>
      {productsStyle === "style1" && renderCardStyle1()}
      {productsStyle === "style2" && renderCardStyle2()}
      {productsStyle === "style3" && renderCardStyle3()}
    </>
  );
}
