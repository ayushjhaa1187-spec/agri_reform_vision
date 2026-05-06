import React from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const DebugAuth: React.FC = () => {
  const { user, loginWithGoogle, logout, loading } = useAuth();

  const testSupabase = async () => {
    try {
      const { data, error } = await supabase.from('farms').select('*').limit(1);
      if (error) throw error;
      console.log('Supabase connection successful:', data);
      alert('Supabase connection successful! Check console.');
    } catch (err: any) {
      console.error('Supabase error:', err.message);
      alert('Supabase error: ' + err.message);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/80 p-4 rounded-lg border border-white/10 text-xs text-white">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <p>Status: {loading ? 'Loading...' : user ? 'Logged In' : 'Logged Out'}</p>
      {user && <p>Email: {user.email}</p>}
      <div className="flex gap-2 mt-2">
        {!user ? (
          <button onClick={loginWithGoogle} className="px-2 py-1 bg-blue-600 rounded">Login</button>
        ) : (
          <button onClick={logout} className="px-2 py-1 bg-red-600 rounded">Logout</button>
        )}
        <button onClick={testSupabase} className="px-2 py-1 bg-green-600 rounded">Test Supabase</button>
      </div>
    </div>
  );
};

export default DebugAuth;
