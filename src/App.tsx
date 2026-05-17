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
import Footer from './components/Footer';

const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)' },
  out: { opacity: 0, y: -8, filter: 'blur(2px)' },
};

const pageTransition: any = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1],
  duration: 0.45,
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
          <Route 
            path="/architecture" 
            element={
              <ProtectedRoute>
                <Architecture />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agents" 
            element={
              <ProtectedRoute>
                <Agents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/negotiation" 
            element={
              <ProtectedRoute>
                <Negotiation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/workflows" 
            element={
              <ProtectedRoute>
                <Workflows />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tech-stack" 
            element={
              <ProtectedRoute>
                <TechStack />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timeline" 
            element={
              <ProtectedRoute>
                <Timeline />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dev-book" 
            element={
              <ProtectedRoute>
                <DevBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/demo" 
            element={
              <ProtectedRoute>
                <Demo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideFooterOn = ['/login', '/register', '/demo', '/billing'];
  const shouldHideFooter = hideFooterOn.includes(location.pathname);

  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#030a06]">
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
          <LayoutWrapper>
            <AnimatedRoutes />
          </LayoutWrapper>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}
