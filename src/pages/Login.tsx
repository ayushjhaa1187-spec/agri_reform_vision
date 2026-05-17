import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signInWithGoogle, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(location.state?.from?.pathname || '/demo');
    }
  }, [isAuthenticated, loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setIsLoading(true);
    try {
      const apiUrl = API_URL;
      const response = await axios.post(`${apiUrl}/users/login`, { email, password });
      login(response.data.access_token);
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-5">
      <div className="auth-container mt-0 w-full animate-fadeIn">
        <div className="flex justify-center mb-6">
          <span className="text-4xl">🌾</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Welcome back</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="farmer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" style={{ color: 'var(--teal)' }} className="text-xs hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary w-full py-3 mt-2 disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center my-5 text-[var(--text-secondary)] text-sm">or</div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full py-3 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Continue with Google'}
        </button>

        <p className="text-center mt-8 text-sm text-[var(--text-secondary)]">
          New? <Link to="/register" style={{ color: 'var(--teal)' }} className="font-bold hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
