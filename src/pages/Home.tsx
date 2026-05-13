import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const styles = {
  glassCard: "bg-white/90 backdrop-blur-md border border-[#E2E8F0] rounded-[12px]",
  glassNav: "bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]",
  primaryBtn: "bg-gradient-to-r from-[#0D9488] to-[#3B82F6] text-white",
  outlineBtn: "border-2 border-[#0D9488] text-[#0D9488] bg-transparent",
  input: "px-4 py-3 border border-[#E2E8F0] rounded-[30px] text-sm w-full outline-none focus:border-[#0D9488] transition-colors",
  sidebarItem: "flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] font-medium text-sm cursor-pointer transition-all",
  sidebarActive: "bg-[#E0F2F1] text-[#0D9488]",
};

function Wave() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden pointer-events-none">
      <div
        className="w-[200%] h-full bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 120%22><path fill=%22%230D9488%22 opacity=%220.2%22 d=%22M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z%22/></svg>')] bg-[length:50%_100%] animate-[waveMove_6s_linear_infinite]"
        style={{ animation: "waveMove 6s linear infinite" }}
      />
    </div>
  );
}

function PreNav({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <nav className={`${styles.glassNav} fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center z-[100]`}>
      <div className="font-extrabold text-2xl bg-gradient-to-r from-[#0D9488] to-[#3B82F6] bg-clip-text text-transparent">🌾 AGRI-INTELLIGENCE</div>
      <div className="flex items-center gap-6">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("landing"); }} className="text-[#64748B] no-underline font-medium text-sm hover:text-[#0D9488]">Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("features"); }} className="text-[#64748B] no-underline font-medium text-sm hover:text-[#0D9488]">Features</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("pricing"); }} className="text-[#64748B] no-underline font-medium text-sm hover:text-[#0D9488]">Pricing</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("login"); }} className="text-[#64748B] no-underline font-medium text-sm hover:text-[#0D9488]">Sign In</a>
        <button onClick={() => onNavigate("signup")} className={`${styles.outlineBtn} px-4 py-1.5 rounded-full font-semibold text-xs border`}>Get Started</button>
      </div>
    </nav>
  );
}
function LandingPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="pt-16">
      <div className="text-center py-24 px-4">
        <h1 className="text-5xl md:text-7xl mb-4">Agri-<span className="bg-gradient-to-r from-[#0D9488] to-[#3B82F6] bg-clip-text text-transparent">Intelligence</span></h1>
        <p className="text-xl md:text-2xl text-[#64748B] max-w-[600px] mx-auto mb-8">
          Autonomous multi-agent AI that negotiates your farm's next move — saving water, money, and crops.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => onNavigate("signup")} className={`${styles.primaryBtn} px-8 py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all hover:scale-105`}>
            Start Free Trial
          </button>
          <button className={`${styles.outlineBtn} px-8 py-3 rounded-full font-semibold text-sm border cursor-pointer transition-all hover:scale-105`}>How It Works</button>
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className={`${styles.glassCard} p-6 text-center max-w-[250px]`}>
            <div className="text-4xl mb-3">📡</div>
            <h3 className="font-bold mb-2">1. Data Ingestion</h3>
            <p className="text-[#64748B] text-sm">Real-time weather, soil, market data aggregated every 15 minutes.</p>
          </div>
          <div className={`${styles.glassCard} p-6 text-center max-w-[250px]`}>
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-bold mb-2">2. AI Negotiation</h3>
            <p className="text-[#64748B] text-sm">Three specialist agents debate the optimal farm action.</p>
          </div>
          <div className={`${styles.glassCard} p-6 text-center max-w-[250px]`}>
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold mb-2">3. Autonomous Action</h3>
            <p className="text-[#64748B] text-sm">Decision pushed to dashboard, with full reasoning and override option.</p>
          </div>
        </div>
      </div>
      <div className="relative"><Wave /></div>
    </div>
  );
}
function FeaturesPage() {
  const features = [
    { icon: "💧", title: "Smart Irrigation", desc: "Agents balance soil moisture, rain forecast, and energy cost." },
    { icon: "🔬", title: "Disease Prediction", desc: "ML model detects disease risk days in advance with 85%+ accuracy." },
    { icon: "🤖", title: "Agent Negotiation", desc: "Agronomist, Economist, Logistician debate before any action." },
    { icon: "💬", title: "Farmer Chatbot", desc: "RAG-powered assistant answering crop & scheme questions in local languages." },
    { icon: "📜", title: "Scheme Finder", desc: "Personalised government scheme eligibility at your fingertips." },
    { icon: "📈", title: "Market Intelligence", desc: "Live mandi prices and harvest timing suggestions." },
  ];
  return (
    <div className="pt-32 pb-20 px-4 max-w-[1000px] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className={`${styles.glassCard} p-6 text-center`}>
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-[#64748B] text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
      <Wave />
    </div>
  );
}

function PricingPage() {
  return (
    <div className="pt-32 pb-20 px-4 max-w-[1000px] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Simple, Transparent Pricing</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        <div className={`${styles.glassCard} p-6 text-center max-w-[250px]`}>
          <h3 className="font-bold">Free</h3>
          <p className="text-4xl font-extrabold mb-2">₹0</p>
          <p className="text-[#64748B] text-sm mb-4">Up to 5 AI decisions/day, 1 plot, basic chatbot</p>
          <button className={`${styles.outlineBtn} px-4 py-1.5 rounded-full font-semibold text-xs border cursor-pointer`}>Start Free</button>
        </div>
        <div className={`${styles.glassCard} p-6 text-center max-w-[250px] border-[#0D9488] shadow-[0_8px_20px_rgba(13,148,136,0.15)]`}>
          <h3 className="font-bold">Pro</h3>
          <p className="text-4xl font-extrabold mb-2">₹299<span className="text-sm">/mo</span></p>
          <p className="text-[#64748B] text-sm mb-4">Unlimited decisions, 5 plots, RAG chatbot, market data</p>
          <button className={`${styles.primaryBtn} px-4 py-1.5 rounded-full font-semibold text-xs border-none cursor-pointer`}>Get Pro</button>
        </div>
        <div className={`${styles.glassCard} p-6 text-center max-w-[250px]`}>
          <h3 className="font-bold">Enterprise</h3>
          <p className="text-4xl font-extrabold mb-2">Custom</p>
          <p className="text-[#64748B] text-sm mb-4">FPOs, large farms, API access, dedicated support</p>
          <button className={`${styles.outlineBtn} px-4 py-1.5 rounded-full font-semibold text-xs border cursor-pointer`}>Contact Us</button>
        </div>
      </div>
      <Wave />
    </div>
  );
}
function LoginPage({ onNavigate, onLogin }: { onNavigate: (id: string) => void; onLogin: () => void; }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      onLogin();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 flex justify-center">
      <div className={`${styles.glassCard} p-8 max-w-[400px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)]`}>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-[#64748B]">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="farmer@example.com" className={`${styles.input} mb-4`} required />
          <label className="text-sm font-medium text-[#64748B]">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`${styles.input} mb-2`} required />
          <div className="text-right mb-5"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("forgot"); }} className="text-xs text-[#0D9488] no-underline">Forgot password?</a></div>
          <button type="submit" disabled={loading} className={`${styles.primaryBtn} w-full py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all disabled:opacity-50 flex items-center justify-center gap-2`}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Sign In
          </button>
        </form>
        <div className="text-center my-4 text-[#64748B]">or</div>
        <button className={`${styles.outlineBtn} w-full py-3 rounded-full font-semibold text-sm border cursor-pointer transition-all`}>Continue with Google</button>
        <p className="text-center mt-5">New? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("signup"); }} className="text-[#0D9488] no-underline">Create account</a></p>
      </div>
    </div>
  );
}
function SignupPage({ onLogin }: { onLogin: () => void; }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState(5.2);
  const [location, setLocation] = useState("");
  const { register } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      try {
        await register({ username: name, email: `${name.replace(/\s+/g, '')}@example.com`, password });
        await login(`${name.replace(/\s+/g, '')}@example.com`, password);
        onLogin();
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    }
  };

  const stepTitles = ["Account Details", "Farm Details", "Confirm & Start"];

  return (
    <div className="pt-32 pb-20 px-4 flex justify-center">
      <div className={`${styles.glassCard} p-8 max-w-[500px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)]`}>
        <h2 className="text-2xl font-bold text-center mb-2">Create your farm account</h2>
        <div className="flex gap-2 justify-center mb-6">
          {stepTitles.map((t, i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? 'bg-[#0D9488]' : 'bg-[#E2E8F0]'}`} />
          ))}
        </div>
        {step === 0 && (
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-[#64748B]">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ramesh Kumar" className={`${styles.input} mt-1`} required /></div>
            <div><label className="text-sm font-medium text-[#64748B]">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className={`${styles.input} mt-1`} required /></div>
            <div><label className="text-sm font-medium text-[#64748B]">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${styles.input} mt-1`} required /></div>
            <button onClick={handleNext} className={`${styles.primaryBtn} w-full py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all`}>Continue</button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Farm Details</h3>
            <div><label className="text-sm font-medium text-[#64748B]">Crop</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className={`${styles.input} mt-1`}><option>Wheat</option><option>Rice</option><option>Maize</option><option>Sugarcane</option><option>Cotton</option></select></div>
            <div><label className="text-sm font-medium text-[#64748B]">Area (acres)</label>
            <input type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} className={`${styles.input} mt-1`} required /></div>
            <div><label className="text-sm font-medium text-[#64748B]">Location (Village/District)</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" className={`${styles.input} mt-1`} required /></div>
            <button onClick={handleNext} className={`${styles.primaryBtn} w-full py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all`}>Continue</button>
          </div>
        )}
        {step === 2 && (
          <div className="text-center space-y-4">
            <h3 className="font-bold text-lg">Confirm & Start</h3>
            <p className="text-[#64748B]">Your account is ready. Start your free trial with the following details:</p>
            <div className={`${styles.glassCard} p-4 text-left`}>
              <p><b>Name:</b> {name}</p>
              <p><b>Phone:</b> {phone}</p>
              <p><b>Crop:</b> {crop}</p>
              <p><b>Area:</b> {area} acres</p>
            </div>
            <button onClick={handleNext} className={`${styles.primaryBtn} w-full py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all`}>Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "agents", label: "🤖 Agents" },
    { id: "farms", label: "🗺️ Farms" },
    { id: "market", label: "📈 Market" },
    { id: "chatbot", label: "💬 Chatbot" },
    { id: "schemes", label: "📜 Schemes" },
    { id: "admin", label: "⚙️ Admin" },
    { id: "settings", label: "👤 Profile" },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard": return <DashboardContent />;
      case "agents": return <AgentsContent />;
      case "farms": return <FarmsContent />;
      case "market": return <MarketContent />;
      case "chatbot": return <ChatbotContent />;
      case "schemes": return <SchemesContent />;
      case "admin": return <AdminContent />;
      case "settings": return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-[240px]' : 'w-0'} bg-white/90 backdrop-blur-md border-r border-[#E2E8F0] p-6 overflow-y-auto flex-shrink-0 transition-all duration-300`}>
        <div className="font-extrabold text-xl bg-gradient-to-r from-[#0D9488] to-[#3B82F6] bg-clip-text text-transparent mb-6">🌾 AGRI</div>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.id} onClick={() => setActivePage(item.id)} className={`${styles.sidebarItem} ${activePage === item.id ? styles.sidebarActive : ''}`}>
              {item.label}
            </div>
          ))}
        </div>
        <div className="mt-auto pt-6 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-r from-[#0D9488] to-[#3B82F6] text-white flex items-center justify-center font-bold text-sm">R</div>
            <div>
              <div className="font-medium text-sm">Ramesh</div>
              <div className="bg-[#E0F2F1] text-[#0D9488] text-[11px] px-2 py-0.5 rounded-full inline-block">Pro</div>
            </div>
          </div>
          <div onClick={onLogout} className="text-sm text-[#64748B] mt-4 cursor-pointer hover:text-[#0D9488] flex items-center gap-2">🚪 Logout</div>
        </div>
      </div>
      {/* Mobile toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-4 left-4 z-[101] bg-white/90 backdrop-blur-md p-2 rounded-lg border border-[#E2E8F0]">☰</button>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 relative bg-[#F8FAFC]">
        {renderContent()}
        <div className="relative"><Wave /></div>
      </div>
    </div>
  );
}
function DashboardContent() {
  const [moisture, setMoisture] = useState(32);
  const feedRef = useState<HTMLDivElement | null>(null);

  const agentMsgs = [
    "[08:14] AGRONOMIST → Irrigate now (stress 0.41)",
    "[08:14] ECONOMIST → Delay 6h, save ₹840",
    "[08:14] LOGISTICIAN → Partial only, harvester risk",
    "[08:14] COORDINATOR → Final: Delay 6h, 40% pump",
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Farm Overview — Sector-7 Wheat (5.2 ha)</h2>
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white border-l-4 border-[#0D9488] rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="text-sm text-[#64748B]">Soil Moisture</div>
          <div className="text-2xl font-extrabold">{moisture}%</div>
        </div>
        <div className="bg-white border-l-4 border-[#0D9488] rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="text-sm text-[#64748B]">Crop Health</div>
          <div className="text-2xl font-extrabold text-[#166534]">87/100</div>
        </div>
        <div className="bg-white border-l-4 border-[#0D9488] rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="text-sm text-[#64748B]">Disease Risk</div>
          <div className="text-2xl font-extrabold text-[#F59E0B]">0.18</div>
        </div>
        <div className="bg-white border-l-4 border-[#0D9488] rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="text-sm text-[#64748B]">Yield Forecast</div>
          <div className="text-2xl font-extrabold">4.2 T</div>
        </div>
        <div className="bg-white border-l-4 border-[#0D9488] rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="text-sm text-[#64748B]">Rain (48h)</div>
          <div className="text-2xl font-extrabold text-[#3B82F6]">65%</div>
        </div>
        <div className="bg-white border-l-4 border-[#0D9488] rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="text-sm text-[#64748B]">Saved Today</div>
          <div className="text-2xl font-extrabold text-[#0D9488]">₹840</div>
        </div>
      </div>
      {/* Moisture chart */}
      <div className={`${styles.glassCard} p-6 mb-6`}>
        <h3 className="font-bold mb-4">Soil Moisture Trend (Last 7 Days)</h3>
        <div className="flex items-end gap-1 h-[80px] mb-4">
          {[40, 35, 30, 25, 32, 38, 42].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-r from-[#0D9488] to-[#3B82F6] rounded-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
        <button onClick={() => setMoisture(Math.floor(Math.random() * 20 + 25))} className={`${styles.outlineBtn} px-3 py-1 rounded-full font-semibold text-xs border cursor-pointer`}>Update moisture</button>
      </div>
      {/* Agent feed + next actions */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`${styles.glassCard} p-6 flex-1`}>
          <h3 className="font-bold mb-4">Agent Activity Feed</h3>
          <div className="bg-[#F1F5F9] rounded-[12px] p-4 font-mono text-xs max-h-[260px] overflow-y-auto space-y-2">
            {agentMsgs.map((msg, i) => (
              <div key={i} className={`px-3 py-1 rounded ${msg.includes("AGRONOMIST") ? 'text-[#166534]' : msg.includes("ECONOMIST") ? 'text-[#F59E0B]' : msg.includes("LOGISTICIAN") ? 'text-[#F97316]' : 'text-[#3B82F6]'}`}>
                {msg}
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.glassCard} p-6 w-full lg:w-[260px]`}>
          <h3 className="font-bold mb-4">Next Actions</h3>
          <div className="space-y-3 text-sm">
            <p>⏰ 14:01 – Irrigation (40%)</p>
            <p>📅 Day 87 – Fertilizer</p>
            <p>🚛 Day 90 – Harvest</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function AgentsContent() {
  const [auto, setAuto] = useState(true);
  const [agroProp, setAgroProp] = useState("Waiting...");
  const [econProp, setEconProp] = useState("Waiting...");
  const [logProp, setLogProp] = useState("Waiting...");
  const [coordDecision, setCoordDecision] = useState("⚖️ Coordinator: Waiting for negotiation...");
  const [negotiating, setNegotiating] = useState(false);

  const startNegotiation = () => {
    if (negotiating) return;
    setNegotiating(true);
    setAgroProp("Waiting..."); setEconProp("Waiting..."); setLogProp("Waiting...");
    setCoordDecision("⚖️ Coordinator: Waiting for negotiation...");
    const steps: any[] = [
      { agent: 'agro', text: 'Immediate irrigation recommended. Crop stress 0.41.' },
      { agent: 'econ', text: 'Delay 6h – off-peak energy saves ₹840.' },
      { agent: 'log', text: 'Partial irrigation only (40%). Harvester risk if soil >55%.' },
      { coord: true },
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        const s = steps[i];
        if (s.coord) {
          setCoordDecision('⚖️ Coordinator: Final Decision – Delay 6h, 40% pump. Save ₹840.');
        } else if (s.agent === 'agro') {
          setAgroProp(s.text);
        } else if (s.agent === 'econ') {
          setEconProp(s.text);
        } else if (s.agent === 'log') {
          setLogProp(s.text);
        }
        i++;
      } else {
        clearInterval(interval);
        setNegotiating(false);
      }
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Agent Decision Room</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#64748B]">Suggestion</span>
          <div onClick={() => setAuto(!auto)} className={`w-[44px] h-[24px] rounded-full cursor-pointer transition-colors ${auto ? 'bg-[#0D9488]' : 'bg-[#CBD5E1]'} relative`}>
            <div className={`w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] transition-all ${auto ? 'left-[22px]' : 'left-[2px]'}`} />
          </div>
          <span className="text-sm text-[#64748B]">Autonomous</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${styles.glassCard} p-6 border-l-4 border-[#166534]`}>
          <b className="text-[#166534]">🌾 Agronomist</b>
          <p className="mt-2 text-sm text-[#64748B]">{agroProp}</p>
        </div>
        <div className={`${styles.glassCard} p-6 border-l-4 border-[#F59E0B]`}>
          <b className="text-[#F59E0B]">💰 Economist</b>
          <p className="mt-2 text-sm text-[#64748B]">{econProp}</p>
        </div>
        <div className={`${styles.glassCard} p-6 border-l-4 border-[#F97316]`}>
          <b className="text-[#F97316]">🚛 Logistician</b>
          <p className="mt-2 text-sm text-[#64748B]">{logProp}</p>
        </div>
      </div>
      {/* Negotiation visualization */}
      <div className="text-center my-6">
        <div className="relative w-[120px] h-[120px] mx-auto mb-4">
          <svg width="120" height="120"><circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="12" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#166534" strokeWidth="12" strokeDasharray="78 235" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray="55 235" strokeDashoffset="-78" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#F97316" strokeWidth="12" strokeDasharray="39 235" strokeDashoffset="-133" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#64748B]">AI AGENTS</div>
        </div>
        <div className="text-sm text-[#64748B]">Health 45% | Cost 35% | Logistics 20%</div>
      </div>
      <div className={`${styles.glassCard} p-6 border-2 border-[#3B82F6] mb-6`}>{coordDecision}</div>
      <button onClick={startNegotiation} disabled={negotiating} className={`${styles.primaryBtn} px-6 py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all disabled:opacity-50`}>
        {negotiating ? 'Negotiating...' : 'Simulate Negotiation'}
      </button>
    </div>
  );
}
function FarmsContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Farm Plot Management</h2>
      <div className="h-[300px] bg-gradient-to-r from-[#E0F2F1] to-[#DBEAFE] rounded-[12px] flex items-center justify-center font-bold text-[#0D9488] mb-6">🗺️ Leaflet/OSM Map Placeholder</div>
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className={`${styles.glassCard} p-6 flex-1`}>
          <h3 className="font-bold mb-4">Soil Properties</h3>
          <p className="text-sm text-[#64748B]">pH: 6.8 | Organic Carbon: 0.8%</p>
          <p className="text-sm text-[#64748B]">Texture: Clay loam</p>
        </div>
        <div className={`${styles.glassCard} p-6 flex-1`}>
          <h3 className="font-bold mb-4">Sensor History</h3>
          <p className="text-sm text-[#64748B] mb-4">Moisture: 28-35% range</p>
          <div className="flex items-end gap-1 h-[40px]">
            {[60, 50, 70, 45].map((h, i) => <div key={i} className="flex-1 bg-gradient-to-r from-[#0D9488] to-[#3B82F6] rounded-sm" style={{ height: `${h}%` }} />)}
          </div>
        </div>
      </div>
      <button className={`${styles.primaryBtn} px-6 py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all`}>+ Add New Plot</button>
    </div>
  );
}

