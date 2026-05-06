import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight, Loader2, Phone } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone_number: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(formData.email, formData.password);
      toast.success('Account created! Welcome.');
      navigate('/demo');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error('Registration failed. ' + (error.message || ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030a06] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Join the Ecosystem</h1>
          <p className="text-slate-400">Scale your farming with Autonomous Intelligence</p>
        </div>

        <GlassCard className="p-8 md:p-10">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group mb-0">
                <label className="label-sm">Full Name</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    required
                    className="input-field"
                    placeholder="Ayush Kumar"
                  />
                  <User className="input-icon" size={18} />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="label-sm">Phone Number</label>
                <div className="input-container">
                  <input 
                    type="tel" 
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                  <Phone className="input-icon" size={18} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label-sm">Email Address</label>
              <div className="input-container">
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="input-field"
                  placeholder="name@farm.com"
                />
                <Mail className="input-icon" size={18} />
              </div>
            </div>

            <div className="form-group">
              <label className="label-sm">Password</label>
              <div className="input-container">
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="input-field"
                  placeholder="Minimum 8 characters"
                />
                <Lock className="input-icon" size={18} />
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 my-6">
              <input type="checkbox" required className="mt-1 w-4 h-4 accent-emerald-500 rounded border-white/10" />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                I agree to the <a href="#" className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2">Terms of Service</a> and <a href="#" className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2">Privacy Policy</a>. Data will be processed in compliance with India's DPDP Act.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 group mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Register My Farm
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Already have a farm? <Link to="/login" className="text-emerald-400 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
