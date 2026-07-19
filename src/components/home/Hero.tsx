"use client";

import { motion } from "framer-motion";
import GlowingButton from "@/components/ui/GlowingButton";
import Link from "next/link";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')] opacity-20 mix-blend-overlay" />
        
        {/* Laser Scanners */}
        <motion.div 
          animate={{ y: ["-10%", "110%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-accent/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-0"
        />
        <motion.div 
          animate={{ y: ["110%", "-10%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute left-0 right-0 h-1 bg-danger/40 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-0"
        />

        {/* Fog Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest backdrop-blur-md">
              Powered by Midnight Blockchain
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-accent drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            PHANTOM HEIST
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-300 tracking-wide uppercase">
            Plan Secretly. <br className="md:hidden" />
            <span className="text-accent">Execute Simultaneously.</span> <br className="md:hidden" />
            <span className="text-success">Win Cryptographically.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Every player&apos;s mission plan remains confidential until execution. Every action is cryptographically verified while keeping strategies private.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/create-match">
              <GlowingButton variant="primary" className="text-lg px-8 py-4 w-full sm:w-auto font-bold uppercase tracking-wider">
                Start Mission
              </GlowingButton>
            </Link>
            <Link href="/demo">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 rounded-lg overflow-hidden glass border border-white/20 hover:border-white/50 hover:bg-white/10 w-full sm:w-auto uppercase tracking-wider">
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-5 h-5 fill-current" />
                  Launch Auto Demo
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
