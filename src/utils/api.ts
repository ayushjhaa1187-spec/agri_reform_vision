const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

export const API_URL = import.meta.env.VITE_API_URL || 
  (isProduction 
    ? window.location.origin + '/api' 
    : 'http://localhost:8000');

export const WS_URL = import.meta.env.VITE_WS_URL || 
  (isProduction 
    ? 'wss://agri-backend.onrender.com/ws/agent-feed' 
    : 'ws://localhost:8000/ws/agent-feed');
