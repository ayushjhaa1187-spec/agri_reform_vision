import { useState } from 'react';
import FadeInSection from './ui/FadeInSection';
import GlassCard from './ui/GlassCard';

const layers = [
  {
    id: 1,
    label: 'Data Ingestion',
    icon: '\ud83d\udce1',
    color: 'blue',
    colorHex: '#3b82f6',
    tech: 'Simulated IoT \u00b7 OpenWeather API \u00b7 Mock AgMarket \u00b7 Redis Pub/Sub',
    desc: 'Every 15 seconds, the system captures a full sensor snapshot including soil moisture, NPK levels, ambient temperature, humidity, and real-time weather data.',
    components: [
      { name: 'Soil Sensors', icon: '\ud83c\udf21\ufe0f', desc: 'NPK + moisture' },
      { name: 'OpenWeather', icon: '\ud83c\udf24\ufe0f', desc: 'Real-time API' },
      { name: 'Mock AgMarket', icon: '\ud83d\udcc8', desc: 'Pricing feed' },
      { name: 'PostgreSQL + Redis', icon: '\ud83d\uddc4\ufe0f', desc: 'Storage & Pub/Sub' },
    ],
  },
  {
    id: 2,
    label: 'Intelligence',
    icon: '\ud83e\udde0',
    color: 'indigo',
    colorHex: '#6366f1',
    tech: 'XGBoost \u00b7 RAG Pipeline \u00b7 FAISS Vector Search \u00b7 LangChain',
    desc: 'The ML layer processes raw sensor data through XGBoost to compute disease risk scores and yield predictions. A RAG pipeline enriches agent prompts with domain knowledge.',
    components: [
      { name: 'XGBoost', icon: '\ud83d\udcca', desc: 'Risk scoring' },
      { name: 'FAISS', icon: '\ud83d\udd0d', desc: 'Vector search' },
      { name: 'RAG Pipeline', icon: '\ud83d\udcda', desc: 'Knowledge retrieval' },
      { name: 'LangChain', icon: '\ud83d\udd17', desc: 'Agent orchestration' },
    ],
  },
  {
    id: 3,
    label: 'Multi-Agent Core',
    icon: '\ud83e\udd16',
    color: 'emerald',
    colorHex: '#10b981',
    tech: 'LangGraph \u00b7 GPT-4o / Gemini \u00b7 Two-Round Debate Protocol \u00b7 Weighted Voting',
    desc: 'Four specialized agents (Agronomist, Economist, Logistician, Coordinator) engage in a structured two-round debate. The Coordinator synthesizes weighted votes into a final decision.',
    components: [
      { name: 'Agronomist', icon: '\ud83c\udf31', desc: 'Crop health' },
      { name: 'Economist', icon: '\ud83d\udcb0', desc: 'Financial ROI' },
      { name: 'Logistician', icon: '\ud83d\ude9a', desc: 'Supply chain' },
      { name: 'Coordinator', icon: '\ud83c\udfaf', desc: 'Final arbiter' },
    ],
  },
  {
    id: 4,
    label: 'Execution',
    icon: '\u26a1',
    color: 'amber',
    colorHex: '#f59e0b',
    tech: 'FastAPI \u00b7 Redis Pub/Sub \u00b7 PostgreSQL \u00b7 Simulated Actuators',
    desc: 'The backend executes the coordinator\'s decision by publishing commands to Redis. FastAPI microservices handle actuator simulation, action logging, and WebSocket streaming.',
    components: [
      { name: 'FastAPI', icon: '\ud83d\ude80', desc: 'REST + WebSocket' },
      { name: 'Action Logger', icon: '\ud83d\udcdd', desc: 'Audit trail' },
      { name: 'Redis', icon: '\ud83d\udd34', desc: 'Pub/Sub broker' },
      { name: 'Actuators', icon: '\u2699\ufe0f', desc: 'Simulated control' },
    ],
  },
  {
    id: 5,
    label: 'Dashboard',
    icon: '\ud83d\udcf1',
    color: 'coral',
    colorHex: '#f43f5e',
    tech: 'React 18 \u00b7 TailwindCSS \u00b7 Recharts \u00b7 Framer Motion \u00b7 WebSocket',
    desc: 'A real-time React dashboard streams live agent data via WebSocket. Interactive field maps, negotiation timelines, and metric charts give farmers instant visibility.',
    components: [
      { name: 'React 18', icon: '\u269b\ufe0f', desc: 'UI framework' },
      { name: 'Recharts', icon: '\ud83d\udcc9', desc: 'Data visualizations' },
      { name: 'WebSocket', icon: '\ud83d\udce1', desc: 'Live stream' },
      { name: 'Framer Motion', icon: '\u2728', desc: 'Animations' },
    ],
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue:    { border: 'border-blue-500/30',    bg: 'bg-blue-500/10',    text: 'text-blue-400',    badge: 'bg-blue-500/20' },
  indigo:  { border: 'border-indigo-500/30',  bg: 'bg-indigo-500/10',  text: 'text-indigo-400',  badge: 'bg-indigo-500/20' },
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', badge: 'bg-emerald-500/20' },
  amber:   { border: 'border-amber-500/30',   bg: 'bg-amber-500/10',   text: 'text-amber-400',   badge: 'bg-amber-500/20' },
  coral:   { border: 'border-rose-500/30',    bg: 'bg-rose-500/10',    text: 'text-rose-400',    badge: 'bg-rose-500/20' },
};

export default function SystemArchitecture() {
  const [activeLayer, setActiveLayer] = useState(2);
  const active = layers[activeLayer];
  const colors = colorMap[active.color];

  return (
    <section id="architecture" className="py-24 md:py-32 bg-[var(--bg-primary)] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-[var(--border-accent)] text-[var(--text-accent)] bg-[var(--accent-green-glow)] mb-6">
            4-Layer Autonomous Loop
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            System Architecture
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            A closed-loop pipeline:{' '}
            <span className="text-[var(--text-accent)] font-medium">
              sensor snapshot → AI negotiation → decision → actuator → new sensor reading
            </span>
            , enabling continuous learning every 15 minutes.
          </p>
        </div>

        {/* Interactive Layer Selector */}
        <FadeInSection delay={0.1}>
          {/* Layer tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {layers.map((layer, i) => {
              const c = colorMap[layer.color];
              const isActive = i === activeLayer;
              return (
                <button
                  key={i}
                  onClick={() => setActiveLayer(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? `${c.bg} ${c.border} ${c.text} scale-105 shadow-lg`
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span>{layer.icon}</span>
                  <span>Layer {layer.id}: {layer.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active layer detail */}
          <GlassCard className="p-8 md:p-12 rounded-[32px] border-[var(--border-default)]" glow>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Info */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center text-3xl shadow-inner`}>
                    {active.icon}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${colors.text} mb-1`}>Layer {active.id}</p>
                    <h3 className="text-3xl font-black text-[var(--text-primary)]">{active.label}</h3>
                  </div>
                </div>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">{active.desc}</p>
                <div className={`inline-flex flex-wrap gap-2 px-5 py-3 rounded-2xl ${colors.bg} border ${colors.border}`}>
                  {active.tech.split(' \u00b7 ').map((t, i) => (
                    <span key={i} className={`text-xs font-mono font-bold ${colors.text}`}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Right: Components */}
              <div className="grid grid-cols-2 gap-4">
                {active.components.map((comp, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--accent-green)] transition-all duration-300 group`}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{comp.icon}</div>
                    <div className={`text-sm font-black text-[var(--text-primary)] mb-1 uppercase tracking-tight`}>{comp.name}</div>
                    <div className="text-[11px] text-[var(--text-muted)] font-medium leading-snug">{comp.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </FadeInSection>

        {/* Architecture Vertical Stack */}
        <FadeInSection delay={0.2} className="mt-12">
          <div className="flex flex-col gap-2 max-w-lg mx-auto">
            {[...layers].reverse().map((layer, i) => {
              const c = colorMap[layer.color];
              const idx = layers.indexOf(layer);
              const isActive = idx === activeLayer;
              return (
                <div
                  key={i}
                  onClick={() => setActiveLayer(idx)}
                  className={`flex items-center gap-4 px-6 py-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    isActive
                      ? `${c.bg} ${c.border}`
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span className="text-2xl">{layer.icon}</span>
                  <div className="flex-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? c.text : 'text-[var(--text-muted)]'}`}>
                      Layer {layer.id}
                    </span>
                    <span className={`ml-3 text-sm font-bold ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{layer.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold hidden md:block ${isActive ? c.text : 'text-[var(--text-muted)]'}`}>{layer.tech.split(' \u00b7 ')[0]}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] text-center mt-6">Click any layer to explore architecture details</p>
        </FadeInSection>
      </div>
    </section>
  );
}
