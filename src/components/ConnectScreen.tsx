import { useState } from 'react';
import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { useWebSocket } from '../hooks/useWebSocket';

const MOCK_LOGS = [
  { time: '10:32:45', type: 'decision', agent: 'Master Coordinator', message: 'Pump scheduled for 14:01 @ 40% capacity (₹840 saved)' },
  { time: '10:31:20', type: 'negotiation', agent: 'Economist', message: 'Counter-proposal: Delay 6h to off-peak tariff' },
  { time: '10:30:55', type: 'negotiation', agent: 'Logistician', message: 'Warning: Soil >55% would block harvester' },
  { time: '10:30:15', type: 'alert', agent: 'Agronomist', message: 'Soil moisture 32% — below optimal threshold' },
  { time: '10:28:00', type: 'data', agent: 'OpenWeather API', message: 'Rain probability 65% in next 42 hours' },
  { time: '10:25:30', type: 'ml', agent: 'XGBoost Model', message: 'Disease risk score: Low (12%)' }
];

export default function ConnectScreen() {
  const { ref, isVisible } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'logs' | 'map'>('overview');
  const [mode, setMode] = useState<'auto' | 'suggest' | 'manual'>('auto');

  // WebSocket Integration
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/agent-feed';
  const { isConnected, telemetry, agentDecisions } = useWebSocket(wsUrl);

  const agentStatus = [
    { name: 'Agronomist', icon: '🌱', status: isConnected ? 'active' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Agronomist')?.decision || 'Soil moisture analyzed', time: 'live' },
    { name: 'Economist', icon: '💰', status: isConnected ? 'active' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Economist')?.decision || 'Energy tariff updated', time: 'live' },
    { name: 'Logistician', icon: '🚚', status: isConnected ? 'monitoring' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Logistician')?.decision || 'Harvest transport scheduled', time: 'live' },
    { name: 'Master Coordinator', icon: '🎯', status: isConnected ? 'active' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Master Coordinator')?.decision || 'Irrigation conflict resolved', time: 'live' }
  ];

  const recentLogs = agentDecisions.length > 0 
    ? agentDecisions.map(d => ({
        time: new Date(d.timestamp).toLocaleTimeString(),
        type: d.action_type,
        agent: d.agent,
        message: d.decision
      }))
    : MOCK_LOGS;

  const farmMetrics = [
    { label: 'Soil Moisture', value: telemetry ? `${telemetry.farm.soil_moisture.toFixed(1)}%` : '32.0%', status: (telemetry?.farm.soil_moisture ?? 32) < 35 ? 'warning' : 'good', icon: '💧' },
    { label: 'Crop Health', value: '94%', status: 'good', icon: '🌱' },
    { label: 'Disease Risk', value: telemetry ? `${(telemetry.farm.current_disease_risk * 100).toFixed(1)}%` : '12.0%', status: 'good', icon: '🛡️' },
    { label: 'Yield Forecast', value: telemetry ? `${(4.2 - telemetry.farm.yield_reduction_risk).toFixed(1)} t/ha` : '4.2 t/ha', status: 'good', icon: '📈' },
    { label: 'Rain Prob (42h)', value: telemetry ? `${telemetry.weather.rain_probability}%` : '65%', status: (telemetry?.weather.rain_probability ?? 65) > 50 ? 'warning' : 'good', icon: '🌧️' },
    { label: 'Temperature', value: telemetry ? `${telemetry.farm.temperature.toFixed(1)}°C` : '28.5°C', status: 'good', icon: '🌡️' }
  ];


  // Generate mock field zones (5x4 grid)
  const fieldZones = Array.from({ length: 20 }, (_, i) => {
    const moisture = 25 + Math.sin(i * 1.5) * 20 + Math.random() * 10;
    return {
      id: i,
      moisture: Math.round(moisture),
      status: moisture < 30 ? 'red' : moisture < 50 ? 'yellow' : 'green'
    };
  });

  return (
    <section id="connect" className="py-24 section-dark border-t border-white/[0.04] min-h-screen">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-emerald-400 mb-4">
            Connect Screen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Farmer's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Single Pane of Glass</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Real-time field map, agent status, negotiation feed, and action log — everything in one interactive dashboard.
          </p>
        </div>

        {/* Mode Selector */}
        <div className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-slate-400 text-sm mr-2 hidden sm:inline">Operating Mode:</span>
          {[
            { id: 'auto', label: '⚡ Autonomous' },
            { id: 'suggest', label: '💡 Suggestion Only' },
            { id: 'manual', label: '✋ Manual' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as typeof mode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                mode === m.id
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/[0.05] text-slate-400 border-transparent hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Dashboard Container */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-card-glow rounded-3xl overflow-hidden border-white/[0.05]">
            {/* Top Bar */}
            <div className="bg-white/[0.03] px-6 py-4 border-b border-white/[0.05]">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌾</span>
                    <span className="text-white font-bold tracking-wide">Agri-Intelligence</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/[0.05]">
                    {(['overview', 'map', 'agents', 'logs'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                          activeTab === tab 
                            ? 'bg-white/10 text-white shadow-sm' 
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-white text-sm font-medium">Farm #2847</div>
                    <div className="text-emerald-400/80 text-xs">Punjab, India · 12.5 ha</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <span className="text-white font-bold text-sm">AK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 bg-white/[0.01]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {farmMetrics.map((metric, index) => (
                      <TiltCard key={index} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] hover:bg-white/[0.04]">
                        <div className="text-2xl mb-2">{metric.icon}</div>
                        <div className="text-slate-400 text-xs mb-1">{metric.label}</div>
                        <div className={`text-lg font-bold ${
                          metric.status === 'good' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]' :
                          metric.status === 'warning' ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]'
                        }`}>
                          {metric.value}
                        </div>
                      </TiltCard>
                    ))}
                  </div>

                  {/* Main Dashboard Area */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Agent Activity */}
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        Agent Status Panel
                      </h3>
                      <div className="space-y-3">
                        {agentStatus.map((agent, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{agent.icon}</span>
                              <div>
                                <div className="text-white text-sm font-medium">{agent.name}</div>
                                <div className="text-slate-400 text-xs">{agent.lastAction}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xs font-medium ${
                                agent.status === 'active' ? 'text-emerald-400' :
                                agent.status === 'monitoring' ? 'text-blue-400' : 'text-slate-500'
                              }`}>
                                ● {agent.status}
                              </div>
                              <div className="text-slate-500 text-xs">{agent.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Decisions */}
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Negotiation Feed
                      </h3>
                      <div className="space-y-2">
                        {recentLogs.slice(0, 5).map((log, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                              log.type === 'decision' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              log.type === 'negotiation' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              log.type === 'alert' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              log.type === 'ml' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                              'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                            }`}>
                              {log.type}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-slate-200 text-sm leading-snug">{log.message}</div>
                              <div className="text-slate-500 text-xs mt-1">{log.time} · {log.agent}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Health */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">System Health</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Uptime', value: '99.7%', color: 'text-emerald-400' },
                        { label: 'Loop Latency', value: '4.2s', color: 'text-blue-400' },
                        { label: 'Decisions Today', value: '142', color: 'text-purple-400' },
                        { label: 'Errors', value: '0', color: 'text-emerald-400' }
                      ].map((m, i) => (
                        <div key={i} className="text-center">
                          <div className={`text-2xl font-bold ${m.color} drop-shadow-[0_0_8px_currentColor]`}>{m.value}</div>
                          <div className="text-slate-400 text-xs mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulate Trigger */}
                  <button className="w-full py-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-400/50 text-emerald-400 hover:text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Simulate Actuator Trigger
                  </button>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg">Field Map · Moisture Zones</h3>
                    <div className="flex items-center gap-4 text-xs bg-white/[0.05] rounded-lg px-3 py-1.5">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_5px_#ef4444]"></span><span className="text-slate-300">Dry &lt;30%</span></span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-[0_0_5px_#facc15]"></span><span className="text-slate-300">Med 30–50%</span></span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981]"></span><span className="text-slate-300">Optimal &gt;50%</span></span>
                    </div>
                  </div>
                  <div className="perspective-1000">
                    <div className="glass-card rounded-2xl p-8 transform-gpu transition-all duration-700 hover:rotate-x-2" style={{ transform: 'rotateX(12deg)' }}>
                      {/* Grid Overlay */}
                      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none rounded-2xl" />
                      
                      {/* Holographic Scanline */}
                      <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/5 to-transparent h-full w-full animate-scan opacity-40" />
                      </div>
                    <div className="grid grid-cols-5 gap-3">
                      {fieldZones.map((zone) => (
                        <div
                          key={zone.id}
                          className={`aspect-square rounded-xl flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:scale-105 cursor-pointer border ${
                            zone.status === 'red' ? 'bg-red-500/20 border-red-500/50 shadow-[inset_0_0_15px_rgba(239,68,68,0.3)]' :
                            zone.status === 'yellow' ? 'bg-yellow-500/20 border-yellow-500/50 shadow-[inset_0_0_15px_rgba(234,179,8,0.3)]' :
                            'bg-emerald-500/20 border-emerald-500/50 shadow-[inset_0_0_15px_rgba(16,185,129,0.3)]'
                          }`}
                        >
                          <span className="drop-shadow-md">{zone.moisture}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3"><div className="text-red-400 text-2xl font-bold">{fieldZones.filter(z => z.status === 'red').length}</div><div className="text-slate-400 text-xs mt-1">Dry zones</div></div>
                      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3"><div className="text-yellow-400 text-2xl font-bold">{fieldZones.filter(z => z.status === 'yellow').length}</div><div className="text-slate-400 text-xs mt-1">Medium</div></div>
                      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3"><div className="text-emerald-400 text-2xl font-bold">{fieldZones.filter(z => z.status === 'green').length}</div><div className="text-slate-400 text-xs mt-1">Optimal</div></div>
                    </div>
                  </div>
                </div>
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {agentStatus.map((agent, index) => (
                    <TiltCard key={index} className="rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{agent.icon}</span>
                          <div>
                            <div className="text-white font-semibold">{agent.name}</div>
                            <div className={`text-xs mt-0.5 ${
                              agent.status === 'active' ? 'text-emerald-400' :
                              agent.status === 'monitoring' ? 'text-blue-400' : 'text-slate-400'
                            }`}>
                              ● {agent.status}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg border border-white/[0.03]">
                          <span className="text-slate-400 text-xs">Last Action</span>
                          <span className="text-white text-right text-xs font-medium">{agent.lastAction}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg border border-white/[0.03]">
                          <span className="text-slate-400 text-xs">Time</span>
                          <span className="text-slate-300 text-xs font-medium">{agent.time}</span>
                        </div>
                        <div className="pt-3 border-t border-white/[0.05]">
                          <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Objective Function</div>
                          <div className="text-slate-200 text-sm italic">
                            "{agent.name === 'Agronomist' ? 'Maximise crop health, minimise stress.' :
                             agent.name === 'Economist' ? 'Minimise cost, maximise revenue.' :
                             agent.name === 'Logistician' ? 'Ensure harvest & transport feasibility.' :
                             'Synthesise & resolve conflicts.'}"
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/[0.05] bg-white/[0.02] flex items-center justify-between">
                    <h3 className="text-white font-semibold">Action Log · Audit Trail</h3>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded text-xs font-medium">Live Feed</span>
                  </div>
                  <div className="divide-y divide-white/[0.05]">
                    {recentLogs.map((log, index) => (
                      <div key={index} className="p-4 hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-start gap-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${
                            log.type === 'decision' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            log.type === 'negotiation' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                            log.type === 'alert' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                            log.type === 'ml' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                            'bg-slate-500/10 text-slate-400 border-slate-500/30'
                          }`}>
                            {log.type.toUpperCase()}
                          </span>
                          <div className="flex-1">
                            <div className="text-slate-200 text-sm group-hover:text-white transition-colors">{log.message}</div>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-slate-400 text-xs font-medium">{log.agent}</span>
                              <span className="text-slate-600 text-xs">·</span>
                              <span className="text-slate-500 text-xs">{log.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="bg-black/40 px-6 py-3 border-t border-white/[0.05]">
              <div className="flex items-center justify-between text-xs flex-wrap gap-3">
                <div className="flex items-center gap-5 flex-wrap">
                  <span className="text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_#10b981]"></span> API Connected</span>
                  <span className="text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_#10b981]"></span> Agents Running</span>
                  <span className="text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_#10b981]"></span> ML Models Active</span>
                  <span className="text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_#10b981]"></span> Redis Streaming</span>
                </div>
                <div className="text-slate-500 font-medium">Last sync: just now · Next loop: 14m 23s</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-sm text-center mt-6">
          Interactive demo · Click tabs above to explore Overview · Field Map · Agents · Action Log
        </p>
      </div>
    </section>
  );
}
