import { useState, useEffect, useCallback } from 'react';
import GlassCard from './ui/GlassCard';
import useScrollReveal from '../hooks/useScrollReveal';

const agents = [
  {
    name: 'Agronomist',
    icon: '🌱',
    role: 'Crop Health Guardian',
    color: '#10b981',
    colorClass: 'text-emerald-400',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    objective: 'Maximize crop health and yield',
    weight: 0.45,
    dialogues: [
      'Soil moisture critical at 30%. Immediate irrigation required to prevent crop stress.',
      'NPK levels sub-optimal in Zone B-4. Recommend targeted fertilizer application.',
      'Disease risk elevated — leaf wetness duration exceeds 6 hours. Preventive action needed.',
      'Root zone temperature 2°C above optimal. Suggest shade mesh deployment by 10:00.'
    ]
  },
  {
    name: 'Economist',
    icon: '💰',
    role: 'Financial Strategist',
    color: '#eab308',
    colorClass: 'text-yellow-400',
    bgGlow: 'rgba(234, 179, 8, 0.15)',
    objective: 'Minimize costs and maximize ROI',
    weight: 0.35,
    dialogues: [
      'Energy rates 40% lower at 2 AM. Delay irrigation to off-peak for ₹840 savings.',
      'Wheat futures up 8% this week. Recommend holding harvest for 72 hours.',
      'Current water spend 12% over budget. Suggest precision micro-irrigation.',
      'Fertilizer cost can be reduced 22% by switching to organic compost mix.'
    ]
  },
  {
    name: 'Logistician',
    icon: '🚚',
    role: 'Supply Chain Optimizer',
    color: '#3b82f6',
    colorClass: 'text-blue-400',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
    objective: 'Optimize supply chain efficiency',
    weight: 0.20,
    dialogues: [
      'Warning: Soil above 55% would block harvester access. Limit irrigation volume.',
      'Storage at 80% capacity. Prioritize mature crop dispatch within 24 hours.',
      'Transport window optimal between 6-8 AM. Schedule accordingly.',
      'Cold chain capacity at 65%. Can absorb additional 2 tonnes of perishables.'
    ]
  }
];

const coordinator = {
  name: 'Master Coordinator',
  icon: '🎯',
  decisions: [
    'Compromise: Schedule irrigation for 2 AM at 40% capacity. Crop health preserved, ₹840 saved, harvester access maintained.',
    'Synthesis: Hold harvest 48 hours (not 72). Capture 6% price gain while maintaining cold chain feasibility.',
    'Resolution: Deploy organic compost in Zone B-4. Agronomist approves NPK profile, 22% cost reduction confirmed.',
    'Override: Activate shade mesh immediately despite cost. Disease prevention priority exceeds short-term budget impact.'
  ]
};

