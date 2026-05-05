import FadeInSection from './ui/FadeInSection';

const techs = [
  { name: 'React 18', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Redis', category: 'Streaming' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Gemini 1.5 Pro', category: 'AI Core' },
  { name: 'LangChain', category: 'Agentic framework' },
  { name: 'XGBoost', category: 'ML Models' },
  { name: 'FAISS', category: 'Vector DB' },
  { name: 'WebSockets', category: 'Real-time' },
  { name: 'Docker', category: 'DevOps' },
];

export default function TechStackSection() {
  return (
    <section id="tech" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
      <FadeInSection className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Cutting-Edge Tech Stack</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          We leverage the best tools in AI, streaming, and modern web development to deliver a robust, future-proof platform.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {techs.map((tech, idx) => (
          <FadeInSection key={tech.name} delay={idx * 0.05}>
            <div className="glass-card p-4 text-center group hover:bg-emerald-500/5 transition-all">
              <div className="text-white font-bold mb-1 group-hover:text-emerald-400 transition-colors">
                {tech.name}
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                {tech.category}
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
