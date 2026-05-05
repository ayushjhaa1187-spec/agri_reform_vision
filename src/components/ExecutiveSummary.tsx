import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';

export default function ExecutiveSummary() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Reduced Crop Loss',
      description: 'Predictive analytics identify risks before they impact yield, enabling preventive action.',
      color: '#10b981',
      borderColor: 'border-emerald-500/20',
      bgColor: 'from-emerald-950/30 to-emerald-900/10',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Increased ROI',
      description: 'Optimized resource allocation and market timing maximize financial returns.',
      color: '#3b82f6',
      borderColor: 'border-blue-500/20',
      bgColor: 'from-blue-950/30 to-blue-900/10',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Autonomous Decisions',
      description: 'AI agents continuously analyze and act without requiring constant human intervention.',
      color: '#a855f7',
      borderColor: 'border-purple-500/20',
      bgColor: 'from-purple-950/30 to-purple-900/10',
    },
  ];

  return (
    <section id="executive-summary" className="py-28 md:py-36 section-dark border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <FadeInSection className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-emerald-400 mb-6 border border-emerald-500/20">
            Executive Summary
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Future of Precision{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Agriculture
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Modern agriculture is plagued by reactive decision-making. Our solution transforms farming through autonomous AI.
          </p>
        </FadeInSection>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <FadeInSection direction="left" delay={0.1}>
            <div className="space-y-6">
              <GlassCard className="p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">The Problem</h3>
                    <p className="text-base text-slate-400 leading-relaxed">
                      Farmers rely on fragmented data—weather forecasts, soil tests, and market prices—and struggle to synthesize this information in real-time. The cognitive load leads to inefficiencies, resource waste, and lower yields.
                    </p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Our Solution</h3>
                    <p className="text-base text-slate-400 leading-relaxed">
                      Agri-Intelligence deploys a network of specialized AI agents that negotiate and collaborate to make optimized decisions. By integrating environmental data, predictive ML models, and market APIs, the system autonomously manages irrigation, predicts yields, and optimizes logistics.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </FadeInSection>

          {/* Right Visual */}
          <FadeInSection direction="right" delay={0.2}>
            <GlassCard className="p-8 rounded-2xl" glow>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Reactive → Proactive</h3>
                <p className="text-sm text-slate-400">AI-driven precision farming that thinks ahead</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['Before', ['Manual data review', 'Reactive decisions', 'Resource waste', 'Lower yields'], 'red'],
                  ['After', ['Autonomous AI analysis', 'Proactive action', 'Optimized resources', 'Maximum yields'], 'emerald']].map(([label, items, color]) => (
                  <div key={label as string} className={`p-4 rounded-xl ${color === 'red' ? 'bg-red-500/5 border border-red-500/20' : 'bg-emerald-500/5 border border-emerald-500/20'}`}>
                    <div className={`text-sm font-bold mb-3 ${color === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>{label as string}</div>
                    <ul className="space-y-2">
                      {(items as string[]).map((item) => (
                        <li key={item} className={`text-xs ${color === 'red' ? 'text-red-300/70' : 'text-emerald-300/70'} flex items-center gap-2`}>
                          <span className={`w-1 h-1 rounded-full ${color === 'red' ? 'bg-red-400' : 'bg-emerald-400'} flex-shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-400/20 rounded-full animate-pulse-slow" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-teal-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </GlassCard>
          </FadeInSection>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div
                className={`relative p-6 rounded-2xl bg-gradient-to-b ${benefit.bgColor} border ${benefit.borderColor} backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at center, ${benefit.color}20, transparent 70%)` }}
                />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                    style={{ backgroundColor: `${benefit.color}15`, borderColor: `${benefit.color}30` }}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
