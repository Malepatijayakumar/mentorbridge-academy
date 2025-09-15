import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type AppRole = "student" | "mentor" | "admin" | "super_admin";

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: AppRole;
  college_id: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, email, first_name, last_name, role, college_id")
      .eq("user_id", userId)
      .single();

    if (!error) setProfile(data as Profile);
  }, []);

  useEffect(() => {
    // Listener first
    const { data: listener } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
      const currentUser = newSession?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setTimeout(() => {
          fetchProfile(currentUser.id);
        }, 0);
      } else {
        setProfile(null);
      }
    });

    // Then initial session fetch
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchProfile(currentUser.id);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUpStudent = async (
    email: string,
    password: string,
    first_name?: string,
    last_name?: string
  ) => {
    const redirectUrl = `${window.location.origin}/auth`;
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role: "student",
          first_name: first_name || "",
          last_name: last_name || "",
        },
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const getRedirectPathForRole = (role?: AppRole) => {
    switch (role) {
      case "super_admin":
        return "/super-admin";
      case "admin":
        return "/admin";
      case "mentor":
        return "/mentor";
      default:
        return "/student";
    }
  };

  return { user, session, profile, loading, signIn, signUpStudent, signOut, getRedirectPathForRole };
};