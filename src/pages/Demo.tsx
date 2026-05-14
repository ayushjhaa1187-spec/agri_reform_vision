import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DemoPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardContent />;
      case 'agents': return <AgentsContent />;
      case 'farms': return <FarmsContent />;
      case 'market': return <MarketContent />;
      case 'chatbot': return <ChatbotContent />;
      case 'schemes': return <SchemesContent />;
      case 'admin': return <AdminContent />;
      case 'settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  const SidebarItem = ({ id, label, icon }: { id: string; label: string; icon: string }) => (
    <div 
      onClick={() => setActivePage(id)} 
      className={`sidebar-item ${activePage === id ? 'active' : ''}`}
    >
      <span>{icon}</span> {label}
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[240px] bg-white/90 backdrop-blur-xl border-r border-[var(--border)] p-6 flex flex-col flex-shrink-0 animate-slide-in">
        <div className="flex items-center gap-2 mb-8 group cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-xl group-hover:scale-110 transition-transform">🌾</span>
          <span className="text-[var(--teal)] font-black text-lg tracking-widest uppercase">AGRI</span>
        </div>
        
        <div className="flex-1 space-y-1">
          <SidebarItem id="dashboard" label="Dashboard" icon="📊" />
          <SidebarItem id="agents" label="Agents" icon="🤖" />
          <SidebarItem id="farms" label="Farms" icon="🗺️" />
          <SidebarItem id="market" label="Market" icon="📈" />
          <SidebarItem id="chatbot" label="Chatbot" icon="💬" />
          <SidebarItem id="schemes" label="Schemes" icon="📜" />
          <SidebarItem id="admin" label="Admin" icon="⚙️" />
          <SidebarItem id="settings" label="Profile" icon="👤" />
        </div>

        <div className="mt-auto pt-6 border-t border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D9488] to-[#3B82F6] text-white flex items-center justify-center font-bold text-sm shadow-md">
              {user?.email?.charAt(0).toUpperCase() || 'R'}
            </div>
            <div>
              <div className="font-semibold text-sm text-[var(--text)]">{user?.email?.split('@')[0] || 'Ramesh'}</div>
              <div className="bg-[#E0F2F1] text-[var(--teal)] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter inline-block">Pro</div>
            </div>
          </div>
          <div 
            onClick={() => { logout(); navigate('/'); }} 
            className="text-xs font-bold text-[var(--text-secondary)] mt-4 cursor-pointer hover:text-red-500 transition-colors flex items-center gap-2"
          >
            🚪 Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
        <div className="ocean-wave fixed bottom-0 left-[240px] right-0 z-[-1]">
          <div className="wave"></div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const [moisture, setMoisture] = useState(32);
  const agentFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agentFeedRef.current) {
      agentFeedRef.current.scrollTop = agentFeedRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Farm Overview — Sector‑7 Wheat (5.2 ha)</h2>
      
      <div className="kpi-grid mb-8">
        <div className="kpi-card">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Soil Moisture</div>
          <div className="text-3xl font-black text-[var(--text)]">{moisture}%</div>
        </div>
        <div className="kpi-card border-[var(--green)]">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Crop Health</div>
          <div className="text-3xl font-black text-[var(--green)]">87/100</div>
        </div>
        <div className="kpi-card border-[var(--amber)]">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Disease Risk</div>
          <div className="text-3xl font-black text-[var(--amber)]">0.18</div>
        </div>
        <div className="kpi-card">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Yield Forecast</div>
          <div className="text-3xl font-black text-[var(--text)]">4.2 T</div>
        </div>
        <div className="kpi-card border-[var(--blue)]">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Rain (48h)</div>
          <div className="text-3xl font-black text-[var(--blue)]">65%</div>
        </div>
        <div className="kpi-card border-[var(--teal)]">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Saved Today</div>
          <div className="text-3xl font-black text-[var(--teal)]">₹840</div>
        </div>
      </div>

      <div className="glass-card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold">Soil Moisture Trend (Last 7 Days)</h3>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setMoisture(Math.floor(Math.random() * 20 + 25))}
          >
            Update moisture
          </button>
        </div>
        <div className="flex items-end gap-2 h-24 mb-2">
          {[40, 35, 30, 25, 32, 38, 42].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-[#0D9488] to-[#3B82F6] rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest px-1">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="glass-card flex-1 mb-0">
          <h3 className="font-bold mb-4">Agent Activity Feed</h3>
          <div ref={agentFeedRef} className="bg-[#F1F5F9] rounded-xl p-5 font-mono text-xs max-h-64 overflow-y-auto space-y-2 leading-relaxed">
            <div className="text-[var(--teal)]">[08:14] AGRONOMIST → Irrigate now (stress 0.41)</div>
            <div className="text-[var(--amber)]">[08:14] ECONOMIST → Delay 6h, save ₹840</div>
            <div className="text-[var(--coral)]">[08:14] LOGISTICIAN → Partial only, harvester risk</div>
            <div className="text-[var(--blue)]">[08:14] COORDINATOR → Final: Delay 6h, 40% pump</div>
          </div>
        </div>
        <div className="glass-card w-full lg:w-[280px] mb-0">
          <h3 className="font-bold mb-4">Next Actions</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">⏰</span>
              <div>
                <div className="text-sm font-bold">14:01 – Irrigation</div>
                <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">40% Pump Speed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📅</span>
              <div>
                <div className="text-sm font-bold">Day 87 – Fertilizer</div>
                <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">NPK Complex</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🚛</span>
              <div>
                <div className="text-sm font-bold">Day 90 – Harvest</div>
                <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Pre-booked Transport</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentsContent() {
  const [isAutonomous, setIsAutonomous] = useState(true);
  const [agroProp, setAgroProp] = useState("Waiting...");
  const [econProp, setEconProp] = useState("Waiting...");
  const [logProp, setLogProp] = useState("Waiting...");
  const [coordDecision, setCoordDecision] = useState("⚖️ Coordinator: Waiting for negotiation...");
  const [isNegotiating, setIsNegotiating] = useState(false);

  const startNegotiation = () => {
    if (isNegotiating) return;
    setIsNegotiating(true);
    setAgroProp("Waiting..."); setEconProp("Waiting..."); setLogProp("Waiting...");
    setCoordDecision("⚖️ Coordinator: Waiting for negotiation...");
    
    const steps = [
      { agent: 'agro', text: 'Immediate irrigation recommended. Crop stress 0.41.' },
      { agent: 'econ', text: 'Delay 6h – off‑peak energy saves ₹840.' },
      { agent: 'log', text: 'Partial irrigation only (40%). Harvester risk if soil >55%.' },
      { coord: true }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        const s = steps[i] as any;
        if (s.coord) {
          setCoordDecision('⚖️ Coordinator: Final Decision – Delay 6h, 40% pump. Save ₹840.');
        } else {
          if (s.agent === 'agro') setAgroProp(s.text);
          if (s.agent === 'econ') setEconProp(s.text);
          if (s.agent === 'log') setLogProp(s.text);
        }
        i++;
      } else {
        clearInterval(interval);
        setIsNegotiating(false);
      }
    }, 1000);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Agent Decision Room</h2>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Manual</span>
          <div 
            onClick={() => setIsAutonomous(!isAutonomous)}
            className={`w-11 h-6 rounded-full cursor-pointer transition-colors relative ${isAutonomous ? 'bg-[var(--teal)]' : 'bg-[#CBD5E1]'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${isAutonomous ? 'left-[22px]' : 'left-0.5'}`} />
          </div>
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Autonomous</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card border-l-4 border-[var(--green)] mb-0">
          <div className="font-bold text-[var(--green)] mb-2">🌾 Agronomist</div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{agroProp}</p>
        </div>
        <div className="glass-card border-l-4 border-[var(--amber)] mb-0">
          <div className="font-bold text-[var(--amber)] mb-2">💰 Economist</div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{econProp}</p>
        </div>
        <div className="glass-card border-l-4 border-[var(--coral)] mb-0">
          <div className="font-bold text-[var(--coral)] mb-2">🚛 Logistician</div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{logProp}</p>
        </div>
      </div>

      <div className="text-center my-10">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="12" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--green)" strokeWidth="12" strokeDasharray="78 235" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--amber)" strokeWidth="12" strokeDasharray="55 235" strokeDashoffset="-78" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--coral)" strokeWidth="12" strokeDasharray="39 235" strokeDashoffset="-133" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[var(--text-secondary)] uppercase leading-tight text-center px-4">
            Agent Priority
          </div>
        </div>
        <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
          Health 45% | Cost 35% | Logistics 20%
        </div>
      </div>

      <div className="glass-card border-2 border-[var(--blue)] text-center py-6 mb-8">
        <div className="text-lg font-bold text-[var(--text)]">{coordDecision}</div>
      </div>

      <div className="flex justify-center">
        <button 
          className="btn btn-primary px-10 py-4 shadow-xl shadow-teal-500/20 disabled:opacity-50" 
          onClick={startNegotiation}
          disabled={isNegotiating}
        >
          {isNegotiating ? 'Negotiating...' : 'Simulate Negotiation'}
        </button>
      </div>
    </div>
  );
}

