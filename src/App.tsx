import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor from './components/ui/CustomCursor';
import Chatbot from './components/ui/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Architecture from './pages/Architecture';
import Agents from './pages/Agents';
import Negotiation from './pages/Negotiation';
import Workflows from './pages/Workflows';
import TechStack from './pages/TechStack';
import Timeline from './pages/Timeline';
import DevBook from './pages/DevBook';
import Demo from './pages/Demo';
import Billing from './pages/Billing';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

const pageTransition: any = {
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/negotiation" element={<Negotiation />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/dev-book" element={<DevBook />} />
          <Route 
            path="/demo" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#030a06]">
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#0d1321',
                color: '#fff',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
          <CustomCursor />
          <main>
            <AnimatedRoutes />
          </main>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}
