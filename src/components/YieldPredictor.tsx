import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';

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
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');
      if (!apiUrl && !import.meta.env.DEV) {
        throw new Error('ML Predictor API URL is not configured.');
      }
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
    <section id="predict" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Yield Predictor</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Input your soil nutrients and environmental data to receive high-precision yield forecasts powered by our trained XGBoost model.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <GlassCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Object.entries(formData).map(([key, val]) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  {key.length <= 2 ? `${key} Nutrient` : key}
                </label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => setInputData({...formData, [key]: parseFloat(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Calculator size={20} />}
            {isLoading ? 'Processing Intelligence...' : 'Calculate Predicted Yield'}
          </button>
        </GlassCard>

        {/* Results */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !error && !isLoading && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-white/5 rounded-3xl"
              >
                <TrendingUp size={48} className="mb-4 opacity-20" />
                <p>Awaiting data input for inference...</p>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex gap-4 text-red-400"
              >
                <AlertCircle />
                <p>{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">Forecasted Yield</div>
                      <div className="text-5xl font-black text-white">{result.predicted_yield_kg_ha} <span className="text-xl font-normal text-gray-500">kg/ha</span></div>
                    </div>
                    <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={12} /> {Math.round(result.confidence_score * 100)}% Confidence
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-3">AI Recommendation</div>
                    <p className="text-gray-300 leading-relaxed italic">"{result.recommendation}"</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-white">Inference</div>
                    <div className="text-[10px] text-gray-500 uppercase mt-1">XGBoost v2.0</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-white">Real-time</div>
                    <div className="text-[10px] text-gray-500 uppercase mt-1">Status: OK</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
