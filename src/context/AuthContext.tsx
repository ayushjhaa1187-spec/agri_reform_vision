import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

/**
 * Production Hardening Note:
 * Current authentication uses localStorage for token persistence. 
 * Long-term security plan: Migrate to HttpOnly, Secure, SameSite cookies 
 * to mitigate XSS-based token theft.
 */

interface User {
  email: string;
  role: string;
  ai_credits?: number;
  subscription_tier?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  signup: (email: string, pass: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

import { API_URL } from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Environment-based gating for mock features
const ALLOW_MOCK = import.meta.env.VITE_ALLOW_MOCK_AUTH === 'true' || import.meta.env.DEV;

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    // Mock token recognition gated by ALLOW_MOCK
    if (token.startsWith('mock_')) return ALLOW_MOCK;
    
    const base64Url = token.split('.')[1];
    if (!base64Url) return false;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { exp } = JSON.parse(jsonPayload);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('agri_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      setLoading(true);
      if (token && isTokenValid(token)) {
        localStorage.setItem('agri_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get(`${API_URL}/users/me`);
          setUser(response.data);
        } catch (error) {
          console.error('Session validation failed', error);
          logout();
        }
      } else {
        if (token) {
          console.warn('Token invalid or expired, clearing session.');
          logout();
        } else {
          localStorage.removeItem('agri_token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateSession();
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const signup = async (email: string, pass: string, name: string = 'Farmer') => {
    try {
      await axios.post(`${API_URL}/users/register`, {
        email,
        password: pass,
        full_name: name
      });
      
      const loginRes = await axios.post(`${API_URL}/users/login`, {
        email,
        password: pass
      });
      
      login(loginRes.data.access_token);
    } catch (err: any) {
      console.error('Signup error', err);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    if (!ALLOW_MOCK) {
      toast.error('Social login is currently disabled for security.');
      return;
    }
    // Simulating Google OAuth redirect and callback
    return new Promise<void>((resolve) => {
      const loadToast = toast.loading('Connecting to Google...');
      setTimeout(() => {
        toast.dismiss(loadToast);
        toast.success('Signed in with Google (Mock)');
        login('mock_google_token');
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('agri_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user && !!token, 
      loading, 
      signInWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
