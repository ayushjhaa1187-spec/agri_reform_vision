import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Problem', href: '#problem' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Agents', href: '#agents' },
    { name: 'Predictor', href: '#predict' },
    { name: 'Demo', href: '#demo' },
    { name: 'Tech Stack', href: '#tech' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (location.pathname !== '/') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIsActive = (href: string) => {
    if (location.pathname !== '/') return false;
    if (location.hash === href) return true;
    if (location.hash === '' && href === '#problem') return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-black/20 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🌾</span>
          <span className="text-[var(--accent-green)] font-bold text-lg tracking-widest uppercase">AGRI-INTELLIGENCE</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = getIsActive(item.href);
            return (
              <Link
                key={item.name}
                to={location.pathname === '/' ? item.href : `/${item.href}`}
                onClick={(e: any) => handleNavClick(e, item.href)}
                className={`relative text-sm font-medium py-1 transition-colors ${isActive ? 'text-[var(--text-primary)]' : 'text-gray-400 hover:text-white'}`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[var(--accent-green)] rounded-full"
                  />
                )}
              </Link>
            );
          })}
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/billing" className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-[var(--accent-green-glow)] rounded-full border border-white/10 transition-colors group">
                  <UserIcon size={14} className="text-[var(--accent-green)]" />
                  <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-tighter group-hover:text-[var(--accent-green)]">
                    {user?.email?.split('@')[0]}
                  </span>
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-400 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
