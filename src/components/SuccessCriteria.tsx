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
      description: 'Operational budget stays under $200 using free tiers and pay-as-you-go optimization',
      metric: '$100–$200'
    }
  ];

  const budget = [
    { item: 'LLM API tokens', detail: 'Pay-as-you-go optimization', cost: '$50' },
    { item: 'Cloud hosting', detail: 'AWS/GCP free tier', cost: '$0' },
    { item: 'Domain & misc.', detail: 'Demo URL + extras', cost: '$50' }
  ];

  return (
    <>
      <div className="section-separator"></div>
      <section id="success" className="py-24 md:py-32 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-[var(--border-accent)] text-[var(--text-accent)] bg-[var(--accent-green-glow)] mb-6">
              System Success Metrics
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Operational Success Criteria
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Concrete, observable outcomes that prove the system works end-to-end in real-world farming environments.
            </p>
          </div>

          {/* Criteria Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {criteria.map((c, i) => (
              <div key={i} className="group glass-card hover:border-[var(--accent-green)] transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </div>
                  <span className="px-3 py-1 bg-[var(--accent-green-glow)] text-[var(--text-accent)] text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--border-accent)]">
                    {c.metric}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {c.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-card bg-[var(--bg-surface)] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green-glow)] to-transparent pointer-events-none opacity-20"></div>
            <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-[var(--border-subtle)] text-[var(--text-muted)] bg-[var(--bg-elevated)] mb-6">
                  Operational Budget
                </span>
                <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Scalable Operational Budget</h3>
                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                  The entire system is engineered to run on free tiers and optimized pay-as-you-go API models. Total operational cost stays minimal while delivering a production-grade infrastructure.
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-[var(--accent-green)]">$100</span>
                  <span className="text-[var(--text-muted)]">–</span>
                  <span className="text-5xl font-black text-[var(--accent-green)]">$200</span>
                </div>
                <div className="text-[var(--text-muted)] text-sm mt-3 uppercase tracking-widest font-bold">Total estimated cost</div>
              </div>

              <div className="space-y-3">
                {budget.map((b, i) => (
                  <div key={i} className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-[var(--border-subtle)] flex items-center justify-between shadow-inner">
                    <div>
                      <div className="text-[var(--text-primary)] font-bold">{b.item}</div>
                      <div className="text-[var(--text-muted)] text-[10px] uppercase font-black tracking-wider mt-1">{b.detail}</div>
                    </div>
                    <div className="text-2xl font-black text-[var(--accent-green)]">{b.cost}</div>
                  </div>
                ))}
                <div className="bg-[var(--accent-green)] rounded-xl p-5 flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <div className="text-black font-black uppercase tracking-widest text-sm">Projected Total</div>
                  <div className="text-3xl font-black text-black">~$100–200</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
