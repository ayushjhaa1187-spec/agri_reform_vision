import { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectScreen from '../components/ConnectScreen';
import FarmOnboarding from '../components/FarmOnboarding';
import { Loader2 } from 'lucide-react';

export default function DemoPage() {
  const [hasFarm, setHasFarm] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkFarm = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.get(`${apiUrl}/farms/`);
      setHasFarm(response.data.length > 0);
    } catch (error) {
      // If unauthorized or error, fallback to false
      setHasFarm(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFarm();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030a06] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-emerald-500 mb-4 mx-auto" size={40} />
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Loading Intelligence Core...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {!hasFarm && <FarmOnboarding onComplete={() => setHasFarm(true)} />}
      <ConnectScreen />
    </div>
  );
}
