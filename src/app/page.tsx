import { AuroraBackground } from "@/components/main/hero/aurora-background";
import HeroSection from "@/components/main/hero/hero-section";
import Navbar from "@/components/main/nav/navbar";
import FeaturesSection from "@/components/main/features/features-section";
import PricingSection from "@/components/main/pricing/pricing-section";
import CTASection from "@/components/main/cta/cta-section";
import Footer from "@/components/main/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <AuroraBackground>
        <HeroSection />
      </AuroraBackground>
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}
