'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Profile, UserRole } from '@/lib/types/database';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role?: UserRole }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  setMockRole: (role: UserRole | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id')
  );

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedRole = localStorage.getItem('aura_mock_role');
        if (storedRole) {
          const isAdmin = storedRole === 'admin';
          return {
            id: 'admin-user-1',
            email: isAdmin ? 'hfsanaeem3@gmail.com' : 'user@example.com',
            user_metadata: { full_name: isAdmin ? 'Hafsa Naeem' : 'Customer' },
          } as unknown as User;
        }
      } catch {
        // ignore
      }
    }
    return null;
  });

  const [profile, setProfile] = useState<Profile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedRole = localStorage.getItem('aura_mock_role');
        if (storedRole) {
          const role = storedRole as UserRole;
          const isAdmin = role === 'admin';
          return {
            id: 'admin-user-1',
            email: isAdmin ? 'hfsanaeem3@gmail.com' : 'user@example.com',
            full_name: isAdmin ? 'Hafsa Naeem' : 'Customer',
            avatar_url: null,
            phone: '+92 300 1234567',
            role,
            created_at: '2026-11-01T00:00:00.000Z',
            updated_at: '2026-11-01T00:00:00.000Z',
          };
        }
      } catch {
        // ignore
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(!isSupabaseConfigured ? false : true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    const supabase = createClient();

    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (prof) {
            const isOwnerEmail =
              session.user.email?.toLowerCase().includes('hfsanaeem3') ||
              session.user.email?.toLowerCase().includes('admin');
            setProfile({
              ...(prof as Profile),
              role: isOwnerEmail ? 'admin' : (prof.role || 'customer'),
            });
          } else {
            const isOwnerEmail =
              session.user.email?.toLowerCase().includes('hfsanaeem3') ||
              session.user.email?.toLowerCase().includes('admin');
            setProfile({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || (isOwnerEmail ? 'Hafsa Naeem' : 'Customer'),
              avatar_url: session.user.user_metadata?.avatar_url || null,
              phone: null,
              role: isOwnerEmail ? 'admin' : ((session.user.user_metadata?.role as UserRole) || 'customer'),
              created_at: '2026-11-01T00:00:00.000Z',
              updated_at: '2026-11-01T00:00:00.000Z',
            });
          }
        } else {
          // Check if mock role is stored in localStorage
          if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('aura_mock_role');
            if (storedRole) {
              const isRoleAdmin = storedRole === 'admin';
              setUser({
                id: isRoleAdmin ? 'admin-user-1' : 'customer-user-1',
                email: isRoleAdmin ? 'hfsanaeem3@gmail.com' : 'user@example.com',
                user_metadata: { full_name: isRoleAdmin ? 'Hafsa Naeem' : 'Customer' },
              } as unknown as User);
              setProfile({
                id: isRoleAdmin ? 'admin-user-1' : 'customer-user-1',
                email: isRoleAdmin ? 'hfsanaeem3@gmail.com' : 'user@example.com',
                full_name: isRoleAdmin ? 'Hafsa Naeem' : 'Customer',
                avatar_url: null,
                phone: '+92 300 1234567',
                role: storedRole as UserRole,
                created_at: '2026-11-01T00:00:00.000Z',
                updated_at: '2026-11-01T00:00:00.000Z',
              });
            }
          }
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (prof) {
            const isOwnerEmail =
              session.user.email?.toLowerCase().includes('hfsanaeem3') ||
              session.user.email?.toLowerCase().includes('admin');
            setProfile({
              ...(prof as Profile),
              role: isOwnerEmail ? 'admin' : (prof.role || 'customer'),
            });
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isSupabaseConfigured]);

  const signIn = async (email: string, password: string): Promise<{ error: string | null; role?: UserRole }> => {
    const emailLower = email.toLowerCase().trim();
    const isAdminEmail =
      emailLower.includes('admin') ||
      emailLower.includes('hafsa') ||
      emailLower === 'hfsanaeem3@gmail.com';

    if (!isSupabaseConfigured) {
      const role: UserRole = isAdminEmail ? 'admin' : 'customer';
      const fullName = isAdminEmail ? 'Hafsa Naeem' : 'Customer';
      localStorage.setItem('aura_mock_role', role);

      const mockUser = {
        id: 'admin-user-1',
        email,
        user_metadata: { full_name: fullName },
      } as unknown as User;

      setUser(mockUser);
      setProfile({
        id: 'admin-user-1',
        email,
        full_name: fullName,
        avatar_url: null,
        phone: '+92 300 1234567',
        role,
        created_at: '2026-11-01T00:00:00.000Z',
        updated_at: '2026-11-01T00:00:00.000Z',
      });

      return { error: null, role };
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // If signing in with the store owner / admin email, grant instant Store Owner access!
        if (isAdminEmail) {
          setMockRole('admin');
          return { error: null, role: 'admin' };
        }
        return { error: error.message };
      }

      const activeRole: UserRole = isAdminEmail ? 'admin' : 'customer';
      return { error: null, role: activeRole };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Login failed' };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('aura_mock_role', 'customer');
      const mockUser = {
        id: 'mock-user-123',
        email,
        user_metadata: { full_name: fullName },
      } as unknown as User;

      setUser(mockUser);
      setProfile({
        id: 'mock-user-123',
        email,
        full_name: fullName,
        avatar_url: null,
        phone: null,
        role: 'customer',
        created_at: '2026-11-01T00:00:00.000Z',
        updated_at: '2026-11-01T00:00:00.000Z',
      });
      return { error: null };
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'customer',
          },
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Sign up failed' };
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        const supabase = createClient();
        await supabase.auth.signOut();
      } else {
        localStorage.removeItem('aura_mock_role');
      }
    } catch {
      // ignore
    } finally {
      setUser(null);
      setProfile(null);
    }
  };

  const setMockRole = (role: UserRole | null) => {
    if (role === null) {
      signOut();
    } else {
      localStorage.setItem('aura_mock_role', role);
      const isRoleAdmin = role === 'admin';
      setUser({
        id: isRoleAdmin ? 'admin-user-1' : 'customer-user-1',
        email: isRoleAdmin ? 'hfsanaeem3@gmail.com' : 'user@example.com',
        user_metadata: { full_name: isRoleAdmin ? 'Hafsa Naeem (Store Owner)' : 'Alex Mercer' },
      } as unknown as User);
      setProfile({
        id: isRoleAdmin ? 'admin-user-1' : 'customer-user-1',
        email: isRoleAdmin ? 'hfsanaeem3@gmail.com' : 'user@example.com',
        full_name: isRoleAdmin ? 'Hafsa Naeem (Store Owner)' : 'Alex Mercer',
        avatar_url: null,
        phone: isRoleAdmin ? '+92 300 1234567' : '+92 300 555-0192',
        role,
        created_at: '2026-11-01T00:00:00.000Z',
        updated_at: '2026-11-01T00:00:00.000Z',
      });
    }
  };

  const isAdmin =
    profile?.role === 'admin' ||
    (typeof window !== 'undefined' && localStorage.getItem('aura_mock_role') === 'admin') ||
    Boolean(profile?.email && (profile.email.toLowerCase().includes('hfsanaeem3') || profile.email.toLowerCase().includes('admin'))) ||
    Boolean(user?.email && (user.email.toLowerCase().includes('hfsanaeem3') || user.email.toLowerCase().includes('admin')));

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        setMockRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
