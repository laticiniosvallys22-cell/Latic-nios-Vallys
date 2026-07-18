"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryStyle } from "@/interfaces/catalog";

export default function ProductCarousel({ children, category }) {
  const style = getCategoryStyle(category);
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [centerIndices, setCenterIndices] = useState([]);
  const ticking = useRef(false);

  const updateArrows = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 5);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  const updateCenterCards = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerCenter = rect.left + rect.width / 2;

    const childrenArray = Array.from(container.children);
    if (childrenArray.length === 0) return;

    const distances = childrenArray.map((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      return { index, distance };
    });

    // Sort by distance ascending
    distances.sort((a, b) => a.distance - b.distance);

    // Get the two closest card indices
    const closest = distances.slice(0, 2).map((d) => d.index);
    setCenterIndices(closest);
  }, []);

  const handleScroll = useCallback(() => {
    updateArrows();
    
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        updateCenterCards();
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [updateArrows, updateCenterCards]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      updateCenterCards();
      updateArrows();
      
      const timer1 = setTimeout(() => {
        updateCenterCards();
        updateArrows();
      }, 100);
      
      const timer2 = setTimeout(() => {
        updateCenterCards();
        updateArrows();
      }, 500);

      window.addEventListener("resize", handleScroll);
      
      return () => {
        el.removeEventListener("scroll", handleScroll);
        clearTimeout(timer1);
        clearTimeout(timer2);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [children, handleScroll, updateArrows, updateCenterCards]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of the container width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToItem = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const childrenArray = Array.from(container.children);
      if (childrenArray[index]) {
        const child = childrenArray[index];
        const containerCenter = container.clientWidth / 2;
        const childCenter = child.clientWidth / 2;
        const scrollPosition = child.offsetLeft - containerCenter + childCenter;
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className={`relative group w-full flex flex-col items-center overflow-hidden py-8 sm:py-12 shadow-xl ${style.cardBg}`}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Side Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20">
        <button
          onClick={() => scroll("left")}
          className="bg-white text-[#1a1a4e] flex items-center justify-start h-[200px] sm:h-[300px] md:h-[400px] w-[40px] sm:w-[50px] hover:w-[50px] sm:hover:w-[60px] transition-all duration-300 shadow-[5px_0_20px_rgba(0,0,0,0.15)] pl-1 sm:pl-2"
          style={{ borderRadius: '0 100% 100% 0 / 0 50% 50% 0' }}
          aria-label="Anterior"
        >
          <ChevronLeft size={36} className="stroke-[3]" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center z-20">
        <button
          onClick={() => scroll("right")}
          className="bg-white text-[#1a1a4e] flex items-center justify-end h-[200px] sm:h-[300px] md:h-[400px] w-[40px] sm:w-[50px] hover:w-[50px] sm:hover:w-[60px] transition-all duration-300 shadow-[-5px_0_20px_rgba(0,0,0,0.15)] pr-1 sm:pr-2"
          style={{ borderRadius: '100% 0 0 100% / 50% 0 0 50%' }}
          aria-label="Próximo"
        >
          <ChevronRight size={36} className="stroke-[3]" />
        </button>
      </div>
      
      {/* Carousel Viewport */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex overflow-x-auto gap-4 sm:gap-6 scroll-smooth snap-x snap-mandatory px-4 items-stretch w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {React.Children.map(children, (child, index) => {
          const isCenter = centerIndices.includes(index);
          return (
            <div
              key={index}
              className={`transition-all duration-500 ease-out ${
                isCenter 
                  ? "opacity-100 z-10 scale-100" 
                  : "opacity-40 scale-90"
              } flex shrink-0 w-full justify-center`}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6 z-20">
        {React.Children.map(children, (child, index) => {
          const isActive = centerIndices.includes(index) || (centerIndices.length === 0 && index === 0);
          return (
            <button
              key={index}
              onClick={() => scrollToItem(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isActive ? "bg-white scale-125 shadow-sm" : "bg-white/40 hover:bg-white/60 border border-white/20"
              }`}
              aria-label={`Ir para o item ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
