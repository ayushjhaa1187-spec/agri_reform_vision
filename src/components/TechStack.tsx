export default function TechStack() {
  const stack = [
    {
      category: 'AI / Agents',
      icon: '🧠',
      color: 'from-purple-500 to-pink-500',
      items: ['LangChain', 'LangGraph', 'OpenAI GPT-4o', 'Google Gemini']
    },
    {
      category: 'ML / Analytics',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
      items: ['XGBoost', 'Scikit-learn', 'Pandas', 'NumPy']
    },
    {
      category: 'Backend',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      items: ['FastAPI', 'Python 3.11', 'WebSockets', 'Redis Pub/Sub', 'SQLAlchemy']
    },
    {
      category: 'Database',
      icon: '🗄️',
      color: 'from-amber-500 to-orange-500',
      items: ['PostgreSQL (logs)', 'InfluxDB (time-series)']
    },
    {
      category: 'Frontend',
      icon: '🎨',
      color: 'from-rose-500 to-red-500',
      items: ['React.js 18', 'TailwindCSS', 'Recharts', 'Zustand', 'Framer Motion']
    },
    {
      category: 'Infrastructure',
      icon: '☁️',
      color: 'from-slate-500 to-gray-500',
      items: ['Docker', 'AWS/GCP (free tier)', 'Nginx']
    },
    {
      category: 'External APIs',
      icon: '🌐',
      color: 'from-teal-500 to-cyan-500',
      items: ['OpenWeather', 'Mock AgMarket']
    }
  ];

  return (
    <section id="tech-stack" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
            Technology Stack
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Built with Production-Grade Tools
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Every layer uses industry-standard, scalable technologies that translate seamlessly from prototype to enterprise-scale deployment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stack.map((s, i) => (
            <div key={i} className="group bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{s.category}</h3>
              <ul className="space-y-1.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
