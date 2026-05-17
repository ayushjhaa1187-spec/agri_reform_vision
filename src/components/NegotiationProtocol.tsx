import { useState, useEffect } from 'react';

interface Step {
  agent: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  leftBorder: string;
  message: string;
  detail: string;
}

export default function NegotiationProtocol() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const steps: Step[] = [
    {
      agent: 'Agronomist',
      emoji: '🌱',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      leftBorder: 'border-l-emerald-500',
      message: 'Propose immediate full irrigation',
      detail: 'Soil moisture at 32% — crop stress moderate, disease risk low. Recommend full pump capacity now to prevent yield loss.'
    },
    {
      agent: 'Economist',
      emoji: '💰',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      leftBorder: 'border-l-yellow-500',
      message: 'Counter: Delay 6 hours to off-peak',
      detail: 'Energy in peak tariff until 14:00. Delaying saves ₹840. Rain forecast 65% in 42 hours could render irrigation unnecessary.'
    },
    {
      agent: 'Logistician',
      emoji: '🚚',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      leftBorder: 'border-l-blue-500',
      message: 'Warning: Harvester access risk',
      detail: 'Full irrigation + possible rain pushes soil moisture above 55%, blocking harvester access. Harvest is in 3 days.'
    },
    {
      agent: 'Master Coordinator',
      emoji: '🎯',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      leftBorder: 'border-l-purple-500',
      message: 'Apply priority matrix → consensus',
      detail: 'Weights: Health 0.45, Cost 0.35, Logistics 0.20. Consensus: Delay 6 hrs, use 40% pump capacity, monitor rain prob until 13:00.'
    },
    {
      agent: 'Final Decision',
      emoji: '⚡',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      leftBorder: 'border-l-emerald-500',
      message: 'Execute: Pump 14:01 @ 40% capacity',
      detail: 'Cancel if rain probability >80% before 13:00. Estimated saving: ₹840 with negligible crop stress. Logged for audit.'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [autoPlay, steps.length]);

  return (
    <>
      <div className="section-separator"></div>
      <section id="negotiation" className="py-24 md:py-32 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-purple-500/30 text-purple-400 bg-purple-500/10 mb-6">
              Live Negotiation Protocol
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              The Negotiation Loop in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              A real scenario: Soil moisture drops to 32% at 08:14. Watch how four agents resolve conflicting priorities into one explainable decision.
            </p>
          </div>

          {/* Context Banner */}
          <div className="glass-card mb-10">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-[var(--text-primary)] font-bold tracking-wide uppercase text-sm">Scenario Context</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Soil Moisture', value: '32%', sub: 'Below threshold' },
                { label: 'Energy Tariff', value: 'PEAK', sub: 'Until 14:00' },
                { label: 'Rain Forecast', value: '65%', sub: 'In 42 hours' },
                { label: 'Harvest Window', value: '3 days', sub: 'Scheduled' }
              ].map((ctx, i) => (
                <div key={i} className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-4">
                  <div className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mb-1">{ctx.label}</div>
                  <div className="text-[var(--text-primary)] text-2xl font-black mb-1">{ctx.value}</div>
                  <div className="text-[var(--text-secondary)] text-xs font-medium">{ctx.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Negotiation Chat */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Stream */}
            <div className="lg:col-span-2 glass-card p-0 overflow-hidden flex flex-col">
              <div className="bg-[var(--bg-elevated)] px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></span>
                  <span className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wide">Agent Negotiation Feed</span>
                  <span className="text-[var(--text-muted)] text-[10px] font-black tracking-widest">· LIVE</span>
                </div>
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="text-xs font-bold px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-white/10 text-[var(--text-primary)] rounded-lg transition-colors border border-[var(--border-subtle)]"
                >
                  {autoPlay ? '⏸ Pause' : '▶ Auto-Play'}
                </button>
              </div>

              <div className="p-6 space-y-6 flex-1 min-h-[500px]">
                {steps.slice(0, activeStep + 1).map((step, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 animate-fadeIn ${index === activeStep ? 'scale-100 opacity-100' : 'opacity-60 grayscale-[30%]'}`}
                    style={{ transition: 'all 0.5s ease-out' }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 ${step.bgColor} ${step.borderColor} border-2 rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {step.emoji}
                    </div>
                    <div className={`flex-1 ${step.bgColor} ${step.borderColor} border-y border-r border-l-4 ${step.leftBorder} rounded-2xl rounded-tl-none p-5 shadow-md`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`font-black text-sm uppercase tracking-wider ${step.color}`}>{step.agent}</div>
                        <div className="text-[var(--text-muted)] text-[10px] font-bold">Round {Math.min(index + 1, 2)} · 08:1{4 + index}</div>
                      </div>
                      <div className="text-[var(--text-primary)] font-bold mb-3 text-lg leading-snug">{step.message}</div>
                      <div className="text-[var(--text-secondary)] text-sm leading-relaxed">{step.detail}</div>
                    </div>
                  </div>
                ))}

                {activeStep < steps.length - 1 && (
                  <div className="flex gap-4 opacity-50">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl flex items-center justify-center">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                    <div className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest self-center">Next agent thinking...</div>
                  </div>
                )}
              </div>

              {/* Step Controls */}
              <div className="px-6 py-5 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-2">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveStep(i); setAutoPlay(false); }}
                      className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                        i <= activeStep ? 'bg-[var(--accent-green)] shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    ></button>
                  ))}
                </div>
                <div className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mt-3 text-center">
                  Step {activeStep + 1} of {steps.length}
                </div>
              </div>
            </div>

            {/* Right Column Data Panels */}
            <div className="space-y-6">
              <div className="glass-card mb-0">
                <h3 className="text-[var(--text-primary)] font-bold text-sm tracking-wide uppercase mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Priority Matrix
                </h3>
                <div className="space-y-5">
                  {[
                    { label: 'Crop Health', weight: 0.45, color: 'bg-emerald-500', shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]' },
                    { label: 'Cost', weight: 0.35, color: 'bg-yellow-400', shadow: 'shadow-[0_0_10px_rgba(250,204,21,0.5)]' },
                    { label: 'Logistics', weight: 0.20, color: 'bg-blue-500', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]' }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="text-[var(--text-secondary)]">{item.label}</span>
                        <span className="text-[var(--text-primary)]">{item.weight}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full ${item.color} ${item.shadow} rounded-full transition-all duration-1000`} style={{ width: `${item.weight * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--accent-green-glow)] backdrop-blur-md rounded-2xl border border-[var(--border-accent)] p-6">
                <h3 className="text-[var(--text-primary)] font-bold text-sm tracking-wide uppercase mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Final Outcome
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-black/10">
                    <span className="text-[var(--text-secondary)] font-medium">Cost saved</span>
                    <span className="text-[var(--accent-green)] font-black text-lg">₹840</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-black/10">
                    <span className="text-[var(--text-secondary)] font-medium">Crop stress</span>
                    <span className="text-[var(--accent-green)] font-bold">Negligible</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-black/10">
                    <span className="text-[var(--text-secondary)] font-medium">Harvest impact</span>
                    <span className="text-[var(--accent-green)] font-bold">None</span>
                  </div>
                </div>
              </div>

              <div className="glass-card mb-0">
                <h3 className="text-[var(--text-primary)] font-bold text-sm tracking-wide uppercase mb-5">Operating Modes</h3>
                <div className="space-y-3">
                  {[
                    { mode: 'Fully Autonomous', desc: 'System acts directly', active: true },
                    { mode: 'Suggestion Only', desc: 'Farmer approves each action', active: false },
                    { mode: 'Manual Override', desc: 'Dashboard view only', active: false }
                  ].map((m, i) => (
                    <div key={i} className={`p-4 rounded-xl border transition-all ${m.active ? 'bg-[var(--accent-green-glow)] border-[var(--border-accent)]' : 'bg-white/5 border-white/5 opacity-60'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${m.active ? 'bg-[var(--accent-green)] shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-white/20'}`}></span>
                        <span className={`text-sm font-bold ${m.active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{m.mode}</span>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-1.5 ml-5">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
