import { useState } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: 'hero' },
    { name: 'Architecture', href: 'architecture' },
    { name: 'Agents', href: 'agents' },
    { name: 'Negotiation', href: 'negotiation' },
    { name: 'Workflows', href: 'workflows' },
    { name: 'Tech Stack', href: 'tech-stack' },
    { name: 'Sprint', href: 'timeline' },
    { name: 'Dev Book', href: 'command-book' },
    { name: 'Demo', href: 'connect' }
  ];

  const handleNavClick = (href: string) => {
    onNavigate(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNavClick('hero')} className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <span className="text-white font-bold text-lg hidden sm:block">Agri-Intelligence</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('connect')}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm"
            >
              Live Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('connect')}
                className="mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg text-sm text-center"
              >
                Live Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