function MarketContent() {
  const [wheatPrice, setWheatPrice] = useState(2150);
  const refreshPrice = () => setWheatPrice(Math.floor(Math.random() * 500 + 1900));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Market Prices & Logistics</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`${styles.glassCard} p-6 flex-1`}>
          <h3 className="font-bold mb-4">Live Mandi Prices</h3>
          <p className="text-lg mb-2">Wheat: <span className="font-bold">₹{wheatPrice.toLocaleString()}</span>/q <span className="text-[#166534]">▲2.3%</span></p>
          <p className="text-lg mb-4">Maize: ₹1,870/q <span className="text-[#EF4444]">▼0.8%</span></p>
          <button onClick={refreshPrice} className={`${styles.outlineBtn} px-4 py-2 rounded-full font-semibold text-xs border cursor-pointer`}>Refresh</button>
        </div>
        <div className={`${styles.glassCard} p-6 flex-1`}>
          <h3 className="font-bold mb-4">Harvest Readiness</h3>
          <p className="text-sm text-[#64748B] mb-3">Growth: Day 84 / 120 (Grain filling)</p>
          <div className="w-full h-[12px] bg-[#E2E8F0] rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-[#0D9488] to-[#3B82F6]" style={{ width: '70%' }} />
          </div>
          <button className={`${styles.outlineBtn} px-4 py-2 rounded-full font-semibold text-xs border cursor-pointer`} onClick={() => alert('Transport booking: Select vehicle, date, and confirm.')}>Book Transport</button>
        </div>
      </div>
    </div>
  );
}

