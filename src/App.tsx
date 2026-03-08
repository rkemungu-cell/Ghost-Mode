import React, { useState, useEffect, useRef } from 'react';
import { 
  Ghost, 
  Shield, 
  Terminal, 
  Zap, 
  Lock, 
  EyeOff, 
  Trash2, 
  Activity, 
  Cpu, 
  Globe,
  AlertTriangle,
  ChevronRight,
  Wifi
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GhostProtocol = () => {
  const [isErasing, setIsErasing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['INITIALIZING GHOST PROTOCOL...', 'SYSTEM READY.']);
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const startErasure = () => {
    if (isErasing) return;
    setIsErasing(true);
    setProgress(0);
    addLog('STARTING TABULA RASA SEQUENCE...');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsErasing(false);
          addLog('ERASURE COMPLETE. ALL TRACES ELIMINATED.');
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 5) + 1;
        if (next % 10 === 0) addLog(`WIPING SECTOR ${next * 124}...`);
        return next > 100 ? 100 : next;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#00FF00] p-4 md:p-8 flex flex-col gap-6 overflow-hidden relative">
      {/* Scan Line Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-line opacity-20" />
      
      {/* Header */}
      <header className="border-b border-[#00FF00]/30 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00FF00]/10 border border-[#00FF00]/50 rounded">
            <Ghost className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter glitch-text">GHOST_PROTOCOL.v3</h1>
            <p className="text-[10px] opacity-60 uppercase tracking-widest">Digital Erasure & Privacy Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-tighter">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span>Mode: Ghost</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3" />
            <span>Encrypted Node: 127.0.0.1</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Navigation & Status */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="border border-[#00FF00]/30 p-4 bg-[#00FF00]/5">
            <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> NAVIGATION
            </h2>
            <nav className="flex flex-col gap-2">
              {['DASHBOARD', 'NETWORK', 'ENCRYPTION', 'SETTINGS'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left px-3 py-2 text-xs transition-all border ${
                    activeTab === tab 
                      ? 'bg-[#00FF00] text-black border-[#00FF00]' 
                      : 'hover:bg-[#00FF00]/10 border-transparent hover:border-[#00FF00]/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="border border-[#00FF00]/30 p-4 bg-[#00FF00]/5 flex-1">
            <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
              <Activity className="w-3 h-3" /> SYSTEM_LOGS
            </h2>
            <div 
              ref={scrollRef}
              className="text-[10px] font-mono h-64 lg:h-auto overflow-y-auto space-y-1 opacity-80"
            >
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="opacity-40">{'>'}</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Main Action Area */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="border border-[#00FF00]/30 p-6 bg-[#00FF00]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <Shield className="w-24 h-24" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">TABULA RASA SEQUENCE</h2>
              <p className="text-xs opacity-60 mb-8 max-w-md">
                Initiate a deep-level digital footprint erasure. This will wipe all session data, 
                clear encrypted caches, and rotate ghost identities.
              </p>

              <div className="mb-8">
                <div className="flex justify-between text-[10px] mb-2 uppercase tracking-widest">
                  <span>Erasure Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-4 bg-black border border-[#00FF00]/30 p-0.5">
                  <motion.div 
                    className="h-full bg-[#00FF00]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={startErasure}
                disabled={isErasing}
                className={`w-full py-4 border-2 font-bold flex items-center justify-center gap-3 transition-all ${
                  isErasing 
                    ? 'border-[#00FF00]/20 text-[#00FF00]/20 cursor-not-allowed' 
                    : 'border-[#00FF00] hover:bg-[#00FF00] hover:text-black active:scale-[0.98]'
                }`}
              >
                {isErasing ? (
                  <>
                    <Zap className="w-5 h-5 animate-spin" />
                    NUMÉRISATION EN COURS...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    EXECUTE_ERASURE
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="border border-[#00FF00]/30 p-4 bg-[#00FF00]/5">
              <div className="flex items-center justify-between mb-4">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] opacity-40">AES-256</span>
              </div>
              <h3 className="text-xs font-bold mb-1">ENCRYPTION_LAYER</h3>
              <p className="text-[10px] opacity-60">Active & Verified</p>
            </div>
            <div className="border border-[#00FF00]/30 p-4 bg-[#00FF00]/5">
              <div className="flex items-center justify-between mb-4">
                <EyeOff className="w-4 h-4" />
                <span className="text-[10px] opacity-40">STEALTH</span>
              </div>
              <h3 className="text-xs font-bold mb-1">CLOAKING_DEVICE</h3>
              <p className="text-[10px] opacity-60">Signal Masked</p>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Hardware */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="border border-[#00FF00]/30 p-4 bg-[#00FF00]/5">
            <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-3 h-3" /> HARDWARE_STATUS
            </h2>
            <div className="space-y-4">
              {[
                { label: 'CPU_LOAD', val: '12%' },
                { label: 'MEM_USAGE', val: '4.2GB' },
                { label: 'TEMP', val: '42°C' },
                { label: 'GHOST_NODES', val: '14' }
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-end">
                  <span className="text-[10px] opacity-40">{stat.label}</span>
                  <span className="text-xs font-bold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#00FF00]/30 p-4 bg-[#00FF00]/5 flex-1">
            <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
              <Globe className="w-3 h-3" /> GLOBAL_TRAFFIC
            </h2>
            <div className="h-40 flex items-center justify-center border border-[#00FF00]/10 bg-black/40">
              <div className="relative w-24 h-24">
                <motion.div 
                  className="absolute inset-0 border border-[#00FF00]/20 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-0 border border-[#00FF00]/40 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#00FF00] rounded-full shadow-[0_0_10px_#00FF00]" />
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-[10px]">
                <div className="w-1 h-1 bg-[#00FF00]" />
                <span>Node: Tokyo_Sec_4</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <div className="w-1 h-1 bg-[#00FF00]" />
                <span>Node: Berlin_Ghost_1</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-red-500/30 bg-red-500/5 text-red-500">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold">SECURITY_ALERT</span>
            </div>
            <p className="text-[10px] opacity-80 leading-tight">
              3 unauthorized pings detected from unknown subnet. Cloaking recalibrated.
            </p>
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-[#00FF00]/30 pt-4 flex justify-between items-center text-[9px] uppercase tracking-widest opacity-40">
        <div className="flex gap-4">
          <span>Session: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          <span>Uptime: 14:22:01</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>Ghost_Protocol_v3.1.4</span>
          <ChevronRight className="w-2 h-2" />
        </div>
      </footer>
    </div>
  );
};

export default GhostProtocol;
