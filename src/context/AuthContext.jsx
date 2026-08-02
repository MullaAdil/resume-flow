import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiClient } from '../utils/apiClient';

const AuthContext = createContext({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithPassword: async () => {},
  signOut: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const currentUser = await apiClient.auth.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      console.error('Failed to get current user session:', err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signUp = async (email, password) => {
    const res = await apiClient.auth.signUp({ email, password });
    if (res?.user) {
      setUser(res.user);
    }
    return res;
  };

  const signInWithPassword = async (email, password) => {
    const res = await apiClient.auth.signInWithPassword({ email, password });
    if (res?.user) {
      setUser(res.user);
    }
    return res;
  };

  const signOut = async () => {
    await apiClient.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn: signInWithPassword,
      signInWithPassword,
      signOut,
      refreshUser: checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
