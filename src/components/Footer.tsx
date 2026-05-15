import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const footerLinks = [
    { name: 'Architecture', href: '/architecture' },
    { name: 'Agent Arena', href: '/agents' },
    { name: 'Negotiation', href: '/negotiation' },
    { name: 'Workflows', href: '/workflows' },
    { name: 'Tech Stack', href: '/tech-stack' },
    { name: 'Dev Book', href: '/dev-book' },
    { name: 'Live Demo', href: '/demo' }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer className="section-darker py-16 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌾</span>
              <div>
                <div className="text-white font-bold text-xl tracking-tight">Agri-<span className="text-emerald-400">Intelligence</span></div>
                <div className="text-slate-500 text-sm">Autonomous Multi-Agent Farming Ecosystem</div>
              </div>
            </div>
            <p className="text-slate-500 mb-6 max-w-md leading-relaxed">
              Transforming agriculture from reactive to proactive through AI-driven precision farming.
              Where specialized agents negotiate to optimize every farm decision.
            </p>
            <div className="flex items-center gap-4">
              <div className="glass-card px-4 py-2 rounded-lg">
                <div className="text-slate-500 text-xs">Prepared By</div>
                <div className="text-white font-semibold text-sm">Ayush Kumar Jha</div>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <div className="text-slate-500 text-xs">Institute</div>
                <div className="text-white font-semibold text-sm">IIT MADRAS</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div 
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default mb-4"
              onClick={() => toggleSection('navigate')}
            >
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigate</h4>
              <div className="md:hidden text-slate-500">
                {expandedSection === 'navigate' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSection === 'navigate' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-slate-500 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div 
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default mb-4"
              onClick={() => toggleSection('project')}
            >
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Project Info</h4>
              <div className="md:hidden text-slate-500">
                {expandedSection === 'project' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            <ul className={`space-y-3 text-slate-500 text-sm overflow-hidden transition-all duration-300 ${expandedSection === 'project' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
                Agricultural Sector Transformation
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                IIT MADRAS, India
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                2026
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-600 text-sm">
              © 2026 Agri-Intelligence. Agricultural Sector Transformation.
            </div>
            <div className="flex items-center gap-6">
              <span className="text-slate-600 text-sm">React + Three.js + Tailwind</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-400/70 text-sm">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
