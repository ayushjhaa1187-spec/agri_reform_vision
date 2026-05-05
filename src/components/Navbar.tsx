import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Problem', href: '#problem' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Agents', href: '#agents' },
    { name: 'Demo', href: '#demo' },
    { name: 'Tech Stack', href: '#tech' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
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
        <a href="#hero" onClick={(e) => handleScroll(e, '#hero')} className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🌾</span>
          <span className="text-xl font-bold text-white tracking-tighter">Agri-<span className="text-emerald-400">Intelligence</span></span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#demo"
            onClick={(e) => handleScroll(e, '#demo')}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all text-sm hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
