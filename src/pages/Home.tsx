import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [activePrePage, setActivePrePage] = useState('landing');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/demo');
    }
  }, [isAuthenticated, navigate]);

  const showPrePage = (id: string) => setActivePrePage(id);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const PreNav = () => (
    <nav className="fixed top-0 left-0 w-full px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-[var(--border)] flex justify-between items-center z-[100]">
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => showPrePage('landing')}>
        <span className="text-2xl group-hover:scale-110 transition-transform">🌾</span>
        <span className="text-[var(--teal)] font-extrabold text-xl tracking-widest uppercase">AGRI-INTELLIGENCE</span>
      </div>
      <div className="flex items-center gap-6">
        <button onClick={() => showPrePage('landing')} className="text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--teal)] transition-colors">Home</button>
        <button onClick={() => showPrePage('features')} className="text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--teal)] transition-colors">Features</button>
        <button onClick={() => showPrePage('pricing')} className="text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--teal)] transition-colors">Pricing</button>
        <button onClick={() => navigate('/login')} className="text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--teal)] transition-colors">Sign In</button>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/register')}>Get Started</button>
      </div>
    </nav>
  );

  const OceanWave = () => (
    <div className="ocean-wave">
      <div className="wave"></div>
    </div>
  );

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <PreNav />
      <div className="mt-[60px] h-[calc(100vh-60px)] overflow-y-auto">
        
        {/* Landing Page */}
        {activePrePage === 'landing' && (
          <div className="animate-fadeIn">
            <div className="text-center py-24 px-5">
              <h1 className="text-5xl md:text-6xl font-black mb-4">
                Agri-<span className="bg-gradient-to-br from-[#0D9488] to-[#3B82F6] bg-clip-text text-transparent">Intelligence</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] max-w-[600px] mx-auto mb-8 leading-relaxed">
                Autonomous multi‑agent AI that negotiates your farm’s next move — saving water, money, and crops.
              </p>
              <div className="flex gap-3 justify-center">
                <button className="btn btn-primary px-8 py-3" onClick={() => navigate('/register')}>Start Free Trial</button>
                <button className="btn btn-outline px-8 py-3" onClick={() => scrollToSection('how')}>How It Works</button>
              </div>
            </div>
            
            <div id="how" className="max-w-[1000px] mx-auto px-5 py-16">
              <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 text-center">
                  <div className="text-4xl mb-3">📡</div>
                  <h3 className="font-bold mb-2">1. Data Ingestion</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Real‑time weather, soil, market data aggregated every 15 minutes.</p>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 text-center">
                  <div className="text-4xl mb-3">🧠</div>
                  <h3 className="font-bold mb-2">2. AI Negotiation</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Three specialist agents debate the optimal farm action.</p>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold mb-2">3. Autonomous Action</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Decision pushed to dashboard, with full reasoning and override option.</p>
                </div>
              </div>
            </div>
            <div className="relative h-20"><OceanWave /></div>
          </div>
        )}

        {/* Features Page */}
        {activePrePage === 'features' && (
          <div className="animate-fadeIn">
            <div className="max-w-[1000px] mx-auto px-5 py-20">
              <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "💧", title: "Smart Irrigation", desc: "Agents balance soil moisture, rain forecast, and energy cost." },
                  { icon: "🔬", title: "Disease Prediction", desc: "ML model detects disease risk days in advance with 85%+ accuracy." },
                  { icon: "🤖", title: "Agent Negotiation", desc: "Agronomist, Economist, Logistician debate before any action." },
                  { icon: "💬", title: "Farmer Chatbot", desc: "RAG‑powered assistant answering crop & scheme questions in local languages." },
                  { icon: "📜", title: "Scheme Finder", desc: "Personalised government scheme eligibility at your fingertips." },
                  { icon: "📈", title: "Market Intelligence", desc: "Live mandi prices and harvest timing suggestions." },
                ].map((f, i) => (
                  <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 text-center hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">{f.icon}</div>
                    <h3 className="font-bold mb-2">{f.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-20"><OceanWave /></div>
          </div>
        )}

        {/* Pricing Page */}
        {activePrePage === 'pricing' && (
          <div className="animate-fadeIn">
            <div className="max-w-[1000px] mx-auto px-5 py-20">
              <h2 className="text-3xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
                <div className="border border-[var(--border)] rounded-[var(--radius)] p-6 text-center">
                  <h3 className="font-bold">Free</h3>
                  <p className="text-4xl font-extrabold my-3">₹0</p>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">Up to 5 AI decisions/day, 1 plot, basic chatbot</p>
                  <button className="btn btn-outline btn-sm w-full">Start Free</button>
                </div>
                <div className="border-2 border-[var(--teal)] rounded-[var(--radius)] p-6 text-center shadow-lg shadow-teal-500/10 scale-105 bg-white relative z-10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--teal)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                  <h3 className="font-bold">Pro</h3>
                  <p className="text-4xl font-extrabold my-3">₹299<span className="text-sm font-normal">/mo</span></p>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">Unlimited decisions, 5 plots, RAG chatbot, market data</p>
                  <button className="btn btn-primary btn-sm w-full">Get Pro</button>
                </div>
                <div className="border border-[var(--border)] rounded-[var(--radius)] p-6 text-center">
                  <h3 className="font-bold">Enterprise</h3>
                  <p className="text-4xl font-extrabold my-3">Custom</p>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">FPOs, large farms, API access, dedicated support</p>
                  <button className="btn btn-outline btn-sm w-full">Contact Us</button>
                </div>
              </div>
            </div>
            <div className="relative h-20"><OceanWave /></div>
          </div>
        )}

      </div>
    </div>
  );
}
