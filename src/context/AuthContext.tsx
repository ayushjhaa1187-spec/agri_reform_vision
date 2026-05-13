import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  signup: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('agri_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('agri_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // In a real app, we'd fetch the user profile from /users/me here
      // For now, setting a mock user based on the token
      setUser({ email: 'farmer@example.com', role: 'farmer' });
    } else {
      localStorage.removeItem('agri_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const signup = async (email: string, pass: string) => {
    // Mock signup
    console.log('Signing up:', email, pass);
    login('mock_signup_token');
  };

  const signInWithGoogle = async () => {
    // This would typically use Supabase or Firebase
    // For now, mocking a successful Google login for the prototype
    toast.success('Signed in with Google (Mock)');
    login('mock_google_token');
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isAuthenticated: !!token, loading, signInWithGoogle }}>
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
