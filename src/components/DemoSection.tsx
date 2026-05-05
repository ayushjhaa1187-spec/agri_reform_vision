import { useState, useEffect, useRef } from 'react';
import FadeInSection from './ui/FadeInSection';

const MOCK_LOGS = [
  { agent: 'Agronomist', type: 'alert', msg: 'Soil moisture 32% — below optimal threshold' },
  { agent: 'Economist', type: 'negotiation', msg: 'Counter-proposal: Delay irrigation 6h to off-peak tariff' },
  { agent: 'Logistician', type: 'negotiation', msg: 'Warning: Soil >55% would block harvester field access' },
  { agent: 'Coordinator', type: 'decision', msg: 'Final: Schedule pump for 14:01 @ 40% capacity (₹840 saved)' },
  { agent: 'System', type: 'ml', msg: 'Disease risk score updated: Low (12%)' },
  { agent: 'Sensor', type: 'data', msg: 'Inbound weather: 65% rain probability in 42h' },
];

export default function DemoSection() {
  const [logs, setLogs] = useState<typeof MOCK_LOGS>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, MOCK_LOGS[i % MOCK_LOGS.length]].slice(-50));
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="demo" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <FadeInSection>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Agent Decision Feed</h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Watch the <span className="text-white font-medium italic">Negotiation Room</span> in real-time. Our agents don't just output data—they debate trade-offs to reach a consensus that balances health, cost, and logistics.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-bold transition-all text-sm">
              View All Logs
            </button>
            <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors text-sm font-bold">
              Download Audit Trail
            </button>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="bg-black/60 backdrop-blur-md border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl shadow-emerald-500/5">
            {/* Terminal Header */}
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
              </div>
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                Negotiation-Room_v1.0.4
              </div>
            </div>
            
            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="p-6 h-64 overflow-y-auto font-mono text-sm scrollbar-thin"
            >
              <div className="space-y-3">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-3 animate-slide-in">
                    <span className="text-gray-600">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      log.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                      log.type === 'negotiation' ? 'bg-amber-500/20 text-amber-400' :
                      log.type === 'decision' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {log.agent}
                    </span>
                    <span className="text-gray-300">{log.msg}</span>
                  </div>
                ))}
                <div className="flex gap-3">
                  <span className="text-gray-600">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  <span className="text-emerald-400 animate-pulse font-bold">_</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