function ChatbotContent() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([{ role: 'ai', text: 'Hello! Ask me anything about crops, irrigation, or schemes.' }]);
  const [input, setInput] = useState('');
  const chatEndRef = useState<HTMLDivElement | null>(null);

  const sendChat = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      let reply = 'I recommend checking soil moisture before irrigating. Current moisture is 32%.';
      if (userMsg.toLowerCase().includes('fertilizer')) reply = 'Apply 40 kg urea + 20 kg DAP per acre at 45 days. Source: Wheat Agronomy Handbook';
      else if (userMsg.toLowerCase().includes('scheme')) reply = 'You may be eligible for PM-KISAN. Check the Schemes page for details.';
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Farmer AI Assistant</h2>
      <div className={`${styles.glassCard} p-6 h-[500px] flex flex-col`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`px-4 py-2.5 rounded-[18px] max-w-[70%] ${m.role === 'user' ? 'bg-gradient-to-r from-[#0D9488] to-[#3B82F6] text-white float-right' : 'bg-[#F1F5F9] float-left'}`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br>') }} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4 mt-4 border-t border-[#E2E8F0]">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Type your question..." className={`${styles.input} flex-1`} />
          <button onClick={sendChat} className={`${styles.primaryBtn} px-6 py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all`}>Send</button>
        </div>
      </div>
    </div>
  );
}
function SchemesContent() {
  const [search, setSearch] = useState("");
  const schemes = [
    { name: 'PM-KISAN', desc: '₹6,000/yr income support for all landholding farmers.' },
    { name: 'PMFBY', desc: 'Crop insurance against natural calamities.' },
    { name: 'Soil Health Card', desc: 'Free soil testing & nutrient recommendations.' },
    { name: 'e-NAM', desc: 'Online national agriculture market.' },
    { name: 'Kisan Credit Card', desc: 'Crop loans at concessional interest rates.' },
    { name: 'Pradhan Mantri Krishi Sinchai Yojana', desc: 'Irrigation infrastructure and water conservation.' },
  ];
  const filtered = schemes.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Government Schemes</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search schemes..." className={`${styles.input} mb-6`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <div key={i} className={`${styles.glassCard} p-6 border border-[#E2E8F0]`}>
            <b className="text-lg block mb-2">{s.name}</b>
            <p className="text-sm text-[#64748B]">{s.desc}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-[#64748B] mt-8">No schemes found matching "{search}"</p>}
    </div>
  );
}

