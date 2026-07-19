"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playError: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [ctx, setCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first client-side render
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      setCtx(new AudioContextClass());
    }
  }, []);

  const playTone = (frequency: number, type: OscillatorType, duration: number, vol = 0.1) => {
    if (isMuted || !ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  const playHover = () => playTone(600, "sine", 0.1, 0.05);
  const playClick = () => playTone(1200, "square", 0.1, 0.1);
  const playSuccess = () => {
    playTone(400, "sine", 0.2, 0.1);
    setTimeout(() => playTone(600, "sine", 0.4, 0.1), 100);
  };
  const playError = () => {
    playTone(200, "sawtooth", 0.3, 0.2);
    setTimeout(() => playTone(150, "sawtooth", 0.4, 0.2), 150);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute: () => setIsMuted(!isMuted), playHover, playClick, playSuccess, playError }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
