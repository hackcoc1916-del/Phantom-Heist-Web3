"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="relative"
      >
        <Shield className="w-16 h-16 text-primary drop-shadow-[0_0_20px_rgba(147,51,234,0.8)]" />
        <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20" />
      </motion.div>
      <motion.p 
        className="mt-6 text-primary font-mono text-sm tracking-widest uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        Decrypting Sector...
      </motion.p>
    </div>
  );
}
