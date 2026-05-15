import FadeInSection from './ui/FadeInSection';
import GlassCard from './ui/GlassCard';
import AnimatedNumber from './ui/AnimatedNumber';

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
    <section id="impact" className="py-28 md:py-36 section-dark border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <FadeInSection className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-blue-400 mb-6 border border-blue-500/20">
            Expected Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforming Agriculture Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Agri-Intelligence delivers measurable benefits across efficiency, cost savings, and scalability.
          </p>
        </FadeInSection>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div
                className={`relative p-6 rounded-2xl ${metric.bg} border ${metric.border} text-center group hover:scale-[1.03] transition-all duration-300 cursor-default`}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at center, ${metric.color}15, transparent 70%)` }}
                />
                <div className="relative">
                  <div className="text-3xl mb-3">{metric.icon}</div>
                  <div
                    className="text-3xl md:text-4xl font-black mb-2"
                    style={{ color: metric.color }}
                  >
                    <AnimatedNumber value={metric.value} />
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 font-medium leading-snug">{metric.label}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* SDG Goals + Scalability */}
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInSection direction="left" delay={0.1}>
            <GlassCard className="p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm">🌍</span>
                UN Sustainable Development Goals
              </h3>
              <ul className="space-y-4">
                {sdgGoals.map((goal, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{goal.icon}</span>
                    <span className="text-sm md:text-base text-slate-300 leading-relaxed">{goal.text}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.15}>
            <GlassCard className="p-8 rounded-2xl" glow>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm">🚀</span>
                Scalability Roadmap
              </h3>
              <div className="space-y-4">
                {[
                  { phase: 'Phase 1', label: 'Pilot: 1 farm, simulated IoT', status: 'Active', color: 'emerald' },
                  { phase: 'Phase 2', label: '50 farms, real sensor integration', status: 'Next', color: 'blue' },
                  { phase: 'Phase 3', label: 'District-level AI coordination', status: 'Planned', color: 'purple' },
                  { phase: 'Phase 4', label: 'National AgriOS platform', status: 'Vision', color: 'yellow' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : item.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : item.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    } whitespace-nowrap`}>{item.phase}</span>
                    <span className="text-sm text-slate-400 flex-1">{item.label}</span>
                    <span className={`text-xs font-medium ${
                      item.status === 'Active' ? 'text-emerald-400' : 'text-slate-500'
                    }`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
