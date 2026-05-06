import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSolutionSection from '../components/ProblemSolutionSection';
import ArchitectureSection from '../components/ArchitectureSection';
import AgentsSection from '../components/AgentsSection';
import DemoSection from '../components/DemoSection';
import TechStackSection from '../components/TechStackSection';
import YieldPredictor from '../components/YieldPredictor';
import FooterSection from '../components/FooterSection';

export default function Home() {
  return (
    <div className="bg-[#030a06] min-h-screen text-white selection:bg-emerald-500/30">
      <Navbar />
      <HeroSection />
      <div className="section-separator" />
      <ProblemSolutionSection />
      <div className="section-separator" />
      <ArchitectureSection />
      <div className="section-separator" />
      <AgentsSection />
      <div className="section-separator" />
      <YieldPredictor />
      <div className="section-separator" />
      <DemoSection />
      <div className="section-separator" />
      <TechStackSection />
      <div className="section-separator" />
      <FooterSection />
    </div>
  );
}
