"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { useGameStore } from "@/store/useGameStore";
import { ShieldAlert, FastForward } from "lucide-react";
import { toast } from "sonner";
import { useAudio } from "@/providers/AudioProvider";

export default function DemoMode() {
  const router = useRouter();
  const { setMatchId, setPlayer, setOpponent, updatePlayerState } = useGameStore();
  const { playClick, playSuccess, playError } = useAudio();
  
  const [phase, setPhase] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runDemo = async () => {
      // Phase 0: Init
      toast.info("Demo Mode Initialized");
      playClick();
      addLog("Initializing mock players...");
      setMatchId("PH-DEMO-99");
      setPlayer({ id: "p1", name: "Judge (Player 1)", status: "planning", role: "Ghost", loadout: [] });
      setOpponent({ id: "p2", name: "AI Opponent", status: "planning" });
      
      await new Promise(r => setTimeout(r, 2000));
      setPhase(1);
      
      // Phase 1: Planning
      addLog("Simulating Mission Planning...");
      playClick();
      await new Promise(r => setTimeout(r, 1500));
      addLog("Auto-selecting Loadout: Ghost, EMP, Grappling Hook");
      updatePlayerState({ loadout: ["Ghost", "EMP", "Grappling Hook"] });
      
      await new Promise(r => setTimeout(r, 2000));
      setPhase(2);

      // Phase 2: Committing Strategy
      addLog("Committing Strategy to Midnight Network...");
      playSuccess();
      updatePlayerState({ status: "committed" });
      
      await new Promise(r => setTimeout(r, 2500));
      addLog("Opponent committed strategy.");
      
      await new Promise(r => setTimeout(r, 1500));
      setPhase(3);

      // Phase 3: Launching Replay
      addLog("Strategies locked. Launching Simulation...");
      playError();
      await new Promise(r => setTimeout(r, 1000));
      
      // Redirect to Replay
      toast.success("Redirecting to Mission Replay...");
      router.push("/results/PH-DEMO-99");
      
      // The Replay page will take 22 seconds to finish.
      // We don't need to control it from here, the user just watches it.
    };

    runDemo();

    return () => clearTimeout(timeoutId);
  }, [router, setMatchId, setPlayer, setOpponent, updatePlayerState, playClick, playSuccess, playError]);

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div 
          className="max-w-md w-full bg-black/50 border border-primary/30 p-8 rounded-xl backdrop-blur-md relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Scanning line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex items-center gap-3 mb-6">
            <FastForward className="w-8 h-8 text-accent animate-pulse" />
            <h1 className="text-2xl font-black uppercase tracking-widest text-white">Auto Demo Mode</h1>
          </div>
          
          <div className="space-y-4 mb-8 font-mono text-sm">
            {log.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary flex items-start gap-2"
              >
                <span className="text-white/50">{`>`}</span>
                {msg}
              </motion.div>
            ))}
            {phase < 3 && (
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-accent mt-2"
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4" />
            Please do not close this window
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
