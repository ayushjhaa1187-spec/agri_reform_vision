import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';
import AnimRelievedFarmer from './ui/AnimRelievedFarmer';

export default function Solution() {
  const currentState = [
    'Fragmented data across spreadsheets and apps',
    'Manual irrigation decisions — often too late',
    'No real-time market integration',
    'Reactive pest/disease management',
    'Supply chain delays and storage waste',
  ];

  const futureState = [
    'Unified sensor + weather + market data stream',
    'Autonomous irrigation triggers every 15 min',
    'Live AgMarket API with price optimization',
    'Predictive disease risk scoring via XGBoost',
    'AI-optimized logistics and cold-chain scheduling',
  ];

  const agentFlow = [
    { icon: '\ud83d\udce1', label: 'Sensor Data', color: 'emerald', desc: 'IoT + Weather' },
    { icon: '\ud83e\udd14', label: 'Agent Analysis', color: 'yellow', desc: 'Debate & Reason' },
    { icon: '\ud83d\udcac', label: 'Negotiation', color: 'purple', desc: '2-Round Protocol' },
    { icon: '\u2705', label: 'Consensus', color: 'blue', desc: 'Weighted Vote' },
    { icon: '\u26a1', label: 'Execution', color: 'emerald', desc: 'Actuator Command' },
  ];

  return (
    <>
      <div className="section-separator"></div>
      <section id="solution" className="py-24 md:py-32 bg-[var(--bg-primary)] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-[var(--border-accent)] text-[var(--text-accent)] bg-[var(--accent-green-glow)] mb-6">
              The Resolution
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6">
              From Fragmented Data to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Unified Intelligence
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Agri-Intelligence solves the critical problem of cognitive overload in farming by automating complex decision-making through AI collaboration.
            </p>
          </div>

          {/* Problem vs Solution Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <FadeInSection direction="left" delay={0.1}>
              <GlassCard className="p-8 rounded-[32px] h-full bg-red-500/[0.02] border-red-500/10 hover:border-red-500/30 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-inner">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">Current State</h3>
                </div>
                <ul className="space-y-5">
                  {currentState.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      </span>
                      <span className="text-sm md:text-base text-[var(--text-secondary)] font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.15}>
              <GlassCard className="p-8 rounded-[32px] h-full border-[var(--border-accent)] bg-[var(--accent-green-glow)]/20" glow>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-green-glow)] flex items-center justify-center border border-[var(--border-accent)] shadow-lg shadow-emerald-950/40">
                    <svg className="w-6 h-6 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">Agri-Intelligence</h3>
                </div>
                <div className="mb-10 flex justify-center scale-90 md:scale-100">
                  <AnimRelievedFarmer />
                </div>
                <ul className="space-y-5">
                  {futureState.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-5 h-5 rounded-full bg-[var(--accent-green-glow)] border border-[var(--border-accent)] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                        <span className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full animate-pulse" />
                      </span>
                      <span className="text-sm md:text-base text-[var(--text-primary)] font-semibold leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInSection>
          </div>

          {/* Agent Flow */}
          <FadeInSection delay={0.2}>
            <div className="glass-card rounded-[32px] p-8 md:p-12 border-[var(--border-default)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green-glow)] to-transparent pointer-events-none opacity-20"></div>
              <h3 className="text-2xl font-black text-[var(--text-primary)] text-center mb-12 uppercase tracking-tight relative z-10">Autonomous Decision Flow</h3>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 relative z-10">
                {agentFlow.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 border transition-all duration-500 group-hover:scale-110 shadow-xl ${
                        step.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 shadow-emerald-950/20'
                        : step.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30 shadow-yellow-950/20'
                        : step.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30 shadow-purple-950/20'
                        : 'bg-blue-500/10 border-blue-500/30 shadow-blue-950/20'
                      }`}>
                        {step.icon}
                      </div>
                      <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">{step.label}</span>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-1.5">{step.desc}</span>
                    </div>
                    {i < agentFlow.length - 1 && (
                      <div className="hidden md:flex items-center mx-6 opacity-30">
                        <svg className="w-8 h-8 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] text-center mt-12 relative z-10 opacity-60">Closed-loop continuous learning &middot; Cycles every 15 minutes</p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
