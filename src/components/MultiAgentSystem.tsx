export default function MultiAgentSystem() {
  const agents = [
    {
      name: 'Agronomist Agent',
      icon: '🌱',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      objective: 'Maximize crop health and yield',
      responsibilities: [
        'Monitor soil moisture and NPK levels',
        'Assess disease and pest risk',
        'Optimize irrigation schedules',
        'Recommend fertilizer applications'
      ],
      decisionExample: '"Soil moisture at 35% with 10% rain probability. Recommend irrigation at off-peak hours."'
    },
    {
      name: 'Economist Agent',
      icon: '💰',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      objective: 'Minimize costs and maximize ROI',
      responsibilities: [
        'Track input costs (water, energy, fertilizer)',
        'Analyze market price trends',
        'Optimize harvest timing',
        'Calculate profit margins'
      ],
      decisionExample: '"Energy rates 40% lower at 2 AM. Delay irrigation to reduce operational costs."'
    },
    {
      name: 'Logistician Agent',
      icon: '🚚',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      objective: 'Optimize supply chain efficiency',
      responsibilities: [
        'Coordinate harvest scheduling',
        'Manage storage capacity',
        'Plan transportation logistics',
        'Optimize delivery routes'
      ],
      decisionExample: '"Storage at 80% capacity. Prioritize harvest of mature crops for immediate dispatch."'
    },
    {
      name: 'Master Coordinator',
      icon: '🎯',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      objective: 'Balance all agent priorities',
      responsibilities: [
        'Facilitate agent negotiations',
        'Resolve conflicting recommendations',
        'Execute final decisions',
        'Log all actions for audit'
      ],
      decisionExample: '"Agronomist recommends immediate irrigation. Economist suggests delay. Compromise: Irrigate at 2 AM."'
    }
  ];

  return (
    <section id="agents" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            Multi-Agent System
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Specialized AI Agents Working Together
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Each agent has a specific objective function. They negotiate and collaborate to reach optimal decisions that balance biological health, financial cost, and operational efficiency.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {agents.map((agent, index) => (
            <div key={index} className={`${agent.bgColor} rounded-2xl p-8 border ${agent.borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl">{agent.icon}</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${agent.textColor}`}>{agent.name}</h3>
                  <p className="text-slate-600 text-sm mt-1">{agent.objective}</p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Responsibilities</h4>
                <ul className="space-y-2">
                  {agent.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <svg className={`w-5 h-5 ${agent.textColor} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decision Example */}
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Example Decision</h4>
                <p className="text-slate-700 text-sm italic">"{agent.decisionExample}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Negotiation Flow */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">Agent Negotiation Process</h3>
            <p className="text-slate-400">How conflicting priorities are resolved through AI collaboration</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 items-center">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-white font-semibold text-sm">Data Input</div>
              <div className="text-slate-400 text-xs mt-1">Sensor & API data</div>
            </div>

            <div className="hidden md:flex justify-center">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-yellow-500/30">
                <span className="text-2xl">🤔</span>
              </div>
              <div className="text-white font-semibold text-sm">Agent Analysis</div>
              <div className="text-slate-400 text-xs mt-1">Individual assessments</div>
            </div>

            <div className="hidden md:flex justify-center">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <span className="text-2xl">💬</span>
              </div>
              <div className="text-white font-semibold text-sm">Negotiation</div>
              <div className="text-slate-400 text-xs mt-1">Conflict resolution</div>
            </div>

            <div className="hidden md:flex justify-center">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                <span className="text-2xl">✅</span>
              </div>
              <div className="text-white font-semibold text-sm">Consensus</div>
              <div className="text-slate-400 text-xs mt-1">Agreed decision</div>
            </div>

            <div className="hidden md:flex justify-center">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-white font-semibold text-sm">Execution</div>
              <div className="text-slate-400 text-xs mt-1">Autonomous action</div>
            </div>
          </div>

          {/* Example Scenario */}
          <div className="mt-10 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Real-World Scenario: Irrigation Decision
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-xl p-4">
                <div className="text-green-400 text-sm font-semibold mb-2">Agronomist Says:</div>
                <p className="text-slate-300 text-sm">"Soil moisture critical at 30%. Crop stress imminent. Immediate irrigation required."</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4">
                <div className="text-yellow-400 text-sm font-semibold mb-2">Economist Says:</div>
                <p className="text-slate-300 text-sm">"Peak energy rates now. Off-peak starts at 2 AM with 60% cost reduction."</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 md:col-span-3">
                <div className="text-purple-400 text-sm font-semibold mb-2">Master Coordinator Decides:</div>
                <p className="text-slate-300 text-sm">"Compromise: Schedule irrigation for 2 AM. Soil moisture threshold allows 4-hour delay. Crop health preserved with 60% cost savings."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
