import { Link } from 'react-router-dom';
import FadeInSection from './ui/FadeInSection';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full animate-orb" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-teal-500/5 blur-[80px] rounded-full animate-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full animate-orb" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <FadeInSection>
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-emerald-400 mb-6 border-emerald-500/20">
            Autonomous Multi-Agent Farming
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Agri-<span className="text-emerald-400 neon-text">Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Transforming agriculture from reactive monitoring to <span className="text-white font-medium">proactive, explainable AI decisions</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Connect
            </Link>
            <a href="#demo" className="px-8 py-4 glass-card hover:bg-white/5 text-white font-bold rounded-full transition-all hover:scale-105 border-white/10">
              Watch Demo
            </a>
          </div>
        </FadeInSection>

        {/* Stats reveal */}
        <FadeInSection delay={0.4} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'ML Accuracy', value: '85%+' },
            { label: 'System Uptime', value: '95%+' },
            { label: 'AI Agents', value: '4' },
            { label: 'Decision Speed', value: 'Real-time' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </FadeInSection>
      </div>
    </section>
  );
}
