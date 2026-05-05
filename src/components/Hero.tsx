import { Suspense, lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.18),transparent_70%)]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60" />
      {/* Floating orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '0.75s' }} />
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  const stats = [
    { value: '15 min', label: 'Decision Loop' },
    { value: '\u226585%', label: 'ML Accuracy' },
    { value: '4', label: 'AI Agents' },
    { value: '24/7', label: 'Autonomous Ops' },
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-16">
      <HeroBg />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ThreeCanvas />
        </Suspense>
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1a] z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#0a0f1a]/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 py-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm font-semibold text-emerald-400 mb-8 border border-emerald-500/20"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Empowering the Farming Sector with Autonomous AI
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
        >
          Agri-<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          Autonomous Multi-Agent Farming Ecosystem
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Four specialized AI agents perceive,{' '}
          <span className="text-emerald-400 font-semibold">negotiate</span>, and execute optimal farm actions every 15 minutes — replacing cognitive overload with continuous, explainable autonomy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <button
            onClick={() => navigate('/architecture')}
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 text-base"
          >
            <span className="flex items-center gap-2">
              Explore Architecture
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => navigate('/agents')}
            className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm text-base hover:scale-105"
          >
            See Agent Arena
          </button>
          <a
            href="https://github.com/ayushjhaa1187-spec/agri_reform_vision"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-emerald-500/30 text-emerald-400 font-semibold rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 text-base hover:scale-105"
          >
            View Source
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>

      {/* Author Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute bottom-8 right-6 z-20 flex items-center gap-2 px-3 py-2 glass-card rounded-full"
      >
        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-xs">🌱</div>
        <div>
          <div className="text-xs font-semibold text-white">Ayush Kumar Jha</div>
          <div className="text-[10px] text-slate-500">IIT MADRAS · 2026</div>
        </div>
      </motion.div>
    </section>
  );
}
