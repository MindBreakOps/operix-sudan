import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseClient } from '../config/supabase';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	// Check active sessions and sets the user
	supabaseClient.auth.getSession().then(({ data: { session } }) => {
	  setUser(session?.user ?? null);
	  setLoading(false);
	});

	// Listen for changes on auth state (login, sign out, etc.)
	const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
	  setUser(session?.user ?? null);
	});

	return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
	return await supabaseClient.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
	await supabaseClient.auth.signOut();
  };

  return (
	<AuthContext.Provider value={{ user, login, logout, loading }}>
	  {!loading && children}
	</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);