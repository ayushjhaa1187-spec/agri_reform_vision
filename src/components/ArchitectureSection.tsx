import { useState } from 'react';
import FadeInSection from './ui/FadeInSection';

const layers = [
  {
    id: 'presentation',
    name: 'Layer 4: Presentation',
    tech: 'React.js, Tailwind, Framer Motion',
    description: 'High-fidelity dashboard with real-time agent decision logs and interactive field maps.',
    icon: '💻'
  },
  {
    id: 'execution',
    name: 'Layer 3: Execution',
    tech: 'FastAPI, Redis, WebSockets, PostgreSQL',
    description: 'Scalable backend handling real-time streams, API routing, and system orchestration.',
    icon: '⚙️'
  },
  {
    id: 'core',
    name: 'Layer 2: Multi-Agent Core',
    tech: 'LangChain, LangGraph, Gemini 1.5 Pro',
    description: 'The reasoning engine where specialist agents debate and resolve farm trade-offs.',
    icon: '🧠'
  },
  {
    id: 'intelligence',
    name: 'Layer 1: Intelligence',
    tech: 'XGBoost, LightGBM, FAISS Vector DB',
    description: 'ML models for disease prediction and RAG pipelines for agricultural knowledge retrieval.',
    icon: '📊'
  },
  {
    id: 'data',
    name: 'Layer 0: Ingestion',
    tech: 'SoilGrids API, OpenWeather, IoT Sim',
    description: 'Continuous collection of multi-source environmental and market telemetry.',
    icon: '📡'
  }
];

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<string | null>('core');

  return (
    <section id="architecture" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
      <FadeInSection className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">System Architecture</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A robust five-layer stack built for real-time intelligence and autonomous farm management.
        </p>
      </FadeInSection>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-4">
          {layers.map((layer) => (
            <div
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`glass-card p-6 cursor-pointer transition-all duration-500 group ${
                activeLayer === layer.id ? 'border-emerald-500/50 bg-emerald-500/5' : 'hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{layer.icon}</span>
                  <h3 className={`font-bold transition-colors ${activeLayer === layer.id ? 'text-emerald-400' : 'text-white'}`}>
                    {layer.name}
                  </h3>
                </div>
                <div className={`text-xs px-2 py-1 rounded bg-white/5 border border-white/10 font-mono ${activeLayer === layer.id ? 'text-emerald-300' : 'text-gray-500'}`}>
                  {layer.tech.split(',')[0]}
                </div>
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 ${activeLayer === layer.id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {layer.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.tech.split(', ').map(t => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 sticky top-32">
          <div className="glass-card aspect-square flex items-center justify-center p-12 bg-emerald-500/[0.02]">
            <div className="relative w-full h-full flex flex-col justify-between items-center py-8">
              {layers.map((layer, idx) => (
                <div 
                  key={layer.id}
                  className={`w-full h-12 rounded-xl border flex items-center justify-center transition-all duration-700 ${
                    activeLayer === layer.id 
                      ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110 z-10' 
                      : 'bg-white/5 border-white/10 opacity-40 scale-90'
                  }`}
                  style={{ transform: `perspective(1000px) rotateX(45deg) translateY(${idx * 10}px)` }}
                >
                  <span className="text-white font-mono text-[10px] tracking-tighter uppercase font-bold">
                    {layer.id.toUpperCase()}
                  </span>
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent blur-3xl -z-10 opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
