import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ExecutiveSummary from '../components/ExecutiveSummary';
import SystemArchitecture from '../components/SystemArchitecture';
import MultiAgentSystem from '../components/MultiAgentSystem';
import Workflows from '../components/Workflows';
import Solution from '../components/Solution';
import Timeline from '../components/Timeline';
import Impact from '../components/Impact';
import YieldPredictor from '../components/YieldPredictor';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/demo');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#030712] min-h-screen text-white">
      <Navbar />
      <main>
        <Hero />
        <ExecutiveSummary />
        <SystemArchitecture />
        <MultiAgentSystem />
        <YieldPredictor />
        <Workflows />
        <Solution />
        <Timeline />
        <Impact />
      </main>
    </div>
  );
}
