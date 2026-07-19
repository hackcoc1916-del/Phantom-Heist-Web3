"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md relative z-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                PHANTOM HEIST
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              A revolutionary multiplayer stealth strategy game powered by Midnight Blockchain. Zero-knowledge gaming is here.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Game</h4>
            <ul className="space-y-2">
              <li><Link href="/create-match" className="text-gray-400 hover:text-white transition-colors">Create Match</Link></li>
              <li><Link href="/join-match" className="text-gray-400 hover:text-white transition-colors">Join Match</Link></li>
              <li><Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Phantom Heist. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
