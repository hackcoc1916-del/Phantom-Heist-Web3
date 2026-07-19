"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { Trophy, Shield, Crosshair, Clock, DollarSign, Medal } from "lucide-react";
import clsx from "clsx";

const PLAYERS = [
  { name: "NeonSpecter", wins: 142, losses: 12, success: 91, time: "1:14", loot: 2450000, stealth: "S+" },
  { name: "CyberGhost", wins: 128, losses: 18, success: 87, time: "1:22", loot: 2100000, stealth: "S" },
  { name: "ZeroCool", wins: 115, losses: 25, success: 82, time: "1:35", loot: 1850000, stealth: "A+" },
  { name: "VoidWalker", wins: 98, losses: 31, success: 75, time: "1:41", loot: 1520000, stealth: "A" },
  { name: "NetRunner_99", wins: 85, losses: 40, success: 68, time: "1:55", loot: 1240000, stealth: "B+" },
  { name: "ShadowBroker", wins: 76, losses: 45, success: 62, time: "2:05", loot: 980000, stealth: "B" },
  { name: "Glitch", wins: 64, losses: 52, success: 55, time: "2:18", loot: 820000, stealth: "C+" },
  { name: "DataThief", wins: 52, losses: 60, success: 46, time: "2:40", loot: 650000, stealth: "C" },
  { name: "Phantom", wins: 41, losses: 68, success: 37, time: "3:10", loot: 480000, stealth: "D" },
  { name: "RookieHeist", wins: 12, losses: 85, success: 12, time: "4:45", loot: 120000, stealth: "F" },
];

export default function Leaderboard() {
  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8 text-center">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4 drop-shadow-[0_0_15px_rgba(147,51,234,0.8)] animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-widest">
            Global Rankings
          </h1>
          <p className="text-gray-400 mt-2 font-mono">The most elusive operatives in the Midnight network.</p>
        </div>

        <GlassCard className="p-0 overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/60 border-b border-white/10 text-xs uppercase tracking-widest text-gray-400 font-bold">
                  <th className="p-4 rounded-tl-lg">Rank</th>
                  <th className="p-4">Operative</th>
                  <th className="p-4 text-center">Win / Loss</th>
                  <th className="p-4 text-center"><div className="flex items-center justify-center gap-2"><Crosshair className="w-4 h-4 text-success" /> Success %</div></th>
                  <th className="p-4 text-center"><div className="flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-accent" /> Best Time</div></th>
                  <th className="p-4 text-right"><div className="flex items-center justify-end gap-2"><DollarSign className="w-4 h-4 text-primary" /> Total Loot</div></th>
                  <th className="p-4 text-center rounded-tr-lg"><div className="flex items-center justify-center gap-2"><Shield className="w-4 h-4 text-warning" /> Stealth</div></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PLAYERS.map((player, idx) => {
                  const isTop1 = idx === 0;
                  const isTop2 = idx === 1;
                  const isTop3 = idx === 2;
                  
                  return (
                    <motion.tr 
                      key={player.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={clsx(
                        "group transition-colors",
                        isTop1 ? "bg-gradient-to-r from-yellow-500/10 to-transparent hover:from-yellow-500/20" :
                        isTop2 ? "bg-gradient-to-r from-gray-300/10 to-transparent hover:from-gray-300/20" :
                        isTop3 ? "bg-gradient-to-r from-orange-500/10 to-transparent hover:from-orange-500/20" :
                        "hover:bg-white/5"
                      )}
                    >
                      <td className="p-4">
                        {isTop1 ? <Medal className="w-6 h-6 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" /> :
                         isTop2 ? <Medal className="w-6 h-6 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]" /> :
                         isTop3 ? <Medal className="w-6 h-6 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" /> :
                         <span className="text-gray-500 font-mono font-bold ml-2">#{idx + 1}</span>}
                      </td>
                      <td className="p-4 font-bold text-white tracking-wider flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-black/50 border border-white/10 flex items-center justify-center text-xs font-black text-gray-500 group-hover:border-primary group-hover:text-primary transition-colors">
                          {player.name.substring(0, 2).toUpperCase()}
                        </div>
                        {player.name}
                      </td>
                      <td className="p-4 text-center font-mono">
                        <span className="text-success">{player.wins}</span><span className="text-gray-600 mx-1">/</span><span className="text-danger">{player.losses}</span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-1.5 bg-black/50 rounded-full overflow-hidden">
                            <div className="h-full bg-success" style={{ width: `${player.success}%` }} />
                          </div>
                          <span className="text-gray-300 font-mono text-sm">{player.success}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center font-mono text-accent">{player.time}</td>
                      <td className="p-4 text-right font-mono text-primary font-bold">
                        ${player.loot.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className={clsx(
                          "px-2 py-1 rounded text-xs font-black tracking-widest",
                          player.stealth.includes('S') ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)]" :
                          player.stealth.includes('A') ? "bg-success/20 text-success border border-success/50" :
                          player.stealth.includes('B') ? "bg-primary/20 text-primary border border-primary/50" :
                          "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                        )}>
                          {player.stealth}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </PageWrapper>
  );
}
