"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import GlassCard from "@/components/ui/GlassCard";
import GlowingButton from "@/components/ui/GlowingButton";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { Lock, ShieldAlert, Zap, Clock, Terminal } from "lucide-react";
import clsx from "clsx";

const AGENTS = ["Ghost", "Assassin", "Hacker", "Infiltrator"];
const EQUIPMENT = ["Lockpick", "EMP", "Smoke Bomb", "Drone", "Thermal Scanner", "Grappling Hook"];
const ENTRIES = ["Roof", "Vent", "Main Entrance", "Sewer", "Emergency Exit"];
const ESCAPES = ["Helicopter", "Van", "Tunnel", "Rooftop"];
const ROOMS = [
  { id: "Roof", x: 50, y: 10 },
  { id: "Vent", x: 80, y: 20 },
  { id: "Control Room", x: 50, y: 30 },
  { id: "Security Room", x: 20, y: 50 },
  { id: "Hallway", x: 50, y: 50 },
  { id: "Camera Room", x: 80, y: 50 },
  { id: "Vault", x: 50, y: 70 },
  { id: "Storage", x: 80, y: 70 },
  { id: "Entrance", x: 50, y: 90 },
  { id: "Emergency Exit", x: 20, y: 90 },
  { id: "Sewer", x: 20, y: 110 } // Slightly off map visually
];

