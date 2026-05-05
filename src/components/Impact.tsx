import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Impact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="impact" className="py-24 section-dark border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-blue-400 mb-4">
            Expected Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transforming Agriculture Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Agri-Intelligence delivers measurable benefits across efficiency, cost savings, and scalability.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className={`grid md:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '30%+', label: 'Resource Waste Reduction', icon: '💧', color: '#3b82f6' },
            { value: '25%+', label: 'Yield Improvement', icon: '📈', color: '#10b981' },
            { value: '40%+', label: 'Cost Optimization', icon: '💰', color: '#eab308' },
            { value: '90%+', label: 'Decision Accuracy', icon: '🎯', color: '#a855f7' }
          ].map((metric, index) => (
            <TiltCard key={index} className="p-8 text-center rounded-2xl">
              <div className="text-4xl mb-4">{metric.icon}</div>
              <div className="text-4xl font-bold mb-2" style={{ color: metric.color }}>{metric.value}</div>
              <div className="text-slate-400 font-medium">{metric.label}</div>
            </TiltCard>
          ))}
        </div>

        {/* Deliverables */}
        <div className={`mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold text-white text-center mb-10">Project Deliverables</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Live Dashboard',
                description: 'Interactive React.js interface displaying real-time farm status, agent decisions, and system actions.',
                features: ['Real-time data visualization', 'Agent decision logs', 'Historical analytics', 'Mobile responsive']
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Multi-Agent Backend',
                description: 'Active negotiation system with four specialized AI agents making autonomous decisions.',
                features: ['LangChain integration', 'Custom prompt engineering', 'Negotiation logic', 'Decision audit trail']
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Simulated Hardware Triggers',
                description: 'Mock IoT sensor data pipelines demonstrating real-world integration capabilities.',
                features: ['NPK sensor simulation', 'Moisture level data', 'Weather API integration', 'Trigger event logging']
              }
            ].map((deliverable, index) => (
              <TiltCard key={index} className="p-8 rounded-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
                  {deliverable.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{deliverable.title}</h4>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">{deliverable.description}</p>
                <ul className="space-y-2">
                  {deliverable.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Benefits Summary */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-card-glow rounded-3xl p-8 md:p-12 text-white bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
            <div className="text-center mb-10 relative z-10">
              <h3 className="text-2xl font-bold mb-3">Key Benefits</h3>
              <p className="text-emerald-400/70">How Agri-Intelligence transforms farming operations</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  title: 'Efficiency',
                  description: 'Automates complex daily farming decisions, reducing human error and freeing farmers to focus on strategic planning.',
                  icon: '⚡'
                },
                {
                  title: 'Cost Savings',
                  description: 'Optimizes resource usage (water, energy, fertilizers) based on dynamic pricing and real-time conditions.',
                  icon: '💵'
                },
                {
                  title: 'Scalability',
                  description: 'Software architecture easily adapts to real-world IoT sensors, providing a viable commercial product.',
                  icon: '📐'
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h4 className="text-xl font-bold mb-3 text-white">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
