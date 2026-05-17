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
    <>
      <div className="section-separator"></div>
      <section id="tech-stack-summary" className="py-24 md:py-32 bg-[var(--bg-primary)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-cyan-500/30 text-cyan-400 bg-cyan-500/10 mb-6">
              Platform Backbone
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tight">Cutting-Edge Tech Stack</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              We leverage the best tools in AI, streaming, and modern web development to deliver a robust, future-proof platform.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techs.map((tech, idx) => (
              <FadeInSection key={tech.name} delay={idx * 0.05}>
                <div className="glass-card p-5 text-center group hover:bg-[var(--accent-green-glow)] transition-all border-[var(--border-subtle)] hover:border-[var(--accent-green)]">
                  <div className="text-[var(--text-primary)] font-black text-sm mb-1 group-hover:text-[var(--accent-green)] transition-colors uppercase tracking-tight">
                    {tech.name}
                  </div>
                  <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest font-black">
                    {tech.category}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
