"use client";

import { use, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import GlowingButton from "@/components/ui/GlowingButton";
import Link from "next/link";
import { CheckCircle2, Activity, Eye, ShieldAlert, Crosshair, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import clsx from "clsx";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { useAudio } from "@/providers/AudioProvider";

const EVENTS = [
  { text: "Ghost entered through rooftop.", time: 2000, stealth: 95, detection: 5, type: "entry" },
  { text: "Camera disabled.", time: 4000, stealth: 90, detection: 10, type: "hack" },
  { text: "Laser grid activated.", time: 7000, stealth: 40, detection: 60, type: "danger" },
  { text: "Smoke deployed.", time: 9000, stealth: 70, detection: 30, type: "utility" },
  { text: "Guard distracted.", time: 11000, stealth: 80, detection: 20, type: "utility" },
  { text: "Vault hacked.", time: 14000, stealth: 50, detection: 50, type: "hack" },
  { text: "Alarm almost triggered.", time: 17000, stealth: 10, detection: 90, type: "danger" },
  { text: "Escape successful.", time: 20000, stealth: 85, detection: 0, type: "success" }
];

export default function MissionReplay({ params }: { params: Promise<{ id: string }> }) {
  use(params);
  const resetGame = useGameStore(state => state.resetGame);
  const { playClick, playSuccess, playError } = useAudio();

  const [timeElapsed, setTimeElapsed] = useState(0); // in ms
  const [currentEventIdx, setCurrentEventIdx] = useState(-1);
  const [missionComplete, setMissionComplete] = useState(false);
  
  const currentEventIdxRef = useRef(-1);
  const hasCompletedRef = useRef(false);

  // Timer loop
  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimeElapsed(elapsed);

      // Find highest event index where time <= elapsed
      let newIdx = -1;
      for (let i = 0; i < EVENTS.length; i++) {
        if (elapsed >= EVENTS[i].time) {
          newIdx = i;
        }
      }

      if (newIdx !== currentEventIdxRef.current) {
        currentEventIdxRef.current = newIdx;
        setCurrentEventIdx(newIdx);
        // Play SFX on event change
        if (newIdx >= 0 && newIdx < EVENTS.length) {
          if (EVENTS[newIdx].type === 'danger') playError();
          else playClick();
        }
      }

      if (elapsed > EVENTS[EVENTS.length - 1].time + 2000 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setMissionComplete(true);
        playSuccess();
        
        // Confetti explosion
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#9333ea'],
          disableForReducedMotion: true
        });

        setTimeout(() => {
          toast.success("Achievement Unlocked: Flawless Ghost");
        }, 1500);

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [playClick, playError, playSuccess]);

  // Derived state
  const currentEvent = currentEventIdx >= 0 ? EVENTS[currentEventIdx] : { stealth: 100, detection: 0, type: "idle" };
  const progress = Math.min(100, ((currentEventIdx + 1) / EVENTS.length) * 100);

  // Formatting timer 00:00.00
  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, '0');
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const millis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${mins}:${secs}.${millis}`;
  };

  // Dynamic visualizer renderer
  const renderVisualizer = () => {
    switch (currentEvent.type) {
      case "danger":
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-danger/20"
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            {/* Lasers */}
            {[1,2,3,4].map(i => (
              <motion.div 
                key={i}
                className="absolute w-full h-[2px] bg-danger shadow-[0_0_15px_rgba(239,68,68,1)]"
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
              />
            ))}
            <ShieldAlert className="w-24 h-24 text-danger animate-pulse z-10 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
          </div>
        );
      case "hack":
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050b14] overflow-hidden">
            {/* Matrix rain fake */}
            {Array.from({length: 10}).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-accent/50 font-mono text-xs whitespace-pre"
                style={{ left: `${i * 10}%` }}
                initial={{ top: "-50%" }}
                animate={{ top: "150%" }}
                transition={{ repeat: Infinity, duration: Math.random() * 2 + 1, ease: "linear" }}
              >
                {"01010111\n10101010\n00011100\n11100011"}
              </motion.div>
            ))}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-32 h-32 border-4 border-dashed border-accent rounded-full z-10 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              <Zap className="w-12 h-12 text-accent" />
            </motion.div>
          </div>
        );
      case "utility":
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gray-500/30 blur-xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <Eye className="w-20 h-20 text-gray-300 animate-pulse z-10 opacity-50" />
          </div>
        );
      case "success":
      case "entry":
      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div 
              className="w-full h-full border-2 border-primary/20 rounded-full absolute"
              animate={{ scale: [0, 2], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <Crosshair className="w-20 h-20 text-primary z-10" />
          </div>
        );
    }
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full relative">
        
        <AnimatePresence>
          {missionComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md rounded-xl border border-success/30"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              >
                <CheckCircle2 className="w-28 h-28 text-success mx-auto mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
              </motion.div>
              
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-success to-accent mb-4 uppercase tracking-tighter">
                MISSION COMPLETE
              </h1>
              
              <div className="flex items-center gap-2 mb-8 bg-black/50 px-6 py-2 rounded-full border border-white/10">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Winner:</span>
                <span className="text-white font-black text-xl tracking-widest uppercase">Ghost (Player)</span>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3 bg-primary/10 border border-primary/30 px-6 py-3 rounded-lg mb-12 shadow-[0_0_20px_rgba(147,51,234,0.2)]"
              >
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Cryptographically Verified by Midnight</span>
              </motion.div>

              <Link href="/" onClick={resetGame}>
                <GlowingButton variant="primary" className="text-lg px-8 py-4 uppercase font-black tracking-widest">
                  Return to HQ
                </GlowingButton>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col h-full gap-6"
            >
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10">
                <div>
                  <h1 className="text-2xl font-black text-white uppercase tracking-widest">Cinematic Replay</h1>
                  <p className="text-gray-400 text-sm font-mono mt-1">Analyzing action ledger...</p>
                </div>
                <div className="text-3xl font-mono font-black text-accent drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                  {formatTime(timeElapsed)}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
                {/* HUD Panel */}
                <GlassCard className="col-span-1 border-white/10 flex flex-col gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Mission Progress</h3>
                    <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        className="h-full bg-white"
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", bounce: 0 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Eye className="w-4 h-4 text-primary" /> Stealth</h3>
                      <span className="text-primary font-mono font-bold">{currentEvent.stealth}%</span>
                    </div>
                    <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        className="h-full bg-primary"
                        animate={{ width: `${currentEvent.stealth}%` }}
                        transition={{ type: "spring" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Activity className="w-4 h-4 text-danger" /> Detection</h3>
                      <span className="text-danger font-mono font-bold">{currentEvent.detection}%</span>
                    </div>
                    <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        className="h-full bg-danger"
                        animate={{ width: `${currentEvent.detection}%` }}
                        transition={{ type: "spring" }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col mt-4">
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Event Log</h3>
                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                      {EVENTS.map((event, idx) => (
                        <div 
                          key={idx} 
                          className={clsx(
                            "flex gap-3 text-sm transition-all duration-300",
                            idx > currentEventIdx ? "opacity-0 h-0 overflow-hidden" : "opacity-100",
                            idx === currentEventIdx ? "text-white font-bold" : "text-gray-500"
                          )}
                        >
                          <span className="text-accent font-mono shrink-0">{formatTime(event.time)}</span>
                          <span className="flex items-center gap-2">
                            {idx === currentEventIdx && <ArrowRight className="w-3 h-3 text-primary animate-pulse" />}
                            {event.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                {/* Cinematic Visualizer */}
                <GlassCard className="col-span-1 lg:col-span-2 border-white/10 p-0 overflow-hidden relative bg-black/80">
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                    <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">REC</span>
                  </div>
                  
                  {/* Dynamic Visuals based on event */}
                  <div 
                    key={currentEvent.type}
                    className="absolute inset-0 opacity-100"
                  >
                    {renderVisualizer()}
                  </div>
                  
                  {/* Overlay text */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                    <h2 
                      key={currentEventIdx}
                      className={clsx(
                        "text-3xl font-black uppercase tracking-widest opacity-100",
                        currentEvent.type === "danger" ? "text-danger" : 
                        currentEvent.type === "hack" ? "text-accent" : 
                        "text-white"
                      )}
                    >
                      {currentEventIdx >= 0 ? EVENTS[currentEventIdx].text : "Initiating Replay..."}
                    </h2>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
}
