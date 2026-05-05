import { useState, useEffect, useCallback, useRef } from 'react';
import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';

const agents = [
  {
    name: 'Agronomist',
    icon: '\ud83c\udf31',
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
      'Disease risk elevated \u2014 leaf wetness duration exceeds 6 hours. Preventive action needed.',
      'Root zone temperature 2\u00b0C above optimal. Suggest shade mesh deployment by 10:00.',
    ],
  },
  {
    name: 'Economist',
    icon: '\ud83d\udcb0',
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
      'Energy rates 40% lower at 2 AM. Delay irrigation to off-peak for \u20b9840 savings.',
      'Wheat futures up 8% this week. Recommend holding harvest for 72 hours.',
      'Current water spend 12% over budget. Suggest precision micro-irrigation.',
      'Fertilizer cost can be reduced 22% by switching to organic compost mix.',
    ],
  },
  {
    name: 'Logistician',
    icon: '\ud83d\ude9a',
    role: 'Supply Chain Optimizer',
    color: '#3b82f6',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/30',
    bgClass: 'from-blue-950/40 to-blue-900/10',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
    labelBg: 'bg-blue-500/10',
    objective: 'Optimize supply chain efficiency',
    weight: 0.20,
    dialogues: [
      'Warning: Soil above 55% would block harvester access. Limit irrigation volume.',
      'Storage at 80% capacity. Prioritize mature crop dispatch within 24 hours.',
      'Transport window optimal between 6-8 AM. Schedule accordingly.',
      'Cold chain capacity at 65%. Can absorb additional 2 tonnes of perishables.',
    ],
  },
];

const coordinator = {
  name: 'Master Coordinator',
  icon: '\ud83c\udfaf',
  color: '#a855f7',
  decisions: [
    'Compromise: Schedule irrigation for 2 AM at 40% capacity. Crop health preserved, \u20b9840 saved, harvester access maintained.',
    'Synthesis: Hold harvest 48 hours (not 72). Capture 6% price gain while maintaining cold chain feasibility.',
    'Resolution: Deploy organic compost in Zone B-4. Agronomist approves NPK profile, 22% cost reduction confirmed.',
    'Override: Activate shade mesh immediately despite cost. Disease prevention priority exceeds short-term budget impact.',
  ],
};

const liveFeedLines = [
  { time: '08:14:03', agent: 'SYSTEM', color: 'text-slate-400', msg: 'Sensor snapshot complete \u2014 Zone A, B, C' },
  { time: '08:14:04', agent: 'AGRONOMIST', color: 'text-emerald-400', msg: 'Soil moisture: 30% \u2193 Critical threshold' },
  { time: '08:14:05', agent: 'ECONOMIST', color: 'text-yellow-400', msg: 'Energy rate: \u20b98.2/kWh (off-peak in 6h)' },
  { time: '08:14:06', agent: 'LOGISTICIAN', color: 'text-blue-400', msg: 'Harvester access: OK (soil 48%)' },
  { time: '08:14:07', agent: 'AGRONOMIST', color: 'text-emerald-400', msg: 'Proposes immediate 40% irrigation cycle' },
  { time: '08:14:08', agent: 'ECONOMIST', color: 'text-yellow-400', msg: 'Counter: delay 6h for \u20b9840 savings' },
  { time: '08:14:09', agent: 'COORDINATOR', color: 'text-purple-400', msg: 'Analyzing weighted votes...' },
  { time: '08:14:10', agent: 'COORDINATOR', color: 'text-purple-400', msg: '\u2705 Decision: irrigate at 02:00 AM, 40% capacity' },
];

