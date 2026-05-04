export default function Footer() {
  return (
    <footer className="bg-slate-900 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌾</span>
              <div>
                <div className="text-white font-bold text-xl">Agri-Intelligence</div>
                <div className="text-slate-400 text-sm">Autonomous Multi-Agent Farming Ecosystem</div>
              </div>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Transforming agriculture from reactive to proactive through AI-driven precision farming. 
              Where specialized agents negotiate to optimize every farm decision.
            </p>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-slate-400 text-xs">Prepared By</div>
                <div className="text-white font-semibold">Ayush Kumar Jha</div>
              </div>
              <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-slate-400 text-xs">Institute</div>
                <div className="text-white font-semibold">IIT MADRAS</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Architecture', href: '#architecture' },
                { name: 'Multi-Agent System', href: '#agents' },
                { name: 'Negotiation Protocol', href: '#negotiation' },
                { name: 'Workflows', href: '#workflows' },
                { name: 'Tech Stack', href: '#tech-stack' },
                { name: 'Dev Command Book', href: '#command-book' },
                { name: 'Live Demo', href: '#connect' }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Project Info</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Smart India Hackathon 2026
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                IIT MADRAS, India
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                May 4, 2026
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              © 2026 Agri-Intelligence. Smart India Hackathon Proposal.
            </div>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 text-sm">Built with React + Tailwind CSS</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 text-sm">Prototype Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
