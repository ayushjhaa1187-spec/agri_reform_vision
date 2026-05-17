import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';
import AnimIrrigation from './ui/AnimIrrigation';
import AnimDisease from './ui/AnimDisease';
import AnimHarvest from './ui/AnimHarvest';

export default function Workflows() {
  const { ref, isVisible } = useScrollReveal();

  const workflows = [
    {
      title: 'Irrigation Workflow',
      icon: '💧',
      color: '#3b82f6', // blue
      gradient: 'from-blue-500/20 to-blue-600/10',
      Animation: AnimIrrigation,
      steps: [
        { num: 1, title: 'Monitor Soil', desc: 'IoT sensors report moisture at 32%' },
        { num: 2, title: 'Check Weather', desc: 'OpenWeather API: 15% rain probability' },
        { num: 3, title: 'Agent Analysis', desc: 'Agronomist flags drought risk' },
        { num: 4, title: 'Cost Optimization', desc: 'Economist finds off-peak window' },
        { num: 5, title: 'Execute', desc: 'Irrigation scheduled for 2 AM' }
      ]
    },
    {
      title: 'Disease Prevention Workflow',
      icon: '🛡️',
      color: '#ef4444', // red
      gradient: 'from-red-500/20 to-red-600/10',
      Animation: AnimDisease,
      steps: [
        { num: 1, title: 'Environmental Scan', desc: 'Humidity 85%, Temp 28°C' },
        { num: 2, title: 'ML Risk Assessment', desc: 'XGBoost predicts 78% fungal risk' },
        { num: 3, title: 'Agent Alert', desc: 'Agronomist recommends fungicide' },
        { num: 4, title: 'Cost-Benefit', desc: 'Economist calculates ROI of prevention' },
        { num: 5, title: 'Action', desc: 'Preventive spray authorized' }
      ]
    },
    {
      title: 'Harvest Optimization Workflow',
      icon: '🌾',
      color: '#eab308', // yellow
      gradient: 'from-yellow-500/20 to-yellow-600/10',
      Animation: AnimHarvest,
      steps: [
        { num: 1, title: 'Maturity Detection', desc: 'Crop sensors indicate 95% maturity' },
        { num: 2, title: 'Market Analysis', desc: 'Prices trending up 12% this week' },
        { num: 3, title: 'Storage Check', desc: 'Warehouse at 60% capacity' },
        { num: 4, title: 'Logistics Plan', desc: 'Transport arranged for peak price day' },
        { num: 5, title: 'Harvest Schedule', desc: 'Coordinated harvest & dispatch' }
      ]
    }
  ];

  return (
    <>
      <div className="section-separator"></div>
      <section id="workflows" className="py-24 md:py-32 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6" ref={ref}>
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-blue-500/30 text-blue-400 bg-blue-500/10 mb-6">
              Core Workflows
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tight">
              Autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Decision-Making</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              See how our multi-agent system processes real-world farming scenarios from data ingestion to autonomous action.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {workflows.map((workflow, index) => (
              <TiltCard key={index} className="overflow-hidden rounded-[32px] p-0 glass-card border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                {/* Header */}
                <div className={`bg-gradient-to-r ${workflow.gradient} border-b border-white/[0.05] p-8`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shadow-inner border border-white/10">
                      {workflow.icon}
                    </div>
                    <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tight">{workflow.title}</h3>
                  </div>
                  <workflow.Animation />
                </div>

                {/* Steps */}
                <div className="p-8 bg-[var(--bg-elevated)]/50">
                  <div className="space-y-6">
                    {workflow.steps.map((step, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div 
                          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs border transition-transform duration-300 group-hover:scale-110 shadow-inner"
                          style={{ backgroundColor: `${workflow.color}15`, color: workflow.color, borderColor: `${workflow.color}30` }}
                        >
                          {step.num}
                        </div>
                        <div>
                          <div className="font-black text-[var(--text-primary)] text-sm uppercase tracking-wide mb-1">{step.title}</div>
                          <div className="text-[var(--text-secondary)] text-xs leading-relaxed font-medium">{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Detailed Flow Diagram */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-card rounded-[40px] p-8 md:p-16 border-[var(--border-default)] relative overflow-hidden bg-[var(--bg-surface)]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none opacity-20"></div>
              <div className="text-center mb-16 relative z-10">
                <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 uppercase tracking-tighter">Full Autonomy Loop</h3>
                <p className="text-[var(--text-secondary)] font-medium">The end-to-end intelligence cycle powered by decentralized agents.</p>
              </div>

              <div className="relative">
                {/* Circular Flow */}
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 relative z-10">
                  {[
                    { icon: '📡', label: 'Ingestion', desc: 'IoT Streams' },
                    { icon: '🧠', label: 'ML Logic', desc: 'XGBoost Risk' },
                    { icon: '🤖', label: 'Agents', desc: 'Expert Review' },
                    { icon: '🤝', label: 'Protocol', desc: 'Consensus' },
                    { icon: '✅', label: 'Decision', desc: 'Final Vector' },
                    { icon: '⚡', label: 'Action', desc: 'Execution' },
                    { icon: '📊', label: 'Audit', desc: 'Log Archive' }
                  ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                      <div className="w-16 h-16 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:bg-[var(--bg-surface)] group-hover:border-[var(--accent-green)] transition-all duration-500 group-hover:scale-110 shadow-inner">
                        <span className="text-2xl group-hover:rotate-6 transition-transform">{step.icon}</span>
                      </div>
                      <div className="text-[var(--text-primary)] font-black text-[10px] uppercase tracking-widest mb-1">{step.label}</div>
                      <div className="text-[var(--text-muted)] text-[9px] font-bold uppercase tracking-tighter">{step.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Connection Lines (Desktop) */}
                <div className="hidden md:block absolute top-8 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[var(--accent-green)]/20 to-transparent z-0"></div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 relative z-10">
                {[
                  { value: '< 5 sec', label: 'Inference Speed', icon: '⏱️' },
                  { value: '24/7', label: 'System Uptime', icon: '🔄' },
                  { value: '85%+', label: 'Model Confidence', icon: '📈' },
                  { value: 'Verified', label: 'Network Integrity', icon: '🛡️' }
                ].map((metric, index) => (
                  <div key={index} className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 text-center hover:bg-[var(--bg-surface)] hover:border-[var(--accent-green)] transition-all group shadow-inner">
                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{metric.icon}</div>
                    <div className="text-xl font-black text-[var(--accent-green)] tracking-tight">{metric.value}</div>
                    <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mt-2">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
