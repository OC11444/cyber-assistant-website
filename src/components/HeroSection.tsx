import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import cyberHero from "@/assets/cyber-hero.jpg";

const HeroSection = () => {
  const scrollToTerminal = () => {
    const terminal = document.querySelector('[data-section="terminal"]');
    terminal?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${cyberHero})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
          Cyber Assistant
        </h1>
        <p className="text-xl md:text-2xl text-secondary mb-6">
          Terminal AI for Ethical Hackers
        </p>
        
        {/* Track Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-medium glow-primary">
            🏆 IICC Hub Key Track AI Decentralized
          </span>
        </div>

        {/* Team Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          {/* James Profile */}
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-2 border-primary glow-primary">
              <AvatarFallback className="text-xl font-bold bg-card text-primary">
                JN
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-primary">James Njenga</h3>
            <p className="text-sm text-muted-foreground">Co-Creator</p>
          </div>

          {/* Wisdom Profile */}
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-2 border-secondary glow-secondary">
              <AvatarFallback className="text-xl font-bold bg-card text-secondary">
                W
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-secondary">Wisdom</h3>
            <p className="text-sm text-muted-foreground">Co-Creator</p>
          </div>
        </div>

        {/* Team Bio */}
        <div className="cyber-card max-w-2xl mx-auto mb-12">
          <h3 className="text-lg font-semibold text-accent mb-4">About the Team</h3>
          <p className="text-muted-foreground">
            Two passionate developers from Kenya 🇰🇪 building cutting-edge cybersecurity tools. 
            Combining AI innovation with ethical hacking practices to create the next generation 
            of terminal-based security assistants.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onClick={scrollToTerminal} className="btn-cyber">
            Try Demo Terminal
          </button>
          <button className="btn-secondary-cyber">
            View Documentation
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToTerminal} className="text-primary hover:text-primary/80 transition-colors">
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;