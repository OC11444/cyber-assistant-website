import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Mic, Type } from "lucide-react";

interface Command {
  input: string;
  output: string;
  timestamp: string;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Mock responses for demo mode
  const mockResponses: { [key: string]: string } = {
    "nmap 127.0.0.1": `
Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000070s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https

Nmap done: 1 IP address (1 host up) scanned in 1.23 seconds`,
    
    "help": `
Cyber Assistant v1.0 - Available Commands:
┌────────────────────────────────────────────┐
│ nmap [target]      - Network mapping       │
│ scan [options]     - Vulnerability scan    │
│ exploit [target]   - Exploit analysis      │
│ report             - Generate report       │
│ clear              - Clear terminal        │
│ help               - Show this help        │
└────────────────────────────────────────────┘`,

    "scan --ports": `
🔍 Scanning common ports...
[+] Port 21/tcp  - FTP (Anonymous login: disabled)
[+] Port 22/tcp  - SSH (Version: OpenSSH 8.0)
[+] Port 80/tcp  - HTTP (Apache 2.4.41)
[+] Port 443/tcp - HTTPS (SSL/TLS enabled)
[!] Potential vulnerability found on port 80
    - CVE-2021-44228 (Log4Shell) detected
    - Severity: CRITICAL
    
Scan completed in 3.47 seconds`,

    "whoami": "cyber_assistant@hackathon:~$",
    "clear": "",
    "ls": "cyber_tools/  reports/  exploits/  README.md",
    "pwd": "/home/cyber_assistant",
  };

  // Play sound effects
  const playSound = (type: 'click' | 'type' | 'error') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        break;
      case 'type':
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        break;
      case 'error':
        oscillator.frequency.value = 200;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Type out response with animation
  const typeResponse = async (response: string, commandInput: string) => {
    setIsTyping(true);
    const timestamp = new Date().toLocaleTimeString();
    
    if (commandInput.toLowerCase() === 'clear') {
      setCommands([]);
      setIsTyping(false);
      return;
    }

    // Add command to history immediately
    const newCommand: Command = {
      input: commandInput,
      output: "",
      timestamp
    };
    
    setCommands(prev => [...prev, newCommand]);

    // Type out the response character by character
    for (let i = 0; i <= response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setCommands(prev => 
        prev.map((cmd, index) => 
          index === prev.length - 1 
            ? { ...cmd, output: response.slice(0, i) }
            : cmd
        )
      );
      if (i % 3 === 0) playSound('type');
    }
    
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    playSound('click');

    if (isDemoMode) {
      const response = mockResponses[input.toLowerCase()] || 
        `Command '${input}' not recognized. Type 'help' for available commands.`;
      await typeResponse(response, input);
    } else {
      // Live mode - show download/cloud info
      const response = `
🚀 Live Mode Active
To run Cyber Assistant with real capabilities:

📦 Docker: docker pull cyberassistant/latest
☁️  Cloud: https://cloud.cyberassistant.io
📱 Mobile: Download from GitHub releases

Note: Live mode requires proper authentication and ethical use compliance.`;
      await typeResponse(response, input);
    }

    setInput("");
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input when clicking terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="py-20 px-6" data-section="terminal">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Interactive Terminal
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience the power of AI-assisted ethical hacking
          </p>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {/* Demo/Live Mode Toggle */}
            <div className="flex items-center gap-2 bg-card border border-primary/30 rounded-lg px-4 py-2">
              <span className={`text-sm ${!isDemoMode ? 'text-muted-foreground' : 'text-primary'}`}>
                Demo
              </span>
              <Switch 
                checked={!isDemoMode} 
                onCheckedChange={() => {
                  setIsDemoMode(!isDemoMode);
                  playSound('click');
                }}
              />
              <span className={`text-sm ${isDemoMode ? 'text-muted-foreground' : 'text-secondary'}`}>
                Live
              </span>
            </div>

            {/* Voice/Text Mode Toggle */}
            <div className="flex items-center gap-2 bg-card border border-accent/30 rounded-lg px-4 py-2">
              <Type className={`w-4 h-4 ${isVoiceMode ? 'text-muted-foreground' : 'text-accent'}`} />
              <Switch 
                checked={isVoiceMode} 
                onCheckedChange={() => {
                  setIsVoiceMode(!isVoiceMode);
                  playSound('click');
                }}
              />
              <Mic className={`w-4 h-4 ${!isVoiceMode ? 'text-muted-foreground' : 'text-accent'}`} />
            </div>

            {/* Sound Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSound('click');
              }}
              className="bg-card border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="terminal max-h-96 overflow-y-auto" ref={terminalRef} onClick={handleTerminalClick}>
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-primary/30 pb-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <span className="text-xs text-muted-foreground">
              cyber-assistant@hackathon:~$
            </span>
          </div>

          {/* Command History */}
          {commands.map((command, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 terminal-prompt">
                <span>┌──({command.timestamp}) cyber-assistant@hackathon</span>
              </div>
              <div className="flex items-center gap-2 terminal-prompt">
                <span>└─$</span>
                <span className="terminal-text">{command.input}</span>
              </div>
              {command.output && (
                <pre className="terminal-text whitespace-pre-wrap mt-2 mb-2">
                  {command.output}
                </pre>
              )}
            </div>
          ))}

          {/* Current Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="terminal-prompt">└─$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none terminal-text"
              placeholder={isVoiceMode ? "🎤 Voice mode active..." : "Type a command..."}
              disabled={isTyping || isVoiceMode}
              autoFocus
            />
            {!isVoiceMode && <span className="typing-cursor"></span>}
          </form>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 mt-2 text-accent">
              <span>Processing...</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Commands */}
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3 text-center">Quick Commands:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['help', 'nmap 127.0.0.1', 'scan --ports', 'whoami', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                  playSound('click');
                }}
                className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                disabled={isTyping}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;