"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAboutImages } from "@/hooks/useAboutImages";

export default function AboutImageCarousel() {
  const { images, loading } = useAboutImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;
    
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [images.length, isPlaying, nextSlide]);

  if (loading || images.length === 0) {
    return null; // Don't show carousel if there are no images or loading
  }

  return (
    <div className="w-full py-12 sm:py-16 -mx-6 sm:mx-0 w-[calc(100%+3rem)] sm:w-full" onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)}>
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 sm:mb-12 uppercase tracking-tight px-6 sm:px-0">Nossa Galeria</h2>
        
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-xl bg-gray-150 border-y sm:border border-gray-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex].image}
                alt={images[currentIndex].title || "Galeria Laticínio Vallys"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
              {images[currentIndex].title && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 md:p-12 text-center md:text-left">
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{images[currentIndex].title}</h3>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="bg-[#1a2a6c] text-white flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 hover:bg-[#154687] transition-all duration-300 shadow-md cursor-pointer border border-white/10"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6 stroke-[3]" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="bg-[#1a2a6c] text-white flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 hover:bg-[#154687] transition-all duration-300 shadow-md cursor-pointer border border-white/10"
                  aria-label="Próximo"
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6 stroke-[3]" />
                </button>
              </div>

              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? "w-8 bg-amber-500" : "w-3 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
