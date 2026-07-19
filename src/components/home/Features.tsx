"use client";

import { motion } from "framer-motion";
import { Shield, EyeOff, Gavel, Cpu, Key, Target } from "lucide-react";

const features = [
  { icon: EyeOff, title: "Secret Planning", desc: "Draft your heist in total isolation. Not even the server knows your moves." },
  { icon: Gavel, title: "Fair Gameplay", desc: "Simultaneous execution phase ensures no player can react to another's pending move." },
  { icon: Shield, title: "No Stream Sniping", desc: "Since actions are locked before they occur, broadcasting your screen gives no advantage." },
  { icon: Cpu, title: "Cryptographic Verification", desc: "Zero-Knowledge proofs ensure every move is valid according to game rules." },
  { icon: Key, title: "Hidden Strategies", desc: "Bluffing is real. Deploy decoys and fake loadouts securely." },
  { icon: Target, title: "Zero Cheating", desc: "Math guarantees the integrity of the match. Hackers have no data to exploit." }
];

export default function Features() {
  return (
    <section className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
