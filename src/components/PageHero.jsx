import Image from "next/image";

export default function PageHero({ title, subtitle, bgImage, bgColor = "#2c3384", overlayGradient, waveColor = "#ffffff" }) {
  return (
    <div className="relative w-full h-[400px] sm:h-[440px] lg:h-[480px] overflow-hidden">
      {/* Background Image (if provided) */}
      {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: overlayGradient || `linear-gradient(135deg, ${bgColor}ee 0%, ${bgColor}cc 50%, ${bgColor}aa 100%)`
        }}
      ></div>

      {/* Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" 
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-caveat text-6xl sm:text-7xl lg:text-[120px] text-white font-bold leading-[0.85] drop-shadow-xl italic">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-white/80 text-base sm:text-lg max-w-xl font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 translate-y-[2px]">
        <svg
          className="relative block w-full h-[40px] sm:h-[60px] lg:h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.8,188.94,99.73,234.34,87.05,278.43,73.1,321.39,56.44Z"
            fill={waveColor}
          ></path>
        </svg>
      </div>
    </div>
  );
}
