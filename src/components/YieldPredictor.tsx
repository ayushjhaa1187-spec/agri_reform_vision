import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { API_URL } from '../utils/api';

export default function YieldPredictor({ onPredict }: { onPredict?: () => void }) {
  const [formData, setInputData] = useState({
    N: 70, P: 45, K: 35,
    temperature: 25, humidity: 70, ph: 6.5, rainfall: 100
  });
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = API_URL;
      const response = await fetch(`${apiUrl}/ml/predict-yield`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Prediction service unavailable');
      const data = await response.json();
      setResult(data);
      if (onPredict) onPredict();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="section-separator"></div>
      <section id="predict" className="py-24 md:py-32 bg-[var(--bg-primary)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-cyan-500/30 text-cyan-400 bg-cyan-500/10 mb-6">
              Predictive Analytics
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tight">AI Yield Predictor</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Input your soil nutrients and environmental data to receive high-precision yield forecasts powered by our trained XGBoost model.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <GlassCard className="p-8 rounded-[32px] border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {Object.entries(formData).map(([key, val]) => (
                  <div key={key}>
                    <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2.5">
                      {key.length <= 2 ? `${key} Nutrient` : key}
                    </label>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => setInputData({...formData, [key]: parseFloat(e.target.value)})}
                      className="input-field"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="btn-primary w-full py-5 rounded-[20px] shadow-lg shadow-emerald-950/40 gap-3 group"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Calculator size={20} className="group-hover:scale-110 transition-transform" />}
                <span className="uppercase tracking-widest text-xs font-black">{isLoading ? 'Processing Intelligence...' : 'Calculate Predicted Yield'}</span>
              </button>
            </GlassCard>

            {/* Results */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {!result && !error && !isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center py-24 text-[var(--text-muted)] border-2 border-dashed border-white/5 rounded-[32px] bg-white/[0.01]"
                  >
                    <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-6 shadow-inner border border-white/5">
                      <TrendingUp size={32} className="opacity-30" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Awaiting data input for inference</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-red-500/10 border border-red-500/20 rounded-[32px] flex gap-4 text-red-400 shadow-lg"
                  >
                    <AlertCircle />
                    <p className="text-sm font-bold uppercase tracking-tight">{error}</p>
                  </motion.div>
                )}

                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="bg-[var(--accent-green-glow)] border border-[var(--border-accent)] p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
                      <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                          <div className="text-[10px] font-black text-[var(--accent-green)] uppercase tracking-[0.2em] mb-2">Forecasted Yield Outcome</div>
                          <div className="text-6xl font-black text-[var(--text-primary)] tracking-tighter">{result.predicted_yield_kg_ha} <span className="text-xl font-bold text-[var(--text-muted)] uppercase tracking-widest ml-2">kg/ha</span></div>
                        </div>
                        <div className="bg-[var(--accent-green)] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={12} /> {Math.round(result.confidence_score * 100)}% Conf.
                        </div>
                      </div>
                      
                      <div className="pt-8 border-t border-white/10 relative z-10">
                        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4">ML Intelligence Recommendation</div>
                        <p className="text-[var(--text-primary)] text-lg leading-relaxed italic font-medium">"{result.recommendation}"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 relative z-10">
                      <div className="glass-card p-6 rounded-3xl text-center border-[var(--border-subtle)] bg-[var(--bg-elevated)] group hover:bg-[var(--bg-surface)] transition-all">
                        <div className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-1">XGBoost v2.0</div>
                        <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Inference Engine</div>
                      </div>
                      <div className="glass-card p-6 rounded-3xl text-center border-[var(--border-subtle)] bg-[var(--bg-elevated)] group hover:bg-[var(--bg-surface)] transition-all">
                        <div className="text-xl font-black text-[var(--accent-green)] uppercase tracking-tight mb-1">Active</div>
                        <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Engine Status</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
