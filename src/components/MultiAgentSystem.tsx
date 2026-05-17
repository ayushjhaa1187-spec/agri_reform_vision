import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';
import { useWebSocket } from '../hooks/useWebSocket';
import AnimAgentFarmer from './ui/AnimAgentFarmer';

const agents = [
  {
    name: 'Agronomist',
    icon: '🌱',
    role: 'Crop Health Guardian',
    color: '#10b981',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    bgClass: 'from-emerald-950/40 to-emerald-900/10',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    labelBg: 'bg-emerald-500/10',
    objective: 'Maximize crop health and yield',
    weight: 0.45,
    dialogues: [
      'Soil moisture critical at 30%. Immediate irrigation required to prevent crop stress.',
      'NPK levels sub-optimal in Zone B-4. Recommend targeted fertilizer application.',
      'Disease risk elevated — leaf wetness duration exceeds 6 hours. Preventive action needed.',
      'Root zone temperature 2°C above optimal. Suggest shade mesh deployment by 10:00.',
    ],
  },
  {
    name: 'Economist',
    icon: '💰',
    role: 'Financial Strategist',
    color: '#eab308',
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-500/30',
    bgClass: 'from-yellow-950/40 to-yellow-900/10',
    bgGlow: 'rgba(234, 179, 8, 0.15)',
    labelBg: 'bg-yellow-500/10',
    objective: 'Minimize costs and maximize ROI',
    weight: 0.35,
    dialogues: [
      'Energy rates 40% lower at 2 AM. Delay irrigation to off-peak for ₹840 savings.',
      'Wheat futures up 8% this week. Recommend holding harvest for 72 hours.',
      'Current water spend 12% over budget. Suggest precision micro-irrigation.',
      'Fertilizer cost can be reduced 22% by switching to organic compost mix.',
    ],
  },
  {
    name: 'Logistician',
    icon: '🚛',
    role: 'Supply Chain Optimizer',
    color: '#f97316',
    colorClass: 'text-orange-400',
    borderClass: 'border-orange-500/30',
    bgClass: 'from-orange-950/40 to-orange-900/10',
    bgGlow: 'rgba(249, 115, 22, 0.15)',
    labelBg: 'bg-orange-500/10',
    objective: 'Optimize logistics and storage',
    weight: 0.20,
    dialogues: [
      'Cold storage at 87% capacity. Coordinate with Market Agent for immediate offtake.',
      'Harvester available in 3 days. Align ripening forecast with equipment schedule.',
      'Transport cost peaks Friday. Recommend Wednesday dispatch to save ₹1,200.',
      'Moisture sensor in Block C offline. Manual check required before irrigation.',
    ],
  },
];

const coordinator = {
  name: 'Master Coordinator',
  icon: '🎯',
  color: '#a855f7',
  decisions: [
    'Synthesis: Initiate irrigation at 02:00 AM (off-peak). Apply NPK to Zone B-4 post-irrigation. Disease protocol activated.',
    'Synthesis: Hold harvest 48 hours (not 72). Capture 6% price gain while maintaining cold chain feasibility.',
    'Synthesis: Deploy shade mesh by 09:30. Redirect ₹840 savings to cold chain maintenance.',
    'Synthesis: Wednesday dispatch approved. Block C sensor flagged for maintenance. Yield forecast: +12%.',
  ],
};

const MOCK_FEED = [
  { time: '08:14:03', agent: 'SYSTEM', agentColor: 'text-blue-400', message: 'Sensor snapshot complete — Zone A, B, C' },
  { time: '08:14:04', agent: 'AGRONOMIST', agentColor: 'text-emerald-400', message: 'Soil moisture: 30% ↓ Critical threshold' },
  { time: '08:14:05', agent: 'ECONOMIST', agentColor: 'text-yellow-400', message: 'Energy rate: ₹8.2/kWh (off-peak in 6h)' },
  { time: '08:14:06', agent: 'LOGISTICIAN', agentColor: 'text-orange-400', message: 'Harvester access: OK (soil 48%)' },
  { time: '08:14:07', agent: 'AGRONOMIST', agentColor: 'text-emerald-400', message: 'Disease risk: HIGH. Leaf wetness 6h+' },
  { time: '08:14:08', agent: 'ECONOMIST', agentColor: 'text-yellow-400', message: 'Off-peak window: 02:00–04:00 AM optimal' },
  { time: '08:14:09', agent: 'COORDINATOR', agentColor: 'text-purple-400', message: 'Negotiation round 1 initiated...' },
  { time: '08:14:10', agent: 'COORDINATOR', agentColor: 'text-purple-400', message: 'Consensus: Irrigate 02:00 AM + NPK Zone B-4' },
];

