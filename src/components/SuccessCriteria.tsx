export default function SuccessCriteria() {
  const criteria = [
    {
      icon: '📊',
      title: 'Live Dashboard Loads',
      description: 'Live soil moisture, weather, and agent status visible on initial render',
      metric: 'Real-time'
    },
    {
      icon: '💧',
      title: 'Autonomous Irrigation Negotiation',
      description: 'When soil moisture drops below 30%, three agents deliberate and a "Delay irrigation, 40% pump" decision appears',
      metric: '< 30% trigger'
    },
    {
      icon: '🛡️',
      title: 'Disease Risk Alert',
      description: 'Disease risk >80% triggers a preventive alert without human intervention',
      metric: '> 80% risk'
    },
    {
      icon: '📜',
      title: 'Full Negotiation Log',
      description: 'Complete reasoning visible and scrollable in the dashboard log viewer',
      metric: 'Auditable'
    },
    {
      icon: '⏱️',
      title: 'Stable 30-Min Run',
      description: 'System runs continuously for 30 minutes without crash during demo',
      metric: '30 min'
    },
    {
      icon: '💰',
      title: 'Cost Efficiency',
      description: 'Operational budget stays under $200 using free tiers and hackathon credits',
      metric: '$100–$200'
    }
  ];

  const budget = [
    { item: 'LLM API tokens', detail: 'Free tier + hackathon credits', cost: '$50' },
    { item: 'Cloud hosting', detail: 'AWS/GCP free tier', cost: '$0' },
    { item: 'Domain & misc.', detail: 'Demo URL + extras', cost: '$50' }
  ];

  return (
    <section id="success" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Demo Day Checklist
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Success Criteria for Final Demo
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Concrete, observable outcomes that prove the system works end-to-end during the hackathon evaluation.
          </p>
        </div>

        {/* Criteria Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {criteria.map((c, i) => (
            <div key={i} className="group bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl">
                  {c.icon}
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                  {c.metric}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {c.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>

        {/* Budget Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-4">
                Operational Budget
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">Lean Hackathon Budget</h3>
              <p className="text-slate-300 mb-6">
                The entire system is engineered to run on free tiers and generous hackathon API credits. Total operational cost stays minimal while delivering a production-grade prototype.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-emerald-400">$100</span>
                <span className="text-slate-400">–</span>
                <span className="text-5xl font-bold text-emerald-400">$200</span>
              </div>
              <div className="text-slate-400 text-sm mt-2">Total estimated cost</div>
            </div>

            <div className="space-y-3">
              {budget.map((b, i) => (
                <div key={i} className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{b.item}</div>
                    <div className="text-slate-400 text-xs">{b.detail}</div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">{b.cost}</div>
                </div>
              ))}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 flex items-center justify-between">
                <div className="text-white font-bold">Total</div>
                <div className="text-2xl font-bold text-white">~$100–200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
