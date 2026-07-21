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
    <div className="w-full py-16" onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 uppercase tracking-tight">Nossa Galeria</h2>
        
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-xl bg-gray-150 border border-gray-200">
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
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8 md:p-12 text-center md:text-left">
                  <h3 className="text-white text-2xl md:text-3xl font-bold">{images[currentIndex].title}</h3>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-4 flex items-center z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="bg-[#1a2a6c] text-white flex items-center justify-center h-12 w-12 hover:bg-[#154687] transition-all duration-300 shadow-md cursor-pointer border border-white/10"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={24} className="stroke-[3]" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="bg-[#1a2a6c] text-white flex items-center justify-center h-12 w-12 hover:bg-[#154687] transition-all duration-300 shadow-md cursor-pointer border border-white/10"
                  aria-label="Próximo"
                >
                  <ChevronRight size={24} className="stroke-[3]" />
                </button>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
