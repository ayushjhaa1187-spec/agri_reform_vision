export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-4">
            4-Layer Autonomous Loop
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            System Architecture
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A closed-loop pipeline: <span className="text-emerald-400">sensor snapshot → AI negotiation → decision → simulated actuator → new sensor reading</span>, enabling continuous learning every 15 minutes.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16">
          {/* Layer 4 - UI */}
          <div className="relative z-40 mb-3">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-2xl shadow-blue-500/30">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📱</div>
                  <div>
                    <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Layer 4</div>
                    <h3 className="text-white font-bold text-lg">Interactive Dashboard</h3>
                    <p className="text-blue-100 text-sm">React.js 18 · TailwindCSS · Recharts · Zustand · Framer Motion</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-200 text-xs">Single Pane of Glass</div>
                  <div className="text-white font-semibold text-sm">Field map · Agent feed · Action log</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-1"><svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>

          {/* Layer 3 - Backend */}
          <div className="relative z-30 mb-3">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl shadow-purple-500/30">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">⚙️</div>
                  <div>
                    <div className="text-purple-200 text-xs font-semibold uppercase tracking-wider">Layer 3</div>
                    <h3 className="text-white font-bold text-lg">Backend Services</h3>
                    <p className="text-purple-100 text-sm">FastAPI · WebSockets · XGBoost Microservice · Action Logger</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-purple-200 text-xs">Live Data Push</div>
                  <div className="text-white font-semibold text-sm">≥85% ML Accuracy</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'FastAPI', desc: 'REST + WS' },
                  { label: 'XGBoost', desc: 'Risk scores' },
                  { label: 'Action Logger', desc: 'Audit trail' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center border border-white/10">
                    <div className="text-white text-sm font-medium">{s.label}</div>
                    <div className="text-purple-200 text-xs">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-1"><svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>

          {/* Layer 2 - AI Core */}
          <div className="relative z-20 mb-3">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-2xl shadow-emerald-500/30">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🧠</div>
                  <div>
                    <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">Layer 2</div>
                    <h3 className="text-white font-bold text-lg">Multi-Agent Intelligence Core</h3>
                    <p className="text-emerald-100 text-sm">LangChain · LangGraph · GPT-4o / Gemini · Two-Round Debate Protocol</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-200 text-xs">Weighted Voting</div>
                  <div className="text-white font-semibold text-sm">Conflict Resolution</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { name: 'Agronomist', icon: '🌱' },
                  { name: 'Economist', icon: '💰' },
                  { name: 'Logistician', icon: '🚚' },
                  { name: 'Master Coordinator', icon: '🎯' }
                ].map((a, i) => (
                  <div key={i} className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                    <div className="text-2xl mb-1">{a.icon}</div>
                    <div className="text-white text-sm font-medium">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-1"><svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>

          {/* Layer 1 - Data Ingestion */}
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📡</div>
                  <div>
                    <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Layer 1</div>
                    <h3 className="text-white font-bold text-lg">Data Ingestion</h3>
                    <p className="text-slate-200 text-sm">Simulated IoT · OpenWeather API · Mock AgMarket · Redis Pub/Sub</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-300 text-xs">Every 15 seconds</div>
                  <div className="text-white font-semibold text-sm">Continuous Stream</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { name: 'Soil Sensors', icon: '🌡️', desc: 'NPK + moisture' },
                  { name: 'OpenWeather', icon: '🌤️', desc: 'Real-time' },
                  { name: 'Mock AgMarket', icon: '📈', desc: 'Pricing feed' },
                  { name: 'PostgreSQL + InfluxDB', icon: '🗄️', desc: 'Storage' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                    <div className="text-xl mb-1">{s.icon}</div>
                    <div className="text-white text-xs font-medium">{s.name}</div>
                    <div className="text-slate-400 text-xs">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closed Loop Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: 'Sensor Snapshot', icon: '📡' },
              { label: 'AI Negotiation', icon: '🧠' },
              { label: 'Decision', icon: '✅' },
              { label: 'Actuator', icon: '⚡' },
              { label: 'New Reading', icon: '🔄' }
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-emerald-500/20">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-emerald-300 text-sm font-medium">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-slate-400 text-sm mt-3">
            Closed-loop continuous learning · Cycles every 15 minutes
          </div>
        </div>

        {/* Layer Description Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">1</span>
              Closed-Loop Data Flow
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-emerald-400">→</span> IoT sensors publish to Redis channels every 15s</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> OpenWeather + AgMarket APIs add external context</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> XGBoost computes disease & yield risk scores</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> Agents debate in 2 rounds via LangGraph</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> Coordinator votes, logs, and triggers actuator</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> WebSocket streams everything to React UI</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">2</span>
              Why It Works
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Redis Pub/Sub decouples ingestion from reasoning</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> InfluxDB optimized for time-series sensor history</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> PostgreSQL preserves auditable decision logs</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> LangGraph enables structured multi-round debates</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> WebSockets enable sub-second UI updates</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Docker-ready for one-click cloud deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
