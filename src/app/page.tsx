import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyMidnight from "@/components/home/WhyMidnight";
import Features from "@/components/home/Features";
import GameplayPreview from "@/components/home/GameplayPreview";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <HowItWorks />
        <WhyMidnight />
        <Features />
        <GameplayPreview />
      </div>
    </PageWrapper>
  );
}
