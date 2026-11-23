import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, setAccessToken } from '../lib/api';
export interface User { id: string; email: string; displayName: string; role: 'MEMBER' | 'ADMIN' }
const Context = createContext<{ user: User | null; ready: boolean; login: (email: string, password: string) => Promise<void>; logout: () => Promise<void> } | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    void api<{ user: User; accessToken: string }>('/auth/refresh', { method: 'POST' }, false).then(data => { if (active) { setAccessToken(data.accessToken); setUser(data.user); } }).catch(() => {}).finally(() => { if (active) setReady(true); });
    const expired = () => { setUser(null); };
    window.addEventListener('auth-expired', expired);
    return () => { active = false; window.removeEventListener('auth-expired', expired); };
  }, []);
  const login = async (email: string, password: string) => {
    const data = await api<{ user: User; accessToken: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }, false);
    setAccessToken(data.accessToken); setUser(data.user);
  };
  const logout = async () => { await api('/auth/logout', { method: 'POST' }, false); setAccessToken(null); setUser(null); };
  return <Context.Provider value={{ user, ready, login, logout }}>{children}</Context.Provider>;
}
export function useAuth() { const value = useContext(Context); if (!value) throw new Error('AuthProvider missing'); return value; }
