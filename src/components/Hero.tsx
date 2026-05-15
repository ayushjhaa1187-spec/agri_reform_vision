import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedNumber from './ui/AnimatedNumber';

const ThreeCanvas = lazy(() => import('./three/HeroCanvas'));

function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[#020617]" />
      
      {/* Cinematic Radial Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-orb" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-500/10 blur-[150px] rounded-full animate-orb" style={{ animationDelay: '-2s' }} />
      
      {/* Precision Grid */}
      <div className="absolute inset-0 grid-overlay opacity-[0.4]" />
      
      {/* Grain/Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  const stats = [
    { value: '15min', label: 'Decision Loop' },
    { value: '85%', label: 'ML Accuracy' },
    { value: '4', label: 'AI Agents' },
    { value: '24/7', label: 'Autonomous' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden selection:bg-emerald-500/30">
      <HeroBg />

      {/* 3D Visual Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ThreeCanvas />
        </Suspense>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/40 to-[#030712] z-10" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 pt-20 pb-12 flex flex-col items-center text-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 group"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 glass-panel rounded-full border border-white/10 hover:border-emerald-500/40 transition-colors duration-500 cursor-default">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/90 group-hover:text-emerald-400 transition-colors">
              Next-Gen Autonomous Agriculture
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <div className="mb-8 relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="heading-premium text-6xl md:text-8xl lg:text-[110px] text-white tracking-tighter"
          >
            Agri-<span className="neon-text italic font-serif text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">Intelligence</span>
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mt-4"
          />
        </div>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12"
        >
          A cinematic ecosystem of specialized AI agents that <span className="text-white font-medium">perceive, negotiate, and execute</span> optimal farm decisions in real-time.
        </motion.p>

        {/* Action Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 mb-20"
        >
          <button
            onClick={() => navigate('/architecture')}
            className="magnetic-trigger px-10 py-5 bg-white text-black font-black rounded-full hover:bg-emerald-400 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.15)] text-sm uppercase tracking-widest"
          >
            System Core
          </button>
          
          <button
            onClick={() => navigate('/demo')}
            className="px-10 py-5 glass-panel-interactive rounded-full text-white font-bold border border-white/10 hover:border-white/30 text-sm uppercase tracking-widest backdrop-blur-3xl"
          >
            Launch Command
          </button>
        </motion.div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md"
        >
          {stats.map((stat, index) => (
            <div key={index} className="p-8 bg-[#030712]/60 hover:bg-white/[0.02] transition-colors group cursor-default">
              <div className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Meta Info */}
      <div className="absolute bottom-10 left-10 hidden lg:block z-30">
        <div className="text-[10px] text-slate-600 font-mono tracking-widest rotate-[-90deg] origin-left uppercase">
          Autonomous.Ecosystem.2026
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 z-30">
        <div className="flex items-center gap-4 glass-panel px-5 py-3 rounded-2xl border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs shadow-lg shadow-emerald-900/20">
            🌱
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-tight">Ayush Kumar Jha</div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Lead Architect</div>
          </div>
        </div>
      </div>
    </section>
  );
}
