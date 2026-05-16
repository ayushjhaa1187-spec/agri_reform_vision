import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    crop: 'Wheat',
    area: 5.2,
    location: ''
  });
  const { signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/demo');
    }
  }, [isAuthenticated, loading, navigate]);

  const validateStep = () => {
    if (step === 0) {
      if (!formData.name.trim()) return 'Name is required';
      if (!formData.phone.trim()) return 'Phone number is required';
      if (formData.password.length < 6) return 'Password must be at least 6 characters';
    } else if (step === 1) {
      if (!formData.location.trim()) return 'Location is required';
      if (formData.area <= 0) return 'Area must be greater than 0';
    }
    return null;
  };

  const handleNext = async () => {
    const error = validateStep();
    if (error) {
      toast.error(error);
      return;
    }

    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Appending timestamp to avoid collisions
        const uniqueEmail = `${formData.name.replace(/\s+/g, '').toLowerCase()}${Date.now()}@example.com`;
        await signup(uniqueEmail, formData.password, formData.name);
        toast.success('Account created! Welcome.');
      } catch (err: any) {
        toast.error(err.response?.data?.detail || 'Registration failed.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-5">
      <div className="auth-container mt-0 w-full max-w-[500px] animate-fadeIn">
        <div className="flex justify-center mb-6">
          <span className="text-4xl">🌾</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Create your farm account</h2>
        
        <div className="flex gap-2 justify-center mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1.5 w-10 rounded-full transition-colors ${i <= step ? 'bg-[var(--teal)]' : 'bg-[var(--border)]'}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Full Name</label>
              <input 
                className="input-field" 
                placeholder="Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Phone</label>
              <input 
                className="input-field" 
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Password</label>
              <input 
                type="password" 
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-bold text-lg mb-4 text-center">Farm Details</h3>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Crop</label>
              <select 
                className="input-field appearance-none bg-white"
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
              >
                <option>Wheat</option>
                <option>Rice</option>
                <option>Maize</option>
                <option>Sugarcane</option>
                <option>Cotton</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Area (acres)</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Location (Village/District)</label>
              <input 
                className="input-field" 
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4 animate-fadeIn">
            <h3 className="font-bold text-xl">Confirm & Start</h3>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] text-left space-y-2">
              <p><span className="text-[var(--text-secondary)]">Name:</span> <b>{formData.name}</b></p>
              <p><span className="text-[var(--text-secondary)]">Phone:</span> <b>{formData.phone}</b></p>
              <p><span className="text-[var(--text-secondary)]">Crop:</span> <b>{formData.crop}</b></p>
              <p><span className="text-[var(--text-secondary)]">Area:</span> <b>{formData.area} acres</b></p>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">Your account is ready. Start your free trial.</p>
          </div>
        )}

        <button 
          className="btn btn-primary w-full py-4 mt-8 shadow-lg shadow-teal-500/20 disabled:opacity-50"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : (step === 2 ? 'Go to Dashboard' : 'Continue')}
        </button>

        <p className="text-center mt-8 text-sm text-[var(--text-secondary)]">
          Already have a farm? <Link to="/login" style={{ color: 'var(--teal)' }} className="font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
