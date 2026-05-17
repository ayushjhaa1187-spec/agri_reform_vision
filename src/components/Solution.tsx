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
    <section id="solution" className="py-28 md:py-36 section-darker border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <FadeInSection className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-emerald-400 mb-6 border border-emerald-500/20">
            Our Solution
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            From Fragmented Data to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Unified Intelligence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Agri-Intelligence solves the critical problem of cognitive overload in farming by automating complex decision-making through AI collaboration.
          </p>
        </FadeInSection>

        {/* Problem vs Solution Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <FadeInSection direction="left" delay={0.1}>
            <GlassCard className="p-8 rounded-2xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Current State</h3>
              </div>
              <ul className="space-y-4">
                {currentState.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                    </span>
                    <span className="text-sm md:text-base text-slate-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.15}>
            <GlassCard className="p-8 rounded-2xl h-full border-[var(--border-accent)]" glow>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-green-glow)] flex items-center justify-center border border-[var(--border-accent)]">
                  <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">With Agri-Intelligence</h3>
              </div>
              <div className="mb-8 flex justify-center">
                <AnimRelievedFarmer />
              </div>
              <ul className="space-y-4">
                {futureState.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    </span>
                    <span className="text-sm md:text-base text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>
        </div>

        {/* Agent Flow */}
        <FadeInSection delay={0.2}>
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-bold text-white text-center mb-8">Decision Flow Pipeline</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
              {agentFlow.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center group">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 border transition-all duration-300 group-hover:scale-110 ${
                      step.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 group-hover:bg-emerald-500/20'
                      : step.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30 group-hover:bg-yellow-500/20'
                      : step.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30 group-hover:bg-purple-500/20'
                      : 'bg-blue-500/10 border-blue-500/30 group-hover:bg-blue-500/20'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="text-xs font-semibold text-white text-center">{step.label}</span>
                    <span className="text-[10px] text-slate-500 text-center mt-0.5">{step.desc}</span>
                  </div>
                  {i < agentFlow.length - 1 && (
                    <div className="hidden md:flex items-center mx-3">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 text-center mt-6">Closed-loop continuous learning · Cycles every 15 minutes</p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
