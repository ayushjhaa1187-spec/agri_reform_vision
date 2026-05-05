import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal();

  const stack = [
    {
      category: 'AI / Agents',
      icon: '🧠',
      color: 'from-purple-500/20 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      items: ['LangChain', 'LangGraph', 'OpenAI GPT-4o', 'Google Gemini']
    },
    {
      category: 'ML / Analytics',
      icon: '📊',
      color: 'from-blue-500/20 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      items: ['XGBoost', 'Scikit-learn', 'Pandas', 'NumPy']
    },
    {
      category: 'Backend',
      icon: '⚙️',
      color: 'from-green-500/20 to-emerald-500/10',
      borderColor: 'border-green-500/30',
      items: ['FastAPI', 'Python 3.11', 'WebSockets', 'Redis Pub/Sub', 'SQLAlchemy']
    },
    {
      category: 'Database',
      icon: '🗄️',
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      items: ['PostgreSQL (logs)', 'InfluxDB (time-series)']
    },
    {
      category: 'Frontend',
      icon: '🎨',
      color: 'from-rose-500/20 to-red-500/10',
      borderColor: 'border-rose-500/30',
      items: ['React.js 18', 'TailwindCSS + Glassmorphism', 'Three.js / WebGL', 'Framer Motion']
    },
    {
      category: 'Infrastructure',
      icon: '☁️',
      color: 'from-slate-500/20 to-gray-500/10',
      borderColor: 'border-slate-500/30',
      items: ['Docker', 'AWS/GCP (free tier)', 'Nginx']
    },
    {
      category: 'External APIs',
      icon: '🌐',
      color: 'from-teal-500/20 to-cyan-500/10',
      borderColor: 'border-teal-500/30',
      items: ['OpenWeather', 'Mock AgMarket']
    }
  ];

  return (
    <section id="tech-stack" className="py-24 section-dark border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-semibold text-cyan-400 mb-4">
            Technology Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Production-Grade</span> Tools
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Every layer uses industry-standard, scalable technologies that translate seamlessly from prototype to enterprise-scale deployment.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stack.map((s, i) => (
            <TiltCard key={i} className={`p-6 rounded-2xl border ${s.borderColor}`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-2xl mb-4 border border-white/[0.05]`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{s.category}</h3>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-400/80 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
