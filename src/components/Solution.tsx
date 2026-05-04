export default function Solution() {
  return (
    <section id="solution" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Our Solution
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            From Fragmented Data to Unified Intelligence
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Agri-Intelligence solves the critical problem of cognitive overload in farming by automating complex decision-making through AI collaboration.
          </p>
        </div>

        {/* Problem vs Solution Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Current State */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-800">Current State</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Farmers manually check multiple apps and dashboards',
                'Weather, soil, and market data exist in silos',
                'Split-second decisions require mental cross-referencing',
                'Human error leads to resource waste',
                'Reactive responses to problems after damage occurs',
                'No continuous monitoring or optimization'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 0L6 8.586l-.707-.707a1 1 0 00-1.414 1.414l1.414 1.414-1.414 1.414a1 1 0 001.414 1.414L6.586 12l1.293 1.293a1 1 0 001.414-1.414L8 10.586l1.293-1.293a1 1 0 000-1.414L8 7.293 8.707 8z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agri-Intelligence State */}
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-800">With Agri-Intelligence</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Unified dashboard displays all critical information',
                'AI agents synthesize data from all sources automatically',
                'Complex decisions computed in seconds',
                'Optimized resource usage reduces waste by 30%+',
                'Proactive alerts prevent problems before they occur',
                '24/7 continuous monitoring and optimization'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔄',
                title: 'Real-Time Integration',
                desc: 'Continuous data streams from weather APIs, IoT sensors, and market feeds'
              },
              {
                icon: '🤖',
                title: 'Multi-Agent AI',
                desc: 'Specialized agents with distinct objectives that negotiate optimal decisions'
              },
              {
                icon: '📊',
                title: 'Predictive ML',
                desc: 'XGBoost models predict disease risk and yield with 85%+ accuracy'
              },
              {
                icon: '📱',
                title: 'Interactive Dashboard',
                desc: 'Live visualization of agent decisions, actions, and farm status'
              },
              {
                icon: '⚡',
                title: 'Autonomous Actions',
                desc: 'System executes decisions without requiring constant human input'
              },
              {
                icon: '📈',
                title: 'ROI Optimization',
                desc: 'Balances crop health with cost efficiency for maximum returns'
              },
              {
                icon: '🔒',
                title: 'Audit Logging',
                desc: 'Complete decision trail for transparency and compliance'
              },
              {
                icon: '🌐',
                title: 'Scalable Architecture',
                desc: 'Easy adaptation to real IoT sensors for field deployment'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">Technical Implementation</h3>
            <p className="text-slate-400">Built with modern, scalable technologies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold">Frontend</h4>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• React.js with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Real-time WebSocket updates</li>
                <li>• Interactive data visualizations</li>
                <li>• Responsive mobile design</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold">Backend</h4>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• FastAPI for REST endpoints</li>
                <li>• LangChain for agent orchestration</li>
                <li>• PostgreSQL for data storage</li>
                <li>• Redis for caching & sessions</li>
                <li>• Celery for async tasks</li>
              </ul>
            </div>

            {/* AI/ML */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold">AI/ML Core</h4>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• LLM-based agent reasoning</li>
                <li>• XGBoost for predictions</li>
                <li>• Custom prompt engineering</li>
                <li>• Multi-agent negotiation logic</li>
                <li>• Open-source agricultural datasets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