function AdminContent() {
  const [tab, setTab] = useState('users');
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <div className="flex border-b border-[#E2E8F0] mb-6">
        <div onClick={() => setTab('users')} className={`px-6 py-2 cursor-pointer font-medium text-sm border-b-2 ${tab === 'users' ? 'border-[#0D9488] text-[#0D9488]' : 'border-transparent text-[#64748B]'}`}>Users</div>
        <div onClick={() => setTab('sim')} className={`px-6 py-2 cursor-pointer font-medium text-sm border-b-2 ${tab === 'sim' ? 'border-[#0D9488] text-[#0D9488]' : 'border-transparent text-[#64748B]'}`}>Simulation</div>
      </div>
      {tab === 'users' ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead><tr className="bg-[#F1F5F9]"><th className="p-3 text-left text-sm font-medium text-[#64748B]">Name</th><th className="p-3 text-left text-sm font-medium text-[#64748B]">Plan</th><th className="p-3 text-left text-sm font-medium text-[#64748B]">Credits</th><th className="p-3 text-left text-sm font-medium text-[#64748B]">Status</th></tr></thead>
            <tbody>
              <tr><td className="p-3 border-b border-[#E2E8F0] text-sm">Ramesh Kumar</td><td className="p-3 border-b border-[#E2E8F0] text-sm">Pro</td><td className="p-3 border-b border-[#E2E8F0] text-sm">120</td><td className="p-3 border-b border-[#E2E8F0] text-sm">Active</td></tr>
              <tr><td className="p-3 border-b border-[#E2E8F0] text-sm">Sunita Devi</td><td className="p-3 border-b border-[#E2E8F0] text-sm">Free</td><td className="p-3 border-b border-[#E2E8F0] text-sm">5</td><td className="p-3 border-b border-[#E2E8F0] text-sm">Active</td></tr>
              <tr><td className="p-3 text-sm">Arun Kumar</td><td className="p-3 text-sm">Pro</td><td className="p-3 text-sm">85</td><td className="p-3 text-sm">Active</td></tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3 className="font-bold mb-4">Inject Scenario</h3>
          <button onClick={() => alert('Drought injected! Agent will respond.')} className={`${styles.outlineBtn} px-4 py-2 rounded-full font-semibold text-xs border cursor-pointer mr-3`}>Drought</button>
          <button onClick={() => alert('Heavy rain injected!')} className={`${styles.outlineBtn} px-4 py-2 rounded-full font-semibold text-xs border cursor-pointer`}>Heavy Rain</button>
        </div>
      )}
    </div>
  );
}

function SettingsContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile & Settings</h2>
      <div className={`${styles.glassCard} p-6 mb-6`}>
        <h3 className="font-bold mb-4">Account</h3>
        <p className="text-sm text-[#64748B]">Name: Ramesh Kumar</p>
        <p className="text-sm text-[#64748B]">Email: ramesh@example.com</p>
        <p className="text-sm text-[#64748B]">Plan: Pro</p>
        <button onClick={() => alert('Password change form')} className={`${styles.outlineBtn} px-4 py-2 rounded-full font-semibold text-xs border cursor-pointer mt-4`}>Change Password</button>
      </div>
      <div className={`${styles.glassCard} p-6`}>
        <h3 className="font-bold mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3"><input type="checkbox" defaultChecked /><label className="text-sm text-[#64748B]">SMS alerts</label></div>
          <div className="flex items-center gap-3"><input type="checkbox" /><label className="text-sm text-[#64748B]">Email alerts</label></div>
          <div className="flex items-center gap-3"><input type="checkbox" defaultChecked /><label className="text-sm text-[#64748B]">Price notifications</label></div>
        </div>
      </div>
    </div>
  );
}

function ForgotPassword({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  return (
    <div className="pt-32 pb-20 px-4 flex justify-center">
      <div className={`${styles.glassCard} p-8 max-w-[400px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)]`}>
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={`${styles.input} mb-4`} />
        <button className={`${styles.primaryBtn} w-full py-3 rounded-full font-semibold text-sm border-none cursor-pointer transition-all`}>Send OTP</button>
        <p className="text-center mt-4"><a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="text-sm text-[#64748B] no-underline hover:text-[#0D9488]">Back to sign in</a></p>
      </div>
    </div>
  );
}

// Main Home component with state-based routing
export default function Home() {
  const [page, setPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated: authIsAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    if (authIsAuthenticated) {
      setIsAuthenticated(true);
      setPage('dashboard');
    }
  }, [authIsAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/demo'); // Redirect to existing demo page
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setPage('landing');
  };

  const handlePageNav = (id: string) => setPage(id);

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <style>{`
        @keyframes waveMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
      <PreNav onNavigate={handlePageNav} />
      <div className="pt-16 overflow-y-auto">
        {page === 'landing' && <LandingPage onNavigate={handlePageNav} />}
        {page === 'features' && <FeaturesPage />}
        {page === 'pricing' && <PricingPage />}
        {page === 'login' && <LoginPage onNavigate={handlePageNav} onLogin={handleLogin} />}
        {page === 'signup' && <SignupPage onLogin={handleLogin} />}
        {page === 'forgot' && <ForgotPassword onBack={() => handlePageNav('login')} />}
      </div>
    </div>
  );
}
