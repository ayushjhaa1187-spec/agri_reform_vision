import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCustomToken
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  loginWithGoogle: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  sendVerification: () => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Login failed:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user && !userCredential.user.emailVerified) {
        toast.error('Please verify your email address.');
      }
    } catch (error) {
      console.error('Email Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        toast.success('Verification email sent! Please check your inbox.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const sendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success('Verification email sent!');
      } catch (error) {
        console.error('Verification failed:', error);
        toast.error('Failed to send verification email.');
      }
    }
  };

  const loginWithToken = async (token: string) => {
    try {
      await signInWithCustomToken(auth, token);
      toast.success('Logged in with secure token.');
    } catch (error) {
      console.error('Token login failed:', error);
      toast.error('Invalid secure token.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      isEmailVerified: user?.emailVerified || false,
      loginWithGoogle, 
      login,
      signup,
      sendVerification,
      loginWithToken,
      logout 
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
