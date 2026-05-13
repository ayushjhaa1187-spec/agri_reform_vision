import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebSocket } from '../../hooks/useWebSocket';
import FarmMap from '../map/FarmMap';
import { 
  Activity, 
  Droplets, 
  Thermometer, 
  Wind, 
  TrendingUp, 
  UserCheck,
  MessageSquarePlus,
  X,
  Star
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/agent-feed';
  const { telemetry, agentDecisions, isConnected } = useWebSocket(wsUrl);
  const [showFeedback, setShowFeedback] = useState(false);

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
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Feedback</span>
          </button>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm font-medium">{isConnected ? 'System Live' : 'Connecting...'}</span>
          </div>
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

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <FeedbackModal 
            onClose={() => setShowFeedback(false)} 
            telemetry={telemetry} 
            decision={decision}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const FeedbackModal = ({ onClose, telemetry, decision }: any) => {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("Agent Decision");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/feedback/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category,
          rating,
          comment,
          context: { telemetry, decision }
        })
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(onClose, 2000);
      }
    } catch (e) {
      console.error("Feedback failed", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Farmer Feedback</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-green-400">Feedback Submitted!</h4>
              <p className="text-gray-400 text-sm">Thank you for helping us improve Agri-Intelligence.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                >
                  <option value="Agent Decision">Agent Decision</option>
                  <option value="ML Prediction">ML Prediction</option>
                  <option value="UI/Experience">UI/Experience</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Comments</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the accuracy or any issues..."
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500/50 transition-all text-sm resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
  };

  const StatCard = ({ icon, label, value, trend }: any) => (  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-xs text-gray-400 font-medium uppercase">{label}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-[10px] text-green-400 font-semibold mt-1 uppercase">{trend}</div>
  </div>
);

const DecisionCard = ({ decision, isAutonomous }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-4"
  >
    <div className={`p-4 rounded-xl border transition-all ${
        isAutonomous 
        ? 'bg-emerald-500/20 border-emerald-500/40' 
        : 'bg-amber-500/20 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
    }`}>
      <div className="flex justify-between items-center mb-1">
        <div className={`text-xs font-bold uppercase ${isAutonomous ? 'text-emerald-400' : 'text-amber-400'}`}>
          {isAutonomous ? 'Autonomous Action Executed' : 'Suggestion Ready'}
        </div>
        {!isAutonomous && (
          <button className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded hover:bg-amber-400">
            APPROVE
          </button>
        )}
      </div>
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
