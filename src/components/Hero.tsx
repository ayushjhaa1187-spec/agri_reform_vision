interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-emerald-200 text-sm font-medium">Empowering the Farming Sector with Autonomous AI</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Agri-<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-emerald-100/90 mb-4 font-light">
          Autonomous Multi-Agent Farming Ecosystem
        </p>

        {/* Tagline */}
        <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Four specialized AI agents perceive, <span className="text-emerald-300 font-semibold">negotiate</span>, and execute optimal farm actions every 15 minutes — replacing cognitive overload with continuous, explainable autonomy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => onNavigate('architecture')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
          >
            Explore Architecture
          </button>
          <button
            onClick={() => onNavigate('negotiation')}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            See Negotiation Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '15 min', label: 'Decision Loop' },
            { value: '≥85%', label: 'ML Accuracy' },
            { value: '4', label: 'AI Agents' },
            { value: '24/7', label: 'Autonomous Ops' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-emerald-200/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Organization Badge */}
        <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <span className="text-emerald-100 text-sm">Prepared by</span>
            <div className="text-white font-semibold">Ayush Kumar Jha</div>
            <div className="text-emerald-300 text-xs">IIT MADRAS · May 4, 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