export default function MultiAgentSystem() {
  const [activeAgent, setActiveAgent] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  // Cycle through agents
  useEffect(() => {
    if (!isVisible) return;
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
  }, [isVisible]);

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

  // SVG gauge
  const renderGauge = useCallback(() => {
    const weights = agents.map((a, i) => ({
      ...a,
      active: i === activeAgent,
      arcWeight: a.weight * (i === activeAgent ? 1.3 : 0.85)
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

      return {
        ...w,
        d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      };
    });

    return (
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
        {/* Background ring */}
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={arc.d}
            fill="none"
            stroke={arc.color}
            strokeWidth={arc.active ? 14 : 8}
            strokeLinecap="round"
            opacity={arc.active ? 1 : 0.4}
            className="transition-all duration-700"
          />
        ))}
        {/* Center text */}
        <text x="100" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Priority</text>
        <text x="100" y="110" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
          {Math.round(agents[activeAgent].weight * 100)}%
        </text>
        <text x="100" y="125" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">
          {agents[activeAgent].name}
        </text>
      </svg>
    );
  }, [activeAgent]);

  return (
    <section id="agents" ref={sectionRef} className="py-24 section-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-purple-400 mb-4">
            Multi-Agent System
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Arena</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Watch specialized AI agents negotiate in real-time. Each has a unique objective function — they debate, compromise, and reach consensus autonomously.
          </p>
        </div>

        {/* Holographic Arena */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <GlassCard glow className="p-6 md:p-10">
            {/* Arena Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm tracking-wider uppercase">Live Negotiation</span>
              </div>
              <div className="text-slate-500 text-xs font-mono">Cycle {dialogueIndex + 1} · Round {activeAgent + 1}/3</div>
            </div>

            {/* Three-column debate layout */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {agents.map((agent, i) => (
                <div
                  key={agent.name}
                  className={`rounded-2xl p-6 transition-all duration-500 ${
                    i === activeAgent
                      ? 'bg-white/[0.04] border border-white/10 shadow-lg'
                      : 'bg-transparent border border-transparent'
                  }`}
                  style={i === activeAgent ? { boxShadow: `0 0 40px -15px ${agent.bgGlow}` } : {}}
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
                        i === activeAgent ? 'animate-speaking scale-110' : 'scale-100'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${agent.color}20, ${agent.color}05)`,
                        border: `1px solid ${agent.color}${i === activeAgent ? '40' : '15'}`,
                        '--pulse-color': agent.bgGlow,
                      } as React.CSSProperties}
                    >
                      {agent.icon}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${agent.colorClass}`}>{agent.name}</div>
                      <div className="text-slate-500 text-xs">{agent.role}</div>
                    </div>
                    {i === activeAgent && (
                      <span className="ml-auto px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Speaking
                      </span>
                    )}
                  </div>

                  {/* Dialogue */}
                  <div className="min-h-[80px]">
                    {i === activeAgent ? (
                      <p className="text-slate-300 text-sm leading-relaxed font-mono">
                        "{displayedText}
                        {isTyping && <span className="typewriter-cursor" />}"
                      </p>
                    ) : (
                      <p className="text-slate-600 text-sm italic">
                        Awaiting turn...
                      </p>
                    )}
                  </div>

                  {/* Weight indicator */}
                  <div className="mt-4 pt-3 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Priority Weight</span>
                      <span className={agent.colorClass}>{Math.round(agent.weight * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${agent.weight * 100}%`,
                          background: agent.color,
                          opacity: i === activeAgent ? 1 : 0.4,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center: Priority Matrix Gauge + Coordinator Decision */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* SVG Gauge */}
              <div className="flex flex-col items-center justify-center glass-card rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Priority Matrix</div>
                {renderGauge()}
                <div className="flex gap-4 mt-4">
                  {agents.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                      <span className="text-slate-500">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coordinator Decision */}
              <div className="glass-card rounded-2xl p-6 border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl">
                    {coordinator.icon}
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-sm">{coordinator.name}</div>
                    <div className="text-slate-500 text-xs">Final Arbitrator</div>
                  </div>
                </div>
                <div className={`transition-all duration-500 ${showDecision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <div className="text-[10px] text-emerald-500/60 uppercase tracking-wider font-bold mb-2">Decision Output</div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "{coordinator.decisions[dialogueIndex % coordinator.decisions.length]}"
                  </p>
                </div>
                {!showDecision && (
                  <div className="text-slate-600 text-sm italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                    Analyzing agent proposals...
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Process flow — simplified */}
        <div className={`mt-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            {[
              { icon: '📊', label: 'Sensor Data', color: 'emerald' },
              { icon: '→', label: '', color: '' },
              { icon: '🤔', label: 'Agent Analysis', color: 'yellow' },
              { icon: '→', label: '', color: '' },
              { icon: '💬', label: 'Negotiation', color: 'purple' },
              { icon: '→', label: '', color: '' },
              { icon: '✅', label: 'Consensus', color: 'blue' },
              { icon: '→', label: '', color: '' },
              { icon: '⚡', label: 'Execution', color: 'emerald' },
            ].map((step, i) => (
              step.label ? (
                <div key={i} className="text-center">
                  <div className={`w-12 h-12 glass-card rounded-xl flex items-center justify-center mx-auto mb-2 text-xl border-${step.color}-500/20`}>
                    {step.icon}
                  </div>
                  <div className="text-slate-400 text-xs">{step.label}</div>
                </div>
              ) : (
                <span key={i} className="text-slate-600 text-lg hidden md:block">→</span>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
