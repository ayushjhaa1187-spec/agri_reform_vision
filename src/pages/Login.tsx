import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back, Farmer!');
      navigate('/demo'); 
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Signed in with Google!');
      navigate('/demo');
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenLogin = async () => {
    const token = "AdrTqXGZ3zh1bpRTxzKnD1SmQxr8G7F7cuTbgAqN-K3U3Io-q2hd_NXo9zlbAZNOumrzV5ed1kCXoVysxJN-WJ596JQDkwAOKkh7hPZi8rv77ngGN1Jg_zQGPpErxVBtmBuyI_2orjsmhd16TQb4DvI2mw";
    setIsLoading(true);
    try {
      await loginWithToken(token);
      navigate('/demo');
    } catch (error) {
       console.error('Token login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030a06] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">AgriIntelligence</h1>
          <p className="text-slate-400">Secure Farmer Login</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="name@farm.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 group"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Enter Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 bg-white/5 border border-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <button 
              onClick={handleTokenLogin}
              disabled={isLoading}
              className="w-full py-2 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold rounded-xl hover:bg-emerald-500/10 transition-all"
            >
              Login with Secure Phone Token
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? <Link to="/register" className="text-emerald-400 font-bold hover:underline">Register Farm</Link>
            </p>
          </div>
        </GlassCard>

        <div className="mt-8 flex justify-center gap-6">
           <Link to="/" className="text-xs text-gray-600 uppercase tracking-widest font-bold hover:text-gray-400 transition-colors">Back to Home</Link>
           <span className="text-gray-800">|</span>
           <a href="#" className="text-xs text-gray-600 uppercase tracking-widest font-bold hover:text-gray-400 transition-colors">Support</a>
        </div>
      </motion.div>
    </div>
  );
}
