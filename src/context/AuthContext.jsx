import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

const AuthContext = createContext({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is an active session in local storage
    const checkSession = async () => {
      try {
        const currentUser = await apiClient.auth.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to get current user session:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signUp = async (email, password) => {
    const { user: newUser } = await apiClient.auth.signUp({ email, password });
    setUser(newUser);
    return newUser;
  };

  const signIn = async (email, password) => {
    const { user: existingUser } = await apiClient.auth.signInWithPassword({ email, password });
    setUser(existingUser);
    return existingUser;
  };

  const signOut = async () => {
    await apiClient.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

