import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';
import AnimOverwhelmedFarmer from './ui/AnimOverwhelmedFarmer';

export default function ExecutiveSummary() {
  const benefits = [
    {
      icon: '📊',
      title: 'Reduced Crop Loss',
      description: 'Predictive analytics identify risks before they impact yield, enabling preventive action.',
      color: '#10b981',
      borderColor: 'border-emerald-500/20',
      bgColor: 'from-emerald-950/30 to-emerald-900/10',
    },
    {
      icon: '💰',
      title: 'Increased ROI',
      description: 'Optimized resource allocation and market timing maximize financial returns.',
      color: '#3b82f6',
      borderColor: 'border-blue-500/20',
      bgColor: 'from-blue-950/30 to-blue-900/10',
    },
    {
      icon: '🤖',
      title: 'Autonomous Decisions',
      description: 'AI agents continuously analyze and act without requiring constant human intervention.',
      color: '#a855f7',
      borderColor: 'border-purple-500/20',
      bgColor: 'from-purple-950/30 to-purple-900/10',
    },
  ];

  return (
    <>
      <div className="section-separator"></div>
      <section id="problem" className="py-24 md:py-32 bg-[var(--bg-primary)] relative overflow-hidden">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-[var(--border-accent)] text-[var(--text-accent)] bg-[var(--accent-green-glow)] mb-6">
                Executive Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tight">
                The Future of Precision{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  Agriculture
                </span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                Agri-Intelligence solves the critical problem of cognitive overload in farming by automating complex decision-making through AI collaboration.
              </p>
            </div>
          </FadeInSection>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Content */}
            <div className="space-y-12">
              <FadeInSection delay={0.1}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-inner">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                    The Problem
                  </h3>
                </div>
                <div className="inline-block mb-6">
                  <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                    Fragmented &middot; Reactive &middot; Inefficient
                  </span>
                </div>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl font-medium">
                  Farmers rely on fragmented data—weather forecasts, soil tests, and market prices—and struggle to synthesize this information in real-time. The cognitive load leads to inefficiencies, resource waste, and lower yields.
                </p>
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-green-glow)] flex items-center justify-center border border-[var(--border-accent)] shadow-lg shadow-emerald-950/20">
                    <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                    Our Solution
                  </h3>
                </div>
                <div className="inline-block mb-6">
                  <span className="px-3 py-1 bg-[var(--accent-green-glow)] border border-[var(--border-accent)] text-[var(--text-accent)] text-[10px] font-black uppercase tracking-widest rounded-lg">
                    Autonomous &middot; Unified &middot; Continuous
                  </span>
                </div>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl font-medium">
                  Agri-Intelligence deploys a network of specialized AI agents that negotiate and collaborate to make optimized decisions. By integrating environmental data, predictive ML models, and market APIs, the system autonomously manages irrigation, predicts yields, and optimizes logistics.
                </p>
              </FadeInSection>
            </div>

            {/* Right Visual */}
            <FadeInSection delay={0.3}>
              <div className="relative flex flex-col items-center justify-center group">
                <div className="absolute -inset-10 bg-red-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <AnimOverwhelmedFarmer />
                <div className="mt-8 text-center relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-red-500/30 text-red-400 bg-red-500/10 mb-4 shadow-xl">
                    Reactive Farming Cycle
                  </span>
                  <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">
                    Cognitive Overload &middot; Data Fragmentation
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Benefits Cards */}
          <FadeInSection delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <GlassCard
                  key={benefit.title}
                  className={`relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 border-[var(--border-subtle)] bg-[var(--bg-surface)]`}>
                  <div className="p-8 h-full flex flex-col group-hover:scale-105 transition-transform duration-500">
                    <div className={`w-16 h-16 rounded-2xl ${benefit.bgColor} border ${benefit.borderColor} flex items-center justify-center text-3xl mb-8 shadow-2xl group-hover:rotate-6 transition-all duration-700`}>
                      {benefit.icon}
                    </div>
                    <h4 className="text-lg font-black text-[var(--text-primary)] mb-4 uppercase tracking-wider group-hover:text-[var(--accent-green)] transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 font-medium group-hover:text-[var(--text-primary)] transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                  {/* Animated border glow */}
                  <div
                    className={`absolute inset-0 border-2 ${benefit.borderColor} rounded-2xl pointer-events-none transition-opacity opacity-40 group-hover:opacity-100`} />
                </GlassCard>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
