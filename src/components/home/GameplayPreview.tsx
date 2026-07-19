"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

export default function GameplayPreview() {
  return (
    <section className="py-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider">Battle Timeline</h2>
          <p className="text-xl text-gray-400">Watch as secret plans collide in the execution phase.</p>
        </div>

        <GlassCard className="max-w-4xl mx-auto relative h-[400px] overflow-hidden p-0 border-primary/20">
          <div className="absolute inset-0 bg-black/80" />
          
          {/* Tactical Grid */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          {/* Player 1 Path */}
          <motion.div 
            className="absolute top-[20%] left-0 h-1 bg-gradient-to-r from-transparent to-accent shadow-[0_0_10px_#06b6d4]"
            initial={{ width: "0%" }}
            whileInView={{ width: "45%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-[18%] left-[45%] w-4 h-4 bg-accent rounded-full shadow-[0_0_20px_#06b6d4]"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 2 }}
          />

          {/* Player 2 Path */}
          <motion.div 
            className="absolute bottom-[30%] right-0 h-1 bg-gradient-to-l from-transparent to-danger shadow-[0_0_10px_#ef4444]"
            initial={{ width: "0%" }}
            whileInView={{ width: "55%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-[28%] right-[55%] w-4 h-4 bg-danger rounded-full shadow-[0_0_20px_#ef4444]"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 2 }}
          />

          {/* Conflict Point */}
          <motion.div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/50 rounded-full flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <div className="text-primary font-bold tracking-widest uppercase animate-pulse">
              Clash
            </div>
          </motion.div>

          {/* Overlay UI */}
          <div className="absolute top-4 left-4 font-mono text-accent text-sm">
            [P1] INFILTRATOR<br />
            STATUS: MOVING
          </div>
          <div className="absolute bottom-4 right-4 text-right font-mono text-danger text-sm">
            [P2] DEFENDER<br />
            STATUS: PATROLLING
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
