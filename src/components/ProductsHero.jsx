import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductsHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#2c3384] pt-8 lg:pt-0">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" 
        }}
      ></div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 lg:px-8 py-16 lg:py-32 z-10">
        
        {/* Center: Text */}
        <div className="flex flex-col items-center justify-center w-full z-20">
          <h1 className="font-caveat text-7xl sm:text-8xl lg:text-[140px] text-white font-bold leading-[0.8] drop-shadow-xl -rotate-2">
            Produtos
          </h1>
        </div>

      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 translate-y-[2px]">
        <svg
          className="relative block w-full h-[40px] sm:h-[60px] lg:h-[90px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.8,188.94,99.73,234.34,87.05,278.43,73.1,321.39,56.44Z"
            className="fill-[#e8f1f6]"
          ></path>
        </svg>
      </div>
    </div>
  );
}
