import FadeInSection from './ui/FadeInSection';
import GlassCard from './ui/GlassCard';

const agents = [
  {
    name: 'Agronomist',
    role: 'Biological Optimization',
    objective: 'Maximize crop health and soil sustainability while minimizing plant stress.',
    icon: '🌾',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30'
  },
  {
    name: 'Economist',
    role: 'Financial Strategy',
    objective: 'Minimize operational costs (energy, water, fertilizer) and maximize harvest ROI.',
    icon: '💰',
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30'
  },
  {
    name: 'Logistician',
    role: 'Operational Planning',
    objective: 'Ensure field readiness and coordinate harvest transport and labor efficiency.',
    icon: '🚛',
    color: 'orange',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30'
  },
  {
    name: 'Coordinator',
    role: 'Strategic Arbitration',
    objective: 'Resolve agent conflicts and synthesize a single, explainable master recommendation.',
    icon: '⚖️',
    color: 'blue',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-500/30'
  }
];

export default function AgentsSection() {
  return (
    <section id="agents" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
      <FadeInSection className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Multi-Agent Team</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Four specialist AI agents that deliberate, negotiate, and converge on the optimal decision for your farm.
        </p>
      </FadeInSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent, idx) => (
          <FadeInSection key={agent.name} delay={idx * 0.1}>
            <GlassCard className={`p-8 h-full flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-500 border ${agent.borderColor} hover:shadow-[0_0_40px_-5px_var(--glow-${agent.color})]`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative">
                <div className="text-5xl mb-6 bg-white/5 w-20 h-20 flex items-center justify-center rounded-2xl border border-white/10 group-hover:animate-pulse transition-all shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]">
                  {agent.icon}
                </div>
                <div className={`absolute -inset-2 bg-${agent.color}-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{agent.name}</h3>
              <div className={`text-[10px] uppercase tracking-widest font-black mb-6 text-${agent.color}-400 relative z-10`}>
                {agent.role}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                {agent.objective}
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/5 w-full relative z-10">
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-3">Core Metric</div>
                <div className="text-white font-mono text-xs">
                  {agent.name === 'Agronomist' ? 'Stress Index (0-10)' : 
                   agent.name === 'Economist' ? 'Cost/Yield Ratio' : 
                   agent.name === 'Logistician' ? 'Resource Flow (kg/h)' : 
                   'Conflict Entropy'}
                </div>
              </div>
            </GlassCard>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