function FarmsContent() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Farm Plot Management</h2>
      <div className="map-placeholder h-[300px] mb-8 text-xl">
        🗺️ Leaflet/OSM Map Active — Plot Detected
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card mb-0">
          <h3 className="font-bold mb-4">Soil Properties</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>pH Level</span><span className="font-bold">6.8</span></div>
            <div className="flex justify-between"><span>Organic Carbon</span><span className="font-bold">0.8%</span></div>
            <div className="flex justify-between"><span>Texture</span><span className="font-bold">Clay loam</span></div>
            <div className="flex justify-between"><span>Nitrogen</span><span className="font-bold">Medium</span></div>
          </div>
        </div>
        <div className="glass-card mb-0">
          <h3 className="font-bold mb-4">Sensor History</h3>
          <p className="text-xs text-[var(--text-secondary)] mb-4 font-bold uppercase tracking-widest">Moisture: 28‑35% range</p>
          <div className="flex items-end gap-2 h-16">
            {[60, 50, 70, 45, 55, 65].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-[#0D9488] to-[#3B82F6] rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn btn-primary px-8 py-3">+ Add New Plot</button>
    </div>
  );
}

function MarketContent() {
  const [wheatPrice, setWheatPrice] = useState(2150);
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Market Prices & Logistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card mb-0">
          <h3 className="font-bold mb-6">Live Mandi Prices</h3>
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Wheat (Grade A)</div>
                <div className="text-3xl font-black">₹{wheatPrice.toLocaleString()} <span className="text-sm font-normal text-[var(--green)]">/q ▲2.3%</span></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Maize</div>
                <div className="text-3xl font-black">₹1,870 <span className="text-sm font-normal text-red-500">/q ▼0.8%</span></div>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setWheatPrice(Math.floor(Math.random() * 500 + 1900))}
          >
            Refresh Prices
          </button>
        </div>
        <div className="glass-card mb-0">
          <h3 className="font-bold mb-6">Harvest Readiness</h3>
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-[var(--text-secondary)]">Growth Progress</span>
              <span className="font-bold">70%</span>
            </div>
            <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0D9488] to-[#3B82F6]" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-3">Estimated Harvest: <b>12 June 2026</b> (Day 120)</p>
          </div>
          <button className="btn btn-primary w-full" onClick={() => alert('Booking logistics...')}>Book Transport</button>
        </div>
      </div>
    </div>
  );
}

