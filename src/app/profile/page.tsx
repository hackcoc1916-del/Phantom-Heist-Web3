"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { User, Target, Zap, Clock, Trophy, Award, Lock, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

const MATCH_HISTORY = [
  { id: "PH-7892X", target: "Neo-Tokyo Bank", date: "2 hrs ago", outcome: "Success", loot: 120000, stealth: "S+" },
  { id: "PH-1229Y", target: "Cyberdyne Data", date: "Yesterday", outcome: "Failure", loot: 0, stealth: "D" },
  { id: "PH-4551A", target: "Tyrell Corp", date: "3 days ago", outcome: "Success", loot: 45000, stealth: "A" },
  { id: "PH-8822B", target: "Neo-Tokyo Bank", date: "5 days ago", outcome: "Success", loot: 110000, stealth: "S" },
];

const ACHIEVEMENTS = [
  { name: "Ghost Protocol", desc: "Complete a heist with 100% stealth.", unlocked: true, icon: EyeOff },
  { name: "Speed Demon", desc: "Escape in under 1 minute.", unlocked: true, icon: Clock },
  { name: "Millionaire", desc: "Accumulate $1,000,000 in total loot.", unlocked: false, icon: Trophy },
  { name: "Hacker Supreme", desc: "Bypass 50 vaults successfully.", unlocked: false, icon: Terminal },
];

function EyeOff(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
  );
}

function Terminal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
  );
}

export default function Profile() {
  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* Banner & Avatar */}
        <div className="mb-8 relative rounded-2xl overflow-hidden border border-white/10 h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent flex items-end gap-6">
            <div className="w-24 h-24 rounded-xl bg-black border-2 border-primary shadow-[0_0_20px_rgba(147,51,234,0.5)] flex items-center justify-center text-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
              <User className="w-12 h-12 relative z-10" />
            </div>
            <div className="mb-2">
              <h1 className="text-4xl font-black text-white uppercase tracking-widest drop-shadow-md">Ghost_Protocol_01</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold uppercase rounded border border-accent/50 tracking-wider">Level 42</span>
                <span className="text-gray-300 font-mono text-sm">Master Infiltrator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats */}
          <div className="col-span-1 space-y-8">
            <GlassCard className="border-white/10">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" /> Performance Matrix
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-success">72%</span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-success"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                    <span className="text-gray-400">Stealth Efficiency</span>
                    <span className="text-primary">95%</span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "95%" }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                    <span className="text-gray-400">Risk Tolerance</span>
                    <span className="text-danger">45%</span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="h-full bg-danger"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="border-white/10">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" /> Achievements
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((ach, i) => (
                  <div 
                    key={i} 
                    className={clsx(
                      "p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all",
                      ach.unlocked ? "bg-black/60 border-yellow-500/30 hover:border-yellow-500/80" : "bg-black/20 border-white/5 opacity-50 grayscale"
                    )}
                  >
                    {ach.unlocked ? (
                      <ach.icon className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-500" />
                    )}
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{ach.name}</h3>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Mission History */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <GlassCard className="border-white/10 h-full">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Action Ledger
                </h2>
                <span className="text-sm font-mono text-gray-500">Cryptographically Verified</span>
              </div>
              
              <div className="space-y-4">
                {MATCH_HISTORY.map((match, i) => (
                  <motion.div 
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/20 transition-all gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0",
                        match.outcome === "Success" ? "bg-success/10 border-success text-success" : "bg-danger/10 border-danger text-danger"
                      )}>
                        {match.outcome === "Success" ? <CheckCircle2 className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-wider uppercase">{match.target}</h3>
                        <p className="text-xs font-mono text-gray-500">{match.id} • {match.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Loot</div>
                        <div className="text-primary font-mono font-bold">${match.loot.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Stealth</div>
                        <div className={clsx(
                          "font-black tracking-widest",
                          match.stealth.includes('S') ? "text-yellow-500" :
                          match.stealth.includes('A') ? "text-success" : "text-danger"
                        )}>
                          {match.stealth}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
