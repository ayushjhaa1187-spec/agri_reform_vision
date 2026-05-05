import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Home from './pages/Home';
import Architecture from './pages/Architecture';
import Agents from './pages/Agents';
import Negotiation from './pages/Negotiation';
import Workflows from './pages/Workflows';
import TechStack from './pages/TechStack';
import Timeline from './pages/Timeline';
import DevBook from './pages/DevBook';
import Demo from './pages/Demo';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

const pageTransition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1],
  duration: 0.35,
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
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
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#030a06]">
        <CustomCursor />
        <Navigation />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