export default function MultiAgentSystem() {
  const [activeAgent, setActiveAgent] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [feedLine, setFeedLine] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  // Cycle through agents
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent(prev => {
        const next = (prev + 1) % agents.length;
        if (next === 0) {
          setDialogueIndex(prev2 => (prev2 + 1) % agents[0].dialogues.length);
        }
        return next;
      });
      setShowDecision(false);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Live feed auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedLine(prev => (prev + 1) % liveFeedLines.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [feedLine]);

  // Typewriter effect
  const currentDialogue = agents[activeAgent].dialogues[dialogueIndex % agents[activeAgent].dialogues.length];
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < currentDialogue.length) {
        setDisplayedText(currentDialogue.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setTimeout(() => setShowDecision(true), 500);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [activeAgent, dialogueIndex, currentDialogue]);

  const renderGauge = useCallback(() => {
    const weights = agents.map((a, i) => ({
      ...a,
      active: i === activeAgent,
      arcWeight: a.weight * (i === activeAgent ? 1.3 : 0.85),
    }));
    const normalizedTotal = weights.reduce((s, w) => s + w.arcWeight, 0);
    let currentAngle = -90;
    const arcs = weights.map((w) => {
      const arcDeg = (w.arcWeight / normalizedTotal) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + arcDeg;
      currentAngle = endAngle;
      const r = 70;
      const cx = 100, cy = 100;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);
      const largeArc = arcDeg > 180 ? 1 : 0;
      return { ...w, d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}` };
    });
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={arc.d}
            fill="none"
            stroke={arc.color}
            strokeWidth={arc.active ? 12 : 6}
            strokeLinecap="round"
            opacity={arc.active ? 1 : 0.4}
            style={{ transition: 'all 0.5s ease' }}
          />
        ))}
        <text x="100" y="94" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter">
          Priority
        </text>
        <text x="100" y="112" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Inter">
          {Math.round(agents[activeAgent].weight * 100)}%
        </text>
        <text x="100" y="126" textAnchor="middle" fill={agents[activeAgent].color} fontSize="9" fontFamily="Inter">
          {agents[activeAgent].name}
        </text>
      </svg>
    );
  }, [activeAgent]);

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
            Watch specialized AI agents negotiate in real-time. Each has a unique objective function \u2014 they debate, compromise, and reach consensus autonomously.
          </p>
        </FadeInSection>

        {/* Live Feed */}
        <FadeInSection delay={0.1} className="mb-12">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Live Agent Feed</span>
              <span className="text-xs text-slate-500 ml-auto font-mono">WebSocket: Connected</span>
            </div>
            <div
              ref={feedRef}
              className="h-40 overflow-y-auto font-mono text-sm space-y-2 pr-1 scrollbar-thin"
            >
              {liveFeedLines.slice(0, feedLine + 1).map((line, i) => (
                <p key={i} className="flex items-start gap-2">
                  <span className="text-slate-600 flex-shrink-0">{line.time}</span>
                  <span className={`${line.color} font-semibold flex-shrink-0 min-w-[90px]`}>{line.agent}</span>
                  <span className="text-slate-300">{line.msg}</span>
                </p>
              ))}
              <p className="flex items-center gap-1">
                <span className={`${agents[activeAgent].colorClass} animate-pulse text-lg`}>\u25ae</span>
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Holographic Arena */}
        <FadeInSection delay={0.15}>
          <div className="glass-card-glow rounded-2xl p-6 md:p-8 mb-8">
            {/* Arena Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-sm text-slate-400 font-mono">Live Negotiation</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">Cycle {dialogueIndex + 1} \u00b7 Round {activeAgent + 1}/3</span>
            </div>

            {/* Three-column debate layout */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {agents.map((agent, i) => (
                <div
                  key={i}
                  className={`relative p-5 rounded-2xl bg-gradient-to-b ${agent.bgClass} border ${agent.borderClass} transition-all duration-500 ${
                    i === activeAgent ? 'scale-[1.02] shadow-lg' : 'opacity-60 scale-[0.98]'
                  }`}
                  style={i === activeAgent ? { boxShadow: `0 0 30px -5px ${agent.bgGlow}` } : {}}
                >
                  {/* Hover glow */}
                  {i === activeAgent && (
                    <div
                      className="absolute -inset-0.5 rounded-2xl opacity-30 blur-sm -z-10"
                      style={{ background: `radial-gradient(ellipse at center, ${agent.bgGlow}, transparent 70%)` }}
                    />
                  )}

                  {/* Avatar + name */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 border ${agent.borderClass} ${agent.labelBg}`}
                      style={i === activeAgent ? { boxShadow: `0 0 12px ${agent.bgGlow}` } : {}}
                    >
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-sm ${agent.colorClass}`}>{agent.name}</h3>
                      <p className="text-xs text-slate-500">{agent.role}</p>
                    </div>
                    {i === activeAgent && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${agent.labelBg} ${agent.colorClass} border ${agent.borderClass} animate-pulse`}>
                        Speaking
                      </span>
                    )}
                  </div>

                  {/* Dialogue */}
                  <div className="min-h-[60px]">
                    {i === activeAgent ? (
                      <p className={`text-sm ${agent.colorClass}/80 leading-relaxed`}>
                        &quot;{displayedText}{isTyping && <span className="typewriter-cursor" />}&quot;
                      </p>
                    ) : (
                      <p className="text-xs text-slate-600 italic">Awaiting turn...</p>
                    )}
                  </div>

                  {/* Weight indicator */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Priority Weight</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${agent.labelBg} ${agent.colorClass}`}>
                      {Math.round(agent.weight * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
                  &quot;{coordinator.decisions[dialogueIndex % coordinator.decisions.length]}&quot;
                </div>
                {!showDecision && (
                  <p className="text-xs text-slate-500 italic animate-pulse">Analyzing agent proposals...</p>
                )}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
