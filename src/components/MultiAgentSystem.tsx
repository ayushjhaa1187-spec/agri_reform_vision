import { useState, useEffect, useCallback, useRef } from 'react';
import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';
import { useWebSocket } from '../hooks/useWebSocket';

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
    <section id="agents" className="py-28 md:py-36 section-darker border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <FadeInSection className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-purple-400 mb-6 border border-purple-500/20">
            Multi-Agent System
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Agent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Arena
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Watch specialized AI agents negotiate in real-time. Each has a unique objective function &mdash; they debate, compromise, and reach consensus autonomously.
          </p>
        </FadeInSection>

        {/* Live Feed */}
        <FadeInSection delay={0.1} className="mb-12">
          <GlassCard className="p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className={`text-xs font-semibold uppercase tracking-wider ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                {isConnected ? 'Live Agent Feed' : 'Offline Mode (Simulator)'}
              </span>
              <span className="ml-auto text-xs text-slate-500 font-mono">
                WebSocket: {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
            <div className="font-mono text-xs space-y-1.5 h-36 overflow-hidden">
              {visibleFeedLines.map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-slate-500 flex-shrink-0">{line.time}</span>
                  <span className={`${line.agentColor} font-semibold flex-shrink-0 w-20`}>{line.agent}</span>
                  <span className="text-slate-300">{line.message}</span>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="text-slate-500 flex-shrink-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="text-emerald-400 animate-pulse">&#9646;</span>
              </div>
            </div>
          </GlassCard>
        </FadeInSection>

        {/* Holographic Arena */}
        <FadeInSection delay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {agents.map((agent, i) => {
              const isSpeaking = speakingAgent === i;
              const isActive = activeAgent === i;
              return (
                <GlassCard
                  key={agent.name}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-500 ${
                    isActive ? `bg-gradient-to-b ${agent.bgClass}` : ''
                  }`}
                  onClick={() => {
                    setActiveAgent(i);
                    setSpeakingAgent(i);
                  }}
                  style={isActive ? { boxShadow: `0 0 40px -15px ${agent.bgGlow}` } : {}}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent h-1/2 w-full animate-scan" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 30px ${agent.bgGlow}` }} />
                    </div>
                  )}
                  {/* Agent Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border transition-all duration-500 ${
                      isActive ? `${agent.labelBg} ${agent.borderClass} scale-110` : 'bg-white/5 border-white/10 scale-100'
                    }`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm ${ isActive ? agent.colorClass : 'text-white'}`}>
                        {agent.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">{agent.role}</p>
                    </div>
                    {isSpeaking && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${agent.labelBg} ${agent.colorClass} border ${agent.borderClass}`}>
                        Speaking
                      </span>
                    )}
                  </div>

                  {/* Dialogue */}
                  <div className="min-h-[60px] mb-3">
                    {isSpeaking ? (
                      <p className={`text-xs leading-relaxed ${agent.colorClass}`}>
                        &ldquo;{agent.dialogues[dialogueIndex % agent.dialogues.length]}&rdquo;
                      </p>
                    ) : (
                      <p className="text-xs text-slate-600 italic">Awaiting turn...</p>
                    )}
                  </div>

                  {/* Weight */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Priority Weight</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${agent.labelBg} ${agent.colorClass}`}>
                      {Math.round(agent.weight * 100)}%
                    </span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </FadeInSection>

        {/* Center: Priority Matrix Gauge + Coordinator Decision */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SVG Gauge */}
          <GlassCard className="p-6 rounded-2xl">
            <h4 className="text-sm font-semibold text-slate-400 text-center mb-4">Priority Matrix</h4>
            <div className="w-40 h-40 mx-auto">{renderGauge()}</div>
            <div className="flex justify-center gap-4 mt-4">
              {agents.map((a, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />
                  <span className={i === activeAgent ? 'text-white font-semibold' : 'text-slate-500'}>{a.name}</span>
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Coordinator Decision */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-b from-purple-950/40 to-purple-900/10 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xl">
                {coordinator.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-purple-400">{coordinator.name}</h3>
                <p className="text-xs text-slate-500">Final Arbitrator</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Decision Output</p>
            <div className={`text-sm text-purple-300/80 leading-relaxed transition-all duration-500 ${
              showDecision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {showDecision && (
                <span>&ldquo;{typewriterText}{isTyping && <span className="animate-pulse text-purple-400">|</span>}&rdquo;</span>
              )}
              {!showDecision && (
                <p className="text-xs text-slate-500 italic animate-pulse">Analyzing agent proposals...</p>
              )}
            </div>
          </div>
        </div>

        {/* Cycle counter */}
        <div className="mt-6 flex justify-end">
          <span className="text-xs text-slate-600 font-mono">
            Cycle {Math.floor(feedIndex / liveFeed.length) + 1} &middot; Round {(dialogueIndex % 3) + 1}/3
          </span>
        </div>

      </div>
    </section>
  );
}
