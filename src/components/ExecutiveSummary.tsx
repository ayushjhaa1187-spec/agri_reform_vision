import GlassCard from './ui/GlassCard';
import FadeInSection from './ui/FadeInSection';

export default function ExecutiveSummary() {
  const benefits = [
    {
      icon: '📊',
      title: 'Reduced Crop Loss',
      description: 'Predictive analytics identify risks before they impact yield, enabling preventive action.',
      color: '#10b981',
      borderColor: 'border-emerald-500/20',
      bgColor: 'from-emerald-950/30 to-emerald-900/10',
    },
    {
      icon: '💰',
      title: 'Increased ROI',
      description: 'Optimized resource allocation and market timing maximize financial returns.',
      color: '#3b82f6',
      borderColor: 'border-blue-500/20',
      bgColor: 'from-blue-950/30 to-blue-900/10',
    },
    {
      icon: '🤖',
      title: 'Autonomous Decisions',
      description: 'AI agents continuously analyze and act without requiring constant human intervention.',
      color: '#a855f7',
      borderColor: 'border-purple-500/20',
      bgColor: 'from-purple-950/30 to-purple-900/10',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Section Header */}
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
            Executive Summary
          </h2>
          <p className="text-2xl md:text-3xl font-light text-gray-300 max-w-3xl mx-auto">
            The Future of Precision{' '}
            <span className="font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Agriculture
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 mx-auto mt-8 rounded-full" />
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
      </FadeInSection>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left Content */}
        <div className="space-y-10">
          <FadeInSection delay={0.1}>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-4">
              The Problem
            </h3>
            <div className="inline-block mb-6">
              <span className="px-4 py-1.5 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-full">
                Fragmented · Reactive · Inefficient
              </span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              Farmers rely on fragmented data—weather forecasts, soil tests, and market prices—and struggle to synthesize this information in real-time. The cognitive load leads to inefficiencies, resource waste, and lower yields.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent mb-4">
              Our Solution
            </h3>
            <div className="inline-block mb-6">
              <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm rounded-full">
                Autonomous · Unified · Continuous
              </span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              Agri-Intelligence deploys a network of specialized AI agents that negotiate and collaborate to make optimized decisions. By integrating environmental data, predictive ML models, and market APIs, the system autonomously manages irrigation, predicts yields, and optimizes logistics.
            </p>
          </FadeInSection>
        </div>

        {/* Right Visual */}
        <FadeInSection delay={0.3}>
          <div className="relative space-y-6">
            <div className="text-center space-y-3 mb-8">
              <p className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Reactive Farming
              </p>
              <svg className="w-8 h-8 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Autonomous Intelligence
              </p>
            </div>
            {[
              ['Before', [
                { text: 'Manual data review', color: 'bg-red-400' },
                { text: 'Reactive decisions', color: 'bg-red-400' },
                { text: 'Resource waste', color: 'bg-red-400' },
                { text: 'Lower yields', color: 'bg-red-400' },
              ], 'red'],
              ['After', [
                { text: 'Autonomous AI analysis', color: 'bg-emerald-400' },
                { text: 'Proactive action', color: 'bg-emerald-400' },
                { text: 'Optimized resources', color: 'bg-emerald-400' },
                { text: 'Maximum yields', color: 'bg-emerald-400' },
              ], 'emerald']
            ].map(([label, items]: [string, { text: string; color: string }[], string]) => (
              <div
                key={label}
                className={`p-6 rounded-2xl border-2 transition-transform duration-300 hover:scale-[1.02] ${
                  label === 'Before'
                    ? 'border-red-500/30 bg-red-500/5'
                    : 'border-emerald-500/30 bg-emerald-500/10'
                }`}
              >
                <div className={`text-xl font-bold mb-4 ${label === 'Before' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {label as string}
                </div>
                <div className="space-y-3">
                  {(items as { text: string; color: string }[]).map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color} animate-pulse`} />
                      <span className="text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>

      {/* Benefits Cards */}
      <FadeInSection delay={0.4}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <GlassCard
              key={benefit.title}
              className={`relative overflow-hidden group hover:scale-[1.02] transition-all duration-500`}>
              <div className="p-8 h-full flex flex-col group-hover:scale-105 transition-transform duration-500">
                <div className={`w-16 h-16 rounded-2xl ${benefit.bgColor} flex items-center justify-center text-3xl mb-6 shadow-2xl group-hover:rotate-6 transition-transform duration-700`}>
                  {benefit.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-gray-300 leading-relaxed flex-1 group-hover:text-gray-200 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
              {/* Animated border glow */}
              <div
                className={`absolute inset-0 border-2 ${benefit.borderColor} rounded-2xl pointer-events-none transition-opacity opacity-40 group-hover:opacity-100`} />
            </GlassCard>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
