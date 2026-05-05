import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSolutionSection from '../components/ProblemSolutionSection';
import ArchitectureSection from '../components/ArchitectureSection';
import AgentsSection from '../components/AgentsSection';
import DemoSection from '../components/DemoSection';
import TechStackSection from '../components/TechStackSection';
import FooterSection from '../components/FooterSection';

export default function Home() {
  return (
    <div className="bg-[#030a06] min-h-screen text-white selection:bg-emerald-500/30">
      <Navbar />
      <HeroSection />
      <ProblemSolutionSection />
      <ArchitectureSection />
      <AgentsSection />
      <DemoSection />
      <TechStackSection />
      <FooterSection />
    </div>
  );
}