export default function MultiAgentSystem() {
  const [activeAgent, setActiveAgent] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDecision, setShowDecision] = useState(false);
  const [speakingAgent, setSpeakingAgent] = useState<number | null>(null);
  const [feedIndex, setFeedIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const gaugeRef = useRef<SVGCircleElement>(null);

  // WebSocket Integration
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/agent-feed';
  const { isConnected, agentDecisions } = useWebSocket(wsUrl);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveAgent(prev => (prev + 1) % agents.length);
      setShowDecision(false);
      setSpeakingAgent(null);
    }, 4000);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpeakingAgent(activeAgent);
      setDialogueIndex(prev => (prev + 1) % agents[activeAgent].dialogues.length);
    }, 800);
    return () => clearTimeout(timeout);
  }, [activeAgent]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowDecision(true), 2500);
    return () => clearTimeout(timeout);
  }, [activeAgent]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex(prev => (prev + 1) % MOCK_FEED.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const decision = coordinator.decisions[dialogueIndex % coordinator.decisions.length];
    setTypewriterText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < decision.length) {
        setTypewriterText(decision.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [dialogueIndex]);

  const renderGauge = useCallback(() => {
    const agent = agents[activeAgent];
    const pct = agent.weight;
    const r = 54;
    const circ = 2 * Math.PI * r;
    const dash = pct * circ;
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <circle
          ref={gaugeRef}
          cx="60" cy="60" r={r}
          fill="none"
          stroke={agent.color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease', filter: `drop-shadow(0 0 6px ${agent.color})` }}
        />
        <text x="60" y="55" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Priority</text>
        <text x="60" y="72" textAnchor="middle" fill={agent.color} fontSize="16" fontWeight="700">
          {Math.round(agent.weight * 100)}%
        </text>
        <text x="60" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">{agent.name}</text>
      </svg>
    );
  }, [activeAgent]);

  const liveFeed = agentDecisions.length > 0 
    ? agentDecisions.map(d => ({
        time: new Date(d.timestamp).toLocaleTimeString(),
        agent: d.agent.toUpperCase(),
        agentColor: d.action_type === 'alert' ? 'text-red-400' : 'text-emerald-400',
        message: d.decision
      }))
    : MOCK_FEED;

  const visibleFeedLines = liveFeed.slice(-5);

  return (
    <section id="agents" className="py-24 md:py-32 bg-[var(--bg-primary)] border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <FadeInSection className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-purple-500/30 text-purple-400 bg-purple-500/10 mb-6">
            Multi-Agent System
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            The Agent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Arena
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
            Watch specialized AI agents negotiate in real-time. Each has a unique objective function &mdash; they debate, compromise, and reach consensus autonomously.
          </p>
          <AnimAgentFarmer activeAgent={activeAgent} />
        </FadeInSection>

        {/* Live Feed */}
        <FadeInSection delay={0.1} className="mb-12">
          <GlassCard className="p-6 rounded-2xl border-[var(--border-default)]" glow>
            <div className="flex items-center gap-3 mb-6">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className={`text-xs font-black uppercase tracking-widest ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                {isConnected ? 'Live Agent Feed' : 'Offline Mode (Simulator)'}
              </span>
              <span className="ml-auto text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                WebSocket: {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
            <div className="font-mono text-xs space-y-2 h-36 overflow-hidden bg-black/40 rounded-xl p-4 border border-white/5">
              {visibleFeedLines.map((line, i) => (
                <div key={i} className="flex gap-4 animate-slide-in">
                  <span className="text-[var(--text-muted)] opacity-50 flex-shrink-0">[{line.time}]</span>
                  <span className={`${line.agentColor} font-bold flex-shrink-0 w-24 uppercase tracking-tighter`}>{line.agent}</span>
                  <span className="text-[var(--text-secondary)]">{line.message}</span>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="text-[var(--text-muted)] flex-shrink-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="text-[var(--accent-green)] animate-pulse">&#9646;</span>
              </div>
            </div>
          </GlassCard>
        </FadeInSection>

        {/* Holographic Arena */}
        <FadeInSection delay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {agents.map((agent, i) => {
              const isSpeaking = speakingAgent === i;
              const isActive = activeAgent === i;
              return (
                <GlassCard
                  key={agent.name}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${
                    isActive ? `bg-gradient-to-b ${agent.bgClass} ${agent.borderClass}` : 'bg-[var(--bg-elevated)] border-transparent opacity-60'
                  }`}
                  onClick={() => {
                    setActiveAgent(i);
                    setSpeakingAgent(i);
                  }}
                  style={isActive ? { boxShadow: `0 0 40px -15px ${agent.bgGlow}` } : {}}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-green)]/5 to-transparent h-1/2 w-full animate-scan" />
                      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 30px ${agent.bgGlow}` }} />
                    </div>
                  )}
                  {/* Agent Header */}
                  <div className="flex items-center gap-4 mb-5 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-all duration-500 ${
                      isActive ? `${agent.labelBg} ${agent.borderClass} scale-110 shadow-lg` : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] scale-100'
                    }`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-black text-sm uppercase tracking-tight ${ isActive ? agent.colorClass : 'text-[var(--text-primary)]'}`}>
                        {agent.name}
                      </h3>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest truncate">{agent.role}</p>
                    </div>
                    {isSpeaking && (
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-2 ${agent.labelBg} ${agent.colorClass} border ${agent.borderClass} uppercase tracking-widest`}>
                        <div className="flex items-center gap-0.5 h-3">
                          <motion.span animate={{ height: ['40%', '100%', '40%'] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }} className="w-1 bg-current rounded-full" />
                          <motion.span animate={{ height: ['60%', '30%', '80%', '60%'] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} className="w-1 bg-current rounded-full" />
                          <motion.span animate={{ height: ['30%', '100%', '30%'] }} transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="w-1 bg-current rounded-full" />
                        </div>
                        Speaking
                      </span>
                    )}
                  </div>

                  {/* Dialogue */}
                  <div className="min-h-[70px] mb-5 relative z-10">
                    {isSpeaking ? (
                      <p className={`text-sm leading-relaxed font-medium ${agent.colorClass}`}>
                        &ldquo;{agent.dialogues[dialogueIndex % agent.dialogues.length]}&rdquo;
                      </p>
                    ) : (
                      <p className="text-xs text-[var(--text-muted)] italic">Awaiting turn...</p>
                    )}
                  </div>

                  {/* Weight */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Priority Weight</span>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${agent.labelBg} ${agent.colorClass} border ${agent.borderClass}`}>
                      {Math.round(agent.weight * 100)}%
                    </span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </FadeInSection>

        {/* Center: Priority Matrix Gauge + Coordinator Decision */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {/* SVG Gauge */}
          <GlassCard className="p-8 rounded-3xl border-[var(--border-default)]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] text-center mb-8">Consensus Priority Distribution</h4>
            <div className="w-44 h-44 mx-auto">{renderGauge()}</div>
            <div className="flex justify-center gap-6 mt-8">
              {agents.map((a, i) => (
                <span key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: a.color, boxShadow: `0 0 10px ${a.color}` }} />
                  <span className={i === activeAgent ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>{a.name}</span>
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Coordinator Decision */}
          <div className="relative p-8 rounded-3xl bg-[var(--bg-elevated)] border border-purple-500/20 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl shadow-inner">
                {coordinator.icon}
              </div>
              <div>
                <h3 className="font-black text-sm text-purple-400 uppercase tracking-tight">{coordinator.name}</h3>
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Final Arbitrator</p>
              </div>
            </div>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 relative z-10">System Synthesis Output</p>
            <div className={`text-base text-purple-100 font-medium leading-relaxed transition-all duration-500 relative z-10 ${
              showDecision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {showDecision && (
                <span className="italic">&ldquo;{typewriterText}{isTyping && <span className="animate-pulse text-purple-400">|</span>}&rdquo;</span>
              )}
              {!showDecision && (
                <p className="text-xs text-[var(--text-muted)] italic animate-pulse">Analyzing agent proposals and computing environmental delta...</p>
              )}
            </div>
          </div>
        </div>

        {/* Cycle counter */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <div className="h-px w-16 bg-[var(--border-subtle)]"></div>
          <span className="text-[10px] font-black text-[var(--text-muted)] font-mono uppercase tracking-[0.3em]">
            Protocol Engine v4.2 &middot; Cycle {Math.floor(feedIndex / liveFeed.length) + 1}
          </span>
          <div className="h-px w-16 bg-[var(--border-subtle)]"></div>
        </div>

      </div>
    </section>
  );
}
