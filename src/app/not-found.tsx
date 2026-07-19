"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlowingButton from "@/components/ui/GlowingButton";
import Link from "next/link";
import { ShieldAlert, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh] relative overflow-hidden">
        
        {/* Background Glitch Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-danger w-full"
              style={{ top: `${Math.random() * 100}%` }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [-1000, 1000]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <div className="relative inline-block mb-8">
            <ShieldAlert className="w-32 h-32 text-danger drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]" />
            <motion.div 
              className="absolute inset-0 bg-danger mix-blend-overlay"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 0.1, repeatType: "mirror" }}
            />
          </div>

          <motion.h1 
            className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-danger uppercase tracking-tighter mb-4"
            animate={{ x: [-2, 2, -2, 2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
          >
            404
          </motion.h1>
          
          <h2 className="text-2xl font-bold text-gray-300 uppercase tracking-widest mb-2">
            Sector Not Found
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-danger font-mono text-sm mb-12">
            <Terminal className="w-4 h-4" />
            <span>ERR_INVALID_ROUTE_SIGNATURE</span>
          </div>

          <Link href="/">
            <GlowingButton variant="danger" className="text-lg px-8 py-4 uppercase font-black tracking-widest">
              Return to HQ
            </GlowingButton>
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
