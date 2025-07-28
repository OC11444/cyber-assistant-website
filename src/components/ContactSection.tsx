import { Mail, Github, Linkedin, MapPin, Heart } from "lucide-react";

const ContactSection = () => {
  const contacts = [
    {
      name: "James Njenga",
      role: "Lead Developer",
      email: "james.njenga@cyberassistant.dev",
      github: "https://github.com/james-njenga",
      linkedin: "https://linkedin.com/in/james-njenga",
      avatar: "JN"
    },
    {
      name: "Wisdom",
      role: "Co-Developer",
      email: "wisdom@cyberassistant.dev",
      github: "https://github.com/wisdom-dev",
      linkedin: "https://linkedin.com/in/wisdom-dev",
      avatar: "W"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-dark">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about Cyber Assistant? Want to collaborate? Reach out to our team
          </p>
        </div>

        {/* Team Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {contacts.map((contact, index) => (
            <div key={index} className="cyber-card">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center glow-primary">
                  <span className="text-2xl font-bold text-primary">{contact.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
              </div>

              <div className="space-y-3">
                {/* Email */}
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">
                    {contact.email}
                  </span>
                </a>

                {/* GitHub */}
                <a 
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 text-secondary group-hover:text-secondary" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">
                    GitHub Profile
                  </span>
                </a>

                {/* LinkedIn */}
                <a 
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-accent group-hover:text-accent" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">
                    LinkedIn Profile
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Location & Additional Info */}
        <div className="cyber-card text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold text-foreground">Based in Kenya 🇰🇪</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Building the future of ethical hacking tools from the heart of Africa
          </p>
          
          {/* Made with Love */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in Kenya for the global cybersecurity community</span>
          </div>
        </div>

        {/* OAuth Placeholder */}
        <div className="mt-12 text-center">
          <div className="cyber-card max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-accent mb-4">
              🔗 Future Integration
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              OAuth sign-in coming soon for personalized features
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn-cyber opacity-50 cursor-not-allowed" disabled>
                🐙 Sign in with GitHub
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Feature in development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;