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
              Workflows
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Decision-Making</span> in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              See how our multi-agent system processes real-world farming scenarios from data ingestion to autonomous action.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {workflows.map((workflow, index) => (
              <TiltCard key={index} className="overflow-hidden rounded-2xl p-0 glass-card">
                {/* Header */}
                <div className={`bg-gradient-to-r ${workflow.gradient} border-b border-[var(--border-subtle)] p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{workflow.icon}</span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{workflow.title}</h3>
                  </div>
                  <workflow.Animation />
                </div>

              {/* Steps */}
              <div className="p-6 bg-white/[0.02]">
                <div className="space-y-4">
                  {workflow.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border border-white/[0.05]"
                        style={{ backgroundColor: `${workflow.color}20`, color: workflow.color }}
                      >
                        {step.num}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-300">{step.title}</div>
                        <div className="text-slate-500 text-sm leading-relaxed">{step.desc}</div>
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
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-3">Complete Decision Loop</h3>
              <p className="text-slate-400">End-to-end autonomous farming decision cycle</p>
            </div>

            <div className="relative">
              {/* Circular Flow */}
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                {[
                  { icon: '📡', label: 'Data Collection', desc: 'Sensors + APIs' },
                  { icon: '🧠', label: 'ML Processing', desc: 'Risk Predictions' },
                  { icon: '🤖', label: 'Agent Analysis', desc: 'Multi-Agent Review' },
                  { icon: '🤝', label: 'Negotiation', desc: 'Conflict Resolution' },
                  { icon: '✅', label: 'Decision', desc: 'Consensus Reached' },
                  { icon: '⚡', label: 'Action', desc: 'Autonomous Execution' },
                  { icon: '📊', label: 'Logging', desc: 'Audit Trail' }
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center z-10">
                    <div className="w-16 h-16 bg-white/[0.05] border border-white/[0.1] rounded-2xl flex items-center justify-center shadow-lg shadow-black/50 mb-3 hover:bg-white/[0.1] transition-colors">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div className="text-slate-200 font-semibold text-sm">{step.label}</div>
                    <div className="text-slate-500 text-xs">{step.desc}</div>
                  </div>
                ))}
              </div>

              {/* Connection Lines (Desktop) */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 z-0"></div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '< 5 sec', label: 'Decision Time', icon: '⏱️' },
                { value: '24/7', label: 'Monitoring', icon: '🔄' },
                { value: '85%+', label: 'ML Accuracy', icon: '📈' },
                { value: '95%', label: 'System Uptime', icon: '✅' }
              ].map((metric, index) => (
                <div key={index} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center hover:bg-white/[0.04] transition-colors">
                  <div className="text-2xl mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-emerald-400">{metric.value}</div>
                  <div className="text-slate-400 text-sm mt-1">{metric.label}</div>
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
