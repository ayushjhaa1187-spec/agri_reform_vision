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
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Farm Onboarding</h2>
          <p className="text-slate-400">Initialize your digital twin for autonomous management</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Farm Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                placeholder="Golden Acres"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">District</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    value={formData.location_district}
                    onChange={(e) => setFormData({...formData, location_district: e.target.value})}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                    placeholder="Amritsar"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">State</label>
                <input 
                  type="text" 
                  value={formData.location_state}
                  onChange={(e) => setFormData({...formData, location_state: e.target.value})}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="Punjab"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Area (Hectares)</label>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="number" 
                    value={formData.total_area_hectares}
                    onChange={(e) => setFormData({...formData, total_area_hectares: parseFloat(e.target.value)})}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Primary Crop</label>
                <div className="relative">
                  <Crop className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <select 
                    value={formData.primary_crop}
                    onChange={(e) => setFormData({...formData, primary_crop: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm appearance-none"
                  >
                    <option value="Wheat" className="bg-[#0d1321]">Wheat</option>
                    <option value="Rice" className="bg-[#0d1321]">Rice</option>
                    <option value="Cotton" className="bg-[#0d1321]">Cotton</option>
                    <option value="Sugarcane" className="bg-[#0d1321]">Sugarcane</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 group"
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
