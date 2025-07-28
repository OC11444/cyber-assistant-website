import HeroSection from "@/components/HeroSection";
import Terminal from "@/components/Terminal";
import ResourcesSection from "@/components/ResourcesSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Terminal />
      <ResourcesSection />
      <TechStackSection />
      <ContactSection />
    </div>
  );
};

export default Index;
