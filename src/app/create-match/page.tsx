"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import GlowingButton from "@/components/ui/GlowingButton";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { Loader2 } from "lucide-react";

export default function CreateMatch() {
  const router = useRouter();
  const createLobby = useGameStore((state) => state.createLobby);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreate = () => {
    setIsGenerating(true);
    
    // Fake realistic loading time
    setTimeout(() => {
      const lobbyCode = createLobby();
      router.push(`/lobby/${lobbyCode}`);
    }, 1500);
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl relative"
        >
          <AnimatePresence>
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-xl border border-primary/30"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">Generating Secure Lobby...</h3>
                <p className="text-sm text-gray-400 font-mono mt-2 animate-pulse">Establishing encrypted connection...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <GlassCard glow className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-primary uppercase tracking-wider">Create Match</h1>
            <p className="text-gray-400 mb-8">
              Configure the parameters for your next infiltration. Set the difficulty, invite operatives, and prepare your gear.
            </p>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Target</label>
                <input
                  type="text"
                  placeholder="e.g. Cyberdyne Data Center"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Difficulty</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none font-mono">
                  <option value="normal">NORMAL - Baseline Security</option>
                  <option value="hard">HARD - Elevated Threat Level</option>
                  <option value="extreme">EXTREME - Zero Tolerance</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <GlowingButton variant="accent" onClick={handleCreate} disabled={isGenerating}>
                Initialize Lobby
              </GlowingButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
