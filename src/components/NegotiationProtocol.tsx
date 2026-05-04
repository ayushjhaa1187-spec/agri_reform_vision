import { useState, useEffect } from 'react';

interface Step {
  agent: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
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
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/40',
      message: 'Propose immediate full irrigation',
      detail: 'Soil moisture at 32% — crop stress moderate, disease risk low. Recommend full pump capacity now to prevent yield loss.'
    },
    {
      agent: 'Economist',
      emoji: '💰',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/40',
      message: 'Counter: Delay 6 hours to off-peak',
      detail: 'Energy in peak tariff until 14:00. Delaying saves ₹840. Rain forecast 65% in 42 hours could render irrigation unnecessary.'
    },
    {
      agent: 'Logistician',
      emoji: '🚚',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/40',
      message: 'Warning: Harvester access risk',
      detail: 'Full irrigation + possible rain pushes soil moisture above 55%, blocking harvester access. Harvest is in 3 days.'
    },
    {
      agent: 'Master Coordinator',
      emoji: '🎯',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/40',
      message: 'Apply priority matrix → consensus',
      detail: 'Weights: Health 0.45, Cost 0.35, Logistics 0.20. Consensus: Delay 6 hrs, use 40% pump capacity, monitor rain prob until 13:00.'
    },
    {
      agent: 'Final Decision',
      emoji: '⚡',
      color: 'text-emerald-300',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/40',
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
    <section id="negotiation" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-4">
            Live Negotiation Protocol
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            The Negotiation Loop in Action
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A real scenario: Soil moisture drops to 32% at 08:14. Watch how four agents resolve conflicting priorities into one explainable decision.
          </p>
        </div>

        {/* Context Banner */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-white font-semibold">Scenario Context</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Soil Moisture', value: '32%', sub: 'Below threshold' },
              { label: 'Energy Tariff', value: 'PEAK', sub: 'Until 14:00' },
              { label: 'Rain Forecast', value: '65%', sub: 'In 42 hours' },
              { label: 'Harvest Window', value: '3 days', sub: 'Scheduled' }
            ].map((ctx, i) => (
              <div key={i} className="bg-slate-900/50 rounded-lg p-3">
                <div className="text-slate-400 text-xs">{ctx.label}</div>
                <div className="text-white text-xl font-bold">{ctx.value}</div>
                <div className="text-slate-500 text-xs">{ctx.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Negotiation Chat */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Stream */}
          <div className="lg:col-span-2 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                <span className="text-white font-semibold">Agent Negotiation Feed</span>
                <span className="text-slate-500 text-xs">· LIVE</span>
              </div>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                {autoPlay ? '⏸ Pause' : '▶ Auto-Play'}
              </button>
            </div>

            <div className="p-6 space-y-3 min-h-[500px]">
              {steps.slice(0, activeStep + 1).map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-3 animate-fadeIn ${index === activeStep ? 'scale-100' : 'opacity-70'}`}
                  style={{ animation: 'fadeIn 0.5s ease-in' }}
                >
                  <div className={`flex-shrink-0 w-12 h-12 ${step.bgColor} ${step.borderColor} border-2 rounded-full flex items-center justify-center text-2xl`}>
                    {step.emoji}
                  </div>
                  <div className={`flex-1 ${step.bgColor} ${step.borderColor} border rounded-2xl rounded-tl-none p-4`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`font-semibold ${step.color}`}>{step.agent}</div>
                      <div className="text-slate-500 text-xs">Round {Math.min(index + 1, 2)} · 08:1{4 + index}</div>
                    </div>
                    <div className="text-white font-medium mb-2">{step.message}</div>
                    <div className="text-slate-300 text-sm">{step.detail}</div>
                  </div>
                </div>
              ))}

              {activeStep < steps.length - 1 && (
                <div className="flex gap-3 opacity-50">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                  <div className="text-slate-500 text-sm self-center">Next agent thinking...</div>
                </div>
              )}
            </div>

            {/* Step Controls */}
            <div className="px-6 py-4 border-t border-slate-700 bg-slate-900/50">
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveStep(i); setAutoPlay(false); }}
                    className={`flex-1 h-1.5 rounded-full transition-colors ${
                      i <= activeStep ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  ></button>
                ))}
              </div>
              <div className="text-slate-500 text-xs mt-2 text-center">
                Step {activeStep + 1} of {steps.length}
              </div>
            </div>
          </div>

          {/* Priority Matrix */}
          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                Priority Matrix
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Crop Health', weight: 0.45, color: 'bg-green-500' },
                  { label: 'Cost', weight: 0.35, color: 'bg-yellow-500' },
                  { label: 'Logistics', weight: 0.20, color: 'bg-blue-500' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-white font-semibold">{item.weight}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.weight * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Outcome
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Cost saved:</span>
                  <span className="text-emerald-400 font-bold">₹840</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Crop stress:</span>
                  <span className="text-emerald-400 font-bold">Negligible</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Harvest impact:</span>
                  <span className="text-emerald-400 font-bold">None</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Decision time:</span>
                  <span className="text-emerald-400 font-bold">&lt; 5 sec</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <h3 className="text-white font-semibold mb-3">Operating Modes</h3>
              <div className="space-y-2">
                {[
                  { mode: 'Fully Autonomous', desc: 'System acts directly', active: true },
                  { mode: 'Suggestion Only', desc: 'Farmer approves each action', active: false },
                  { mode: 'Manual Override', desc: 'Dashboard view only', active: false }
                ].map((m, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${m.active ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-slate-900/30 border-slate-700'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${m.active ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                      <span className={`text-sm font-medium ${m.active ? 'text-white' : 'text-slate-400'}`}>{m.mode}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 ml-4">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
