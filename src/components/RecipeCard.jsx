import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function RecipeCard({ recipe }) {
  return (
    <Link 
      href={`/receitas?id=${recipe.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image || "/logo.png"}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
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
  );
}
