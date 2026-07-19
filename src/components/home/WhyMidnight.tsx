"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function WhyMidnight() {
  return (
    <section className="py-24 relative z-20 bg-black/50 border-y border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider">Why Midnight Blockchain</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Traditional multiplayer games suffer from structural flaws. Midnight fixes them using zero-knowledge cryptography.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="border-danger/30 bg-danger/5">
              <h3 className="text-2xl font-bold text-danger mb-6 flex items-center gap-3">
                <XCircle className="w-8 h-8" />
                Traditional Games
              </h3>
              <ul className="space-y-4">
                {[
                  "Server knows everyone's strategy",
                  "Memory reading hacks reveal enemy positions",
                  "Stream sniping ruins competitive integrity",
                  "Latency advantages dictate combat outcomes",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-danger mt-1">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow className="border-success/30 bg-success/5">
              <h3 className="text-2xl font-bold text-success mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8" />
                Phantom Heist on Midnight
              </h3>
              <ul className="space-y-4">
                {[
                  "Strategy is cryptographically hidden until execution",
                  "Zero-knowledge proofs prevent memory reading",
                  "Simultaneous execution eliminates stream sniping",
                  "No latency advantage—decisions are locked in",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white font-medium">
                    <span className="text-success mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
