import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    if (location.pathname !== '/') {
      // If not on home, let the default Link behavior happen or navigate manually
      return;
    }

    // On home, prevent default and smooth scroll
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-black/20 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🌾</span>
          <span className="text-xl font-bold text-white tracking-tighter">Agri<span className="text-emerald-400">Intelligence</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={location.pathname === '/' ? item.href : `/${item.href}`}
              onClick={(e: any) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/demo"
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all text-sm hover:scale-105"
          >
            Live App
          </Link>
        </div>
      </div>
    </nav>
  );
}
