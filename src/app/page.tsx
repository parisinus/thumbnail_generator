import { AuroraBackground } from "@/components/main/hero/aurora-background";
import HeroSection from "@/components/main/hero/hero-section";
import Navbar from "@/components/main/nav/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <AuroraBackground>
        <HeroSection />
      </AuroraBackground>
    </>
  );
}
