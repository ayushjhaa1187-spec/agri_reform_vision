import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DeveloperCommandBook from './components/DeveloperCommandBook';
import ExecutiveSummary from './components/ExecutiveSummary';
import SystemArchitecture from './components/SystemArchitecture';
import MultiAgentSystem from './components/MultiAgentSystem';
import NegotiationProtocol from './components/NegotiationProtocol';
import Workflows from './components/Workflows';
import Solution from './components/Solution';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import SuccessCriteria from './components/SuccessCriteria';
import Impact from './components/Impact';
import ConnectScreen from './components/ConnectScreen';
import Footer from './components/Footer';

export default function App() {
  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <ExecutiveSummary />
        <SystemArchitecture />
        <MultiAgentSystem />
        <NegotiationProtocol />
        <Workflows />
        <Solution />
        <TechStack />
        <Timeline />
        <SuccessCriteria />
        <Impact />
        <DeveloperCommandBook />
        <ConnectScreen />
      </main>
      <Footer />
    </div>
  );
}
