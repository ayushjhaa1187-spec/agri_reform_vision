import React from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from '../../hooks/useWebSocket';
import FarmMap from '../map/FarmMap';
import { 
  Activity, 
  Droplets, 
  Thermometer, 
  Wind, 
  TrendingUp, 
  UserCheck 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { telemetry, agentDecisions, isConnected } = useWebSocket('ws://localhost:8000/ws/agent-feed');

  // Fallback / Initial Data
  const decision = agentDecisions.length > 0 ? {
    decision: { final_action: agentDecisions[0].decision, justification: "From stream" },
    proposals: [] // Placeholder if actual proposals aren't in stream
  } : null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Agri-Intelligence Dashboard
          </h1>
          <p className="text-gray-400"> पंजाब Farm PB-ASR-001 | Real-time Monitoring</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-medium">{isConnected ? 'System Live' : 'Connecting...'}</span>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Telemetry & Maps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<Droplets className="text-blue-400" />} 
              label="Soil Moisture" 
              value={telemetry ? `${telemetry.farm.soil_moisture.toFixed(1)}%` : '--'} 
              trend="Normal"
            />
            <StatCard 
              icon={<Thermometer className="text-orange-400" />} 
              label="Temp" 
              value={telemetry ? `${telemetry.farm.temperature.toFixed(1)}°C` : '--'} 
              trend="+0.2"
            />
            <StatCard 
              icon={<Wind className="text-emerald-400" />} 
              label="Humidity" 
              value={telemetry ? `${telemetry.farm.humidity.toFixed(1)}%` : '--'} 
              trend="-1.0"
            />
            <StatCard 
              icon={<Activity className="text-red-400" />} 
              label="Disease Risk" 
              value={telemetry ? `${(telemetry.farm.current_disease_risk * 100).toFixed(0)}%` : '--'} 
              trend="Low"
            />
          </div>

          {/* Map View */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl border border-white/10 p-4"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" /> Geospatial Overview
            </h2>
            <FarmMap center={[31.6340, 74.8723]} />
          </motion.div>
        </div>

        {/* Right Column: Agent Decision Room */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-emerald-400" /> Agent Decision Room
            </h2>
            
            <div className="flex-grow space-y-4 overflow-y-auto pr-2">
              {decision ? (
                <DecisionCard decision={decision} />
              ) : (
                <div className="text-center py-20 text-gray-500 italic">
                  Waiting for next negotiation cycle...
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">System Log</div>
              <div className="bg-black/40 rounded-lg p-3 text-xs font-mono text-green-400/80">
                &gt; Listening on redis:agent_decisions...<br/>
                &gt; WebSocket connection active...
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: any) => (
  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-xs text-gray-400 font-medium uppercase">{label}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-[10px] text-green-400 font-semibold mt-1 uppercase">{trend}</div>
  </div>
);

const DecisionCard = ({ decision }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-4"
  >
    <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl">
      <div className="text-xs text-emerald-400 font-bold uppercase mb-1">Final Decision</div>
      <div className="text-lg font-bold">{decision.decision.final_action}</div>
      <p className="text-sm text-gray-300 mt-2 italic">"{decision.decision.justification}"</p>
    </div>

    <div className="space-y-3">
      {decision.proposals.map((p: any, i: number) => (
        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase text-gray-400">{p.agent}</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">Proposal</span>
          </div>
          <div className="text-sm font-medium">{p.proposed_action}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default Dashboard;
