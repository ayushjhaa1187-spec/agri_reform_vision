import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { useWebSocket } from '../hooks/useWebSocket';
import YieldPredictor from './YieldPredictor';
import AnimatedNumber from './ui/AnimatedNumber';
import { API_URL, WS_URL } from '../utils/api';

const MOCK_LOGS = [
  { time: '10:32:45', type: 'decision', agent: 'Master Coordinator', message: 'Pump scheduled for 14:01 @ 40% capacity (₹840 saved)' },
  { time: '10:31:20', type: 'negotiation', agent: 'Economist', message: 'Counter-proposal: Delay 6h to off-peak tariff' },
  { time: '10:30:55', type: 'negotiation', agent: 'Logistician', message: 'Warning: Soil >55% would block harvester' },
  { time: '10:30:15', type: 'alert', agent: 'Agronomist', message: 'Soil moisture 32% — below optimal threshold' },
  { time: '10:28:00', type: 'data', agent: 'OpenWeather API', message: 'Rain probability 65% in next 42 hours' },
  { time: '10:25:30', type: 'ml', agent: 'XGBoost Model', message: 'Disease risk score: Low (12%)' }
];

export default function ConnectScreen({ externalStats, onManualUpdate }: { externalStats?: any, onManualUpdate?: () => void }) {
  const { ref, isVisible } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'logs' | 'map' | 'predict'>('overview');
  const [mode, setMode] = useState<'auto' | 'suggest' | 'manual'>('auto');
  const [history, setHistory] = useState<any[]>([]);

  // Phase 5: Activity tracking
  const [localMoisture, setLocalMoisture] = useState(32);

  // WebSocket Integration
  const wsUrl = WS_URL;
  const { isConnected, telemetry, agentDecisions } = useWebSocket(wsUrl);

  useEffect(() => {
    if (telemetry) {
        setLocalMoisture(telemetry.farm.soil_moisture);
    }
  }, [telemetry]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const apiUrl = API_URL;
        const response = await axios.get(`${apiUrl}/farms/1/decisions`);
        setHistory(response.data.map((d: any) => ({
          time: new Date(d.created_at).toLocaleTimeString(),
          type: d.action_type === 'yield_forecast' ? 'ml' : 'decision',
          agent: d.action_type === 'yield_forecast' ? 'XGBoost' : 'Master Coordinator',
          message: d.decision_summary || d.justification
        })));
      } catch (e) {
        console.error('Failed to fetch history');
      }
    };
    fetchHistory();
  }, [agentDecisions]);

  const agentStatus = [
    { name: 'Agronomist', icon: '🌱', status: isConnected ? 'active' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Agronomist')?.decision || 'Soil moisture analyzed', time: 'live' },
    { name: 'Economist', icon: '💰', status: isConnected ? 'active' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Economist')?.decision || 'Energy tariff updated', time: 'live' },
    { name: 'Logistician', icon: '🚚', status: isConnected ? 'monitoring' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Logistician')?.decision || 'Harvest transport scheduled', time: 'live' },
    { name: 'Master Coordinator', icon: '🎯', status: isConnected ? 'active' : 'monitoring', lastAction: agentDecisions.find(d => d.agent === 'Master Coordinator')?.decision || 'Irrigation conflict resolved', time: 'live' }
  ];

  const recentLogs = agentDecisions.length > 0 
    ? [
        ...agentDecisions.map(d => ({
          time: new Date(d.timestamp).toLocaleTimeString(),
          type: d.action_type,
          agent: d.agent,
          message: d.decision
        })),
        ...history
      ]
    : history.length > 0 ? history : MOCK_LOGS;

  const farmMetrics = [
    { label: 'Soil Moisture', value: `${localMoisture.toFixed(1)}%`, status: localMoisture < 35 ? 'warning' : 'good', icon: '💧' },
    { label: 'Crop Health', value: '94%', status: 'good', icon: '🌱' },
    { label: 'Intelligence Score', value: `${75 + (externalStats?.interactions || 0)}%`, status: 'good', icon: '🧠' },
    { label: 'Yield Forecast', value: telemetry ? `${(4.2 - telemetry.farm.yield_reduction_risk).toFixed(1)} t/ha` : '4.2 t/ha', status: 'good', icon: '📈' },
    { label: 'Policy Audits', value: `${externalStats?.schemesChecked || 0}`, status: 'good', icon: '📜' },
    { label: 'ML Inferences', value: `${externalStats?.analysesPerformed || 0}`, status: 'good', icon: '🔬' }
  ];

  const handleManualMoisture = () => {
    setLocalMoisture(prev => Math.max(10, Math.min(90, prev + (Math.random() > 0.5 ? 5 : -5))));
    if (onManualUpdate) onManualUpdate();
    toast.success('Soil sensor data refreshed');
  };

  const fieldZones = Array.from({ length: 20 }, (_, i) => {
    const moisture = 25 + Math.sin(i * 1.5) * 20 + Math.random() * 10;
    return {
      id: i,
      moisture: Math.round(moisture),
      status: moisture < 30 ? 'red' : moisture < 50 ? 'yellow' : 'green'
    };
  });

  return (
    <section id="connect" className="py-24 bg-[#030712] relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Command Center
          </div>
          <h2 className="heading-premium text-4xl md:text-6xl text-white mb-6">
            Autonomous <span className="text-gradient-premium">Intelligence Hub</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A high-fidelity interface synchronizing real-time telemetry, multi-agent negotiation, and predictive analytics.
          </p>
        </div>

        {/* Operating Control Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-6 mb-10 p-6 glass-panel rounded-3xl border-white/5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-sm font-bold text-white uppercase tracking-tight">System Operational</span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 mx-2 hidden sm:block" />
            <div className="flex flex-col hidden sm:flex">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Environment</span>
              <span className="text-sm font-bold text-slate-300">Punjab, India · Block 7A</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
            {[
              { id: 'auto', label: 'Autonomous', icon: '⚡' },
              { id: 'suggest', label: 'Suggestion', icon: '💡' },
              { id: 'manual', label: 'Manual', icon: '✋' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as typeof mode)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 ${
                  mode === m.id
                    ? 'bg-emerald-500 text-black shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="hidden sm:inline">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>

          <button 
            onClick={handleManualMoisture}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-all flex items-center gap-2"
          >
            <span>🔄</span> Refresh Sensors
          </button>
        </div>

        {/* Dashboard Shell */}
        <div className={`glass-panel-interactive rounded-[40px] overflow-hidden border-white/5 shadow-2xl transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Dashboard Navigation */}
          <div className="px-8 py-6 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                  <span className="text-xl">🌾</span>
                </div>
                <span className="text-lg font-black tracking-tighter text-white">COMMAND<span className="text-emerald-500">_v2</span></span>
              </div>
              
              <nav className="flex items-center gap-1">
                {(['overview', 'map', 'agents', 'predict', 'logs'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                      activeTab === tab 
                        ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-xl border-white/5">
                 <div className="text-right">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Session Time</div>
                    <div className="text-xs font-mono text-emerald-400 font-bold">14:28:03</div>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="animate-pulse text-[10px]">📡</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Dashboard Viewport */}
          <div className="p-8 bg-white/[0.01]">
            {activeTab === 'overview' && (
              <div className="animate-card-entrance space-y-8">
                {/* Visual Telemetry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                  {farmMetrics.map((metric, index) => (
                    <TiltCard key={index} className="glass-panel-interactive bg-white/[0.02] rounded-2xl p-5 border border-white/5">
                      <div className="text-2xl mb-4 bg-white/5 w-10 h-10 flex items-center justify-center rounded-xl">{metric.icon}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{metric.label}</div>
                      <div className={`text-2xl font-black ${
                        metric.status === 'good' ? 'text-emerald-400 glow-text-green' :
                        metric.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        <AnimatedNumber value={metric.value} />
                      </div>
                    </TiltCard>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Left Column: Agents */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="glass-panel rounded-3xl p-6 border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Agent Operations</h3>
                        <span className="text-[10px] font-mono text-emerald-400/80 uppercase">Real-time Arbitration</span>
                      </div>
                      <div className="space-y-4">
                        {agentStatus.map((agent, index) => (
                          <div key={index} className="group p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-2xl transition-all duration-500 cursor-default">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-2xl group-hover:scale-110 transition-transform duration-500">{agent.icon}</div>
                                <div>
                                  <div className="text-sm font-black text-white">{agent.name}</div>
                                  <div className="text-[10px] font-medium text-slate-500 max-w-[200px] truncate">{agent.lastAction}</div>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-500 border-white/10'
                              }`}>
                                {agent.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Negotiation Feed */}
                  <div className="lg:col-span-7">
                    <div className="glass-panel rounded-3xl p-6 border-white/5 h-full">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Intelligence Stream</h3>
                        <div className="flex gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75" />
                           <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-150" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {recentLogs.slice(0, 6).map((log, index) => (
                          <div key={index} className="animate-slide-in flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] group hover:border-white/10 transition-colors">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                               log.type === 'decision' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' :
                               log.type === 'negotiation' ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' :
                               'bg-slate-700'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm text-slate-200 font-light leading-relaxed group-hover:text-white transition-colors">
                                {log.message}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{log.agent}</span>
                                <span className="text-[9px] font-mono text-slate-600">{log.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="animate-card-entrance space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                   <div className="flex flex-col">
                      <h3 className="text-xl font-black text-white tracking-tight">Spatial Analysis</h3>
                      <p className="text-xs text-slate-500 font-medium">Holographic Field Visualization · Blocks 1-20</p>
                   </div>
                   <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                      {[
                        { label: 'Critical', color: 'bg-red-500' },
                        { label: 'Nominal', color: 'bg-yellow-400' },
                        { label: 'Optimal', color: 'bg-emerald-500' }
                      ].map((l, i) => (
                        <div key={i} className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${l.color}`} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{l.label}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="glass-panel rounded-[32px] p-12 relative overflow-hidden bg-white/[0.01]">
                    <div className="grid grid-cols-5 gap-4 relative z-10">
                      {fieldZones.map((zone) => (
                        <div
                          key={zone.id}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-700 cursor-pointer border relative group/zone ${
                            zone.status === 'red' ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/20' :
                            zone.status === 'yellow' ? 'bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-400/20' :
                            'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/20'
                          }`}
                        >
                          <span className={`text-lg font-black ${
                            zone.status === 'red' ? 'text-red-400' :
                            zone.status === 'yellow' ? 'text-yellow-400' : 'text-emerald-400'
                          }`}>{zone.moisture}%</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-1 opacity-40 group-hover/zone:opacity-100">Zone_{zone.id}</span>
                        </div>
                      ))}
                    </div>
                    {/* Cinematic Scan Line */}
                    <div className="absolute inset-0 pointer-events-none">
                       <div className="h-full w-full bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent animate-scan" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'predict' && (
               <div className="animate-card-entrance">
                  <YieldPredictor />
               </div>
            )}
            
            {activeTab === 'agents' && (
              <div className="animate-card-entrance grid md:grid-cols-2 gap-8">
                 {agentStatus.map((agent, index) => (
                    <TiltCard key={index} className="glass-panel-interactive rounded-3xl p-8 border-white/5 group">
                       <div className="flex items-start justify-between mb-8">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                             {agent.icon}
                          </div>
                          <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${
                             agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-500 border-white/10'
                          }`}>
                             ● {agent.status}
                          </div>
                       </div>
                       <h4 className="text-xl font-black text-white mb-2">{agent.name}</h4>
                       <p className="text-sm text-slate-400 font-light mb-8 italic">
                         "{agent.name === 'Agronomist' ? 'Maximizing biological potential through precise nutrient & hydration orchestration.' :
                          agent.name === 'Economist' ? 'Calibrating input efficiency vs output value for maximized seasonal ROI.' :
                          agent.name === 'Logistician' ? 'Orchestrating operational flow, labour utilization and transport readiness.' :
                          'Master synthesis of conflicting agent objectives into a singular explainable action.'}"
                       </p>
                       <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Active Proposal</div>
                          <div className="text-xs text-white font-bold">{agent.lastAction}</div>
                       </div>
                    </TiltCard>
                 ))}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="animate-card-entrance glass-panel rounded-3xl border-white/5 overflow-hidden">
                 <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Consolidated Audit Trail</span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase">Historical_v2.1</span>
                 </div>
                 <div className="divide-y divide-white/5">
                    {recentLogs.map((log, index) => (
                       <div key={index} className="px-8 py-5 hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-6 group">
                          <div className="flex items-center gap-6 min-w-0">
                             <div className="text-[10px] font-mono text-slate-600 font-bold group-hover:text-slate-400">{log.time}</div>
                             <div className="flex-1 min-w-0">
                                <div className="text-sm text-slate-300 font-light truncate group-hover:text-white">{log.message}</div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{log.agent}</div>
                             </div>
                          </div>
                          <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter border ${
                             log.type === 'decision' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-500 border-white/10'
                          }`}>
                             {log.type}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>

          {/* Dash Terminal Footer */}
          <div className="px-8 py-4 bg-[#030712] border-t border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Network Secure</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Grounded_RAG Active</span>
                </div>
             </div>
             <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
               Encrypted Node: 0x8472_AGRI_INTEL
             </div>
          </div>
        </div>

        <div className="text-center mt-12 transition-all duration-1000 delay-600">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
             End of Dashboard Hub · Cinematic Prototype · 2026
           </p>
        </div>
      </div>
    </section>
  );
}
