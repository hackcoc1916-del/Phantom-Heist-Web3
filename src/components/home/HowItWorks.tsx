"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { PenTool, EyeOff, Lock, Zap } from "lucide-react";

const steps = [
  {
    icon: PenTool,
    title: "Create Mission",
    description: "Initialize the heist parameters and invite operatives to the lobby.",
    color: "text-primary"
  },
  {
    icon: EyeOff,
    title: "Plan Secretly",
    description: "Develop your strategy, select your loadout, and plot your route in complete secrecy.",
    color: "text-accent"
  },
  {
    icon: Lock,
    title: "Commit (Midnight)",
    description: "Your plan is hashed and submitted to the Midnight blockchain. Cryptographically sealed.",
    color: "text-success"
  },
  {
    icon: Zap,
    title: "Execute Simultaneously",
    description: "All plans are revealed simultaneously. No reacting, just pure execution and chaos.",
    color: "text-danger"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider">How It Works</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full group hover:border-white/30 transition-all duration-300">
                <div className="text-6xl font-black text-white/5 absolute -top-4 -right-2 pointer-events-none">
                  0{index + 1}
                </div>
                <step.icon className={`w-12 h-12 mb-6 ${step.color} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
