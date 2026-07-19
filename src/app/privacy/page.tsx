"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { Shield, Lock, CheckCircle2, Eye, EyeOff, Hash, Clock, Trophy, Users, Terminal } from "lucide-react";
import clsx from "clsx";

// Helper component for scrambled text
const ScrambledText = ({ text, isEncrypted }: { text: string; isEncrypted: boolean }) => {
  const [displayText, setDisplayText] = useState(isEncrypted ? "" : text);
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (!isEncrypted) {
      setDisplayText(text);
      return;
    }

    const scrambleInterval = setInterval(() => {
      let scrambled = "";
      for (let i = 0; i < text.length; i++) {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplayText(scrambled);
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [isEncrypted, text]);

  return <span className={clsx("font-mono", isEncrypted && "text-gray-500 blur-[1px]")}>{displayText}</span>;
};

export default function PrivacyDashboard() {
  const [isDevView, setIsDevView] = useState(false);

  const publicData = [
    { label: "Game ID", value: "PH-7892X", icon: Hash },
    { label: "Players Joined", value: "2/2 Verified", icon: Users },
    { label: "Match Started", value: "True", icon: CheckCircle2 },
    { label: "Mission Finished", value: "False", icon: Clock },
    { label: "Winner", value: "Pending", icon: Trophy },
    { label: "Timestamp", value: new Date().toISOString(), icon: Clock },
    { label: "Duration", value: "00:04:12", icon: Clock },
    { label: "Transaction", value: "Confirmed", icon: CheckCircle2 },
    { label: "Public Hash", value: "0x8F9...3B2A", icon: Hash },
  ];

  const confidentialData = [
    { label: "Chosen Agent", trueValue: "Assassin" },
    { label: "Equipment", trueValue: "EMP, Smoke Bomb" },
    { label: "Mission Path", trueValue: "Roof -> Vent -> Vault" },
    { label: "Entry Point", trueValue: "Roof" },
    { label: "Escape Route", trueValue: "Helicopter" },
    { label: "Future Moves", trueValue: "[Move: (50,70)]" },
    { label: "Objectives", trueValue: "Steal diamond, leave no trace" },
    { label: "Vault Code", trueValue: "7-3-9-1" },
    { label: "Guard Predictions", trueValue: "Patrol route A" },
    { label: "Laser Pattern", trueValue: "Sweep cycle 4s" },
  ];

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-widest">
              Privacy Engine
            </h1>
            <p className="text-gray-400 mt-2 font-mono text-sm max-w-xl">
              Real-time monitoring of Midnight Blockchain state protections.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-black/40 p-2 rounded-full border border-white/10">
            <button
              onClick={() => setIsDevView(false)}
              className={clsx(
                "px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-all",
                !isDevView ? "bg-primary text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" : "text-gray-500 hover:text-white"
              )}
            >
              Public View
            </button>
            <button
              onClick={() => setIsDevView(true)}
              className={clsx(
                "px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2",
                isDevView ? "bg-accent text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "text-gray-500 hover:text-white"
              )}
            >
              <Terminal className="w-4 h-4" /> Dev View
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isDevView && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 border border-accent/30 bg-accent/10 rounded-lg flex gap-4 items-start"
            >
              <Eye className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-accent font-bold uppercase tracking-widest mb-1">Developer Override Enabled</h3>
                <p className="text-gray-300 text-sm">
                  Traditional blockchains expose sensitive values directly to the public ledger. <strong className="text-white">Midnight keeps them encrypted</strong> locally while still allowing zero-knowledge verification on-chain. What you see below on the right is what is actually stored on-chain.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL: PUBLIC STATE */}
          <GlassCard className="border-success/30 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent pointer-events-none" />
            <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between z-10 relative">
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Public State</h2>
              <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full border border-success/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
            </div>

            <div className="space-y-4 z-10 relative flex-1">
              {publicData.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-black/40 border border-white/5 rounded-lg hover:border-success/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-bold text-gray-400 uppercase">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-success text-sm truncate max-w-[200px]">{item.value}</span>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* RIGHT PANEL: CONFIDENTIAL STATE */}
          <GlassCard className="border-primary/30 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between z-10 relative">
              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> Confidential State
              </h2>
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/30 flex items-center gap-1">
                <Lock className="w-3 h-3" /> ENCRYPTED
              </span>
            </div>

            <div className="space-y-4 z-10 relative flex-1">
              {confidentialData.map((item, i) => (
                <div key={i} className={clsx(
                  "flex justify-between items-center p-3 rounded-lg border transition-colors relative overflow-hidden group",
                  !isDevView ? "bg-black/60 border-primary/20" : "bg-black/80 border-accent/30"
                )}>
                  {!isDevView && (
                    <motion.div 
                      className="absolute inset-0 bg-primary/5"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2 + (i % 3), repeat: Infinity }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    {isDevView ? <EyeOff className="w-5 h-5 text-accent" /> : <Lock className="w-5 h-5 text-primary" />}
                    <span className="text-sm font-bold text-gray-300 uppercase">{item.label}</span>
                  </div>
                  
                  <div className="relative z-10 max-w-[200px] truncate text-right">
                    {isDevView ? (
                      <span className="font-mono text-xs text-accent line-through opacity-50 block mb-1">
                        <ScrambledText text={item.trueValue} isEncrypted={true} />
                      </span>
                    ) : null}
                    
                    <span className={clsx("font-mono text-sm", isDevView ? "text-white" : "text-primary font-bold")}>
                      <ScrambledText text={item.trueValue} isEncrypted={!isDevView} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-gray-500 z-10 relative">
              <Shield className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Confidential State Protected by Midnight</span>
            </div>
          </GlassCard>

        </div>
      </div>
    </PageWrapper>
  );
}
