import FadeInSection from './ui/FadeInSection';
import GlassCard from './ui/GlassCard';

export default function ProblemSolutionSection() {
  return (
    <section id="problem" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <FadeInSection>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            The Data-Decision <span className="text-emerald-400">Gap</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
            Modern farmers are overwhelmed with fragmented data from soil sensors, weather apps, and market feeds. The challenge isn't collecting data—it's <span className="text-white italic">synthesizing trade-offs</span> into one clear action.
          </p>
          <div className="space-y-4">
            {[
              "Disconnected monitoring tools",
              "Reactive instead of proactive response",
              "Invisible trade-offs (Cost vs Health)",
              "Opaque 'Black Box' decisions"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-gray-300">
                <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-[10px] text-red-400">✕</span>
                {item}
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <GlassCard className="p-8 md:p-12 relative overflow-hidden group border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
            <h3 className="text-2xl font-bold text-white mb-6">Our Solution</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Agri-Intelligence introduces an <span className="text-emerald-400 font-semibold">autonomous multi-agent ecosystem</span>. Specialists debate the context to provide one explainable recommendation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Unified Intel', icon: '🎯' },
                { title: 'Proactive Alert', icon: '⚡' },
                { title: 'ROI Optimized', icon: '📈' },
                { title: 'Explainable AI', icon: '🧠' }
              ].map((feature) => (
                <div key={feature.title} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-emerald-500/30 transition-all">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-semibold text-white">{feature.title}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeInSection>
      </div>
    </section>
  );
}
