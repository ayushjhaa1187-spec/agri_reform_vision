import FadeInSection from './ui/FadeInSection';
import GlassCard from './ui/GlassCard';
import AnimatedNumber from './ui/AnimatedNumber';
import ImpactBanner from './ui/ImpactBanner';

export default function Impact() {
  const metrics = [
    { value: '30%+', label: 'Resource Waste Reduction', icon: '\ud83d\udca7', color: '#3b82f6', border: 'border-blue-500/20', bg: 'bg-blue-500/5' },
    { value: '25%+', label: 'Yield Improvement', icon: '\ud83c\udf3e', color: '#10b981', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
    { value: '40%+', label: 'Cost Optimization', icon: '\ud83d\udcb0', color: '#eab308', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5' },
    { value: '90%+', label: 'Decision Accuracy', icon: '\ud83d\udd35', color: '#a855f7', border: 'border-purple-500/20', bg: 'bg-purple-500/5' },
  ];

  const sdgGoals = [
    { icon: '\ud83c\udf3e', text: 'SDG 2: Zero Hunger — Crop yield optimization' },
    { icon: '\ud83d\udca7', text: 'SDG 6: Clean Water — Precision irrigation' },
    { icon: '\u26a1', text: 'SDG 7: Affordable Energy — Off-peak automation' },
    { icon: '\ud83c\udf0d', text: 'SDG 13: Climate Action — Reduced waste' },
  ];

  return (
    <>
      <div className="section-separator"></div>
      <section id="impact" className="py-24 md:py-32 bg-[var(--bg-primary)] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-blue-500/30 text-blue-400 bg-blue-500/10 mb-6">
              Expected Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tight">
              Transforming Agriculture Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                AI
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Agri-Intelligence delivers measurable benefits across efficiency, cost savings, and scalability.
            </p>
          </div>

          <ImpactBanner />

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {metrics.map((metric, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div
                  className={`relative p-8 rounded-[32px] ${metric.bg} border ${metric.border} text-center group hover:scale-[1.03] transition-all duration-300 cursor-default shadow-lg overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(ellipse at center, ${metric.color}15, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{metric.icon}</div>
                    <div
                      className="text-3xl md:text-5xl font-black mb-2 tracking-tighter"
                      style={{ color: metric.color }}
                    >
                      <AnimatedNumber value={metric.value} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-muted)] leading-snug">{metric.label}</div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* SDG Goals + Scalability */}
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInSection direction="left" delay={0.1}>
              <GlassCard className="p-8 md:p-10 rounded-[40px] border-[var(--border-default)]">
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-8 flex items-center gap-4 uppercase tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl shadow-inner">🌍</div>
                  UN SDG Commitment
                </h3>
                <ul className="space-y-5">
                  {sdgGoals.map((goal, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{goal.icon}</span>
                      <span className="text-sm md:text-base text-[var(--text-secondary)] font-medium leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">{goal.text}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.15}>
              <GlassCard className="p-8 md:p-10 rounded-[40px] border-[var(--border-accent)] bg-[var(--accent-green-glow)]/10" glow>
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-8 flex items-center gap-4 uppercase tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner">🚀</div>
                  Scalability Roadmap
                </h3>
                <div className="space-y-5">
                  {[
                    { phase: 'Phase 1', label: 'Pilot: 1 farm, simulated IoT', status: 'Active', color: 'emerald' },
                    { phase: 'Phase 2', label: '50 farms, real sensor integration', status: 'Next', color: 'blue' },
                    { phase: 'Phase 3', label: 'District-level AI coordination', status: 'Planned', color: 'purple' },
                    { phase: 'Phase 4', label: 'National AgriOS platform', status: 'Vision', color: 'yellow' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-green)] transition-all">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-lg ${
                        item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-950/20'
                        : item.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-blue-950/20'
                        : item.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-purple-950/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-yellow-950/20'
                      } whitespace-nowrap uppercase tracking-widest`}>{item.phase}</span>
                      <span className="text-sm text-[var(--text-secondary)] font-medium flex-1">{item.label}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Active' ? 'text-[var(--accent-green)]' : 'text-[var(--text-muted)]'
                      }`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
}
