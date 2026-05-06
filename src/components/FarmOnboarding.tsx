import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MapPin, Crop, Ruler, Loader2, ArrowRight } from 'lucide-react';
import GlassCard from './ui/GlassCard';

interface OnboardingProps {
  onComplete: () => void;
}

export default function FarmOnboarding({ onComplete }: OnboardingProps) {
  const [formData, setFormData] = useState({
    name: '',
    location_district: '',
    location_state: '',
    total_area_hectares: 0,
    primary_crop: 'Wheat'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      await axios.post(`${apiUrl}/farms/`, formData);
      toast.success('Farm registered successfully!');
      onComplete();
    } catch (error: any) {
      toast.error('Failed to register farm. Using mock mode.');
      onComplete(); // Proceed anyway for prototype
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4 animate-float">
            <span className="text-3xl">🌱</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Farm Onboarding</h2>
          <p className="text-slate-400 max-w-sm mx-auto">Initialize your digital twin for autonomous management and real-time monitoring</p>
        </div>

        <GlassCard className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="form-group">
              <label className="label-sm">Farm Name</label>
              <div className="input-container">
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="input-field"
                  placeholder="Golden Acres"
                />
                <span className="input-icon">🏡</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group mb-0">
                <label className="label-sm">District</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    value={formData.location_district}
                    onChange={(e) => setFormData({...formData, location_district: e.target.value})}
                    required
                    className="input-field"
                    placeholder="Amritsar"
                  />
                  <MapPin className="input-icon" size={18} />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="label-sm">State</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    value={formData.location_state}
                    onChange={(e) => setFormData({...formData, location_state: e.target.value})}
                    required
                    className="input-field"
                    placeholder="Punjab"
                  />
                  <span className="input-icon">📍</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group mb-0">
                <label className="label-sm">Area (Hectares)</label>
                <div className="input-container">
                  <input 
                    type="number" 
                    value={formData.total_area_hectares}
                    onChange={(e) => setFormData({...formData, total_area_hectares: parseFloat(e.target.value)})}
                    required
                    className="input-field"
                  />
                  <Ruler className="input-icon" size={18} />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="label-sm">Primary Crop</label>
                <div className="input-container">
                  <select 
                    value={formData.primary_crop}
                    onChange={(e) => setFormData({...formData, primary_crop: e.target.value})}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option value="Wheat" className="bg-[#0d1321]">Wheat</option>
                    <option value="Rice" className="bg-[#0d1321]">Rice</option>
                    <option value="Cotton" className="bg-[#0d1321]">Cotton</option>
                    <option value="Sugarcane" className="bg-[#0d1321]">Sugarcane</option>
                  </select>
                  <Crop className="input-icon" size={18} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 group mt-4 h-14"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Complete Onboarding
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
