import FadeInSection from './ui/FadeInSection';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12 items-center mb-12">
        <FadeInSection>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-bold text-white tracking-tighter">Agri<span className="text-emerald-400">Intelligence</span></span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Revolutionizing agriculture through explainable autonomous multi-agent ecosystems. Built at IIT Madras.
          </p>
        </FadeInSection>

        <div className="flex justify-center gap-8">
          <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">Github</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">License</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white/5 transition-all group"
          >
            <svg className="w-5 h-5 text-emerald-400 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">
        <div>© 2026 TEAM AGRI-INTELLIGENCE · IIT MADRAS</div>
        <div className="flex gap-4">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
