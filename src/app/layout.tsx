import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/layout/ParticleBackground";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import { AudioProvider } from "@/providers/AudioProvider";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Phantom Heist | Midnight Operations",
  description: "A cryptographic stealth strategy game powered by Midnight Blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased bg-[#050b14] text-white min-h-screen flex flex-col`}
      >
        <AudioProvider>
          <ParticleBackground />
          <Cursor />
          <Navbar />
          <main className="flex-grow pt-16 flex flex-col relative z-10">
            {children}
          </main>
          <Footer />
          <Toaster theme="dark" toastOptions={{ className: 'bg-black/90 border border-primary/50 text-white font-mono rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)]' }} />
        </AudioProvider>
      </body>
    </html>
  );
}