function ChatbotContent() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: 'Hello! Ask me anything about crops, irrigation, or schemes.' }
  ]);
  const [input, setInput] = useState('');
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const sendChat = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    setTimeout(() => {
      let reply = 'I recommend checking soil moisture before irrigating. Current moisture is 32%.';
      if (userMsg.toLowerCase().includes('fertilizer')) {
        reply = 'Apply 40 kg urea + 20 kg DAP per acre at 45 days. <br><small className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">Source: Wheat Agronomy Handbook</small>';
      } else if (userMsg.toLowerCase().includes('scheme')) {
        reply = 'You may be eligible for PM‑KISAN. Check the Schemes page for registration details.';
      }
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }, 800);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Farmer AI Assistant</h2>
      <div className="glass-card flex flex-col h-[550px] p-0 overflow-hidden">
        <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/30">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-br from-[#0D9488] to-[#3B82F6] text-white rounded-tr-none' 
                    : 'bg-[#F1F5F9] text-[var(--text)] rounded-tl-none border border-[var(--border)]'
                }`}
                dangerouslySetInnerHTML={{ __html: m.text }}
              />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[var(--border)] bg-white/50 flex gap-3">
          <input 
            className="input-field flex-1" 
            placeholder="Type your question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendChat()}
          />
          <button className="btn btn-primary px-6" onClick={sendChat}>Send</button>
        </div>
      </div>
    </div>
  );
}

function SchemesContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const schemes = [
    { name: 'PM‑KISAN', desc: '₹6,000/yr income support for all landholding farmers.' },
    { name: 'PMFBY', desc: 'Crop insurance against natural calamities.' },
    { name: 'Soil Health Card', desc: 'Free soil testing & nutrient recommendations.' },
    { name: 'e‑NAM', desc: 'Online national agriculture market.' },
    { name: 'Kisan Credit Card', desc: 'Crop loans at concessional interest rates.' },
    { name: 'PM Krishi Sinchai Yojana', desc: 'Irrigation infrastructure and water conservation.' }
  ];

  const filtered = schemes.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Government Schemes</h2>
      <input 
        className="input-field mb-8" 
        placeholder="Search schemes..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s, i) => (
          <div key={i} className="glass-card mb-0 hover:border-[var(--teal)] transition-colors group">
            <b className="text-lg block mb-2 group-hover:text-[var(--teal)] transition-colors">{s.name}</b>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)] mt-4 hover:underline">Apply Now &rarr;</button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--text-secondary)]">No schemes found matching "{searchTerm}"</div>
      )}
    </div>
  );
}

function AdminContent() {
  const [tab, setTab] = useState('users');
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <div className="flex border-b border-[var(--border)] mb-8">
        <button 
          onClick={() => setTab('users')} 
          className={`px-8 py-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all ${tab === 'users' ? 'border-[var(--teal)] text-[var(--teal)]' : 'border-transparent text-[var(--text-secondary)]'}`}
        >
          Users
        </button>
        <button 
          onClick={() => setTab('sim')} 
          className={`px-8 py-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all ${tab === 'sim' ? 'border-[var(--teal)] text-[var(--teal)]' : 'border-transparent text-[var(--text-secondary)]'}`}
        >
          Simulation
        </button>
      </div>

      <div className="glass-card p-0 overflow-hidden">
        {tab === 'users' ? (
          <table className="w-full text-left">
            <thead className="bg-[#F1F5F9] text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Credits</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-[var(--border)]">
                <td className="p-4 font-bold">Ramesh Kumar</td>
                <td className="p-4"><span className="bg-[#E0F2F1] text-[var(--teal)] px-2 py-0.5 rounded text-[10px] font-bold">PRO</span></td>
                <td className="p-4 font-mono">120</td>
                <td className="p-4 text-[var(--green)] font-bold">Active</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="p-4 font-bold">Sunita Devi</td>
                <td className="p-4"><span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold">FREE</span></td>
                <td className="p-4 font-mono">5</td>
                <td className="p-4 text-[var(--green)] font-bold">Active</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="p-8">
            <h3 className="font-bold mb-6">Inject Environmental Scenarios</h3>
            <div className="flex gap-4">
              <button className="btn btn-outline" onClick={() => alert('Drought injected! Agent will respond.')}>Drought</button>
              <button className="btn btn-outline" onClick={() => alert('Heavy rain injected!')}>Heavy Rain</button>
              <button className="btn btn-outline" onClick={() => alert('Pest alert injected!')}>Pest Outbreak</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Profile & Settings</h2>
      <div className="glass-card mb-8">
        <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-[var(--text-secondary)]">Account Information</h3>
        <div className="space-y-4 max-w-md">
          <div><label className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Full Name</label><div className="font-bold mt-1">Ramesh Kumar</div></div>
          <div><label className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Email Address</label><div className="font-bold mt-1">ramesh@example.com</div></div>
          <div><label className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Active Plan</label><div className="font-bold mt-1 text-[var(--teal)]">PRO</div></div>
          <button className="btn btn-outline btn-sm mt-4">Change Password</button>
        </div>
      </div>
      <div className="glass-card">
        <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-[var(--text-secondary)]">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--teal)]" />
            <span className="text-sm font-bold group-hover:text-[var(--teal)] transition-colors">SMS alerts for critical actions</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-[var(--teal)]" />
            <span className="text-sm font-bold group-hover:text-[var(--teal)] transition-colors">Weekly email reports</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--teal)]" />
            <span className="text-sm font-bold group-hover:text-[var(--teal)] transition-colors">Market price notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
}
