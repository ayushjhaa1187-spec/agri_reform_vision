import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ConnectScreen from '../components/ConnectScreen';
import YieldPredictor from '../components/YieldPredictor';
import MultiAgentSystem from '../components/MultiAgentSystem';
import Workflows from '../components/Workflows';
import TechStack from '../components/TechStack';
import AnimSidebarTruck from '../components/ui/AnimSidebarTruck';

export default function DemoPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Phase 5 Target: Dynamic Metrics state
  const [stats, setStats] = useState({
    interactions: 0,
    schemesChecked: 0,
    analysesPerformed: 0,
    lastUpdate: 'System Start'
  });

  const incrementInteractions = () => setStats(prev => ({ ...prev, interactions: prev.interactions + 1, lastUpdate: 'Chatbot Active' }));
  const incrementSchemes = () => setStats(prev => ({ ...prev, schemesChecked: prev.schemesChecked + 1, lastUpdate: 'Policy Audit' }));
  const incrementAnalyses = () => setStats(prev => ({ ...prev, analysesPerformed: prev.analysesPerformed + 1, lastUpdate: 'ML Inference' }));

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <ConnectScreen externalStats={stats} onManualUpdate={incrementAnalyses} />;
      case 'agents': return <MultiAgentSystem />;
      case 'predictor': return <YieldPredictor onPredict={incrementAnalyses} />;
      case 'workflows': return <Workflows />;
      case 'tech': return <TechStack />;
      case 'chatbot': return <ChatbotContent onMessage={incrementInteractions} />;
      case 'schemes': return <SchemesContent onCheck={incrementSchemes} />;
      case 'settings': return <SettingsContent />;
      case 'admin': return <AdminContent stats={stats} />;
      default: return <ConnectScreen externalStats={stats} />;
    }
  };

  const SidebarItem = ({ id, label, icon }: { id: string; label: string; icon: string }) => (
    <div 
      onClick={() => { setActivePage(id); setIsMobileSidebarOpen(false); }} 
      className={`sidebar-item ${activePage === id ? 'active' : ''}`}
    >
      <span>{icon}</span> {label}
    </div>
  );

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-8 group cursor-pointer" onClick={() => navigate('/')}>
        <span className="text-xl group-hover:scale-110 transition-transform">🌾</span>
        <span className="text-[var(--accent-green)] font-black text-lg tracking-widest uppercase">AGRI</span>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="mb-6">
          <div className="text-[var(--text-muted)] uppercase text-[9px] font-black tracking-widest mb-2 px-2">Core</div>
          <div className="space-y-1">
            <SidebarItem id="dashboard" label="Dashboard" icon="📊" />
            <SidebarItem id="agents" label="Agent Arena" icon="🤖" />
            <SidebarItem id="predictor" label="Yield Predictor" icon="🔬" />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[var(--text-muted)] uppercase text-[9px] font-black tracking-widest mb-2 px-2">Intelligence</div>
          <div className="space-y-1">
            <SidebarItem id="chatbot" label="AI Assistant" icon="💬" />
            <SidebarItem id="schemes" label="Schemes" icon="📜" />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[var(--text-muted)] uppercase text-[9px] font-black tracking-widest mb-2 px-2">System</div>
          <div className="space-y-1">
            <SidebarItem id="workflows" label="Workflows" icon="⚙️" />
            <SidebarItem id="tech" label="Tech Stack" icon="💻" />
            <SidebarItem id="settings" label="Profile" icon="👤" />
            <SidebarItem id="admin" label="Admin" icon="🛠️" />
          </div>
        </div>
      </div>

      <AnimSidebarTruck isActive={activePage === 'dashboard' || activePage === 'schemes'} />

      <div className="mt-auto pt-6 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-sm shadow-md">
            {user?.email?.charAt(0).toUpperCase() || 'R'}
          </div>
          <div>
            <div className="font-semibold text-sm text-[var(--text-primary)]">{user?.email?.split('@')[0] || 'Ramesh'}</div>
            <div className="bg-[var(--accent-green-glow)] text-[var(--text-accent)] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter inline-block">Pro</div>
          </div>
        </div>
        <div 
          onClick={() => { logout(); navigate('/'); }} 
          className="text-xs font-bold text-[var(--text-muted)] mt-4 cursor-pointer hover:text-red-400 transition-colors flex items-center gap-2"
        >
          🚪 Logout
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[240px] bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-6 flex-col flex-shrink-0 animate-slide-in">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar FAB */}
      <div className="md:hidden fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setIsMobileSidebarOpen(true)}
          className="w-14 h-14 bg-[var(--accent-green)] text-black rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center text-2xl"
        >
          🧭
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-6 z-50 flex flex-col md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
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