export default function PlanningRoom({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const commitStrategy = useGameStore(state => state.commitStrategy);

  // Local State for the Plan
  const [agent, setAgent] = useState<string>("Ghost");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [entry, setEntry] = useState<string>("Roof");
  const [escape, setEscape] = useState<string>("Helicopter");
  const [path, setPath] = useState<string[]>([]);

  // Animation State
  const [commitPhase, setCommitPhase] = useState<number>(0);
  const [commitMessage, setCommitMessage] = useState<string>("");

  const toggleEquipment = (item: string) => {
    if (equipment.includes(item)) {
      setEquipment(equipment.filter(e => e !== item));
    } else if (equipment.length < 3) {
      setEquipment([...equipment, item]);
    }
  };

  const handleRoomClick = (roomId: string) => {
    if (path.includes(roomId)) {
      // Remove room and all subsequent rooms
      const index = path.indexOf(roomId);
      setPath(path.slice(0, index));
    } else {
      setPath([...path, roomId]);
    }
  };

  // Calculate fake stats
  const stealthLevel = agent === "Ghost" ? 95 : agent === "Hacker" ? 80 : 50;
  const riskMeter = entry === "Main Entrance" ? 90 : path.includes("Security Room") ? 75 : 40;
  const escapeTime = escape === "Helicopter" ? "1m 30s" : "3m 45s";

  const handleCommit = () => {
    setCommitPhase(1);
  };

  useEffect(() => {
    if (commitPhase === 1) {
      setCommitMessage("Encrypting strategy...");
      const t = setTimeout(() => setCommitPhase(2), 1500);
      return () => clearTimeout(t);
    } else if (commitPhase === 2) {
      setCommitMessage("Uploading confidential state...");
      const t = setTimeout(() => setCommitPhase(3), 1500);
      return () => clearTimeout(t);
    } else if (commitPhase === 3) {
      setCommitMessage("Midnight verification pending...");
      const t = setTimeout(() => setCommitPhase(4), 2000);
      return () => clearTimeout(t);
    } else if (commitPhase === 4) {
      setCommitMessage("Mission Locked.");
      commitStrategy();
      const t = setTimeout(() => router.push(`/simulation/${resolvedParams.id}`), 1000);
      return () => clearTimeout(t);
    }
  }, [commitPhase, commitStrategy, router, resolvedParams.id]);

  const isLocked = commitPhase > 0;

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col p-4 md:p-8 relative">
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60"
            >
              <GlassCard glow className="p-12 text-center max-w-lg border-primary/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/matrix.png')] opacity-10 animate-pulse" />
                <Lock className="w-20 h-20 text-primary mx-auto mb-6 animate-pulse relative z-10" />
                <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-6 relative z-10">
                  {commitPhase === 4 ? "Mission Locked" : "Securing Payload"}
                </h2>
                <div className="flex items-center gap-4 bg-black/50 p-4 rounded-lg relative z-10 border border-white/10">
                  <Terminal className="w-6 h-6 text-accent animate-pulse" />
                  <p className="text-accent font-mono text-left">{commitMessage}</p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-accent uppercase tracking-widest">Strategy Room</h1>
          <div className="text-primary font-mono text-2xl animate-pulse bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">05:00</div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* MAP SECTION */}
          <GlassCard className="col-span-1 lg:col-span-7 flex flex-col border-white/10 p-0 overflow-hidden relative min-h-[600px]">
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-20 relative">
              <h2 className="text-lg font-bold text-white uppercase">Museum Blueprint <span className="text-primary font-mono text-sm ml-2">CONFIDENTIAL</span></h2>
              <button onClick={() => setPath([])} className="text-xs text-danger font-mono hover:underline">CLEAR ROUTE</button>
            </div>
            
            <div className="flex-1 relative bg-[#0a0f16] overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10 pointer-events-none">
                {Array.from({length: 100}).map((_, i) => (
                  <div key={i} className="border border-primary/20" />
                ))}
              </div>

              {/* Draw Path Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {path.length > 1 && path.map((roomId, index) => {
                  if (index === 0) return null;
                  const prevRoom = ROOMS.find(r => r.id === path[index - 1]);
                  const currRoom = ROOMS.find(r => r.id === roomId);
                  if (!prevRoom || !currRoom) return null;
                  return (
                    <motion.line
                      key={`${prevRoom.id}-${currRoom.id}`}
                      x1={`${prevRoom.x}%`} y1={`${prevRoom.y}%`}
                      x2={`${currRoom.x}%`} y2={`${currRoom.y}%`}
                      stroke="#06b6d4" strokeWidth="4"
                      strokeDasharray="10, 10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}
              </svg>

              {/* Draw Rooms */}
              {ROOMS.map((room) => {
                const isSelected = path.includes(room.id);
                const isLast = path[path.length - 1] === room.id;
                return (
                  <div 
                    key={room.id}
                    onClick={() => handleRoomClick(room.id)}
                    className={clsx(
                      "absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 border-2 cursor-pointer transition-all duration-300 z-20 backdrop-blur-md flex items-center justify-center text-xs font-bold uppercase tracking-widest",
                      isSelected 
                        ? "border-accent bg-accent/20 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                        : "border-primary/50 bg-black/60 text-primary/70 hover:border-primary hover:text-primary hover:bg-primary/20"
                    )}
                    style={{ left: `${room.x}%`, top: `${room.y}%` }}
                  >
                    {room.id}
                    {isLast && (
                      <span className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* SIDEBAR SELECTIONS */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {/* Agent & Setup */}
            <GlassCard className="border-white/10 p-5">
              <h3 className="text-sm font-black text-gray-400 mb-3 uppercase tracking-wider">Operative</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {AGENTS.map(a => (
                  <button 
                    key={a} onClick={() => setAgent(a)}
                    className={clsx(
                      "p-2 text-sm font-bold uppercase rounded border transition-all",
                      agent === a ? "bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]" : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30"
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-black text-gray-400 mb-3 uppercase tracking-wider">Equipment (Max 3)</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {EQUIPMENT.map(e => {
                  const selected = equipment.includes(e);
                  return (
                    <button 
                      key={e} onClick={() => toggleEquipment(e)}
                      className={clsx(
                        "px-3 py-1.5 text-xs font-bold uppercase rounded-full border transition-all",
                        selected ? "bg-accent/20 border-accent text-white" : "bg-black/40 border-white/10 text-gray-500 hover:text-gray-300"
                      )}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-black text-gray-400 mb-2 uppercase tracking-wider">Entry Point</h3>
                  <select 
                    value={entry} onChange={(e) => setEntry(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm font-mono focus:outline-none focus:border-primary"
                  >
                    {ENTRIES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 mb-2 uppercase tracking-wider">Escape Route</h3>
                  <select 
                    value={escape} onChange={(e) => setEscape(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm font-mono focus:outline-none focus:border-primary"
                  >
                    {ESCAPES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Mission Summary */}
            <GlassCard className="border-white/10 p-5 bg-gradient-to-br from-black/60 to-primary/5">
              <h3 className="text-lg font-black text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">Mission Prognosis</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 font-bold uppercase flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-primary" /> Stealth Level</span>
                    <span className="text-primary font-mono font-bold">{stealthLevel}%</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${stealthLevel}%` }} className="h-full bg-primary" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 font-bold uppercase flex items-center gap-2"><Zap className="w-4 h-4 text-danger" /> Risk Meter</span>
                    <span className="text-danger font-mono font-bold">{riskMeter}%</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${riskMeter}%` }} className="h-full bg-danger" />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                  <span className="text-gray-400 font-bold uppercase flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> Est. Escape Time</span>
                  <span className="text-accent font-mono font-bold">{escapeTime}</span>
                </div>
              </div>
            </GlassCard>
            
            <GlowingButton 
              variant="danger" 
              className="w-full py-4 text-xl tracking-widest font-black"
              onClick={handleCommit}
            >
              COMMIT STRATEGY
            </GlowingButton>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
