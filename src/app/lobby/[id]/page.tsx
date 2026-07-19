"use client";

import { use, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import GlowingButton from "@/components/ui/GlowingButton";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { User, UserCheck } from "lucide-react";

export default function Lobby({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const players = useGameStore(state => state.players);
  const simulateOpponentJoin = useGameStore(state => state.simulateOpponentJoin);
  const setPlayerReady = useGameStore(state => state.setPlayerReady);
  const simulateOpponentReady = useGameStore(state => state.simulateOpponentReady);

  const localPlayer = players.find(p => p.id === 'local-player');
  const opponent = players.find(p => p.id !== 'local-player');
  const allReady = players.length === 2 && players.every(p => p.isReady);

  useEffect(() => {
    // If alone, simulate opponent joining after 3 seconds
    if (players.length === 1) {
      const timer = setTimeout(() => {
        simulateOpponentJoin();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [players.length, simulateOpponentJoin]);

  useEffect(() => {
    if (localPlayer?.isReady && opponent && !opponent.isReady) {
      // Simulate opponent getting ready shortly after player
      const timer = setTimeout(() => {
        simulateOpponentReady();
      }, 1500 + Math.random() * 2000);
      return () => clearTimeout(timer);
    }
  }, [localPlayer?.isReady, opponent, simulateOpponentReady]);

  useEffect(() => {
    if (allReady) {
      // Start planning phase after a brief pause
      const timer = setTimeout(() => {
        router.push(`/planning/${resolvedParams.id}`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [allReady, router, resolvedParams.id]);

  const handleReady = () => {
    setPlayerReady();
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl"
        >
          <GlassCard glow className="p-8">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Lobby: <span className="text-primary font-mono">{resolvedParams.id}</span></h1>
                <p className="text-gray-400">
                  {players.length < 2 ? "Waiting for operatives to join the secure channel..." : "All operatives present. Awaiting ready signals."}
                </p>
              </div>
              <GlowingButton 
                variant={localPlayer?.isReady ? "success" : "primary"} 
                onClick={handleReady}
                disabled={localPlayer?.isReady}
              >
                {localPlayer?.isReady ? "Ready" : "Ready Up"}
              </GlowingButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Local Player */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${localPlayer?.isReady ? 'from-success/20' : 'from-primary/20'} to-transparent opacity-20`} />
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 mb-4 ${localPlayer?.isReady ? 'border-success bg-success/20 text-success' : 'border-primary bg-primary/20 text-primary'}`}>
                  {localPlayer?.isReady ? <UserCheck className="w-10 h-10" /> : <User className="w-10 h-10" />}
                </div>
                <span className="text-white font-bold text-lg">{localPlayer?.name || "You"}</span>
                <span className={`text-sm font-bold uppercase mt-2 ${localPlayer?.isReady ? 'text-success' : 'text-gray-500'}`}>
                  {localPlayer?.isReady ? "READY" : "NOT READY"}
                </span>
              </div>

              {/* Opponent */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                {opponent ? (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-t ${opponent.isReady ? 'from-success/20' : 'from-accent/20'} to-transparent opacity-20`} />
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-2 mb-4 ${opponent.isReady ? 'border-success bg-success/20 text-success' : 'border-accent bg-accent/20 text-accent'}`}
                    >
                      {opponent.isReady ? <UserCheck className="w-10 h-10" /> : <User className="w-10 h-10" />}
                    </motion.div>
                    <span className="text-white font-bold text-lg">{opponent.name}</span>
                    <span className={`text-sm font-bold uppercase mt-2 ${opponent.isReady ? 'text-success' : 'text-gray-500'}`}>
                      {opponent.isReady ? "READY" : "NOT READY"}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/10 animate-ping" />
                    </div>
                    <span className="text-gray-500 font-medium">Scanning network...</span>
                  </>
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {allReady && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center text-success font-bold uppercase tracking-widest animate-pulse"
                >
                  Initiating Planning Phase...
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
