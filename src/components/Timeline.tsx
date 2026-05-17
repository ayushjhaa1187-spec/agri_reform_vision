import TiltCard from './ui/TiltCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { motion } from 'framer-motion';

export default function Timeline() {
  const { ref, isVisible } = useScrollReveal();

  const phases = [
    {
      phase: 'Phase 1',
      days: 'Days 1–3',
      title: 'Architecture & Data Simulation',
      goal: 'Continuous data streams live',
      color: '#3b82f6', // blue
      gradient: 'from-blue-500/20 to-blue-600/10',
      tasks: [
        { task: 'Generate architecture Mermaid diagrams & API specs', tool: 'Gemini Web / ChatGPT Free' },
        { task: 'Write Python sensor simulator (soil, weather, market)', tool: 'Gemini' },
        { task: 'Set up PostgreSQL schema & Redis channels', tool: 'Cursor IDE / Codeium' },
        { task: 'Validate data flow (moisture, temp, prices streaming)', tool: 'Manual testing' }
      ],
      milestone: 'All data sources pushing to ingestion layer every 15 seconds'
    },
    {
      phase: 'Phase 2',
      days: 'Days 4–7',
      title: 'AI Core & ML Integration',
      goal: 'Multi-agent negotiation functioning with ML risk scores',
      color: '#a855f7', // purple
      gradient: 'from-purple-500/20 to-purple-600/10',
      tasks: [
        { task: 'Engineer agent prompts & LangChain logic', tool: 'Claude 3 Sonnet' },
        { task: 'Code agent classes (Agronomist, Economist, Logistician)', tool: 'Cursor IDE + Google AI Studio' },
        { task: 'Train XGBoost disease risk model on open dataset', tool: 'ChatGPT Data Analysis' },
        { task: 'Integrate ML risk score into coordinator context', tool: 'Claude 3' },
        { task: 'Test negotiation with 5 canned scenarios', tool: 'Cursor (manual debug)' }
      ],
      milestone: 'Agents reach consensus and output documented decisions'
    },
    {
      phase: 'Phase 3',
      days: 'Days 8–11',
      title: 'Backend & Dashboard',
      goal: 'Live interactive dashboard displaying autonomous actions',
      color: '#10b981', // emerald
      gradient: 'from-emerald-500/20 to-emerald-600/10',
      tasks: [
        { task: 'Build FastAPI endpoints, WebSocket broadcast', tool: 'Cursor IDE' },
        { task: 'Design dashboard layout & components', tool: 'v0 by Vercel' },
        { task: 'Connect WebSocket to agent log feed in React', tool: 'Claude 3' },
        { task: 'Implement action log viewer & hardware trigger sim', tool: 'Codeium' },
        { task: 'Ensure responsive design and smooth transitions', tool: 'Claude 3' }
      ],
      milestone: 'Dashboard renders real-time sensor data, agent conversation, and action history'
    },
    {
      phase: 'Phase 4',
      days: 'Days 12–14',
      title: 'Security, Testing & Demo Prep',
      goal: 'Polished prototype with rehearsed demo script',
      color: '#f97316', // orange
      gradient: 'from-orange-500/20 to-orange-600/10',
      tasks: [
        { task: 'Security review (SQL injection, API keys)', tool: 'Claude 3' },
        { task: 'Privacy middleware (anonymization)', tool: 'ChatGPT' },
        { task: 'End-to-end bug fixing (UI–API–agent chain)', tool: 'Cursor IDE Fix command' },
        { task: 'Write demo script highlighting irrigation conflict', tool: 'Gemini Web' },
        { task: 'Deploy via Docker on free cloud tier', tool: 'Cursor (Dockerfile + configs)' }
      ],
      milestone: 'Live public URL · Demo walkthrough rehearsed'
    }
  ];

  return (
    <>
      <div className="section-separator"></div>
      <section id="timeline" className="py-24 md:py-32 bg-[var(--bg-primary)] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6" ref={ref}>
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-indigo-500/30 text-indigo-400 bg-indigo-500/10 mb-6">
              Development Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Strategic Implementation Roadmap
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Every phase is optimized for rapid deployment and <span className="text-[var(--text-accent)] font-medium">scalable innovation</span> within the agricultural sector.
            </p>
          </div>

          {/* Phases Grid */}
          <div className={`grid md:grid-cols-2 gap-6 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {phases.map((phase, idx) => (
              <TiltCard key={idx} className="overflow-hidden rounded-2xl p-0 glass-card border-[var(--border-subtle)]">
                {/* Header */}
                <div className={`bg-gradient-to-r ${phase.gradient} p-6 border-b border-white/[0.05]`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[var(--text-primary)] opacity-70 text-[10px] font-black uppercase tracking-widest">{phase.phase}</div>
                      <h3 className="text-2xl font-black text-[var(--text-primary)] mt-1">{phase.title}</h3>
                    </div>
                    <span className="px-3 py-1 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap">
                      {phase.days}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                    <svg className="w-4 h-4 text-[var(--text-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Goal: {phase.goal}</span>
                  </div>
                </div>

                {/* Tasks Table */}
                <div className="p-6 bg-white/[0.01]">
                  <div className="space-y-4">
                    {phase.tasks.map((t, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/[0.05] last:border-0 last:pb-0">
                        <div 
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                          style={{ backgroundColor: `${phase.color}20`, color: phase.color, border: `1px solid ${phase.color}40` }}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[var(--text-primary)] text-sm font-semibold">{t.task}</div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <svg className="w-3 h-3 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{t.tool}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Milestone */}
                  <div className="mt-5 p-4 rounded-xl border" style={{ backgroundColor: `${phase.color}05`, borderColor: `${phase.color}20` }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10 text-xl shadow-inner">
                        🏁
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1" style={{ color: phase.color }}>Section Milestone</div>
                        <div className="text-xs font-bold text-[var(--text-primary)] leading-relaxed">{phase.milestone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Gantt Chart */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-card rounded-[32px] p-8 md:p-12 border-[var(--border-default)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
              <h3 className="text-2xl font-black text-[var(--text-primary)] text-center mb-10 relative z-10 uppercase tracking-tight">Sprint Timeline Overview</h3>

              <div className="space-y-6 relative z-10">
                {phases.map((phase, idx) => {
                  const widths = ['21.4%', '28.6%', '28.6%', '21.4%'];
                  const offsets = ['0%', '21.4%', '50%', '78.6%'];

                  return (
                    <div key={idx} className="flex items-center gap-6">
                      <div className="w-28 text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">{phase.phase}</div>
                      <div className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-full h-10 overflow-hidden relative shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isVisible ? widths[idx] : '0%' }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 + idx * 0.1 }}
                          className="h-full rounded-full flex items-center px-4 absolute shadow-lg"
                          style={{ left: offsets[idx], backgroundColor: phase.color }}
                        >
                          <span className="text-black text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{phase.days}</span>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8 text-[var(--text-muted)] text-[9px] font-black uppercase tracking-[0.2em] px-32 hidden md:flex relative z-10">
                <span>Start</span>
                <span>Day 4</span>
                <span>Day 8</span>
                <span>Day 12</span>
                <span>Launch</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
