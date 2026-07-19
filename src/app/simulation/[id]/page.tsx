"use client";

import { use, useEffect } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { useRouter } from "next/navigation";

export default function MissionSimulation({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/results/${resolvedParams.id}`);
    }, 5000); // 5 second simulation phase

    return () => clearTimeout(timer);
  }, [router, resolvedParams.id]);

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl text-center"
        >
          <div className="mb-12 relative inline-block">
            <div className="w-32 h-32 rounded-full border-4 border-danger border-t-transparent animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center text-danger font-bold tracking-widest">
              SIM
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-white uppercase tracking-wider">Mission In Progress</h1>
          <p className="text-gray-400 font-mono mb-8 animate-pulse text-lg">
            Establishing secure connection... Bypassing firewalls... Executing simultaneous plans...
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
