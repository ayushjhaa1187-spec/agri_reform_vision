import { Suspense, lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './ui/MagneticButton';

const ThreeCanvas = lazy(() => import('./three/HeroCanvas'));

function CharRevealText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="char-reveal-wrapper">
          <span
            className="char-reveal"
            style={{ animationDelay: `${delay + i * 30}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

function StaticHeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#030a06] via-[#051a0e] to-[#04120d]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-overlay" />

      {/* 3D Canvas or fallback */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <Suspense fallback={<StaticHeroBg />}>
          <ThreeCanvas />
        </Suspense>
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030a06] via-transparent to-[#030a06]/50" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-full mb-10 animate-fadeIn">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-300/90 text-sm font-medium tracking-wide">
            Empowering the Farming Sector with Autonomous AI
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight">
          <CharRevealText text="Agri-" delay={200} />
          <CharRevealText
            text="Intelligence"
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 animate-gradient"
            delay={350}
          />
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-emerald-100/80 mb-3 font-light animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          Autonomous Multi-Agent Farming Ecosystem
        </p>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          Four specialized AI agents perceive, <span className="text-emerald-400 font-semibold">negotiate</span>, and execute optimal farm actions every 15 minutes — replacing cognitive overload with continuous, explainable autonomy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14 animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <MagneticButton
            onClick={() => navigate('/architecture')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            Explore Architecture
          </MagneticButton>
          <MagneticButton
            onClick={() => navigate('/agents')}
            className="px-8 py-4 glass-card text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            See Agent Arena
          </MagneticButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
          {[
            { value: '15 min', label: 'Decision Loop' },
            { value: '≥85%', label: 'ML Accuracy' },
            { value: '4', label: 'AI Agents' },
            { value: '24/7', label: 'Autonomous Ops' },
          ].map((stat, index) => (
            <div key={index} className="glass-card text-center p-4 rounded-xl">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Author Badge */}
        <div className="mt-14 flex items-center justify-center animate-fadeIn" style={{ animationDelay: '1.6s', animationFillMode: 'both' }}>
          <div className="glass-card px-5 py-3 rounded-xl">
            <span className="text-slate-500 text-sm">Prepared by</span>
            <div className="text-white font-semibold">Ayush Kumar Jha</div>
            <div className="text-emerald-400/70 text-xs">IIT MADRAS · 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
