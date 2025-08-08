import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Mic, Type } from "lucide-react";

interface Command {
  input: string;
  output: string;
  timestamp: string;
}

interface DemoLog {
  user: string;
  timestamp: string;
  command: string;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [demoLogs, setDemoLogs] = useState<DemoLog[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Mock responses for demo mode
  const mockResponses: { [key: string]: string } = {
    "nmap 127.0.0.1": `
Starting Nmap 7.80 ( https://nmap.org ) at 2025-08-08 10:00
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00012s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
MAC Address: 00:0C:29:68:22:16 (VMware)

Nmap done: 1 IP address (1 host up) scanned in 1.23 seconds`,
    
    "whoami": "jamesnjenga",
    
    "ls -la": `
total 44
drwxr-xr-x  6 jamesnjenga jamesnjenga 4096 Aug  8 10:00 .
drwxr-xr-x  3 root       root       4096 Aug  7 15:00 ..
-rw-r--r--  1 jamesnjenga jamesnjenga  220 Apr  4  2024 .bash_logout
-rw-r--r--  1 jamesnjenga jamesnjenga 3771 Apr  4  2024 .bashrc
drwx------  2 jamesnjenga jamesnjenga 4096 Aug  8 10:00 .cache
-rw-r--r--  1 jamesnjenga jamesnjenga  807 Apr  4  2024 .profile
-rw-r--r--  1 jamesnjenga jamesnjenga    0 Aug  8 09:59 demo.txt`,

    "sudo apt update": `
Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease
Get:2 http://archive.ubuntu.com/ubuntu focal-updates InRelease [111 kB]
Fetched 111 kB in 1s (120 kB/s)
Reading package lists... Done
Building dependency tree       
Reading state information... Done
All packages are up to date.`,

    'echo "Hello World"': "Hello World",
    "echo Hello World": "Hello World",
    
    "help": `
Cyber Assistant v1.0 - Available Commands:
┌────────────────────────────────────────────┐
│ nmap [target]      - Network mapping       │
│ scan [options]     - Vulnerability scan    │
│ exploit [target]   - Exploit analysis      │
│ whoami             - Current user          │
│ ls -la             - List files            │
│ sudo apt update    - Update packages       │
│ echo [text]        - Echo text             │
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

    "clear": "",
    "ls": "cyber_tools/  reports/  exploits/  README.md",
    "pwd": "/home/jamesnjenga",
    "date": new Date().toString(),
    "ps aux": `
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  22520  1234 ?        Ss   09:00   0:01 /sbin/init
jamesnjenga  1337  0.5  2.1  45234  8765 pts/0 S+   10:00   0:02 cyber-assistant`,
  };

  // Initialize demo logs
  useEffect(() => {
    const initialLogs: DemoLog[] = [
      { user: "jamesnjenga", timestamp: "2025-08-08 09:45:12", command: "nmap 192.168.1.1" },
      { user: "wisdom", timestamp: "2025-08-08 09:50:33", command: "scan --ports" },
      { user: "hacker_01", timestamp: "2025-08-08 09:55:44", command: "whoami" },
      { user: "jamesnjenga", timestamp: "2025-08-08 09:58:15", command: "ls -la" },
      { user: "cyber_expert", timestamp: "2025-08-08 10:01:22", command: "sudo apt update" },
      { user: "wisdom", timestamp: "2025-08-08 10:03:45", command: "nmap 127.0.0.1" },
      { user: "ethical_hacker", timestamp: "2025-08-08 10:05:11", command: "scan --vuln" },
    ];
    setDemoLogs(initialLogs);
  }, []);

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

    // Add to demo logs
    const newLog: DemoLog = {
      user: "jamesnjenga",
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }).replace(/(\d{4})\/(\d{2})\/(\d{2}),\s(\d{2}:\d{2}:\d{2})/, '$1-$2-$3 $4'),
      command: commandInput
    };
    setDemoLogs(prev => [newLog, ...prev.slice(0, 9)]); // Keep only last 10 logs

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
        "Command not recognized. Please try another command.";
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
      <div className="container mx-auto max-w-7xl">
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

        {/* Main Content - Terminal and Demo Logs Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Terminal Window */}
          <div className="xl:col-span-2">
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
          </div>

          {/* Demo Logs Panel */}
          <div className="xl:col-span-1">
            <div className="cyber-card h-96">
              <div className="flex items-center justify-between border-b border-primary/30 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-primary">Demo Logs</h3>
                <span className="text-xs text-muted-foreground">Recent Commands</span>
              </div>
              
              <div className="space-y-2 overflow-y-auto max-h-80">
                {demoLogs.map((log, index) => (
                  <div key={index} className="border border-muted/30 rounded-lg p-3 bg-card/50 hover:bg-card/70 transition-colors animate-fade-in">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-secondary">{log.user}</span>
                      <span className="text-xs text-muted-foreground">{log.timestamp.split(' ')[1]}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{log.timestamp.split(' ')[0]}</div>
                    <div className="terminal-text text-sm bg-background/50 rounded px-2 py-1">
                      $ {log.command}
                    </div>
                  </div>
                ))}
              </div>
              
              {demoLogs.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  No commands executed yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-3 text-center">Quick Commands:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['help', 'nmap 127.0.0.1', 'whoami', 'ls -la', 'sudo apt update', 'echo "Hello World"', 'clear'].map((cmd) => (
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