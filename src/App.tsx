import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Architecture from './pages/Architecture';
import Agents from './pages/Agents';
import Negotiation from './pages/Negotiation';
import Workflows from './pages/Workflows';
import TechStack from './pages/TechStack';
import Timeline from './pages/Timeline';
import DevBook from './pages/DevBook';
import Demo from './pages/Demo';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/negotiation" element={<Negotiation />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/dev-book" element={<DevBook />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
