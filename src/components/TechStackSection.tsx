const TechStackSection = () => {
  const technologies = [
    {
      name: "React",
      description: "Frontend framework for building user interfaces",
      icon: "⚛️",
      color: "primary"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid styling",
      icon: "🎨",
      color: "secondary"
    },
    {
      name: "JavaScript",
      description: "Core programming language for web development",
      icon: "📜",
      color: "accent"
    },
    {
      name: "Docker",
      description: "Containerization platform for deployment",
      icon: "🐳",
      color: "primary"
    },
    {
      name: "Python",
      description: "Backend AI processing and security tools",
      icon: "🐍",
      color: "secondary"
    },
    {
      name: "OpenAI API",
      description: "AI model integration for intelligent responses",
      icon: "🤖",
      color: "accent"
    }
  ];

  const colorClasses = {
    primary: "border-primary text-primary glow-primary",
    secondary: "border-secondary text-secondary glow-secondary",
    accent: "border-accent text-accent glow-accent"
  };

  return (
    <section className="py-20 px-6 bg-gradient-dark">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies for performance, security, and scalability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="cyber-card group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-center">
                <div className={`text-4xl mb-4 p-4 rounded-lg border ${colorClasses[tech.color as keyof typeof colorClasses]} transition-all duration-300 inline-block`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {tech.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-accent">
            System Architecture
          </h3>
          <div className="cyber-card">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Frontend */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                  <span className="text-2xl">🖥️</span>
                </div>
                <h4 className="font-semibold text-primary">Frontend</h4>
                <p className="text-xs text-muted-foreground">React + Tailwind</p>
              </div>

              {/* Arrow */}
              <div className="text-2xl text-primary hidden md:block">⟶</div>

              {/* API Layer */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-secondary/20 border border-secondary flex items-center justify-center">
                  <span className="text-2xl">🔗</span>
                </div>
                <h4 className="font-semibold text-secondary">API Layer</h4>
                <p className="text-xs text-muted-foreground">REST + WebSocket</p>
              </div>

              {/* Arrow */}
              <div className="text-2xl text-secondary hidden md:block">⟶</div>

              {/* AI Engine */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-accent/20 border border-accent flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="font-semibold text-accent">AI Engine</h4>
                <p className="text-xs text-muted-foreground">Python + OpenAI</p>
              </div>

              {/* Arrow */}
              <div className="text-2xl text-accent hidden md:block">⟶</div>

              {/* Security Tools */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="font-semibold text-primary">Security Tools</h4>
                <p className="text-xs text-muted-foreground">Nmap + Custom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;