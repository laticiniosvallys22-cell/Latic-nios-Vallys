"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ x: "100vw", opacity: 0.95 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="w-full min-h-screen overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
