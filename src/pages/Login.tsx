import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // For the prototype, we simulate a successful login
      // In a real app, you'd call an API here
      await login('mock_token');
      toast.success('Welcome back!');
      navigate('/demo'); 
    } catch (error: any) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-5">
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
          onClick={() => signInWithGoogle()}
          className="btn btn-outline w-full py-3"
        >
          Continue with Google
        </button>

        <p className="text-center mt-8 text-sm text-[var(--text-secondary)]">
          New? <Link to="/register" style={{ color: 'var(--teal)' }} className="font-bold hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
