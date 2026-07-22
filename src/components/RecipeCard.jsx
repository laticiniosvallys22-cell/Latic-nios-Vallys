"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function RecipeCard({ recipe }) {
  const router = useRouter();
  const [isExitingRight, setIsExitingRight] = useState(false);

  const recipeUrl = `/receitas?id=${recipe.id}`;

  const handleCardClick = (e) => {
    e.preventDefault();
    if (isExitingRight) return;
    setIsExitingRight(true);
  };

  const handleAnimationComplete = () => {
    if (isExitingRight) {
      router.push(recipeUrl);
    }
  };

  return (
    <div className={`w-full h-full ${isExitingRight ? "relative z-[99999] !overflow-visible" : "relative z-0"}`}>
      <Link 
        href={recipeUrl}
        onClick={handleCardClick}
        className={cn(
          "group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col",
          isExitingRight ? "relative z-[99999] !overflow-visible" : "overflow-hidden"
        )}
      >
        {/* Image with hover effect and exit animation */}
        <div className={`relative aspect-[4/3] bg-gradient-to-br from-[#fef3e2] via-[#fde8cc] to-[#f9d9b0] shrink-0 ${isExitingRight ? "z-[99999] !overflow-visible" : "overflow-hidden"}`}>
          <motion.div
            animate={{
              x: isExitingRight ? "100vw" : 0,
              opacity: isExitingRight ? 0 : 1,
              scale: isExitingRight ? 1.05 : 1,
            }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            onAnimationComplete={handleAnimationComplete}
            className="relative w-full h-full group-hover:scale-105 transition-transform duration-500"
            style={{ zIndex: 99999 }}
          >
            <Image
              src={recipe.image || "/logo.png"}
              alt={recipe.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain p-4 drop-shadow-lg"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          {/* Title + Time */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-extrabold text-[#5a2d0c] leading-snug group-hover:text-[#8b1a1a] transition-colors line-clamp-2">
              {recipe.title}
            </h3>
            {recipe.prepTime && (
              <div className="flex items-center gap-1 shrink-0 text-[#8b1a1a]">
                <Clock size={14} />
                <span className="text-xs font-bold whitespace-nowrap">{recipe.prepTime}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
            {recipe.description}
          </p>
        </div>
      </Link>
    </div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
