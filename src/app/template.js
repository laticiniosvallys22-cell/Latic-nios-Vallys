"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  // Desativa o slide lateral global na página de detalhes do produto (/produtos/[id])
  const isProductDetail = pathname.startsWith("/produtos/") && pathname !== "/produtos";

  if (isProductDetail) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ x: "100vw", opacity: 0.95 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
      className="w-full min-h-screen overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
