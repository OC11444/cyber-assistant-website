import { ExternalLink, Download, Github, Youtube, Cloud, BookOpen } from "lucide-react";

const ResourcesSection = () => {
  const resources = [
    {
      title: "🐳 Docker Image",
      description: "Pull and run the complete Cyber Assistant environment",
      link: "https://hub.docker.com/r/cyberassistant/latest",
      icon: Download,
      color: "primary",
      command: "docker pull cyberassistant/latest"
    },
    {
      title: "🧑‍💻 GitHub Repository",
      description: "Source code, documentation, and contribution guidelines",
      link: "https://github.com/james-njenga/cyber-assistant",
      icon: Github,
      color: "secondary",
      command: "git clone https://github.com/james-njenga/cyber-assistant.git"
    },
    {
      title: "🎥 Demo Videos",
      description: "Watch tutorials and feature demonstrations",
      link: "https://youtube.com/playlist?list=PLcyber-assistant-demos",
      icon: Youtube,
      color: "accent",
      command: "# Watch our latest tutorials"
    },
    {
      title: "☁️ Cloud Instance",
      description: "Try Cyber Assistant in the cloud without installation",
      link: "https://cloud.cyberassistant.io",
      icon: Cloud,
      color: "primary",
      command: "# No installation required"
    },
    {
      title: "📚 Documentation",
      description: "Complete API reference and user guides",
      link: "https://docs.cyberassistant.io",
      icon: BookOpen,
      color: "secondary",
      command: "# Learn how to use all features"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Resources & Downloads
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with Cyber Assistant using our comprehensive resources and tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            const colorClasses = {
              primary: "border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-primary",
              secondary: "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground glow-secondary",
              accent: "border-accent text-accent hover:bg-accent hover:text-accent-foreground glow-accent"
            };

            return (
              <div key={index} className="cyber-card group">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg border ${colorClasses[resource.color as keyof typeof colorClasses]} transition-all duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                  </div>
                </div>

                {/* Command Preview */}
                <div className="terminal mb-4 text-xs">
                  <div className="terminal-prompt">$ {resource.command}</div>
                </div>

                {/* Action Button */}
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 w-full justify-center py-3 px-4 border rounded-lg font-mono text-sm transition-all duration-300 ${colorClasses[resource.color as keyof typeof colorClasses]}`}
                >
                  Access Resource
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Quick Start Section */}
        <div className="mt-16 cyber-card">
          <h3 className="text-xl font-semibold text-center mb-6 text-accent">
            🚀 Quick Start Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Download</h4>
              <p className="text-sm text-muted-foreground">
                Pull the Docker image or clone from GitHub
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/20 border border-secondary flex items-center justify-center">
                <span className="text-secondary font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Configure</h4>
              <p className="text-sm text-muted-foreground">
                Set up your environment and API keys
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/20 border border-accent flex items-center justify-center">
                <span className="text-accent font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Hack Ethically</h4>
              <p className="text-sm text-muted-foreground">
                Start your ethical hacking journey with AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;