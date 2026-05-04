import { useState } from 'react';

export default function ConnectScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'logs' | 'map'>('overview');
  const [mode, setMode] = useState<'auto' | 'suggest' | 'manual'>('auto');

  const agentStatus = [
    { name: 'Agronomist', icon: '🌱', status: 'active', lastAction: 'Soil moisture analyzed', time: '2 min ago' },
    { name: 'Economist', icon: '💰', status: 'active', lastAction: 'Energy tariff updated', time: '5 min ago' },
    { name: 'Logistician', icon: '🚚', status: 'monitoring', lastAction: 'Harvest transport scheduled', time: '15 min ago' },
    { name: 'Master Coordinator', icon: '🎯', status: 'active', lastAction: 'Irrigation conflict resolved', time: '1 min ago' }
  ];

  const recentLogs = [
    { time: '10:32:45', type: 'decision', agent: 'Master Coordinator', message: 'Pump scheduled for 14:01 @ 40% capacity (₹840 saved)' },
    { time: '10:31:20', type: 'negotiation', agent: 'Economist', message: 'Counter-proposal: Delay 6h to off-peak tariff' },
    { time: '10:30:55', type: 'negotiation', agent: 'Logistician', message: 'Warning: Soil >55% would block harvester' },
    { time: '10:30:15', type: 'alert', agent: 'Agronomist', message: 'Soil moisture 32% — below optimal threshold' },
    { time: '10:28:00', type: 'data', agent: 'OpenWeather API', message: 'Rain probability 65% in next 42 hours' },
    { time: '10:25:30', type: 'ml', agent: 'XGBoost Model', message: 'Disease risk score: Low (12%)' }
  ];

  const farmMetrics = [
    { label: 'Soil Moisture', value: '32%', status: 'warning', icon: '💧' },
    { label: 'Crop Health', value: '94%', status: 'good', icon: '🌱' },
    { label: 'Disease Risk', value: '12%', status: 'good', icon: '🛡️' },
    { label: 'Yield Forecast', value: '4.2 t/ha', status: 'good', icon: '📈' },
    { label: 'Rain Prob (42h)', value: '65%', status: 'warning', icon: '🌧️' },
    { label: 'NPK Level', value: 'Optimal', status: 'good', icon: '🧪' }
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
    <section id="connect" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-4">
            Connect Screen
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            The Farmer's Single Pane of Glass
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Real-time field map, agent status, negotiation feed, and action log — everything in one interactive dashboard.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-slate-400 text-sm mr-2">Operating Mode:</span>
          {[
            { id: 'auto', label: '⚡ Autonomous' },
            { id: 'suggest', label: '💡 Suggestion Only' },
            { id: 'manual', label: '✋ Manual' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as typeof mode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mode === m.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Dashboard Container */}
        <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
          {/* Top Bar */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌾</span>
                  <span className="text-white font-bold">Agri-Intelligence</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
                  {(['overview', 'map', 'agents', 'logs'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                        activeTab === tab ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
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
                  <div className="text-slate-400 text-xs">Punjab, India · 12.5 ha</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {farmMetrics.map((metric, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                      <div className="text-2xl mb-2">{metric.icon}</div>
                      <div className="text-slate-400 text-xs mb-1">{metric.label}</div>
                      <div className={`text-lg font-bold ${
                        metric.status === 'good' ? 'text-emerald-400' :
                        metric.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Dashboard Area */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Agent Activity */}
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      Agent Status Panel
                    </h3>
                    <div className="space-y-3">
                      {agentStatus.map((agent, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
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
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Negotiation Feed
                    </h3>
                    <div className="space-y-2">
                      {recentLogs.slice(0, 5).map((log, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-slate-800/50 rounded-lg">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                            log.type === 'decision' ? 'bg-emerald-500/20 text-emerald-400' :
                            log.type === 'negotiation' ? 'bg-blue-500/20 text-blue-400' :
                            log.type === 'alert' ? 'bg-yellow-500/20 text-yellow-400' :
                            log.type === 'ml' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {log.type}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs">{log.message}</div>
                            <div className="text-slate-500 text-xs">{log.time} · {log.agent}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h3 className="text-white font-semibold mb-4">System Health</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Uptime', value: '99.7%', color: 'text-emerald-400' },
                      { label: 'Loop Latency', value: '4.2s', color: 'text-blue-400' },
                      { label: 'Decisions Today', value: '142', color: 'text-purple-400' },
                      { label: 'Errors', value: '0', color: 'text-emerald-400' }
                    ].map((m, i) => (
                      <div key={i} className="text-center">
                        <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                        <div className="text-slate-400 text-xs mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulate Trigger */}
                <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Simulate Actuator Trigger
                </button>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Field Map · Moisture Zones</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span><span className="text-slate-400">Dry &lt;30%</span></span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 rounded"></span><span className="text-slate-400">Med 30–50%</span></span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded"></span><span className="text-slate-400">Optimal &gt;50%</span></span>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="grid grid-cols-5 gap-2">
                    {fieldZones.map((zone) => (
                      <div
                        key={zone.id}
                        className={`aspect-square rounded-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 cursor-pointer ${
                          zone.status === 'red' ? 'bg-red-500/80' :
                          zone.status === 'yellow' ? 'bg-yellow-500/80' :
                          'bg-emerald-500/80'
                        }`}
                      >
                        {zone.moisture}%
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-800 rounded-lg p-2"><div className="text-red-400 text-xl font-bold">{fieldZones.filter(z => z.status === 'red').length}</div><div className="text-slate-400 text-xs">Dry zones</div></div>
                    <div className="bg-slate-800 rounded-lg p-2"><div className="text-yellow-400 text-xl font-bold">{fieldZones.filter(z => z.status === 'yellow').length}</div><div className="text-slate-400 text-xs">Medium</div></div>
                    <div className="bg-slate-800 rounded-lg p-2"><div className="text-emerald-400 text-xl font-bold">{fieldZones.filter(z => z.status === 'green').length}</div><div className="text-slate-400 text-xs">Optimal</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agents' && (
              <div className="grid md:grid-cols-2 gap-6">
                {agentStatus.map((agent, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{agent.icon}</span>
                        <div>
                          <div className="text-white font-semibold">{agent.name}</div>
                          <div className={`text-sm ${
                            agent.status === 'active' ? 'text-emerald-400' :
                            agent.status === 'monitoring' ? 'text-blue-400' : 'text-slate-400'
                          }`}>
                            ● {agent.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Action</span>
                        <span className="text-white text-right">{agent.lastAction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time</span>
                        <span className="text-white">{agent.time}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-600">
                        <div className="text-slate-400 text-xs mb-1">Objective Function</div>
                        <div className="text-white text-sm">
                          {agent.name === 'Agronomist' ? 'Maximise crop health, minimise stress' :
                           agent.name === 'Economist' ? 'Minimise cost, maximise revenue' :
                           agent.name === 'Logistician' ? 'Ensure harvest & transport feasibility' :
                           'Synthesise & resolve conflicts'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="bg-slate-700/30 rounded-xl border border-slate-600 overflow-hidden">
                <div className="p-4 border-b border-slate-600 flex items-center justify-between">
                  <h3 className="text-white font-semibold">Action Log · Audit Trail</h3>
                  <span className="text-slate-500 text-xs">{recentLogs.length} entries</span>
                </div>
                <div className="divide-y divide-slate-600">
                  {recentLogs.map((log, index) => (
                    <div key={index} className="p-4 hover:bg-slate-700/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          log.type === 'decision' ? 'bg-emerald-500/20 text-emerald-400' :
                          log.type === 'negotiation' ? 'bg-blue-500/20 text-blue-400' :
                          log.type === 'alert' ? 'bg-yellow-500/20 text-yellow-400' :
                          log.type === 'ml' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {log.type.toUpperCase()}
                        </span>
                        <div className="flex-1">
                          <div className="text-white text-sm">{log.message}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-slate-400 text-xs">{log.agent}</span>
                            <span className="text-slate-500 text-xs">·</span>
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
          <div className="bg-slate-900 px-6 py-3 border-t border-slate-700">
            <div className="flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-400"><span className="text-emerald-400">●</span> API Connected</span>
                <span className="text-slate-400"><span className="text-emerald-400">●</span> Agents Running</span>
                <span className="text-slate-400"><span className="text-emerald-400">●</span> ML Models Active</span>
                <span className="text-slate-400"><span className="text-emerald-400">●</span> Redis Streaming</span>
              </div>
              <div className="text-slate-500">Last sync: just now · Next loop: 14m 23s</div>
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
