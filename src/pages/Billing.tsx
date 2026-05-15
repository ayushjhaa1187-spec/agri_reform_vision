import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Zap, Check, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Target to achieve: Use explicit environment value, fallback to empty string for relative paths in production
const API_URL = import.meta.env.VITE_API_URL || '';

if (!import.meta.env.VITE_API_URL && !import.meta.env.DEV) {
  console.error('CRITICAL: VITE_API_URL is not defined. Production billing features will fail.');
}

interface Plan {
  id: string;
  name: string;
  price_inr: number;
  features: string[];
  monthly_credits: number;
}

interface UserProfile {
  email: string;
  role: string;
  ai_credits: number;
  subscription_tier: string;
}

export default function Billing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (API_URL === '' && import.meta.env.DEV) {
          console.warn('VITE_API_URL is missing in development. Defaulting to proxy or relative paths.');
        }

        // Target to achieve: Synchronized data fetching
        const [plansRes, profileRes] = await Promise.all([
          axios.get(`${API_URL}/billing/plans`),
          axios.get(`${API_URL}/users/me`)
        ]);

        setPlans(plansRes.data);
        setProfile(profileRes.data);
      } catch (error: any) {
        console.error('Failed to fetch billing data', error);
        if (error.response?.status === 401) {
          toast.error('Session expired. Please log in again.');
          logout();
          navigate('/login');
        } else {
          toast.error('Failed to load billing information.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [logout, navigate]);

  const handleCheckout = async (planId: string) => {
    setIsProcessing(planId);
    const toastId = toast.loading('Preparing checkout...');
    try {
      const response = await axios.post(`${API_URL}/billing/checkout`, { plan_id: planId });
      const { checkout_url } = response.data;
      
      // Target to achieve: Branching between external URLs and mock paths
      if (checkout_url && checkout_url.startsWith('http')) {
        toast.loading('Redirecting to secure checkout...', { id: toastId });
        window.location.href = checkout_url;
        return;
      }

      // Internal mock or relative redirect simulation
      toast.loading('Processing secure payment simulation...', { id: toastId });
      
      setTimeout(async () => {
        try {
            await axios.post(`${API_URL}/billing/simulate-success?plan_id=${planId}`);
            toast.success(`Successfully upgraded to ${planId}!`, { id: toastId });
            
            // Target to achieve: Profile refresh after purchase
            const profileRes = await axios.get(`${API_URL}/users/me`);
            setProfile(profileRes.data);
        } catch (e) {
            toast.error('Payment simulation failed.', { id: toastId });
        } finally {
             setIsProcessing(null);
        }
      }, 1500);

    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Checkout failed. Please try again.', { id: toastId });
      setIsProcessing(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030a06] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-[#030a06] min-h-screen text-white pt-24 pb-16">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Plans & Billing</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the right intelligence tier for your farm. Scale your autonomous capabilities.
          </p>
        </div>

        {/* Current Usage Overview */}
        {profile && (
          <div className="mb-16">
            <GlassCard className="p-8 border-emerald-500/20 bg-emerald-500/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Current Plan: <span className="text-emerald-400 capitalize">{profile.subscription_tier}</span></h2>
                  <p className="text-slate-400">Account: {profile.email}</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end gap-2 mb-1">
                    <Sparkles className="text-yellow-400" size={24} />
                    <span className="text-4xl font-black text-white">{profile.ai_credits}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Available AI Credits</div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrent = profile?.subscription_tier === plan.id;
            
            return (
              <GlassCard 
                key={plan.id} 
                className={`p-8 relative flex flex-col ${
                  plan.id === 'pro' ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] transform md:-translate-y-4' : 'border-white/10'
                }`}
              >
                {plan.id === 'pro' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">₹{plan.price_inr}</span>
                  <span className="text-slate-500">/mo</span>
                </div>
                
                <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-yellow-400" />
                    <span className="font-bold text-sm text-gray-300">Credits Included</span>
                  </div>
                  <span className="font-black text-white">{plan.monthly_credits}</span>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-500/20 rounded-full p-0.5">
                        <Check size={12} className="text-emerald-400" />
                      </div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={isCurrent || isProcessing !== null}
                  className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                    isCurrent 
                      ? 'bg-white/10 text-white/50 cursor-not-allowed border border-white/5'
                      : plan.id === 'pro'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {isProcessing === plan.id ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : (
                    <>
                      {plan.price_inr > 0 ? 'Upgrade Now' : 'Downgrade'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
