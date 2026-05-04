export default function ExecutiveSummary() {
  return (
    <section id="executive-summary" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Executive Summary
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            The Future of Precision Agriculture
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Modern agriculture is plagued by reactive decision-making. Our solution transforms farming through autonomous AI.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">The Problem</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Farmers rely on fragmented data—weather forecasts, soil tests, and market prices—and struggle to synthesize this information in real-time. The cognitive load of cross-referencing these leads to inefficiencies, resource waste, and lower yields.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Our Solution</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Agri-Intelligence utilizes a network of specialized AI agents that negotiate and collaborate to make optimized farm management decisions. By integrating simulated environmental data, predictive ML models, and dynamic market APIs, our system autonomously drafts irrigation schedules, predicts crop yields, and optimizes supply chain logistics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-2xl shadow-emerald-500/30">
              <div className="h-full flex flex-col items-center justify-center text-white">
                {/* Icon */}
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Reactive → Proactive</h3>
                <p className="text-emerald-100 text-center">
                  AI-driven precision farming that thinks ahead
                </p>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
              title: 'Reduced Crop Loss',
              description: 'Predictive analytics identify risks before they impact yield, enabling preventive action.',
              color: 'emerald'
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Increased ROI',
              description: 'Optimized resource allocation and market timing maximize financial returns.',
              color: 'blue'
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: 'Autonomous Decisions',
              description: 'AI agents continuously analyze and act without requiring constant human intervention.',
              color: 'purple'
            }
          ].map((benefit, index) => (
            <div key={index} className={`p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300`}>
              <div className={`w-12 h-12 bg-${benefit.color}-100 rounded-xl flex items-center justify-center mb-4 text-${benefit.color}-600`}>
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
