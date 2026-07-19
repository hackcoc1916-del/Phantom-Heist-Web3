"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import GlowingButton from "@/components/ui/GlowingButton";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";

export default function JoinMatch() {
  const router = useRouter();
  const joinLobby = useGameStore(state => state.joinLobby);
  const [isMatching, setIsMatching] = useState(false);

  const handleJoin = (id: string) => {
    setIsMatching(true);
    setTimeout(() => {
      joinLobby(id);
      router.push(`/lobby/${id}`);
    }, 2000);
  };

  const handleQuickMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      const mockId = `PH-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      joinLobby(mockId);
      router.push(`/lobby/${mockId}`);
    }, 2500);
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl relative"
        >
          <AnimatePresence>
            {isMatching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-xl border border-accent/30"
              >
                <Search className="w-12 h-12 text-accent animate-pulse mb-4" />
                <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2">Locating Secure Match...</h3>
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>

          <GlassCard className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-accent uppercase tracking-wider">Available Contracts</h1>
                <p className="text-gray-400">Select an open contract and join the crew.</p>
              </div>
              <GlowingButton variant="primary" onClick={handleQuickMatch} disabled={isMatching}>
                Quick Match
              </GlowingButton>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => {
                const fakeId = `PH-${i}X${i}F`;
                return (
                  <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-lg hover:border-accent/50 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono">Contract #{fakeId}</h3>
                      <p className="text-sm text-gray-400 font-mono">Target: {['Neo-Tokyo Bank', 'Cyberdyne Data', 'Tyrell Corp'][i-1]} • Players: 1/2</p>
                    </div>
                    <GlowingButton variant="accent" onClick={() => handleJoin(fakeId)} disabled={isMatching}>Join</GlowingButton>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
