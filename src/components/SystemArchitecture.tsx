import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';

export default function SystemArchitecture() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="architecture" className="py-24 section-dark border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-emerald-400 mb-4">
            4-Layer Autonomous Loop
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            System Architecture
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A closed-loop pipeline: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">sensor snapshot → AI negotiation → decision → simulated actuator → new sensor reading</span>, enabling continuous learning every 15 minutes.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Layer 4 - UI */}
          <div className="relative z-40 mb-3 group">
            <div className="max-w-4xl mx-auto glass-card-glow rounded-2xl p-6 border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/20">📱</div>
                  <div>
                    <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Layer 4</div>
                    <h3 className="text-white font-bold text-lg">Interactive Dashboard</h3>
                    <p className="text-slate-400 text-sm mt-1">React.js 18 · TailwindCSS · Recharts · Zustand · Framer Motion</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-blue-400 text-xs">Single Pane of Glass</div>
                  <div className="text-white font-semibold text-sm">Field map · Agent feed · Action log</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2 opacity-50"><svg className="w-6 h-6 text-slate-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>

          {/* Layer 3 - Backend */}
          <div className="relative z-30 mb-3 group">
            <div className="max-w-5xl mx-auto glass-card-glow rounded-2xl p-6 border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/20">⚙️</div>
                  <div>
                    <div className="text-purple-400 text-xs font-semibold uppercase tracking-wider">Layer 3</div>
                    <h3 className="text-white font-bold text-lg">Backend Services</h3>
                    <p className="text-slate-400 text-sm mt-1">FastAPI · WebSockets · XGBoost Microservice · Action Logger</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-purple-400 text-xs">Live Data Push</div>
                  <div className="text-white font-semibold text-sm">≥85% ML Accuracy</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'FastAPI', desc: 'REST + WS' },
                  { label: 'XGBoost', desc: 'Risk scores' },
                  { label: 'Action Logger', desc: 'Audit trail' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
                    <div className="text-white text-sm font-medium">{s.label}</div>
                    <div className="text-slate-400 text-xs mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2 opacity-50"><svg className="w-6 h-6 text-slate-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>

          {/* Layer 2 - AI Core */}
          <div className="relative z-20 mb-3 group">
            <div className="max-w-6xl mx-auto glass-card-glow rounded-2xl p-6 border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/20">🧠</div>
                  <div>
                    <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Layer 2</div>
                    <h3 className="text-white font-bold text-lg">Multi-Agent Intelligence Core</h3>
                    <p className="text-slate-400 text-sm mt-1">LangChain · LangGraph · GPT-4o / Gemini · Two-Round Debate Protocol</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-emerald-400 text-xs">Weighted Voting</div>
                  <div className="text-white font-semibold text-sm">Conflict Resolution</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Agronomist', icon: '🌱' },
                  { name: 'Economist', icon: '💰' },
                  { name: 'Logistician', icon: '🚚' },
                  { name: 'Coordinator', icon: '🎯' }
                ].map((a, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
                    <div className="text-3xl mb-2">{a.icon}</div>
                    <div className="text-white text-sm font-medium">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2 opacity-50"><svg className="w-6 h-6 text-slate-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>

          {/* Layer 1 - Data Ingestion */}
          <div className="relative z-10 group">
            <div className="max-w-6xl mx-auto glass-card-glow rounded-2xl p-6 border-slate-500/30 bg-gradient-to-r from-slate-500/10 to-gray-500/10 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/20">📡</div>
                  <div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Layer 1</div>
                    <h3 className="text-white font-bold text-lg">Data Ingestion</h3>
                    <p className="text-slate-400 text-sm mt-1">Simulated IoT · OpenWeather API · Mock AgMarket · Redis Pub/Sub</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-slate-400 text-xs">Every 15 seconds</div>
                  <div className="text-white font-semibold text-sm">Continuous Stream</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Soil Sensors', icon: '🌡️', desc: 'NPK + moisture' },
                  { name: 'OpenWeather', icon: '🌤️', desc: 'Real-time API' },
                  { name: 'Mock AgMarket', icon: '📈', desc: 'Pricing feed' },
                  { name: 'PostgreSQL + Redis', icon: '🗄️', desc: 'Storage & Pub/Sub' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className="text-white text-sm font-medium">{s.name}</div>
                    <div className="text-slate-400 text-xs mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closed Loop Banner */}
        <div className={`glass-card rounded-2xl p-8 mb-12 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: 'Sensor Snapshot', icon: '📡' },
              { label: 'AI Negotiation', icon: '🧠' },
              { label: 'Decision', icon: '✅' },
              { label: 'Actuator', icon: '⚡' },
              { label: 'New Reading', icon: '🔄' }
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/[0.05] rounded-xl px-4 py-2 border border-white/[0.05]">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-emerald-400 text-sm font-medium">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg className="w-5 h-5 text-emerald-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-slate-400 text-sm mt-6">
            Closed-loop continuous learning · Cycles every 15 minutes
          </div>
        </div>

        {/* Layer Description Cards */}
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <TiltCard className="p-8 rounded-2xl border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 text-sm">1</span>
              Closed-Loop Data Flow
            </h3>
            <ul className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <li className="flex gap-3 items-start"><span className="text-emerald-400 mt-0.5">→</span> IoT sensors publish to Redis channels every 15s</li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 mt-0.5">→</span> OpenWeather + AgMarket APIs add external context</li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 mt-0.5">→</span> XGBoost computes disease & yield risk scores</li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 mt-0.5">→</span> Agents debate in 2 rounds via LangGraph</li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 mt-0.5">→</span> Coordinator votes, logs, and triggers actuator</li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 mt-0.5">→</span> WebSocket streams everything to React UI</li>
            </ul>
          </TiltCard>

          <TiltCard className="p-8 rounded-2xl border-blue-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 text-sm">2</span>
              Why It Works
            </h3>
            <ul className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <li className="flex gap-3 items-start"><span className="text-blue-400 mt-0.5">✓</span> Redis Pub/Sub decouples ingestion from reasoning</li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 mt-0.5">✓</span> InfluxDB optimized for time-series sensor history</li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 mt-0.5">✓</span> PostgreSQL preserves auditable decision logs</li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 mt-0.5">✓</span> LangGraph enables structured multi-round debates</li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 mt-0.5">✓</span> WebSockets enable sub-second UI updates</li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 mt-0.5">✓</span> Docker-ready for one-click cloud deployment</li>
            </ul>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