function ChatbotContent({ onMessage }: { onMessage: () => void }) {
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
    onMessage(); // Trigger metric update
    
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

function SchemesContent({ onCheck }: { onCheck: () => void }) {
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
            <button 
              onClick={() => { toast.success(`Applied for ${s.name}`); onCheck(); }}
              className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)] mt-4 hover:underline"
            >
              Apply Now &rarr;
            </button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--text-secondary)]">No schemes found matching "{searchTerm}"</div>
      )}
    </div>
  );
}

function AdminContent({ stats }: { stats: any }) {
  const [tab, setTab] = useState('users');
  const { user } = useAuth();
  
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

      <div className="glass-card p-0 overflow-hidden border-[var(--border-subtle)]">
        {tab === 'users' ? (
          <table className="w-full text-left">
            <thead className="bg-[var(--bg-elevated)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Credits</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[var(--text-secondary)]">
              <tr className="border-t border-[var(--border-subtle)]">
                <td className="p-4 font-bold text-[var(--text-primary)]">{user?.email?.split('@')[0] || 'Ramesh Kumar'}</td>
                <td className="p-4"><span className="bg-[var(--accent-green-glow)] text-[var(--text-accent)] px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-[var(--border-accent)]">{user?.subscription_tier || 'PRO'}</span></td>
                <td className="p-4 font-mono">{user?.ai_credits || 120 + stats.interactions}</td>
                <td className="p-4 text-[var(--accent-green)] font-bold">Active</td>
              </tr>
              <tr className="border-t border-[var(--border-subtle)]">
                <td className="p-4 font-bold text-[var(--text-primary)]">Sunita Devi</td>
                <td className="p-4"><span className="bg-white/5 text-[var(--text-muted)] px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-white/10">FREE</span></td>
                <td className="p-4 font-mono">5</td>
                <td className="p-4 text-[var(--accent-green)] font-bold opacity-80">Active</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="p-8 bg-[var(--bg-primary)]/20">
            <h3 className="font-bold mb-6">Inject Environmental Scenarios</h3>
            <div className="flex gap-4">
              <button className="btn btn-outline" onClick={() => toast.error('Drought injected! Agents calculating response...')}>Drought</button>
              <button className="btn btn-outline" onClick={() => toast('Heavy rain alert sent to field sensors.')}>Heavy Rain</button>
              <button className="btn btn-outline" onClick={() => toast.error('Pest alert! Logistician agent preparing transport.')}>Pest Outbreak</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsContent() {
  const { user } = useAuth();
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8">Profile & Settings</h2>
      <div className="glass-card mb-8">
        <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-[var(--text-secondary)]">Account Information</h3>
        <div className="space-y-4 max-w-md">
          <div><label className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Full Name</label><div className="font-bold mt-1 uppercase">{user?.email?.split('@')[0] || 'Ramesh Kumar'}</div></div>
          <div><label className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Email Address</label><div className="font-bold mt-1">{user?.email || 'ramesh@example.com'}</div></div>
          <div><label className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Active Plan</label><div className="font-bold mt-1 text-[var(--teal)] uppercase">{user?.subscription_tier || 'PRO'}</div></div>
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
