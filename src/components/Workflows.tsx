export default function Workflows() {
  const workflows = [
    {
      title: 'Irrigation Workflow',
      icon: '💧',
      color: 'blue',
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
      color: 'red',
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
      color: 'yellow',
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
    <section id="workflows" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Workflows
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Autonomous Decision-Making in Action
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            See how our multi-agent system processes real-world farming scenarios from data ingestion to autonomous action.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {workflows.map((workflow, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Header */}
              <div className={`bg-gradient-to-r from-${workflow.color}-500 to-${workflow.color}-600 p-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{workflow.icon}</span>
                  <h3 className="text-xl font-bold text-white">{workflow.title}</h3>
                </div>
              </div>

              {/* Steps */}
              <div className="p-6">
                <div className="space-y-4">
                  {workflow.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 bg-${workflow.color}-100 rounded-full flex items-center justify-center text-${workflow.color}-600 font-bold text-sm`}>
                        {step.num}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{step.title}</div>
                        <div className="text-slate-500 text-sm">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Flow Diagram */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12">
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
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="text-white font-semibold text-sm">{step.label}</div>
                  <div className="text-slate-400 text-xs">{step.desc}</div>
                </div>
              ))}
            </div>

            {/* Connection Lines (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '< 5 sec', label: 'Decision Time', icon: '⏱️' },
              { value: '24/7', label: 'Monitoring', icon: '🔄' },
              { value: '85%+', label: 'ML Accuracy', icon: '📈' },
              { value: '95%', label: 'System Uptime', icon: '✅' }
            ].map((metric, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
                <div className="text-2xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-emerald-400">{metric.value}</div>
                <div className="text-slate-400 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
