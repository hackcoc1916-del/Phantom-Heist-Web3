"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Home, Trophy, User, Crosshair, Lock, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";
import { useAudio } from "@/providers/AudioProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { isMuted, toggleMute, playHover, playClick } = useAudio();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/create-match", label: "Create Match", icon: Crosshair },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/privacy", label: "Privacy", icon: Lock },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Shield className="w-5 h-5 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded border border-primary/50 animate-glow" />
            </div>
            <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              PHANTOM
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className={clsx(
                    "relative px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "text-primary" : "text-gray-400 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Sound Toggle */}
            <button 
              onClick={() => { playClick(); toggleMute(); }}
              onMouseEnter={playHover}
              className="ml-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              title={isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
