import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAudio from '../hooks/useAudio';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const audio = useAudio();
  const [muted, setMuted] = useState(audio.isMuted);

  const navItems = [
    { name: 'Overview', href: '/' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Agents', href: '/agents' },
    { name: 'Negotiation', href: '/negotiation' },
    { name: 'Workflows', href: '/workflows' },
    { name: 'Tech Stack', href: '/tech-stack' },
    { name: 'Roadmap', href: '/timeline' },
    { name: 'Dev Book', href: '/dev-book' },
    { name: 'Demo', href: '/demo' }
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    audio.playClick();
  };

  const toggleMute = () => {
    audio.initContext();
    audio.toggleMute();
    setMuted(!muted);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/30 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 group">
            <span className="text-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">🌾</span>
            <span className="text-white/90 font-bold text-lg hidden sm:block tracking-tight">
              Agri-<span className="text-emerald-400">Intelligence</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-emerald-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: Mute toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="p-2 text-slate-500 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/5"
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
              title={muted ? 'Enable sounds' : 'Mute sounds'}
            >
              {muted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            <Link
              to="/demo"
              onClick={handleNavClick}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm shadow-lg shadow-emerald-500/20"
            >
              Live Demo
            </Link>
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
          <div className="lg:hidden py-4 border-t border-white/[0.06]">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    location.pathname === item.href
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/demo"
                onClick={handleNavClick}
                className="mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg text-sm text-center"
              >
                Live Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
