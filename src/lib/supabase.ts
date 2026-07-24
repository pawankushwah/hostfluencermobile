import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Safe storage adapter with in-memory fallback for Expo Go & native module edge cases
const memoryStorage = new Map<string, string>();

const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch {
      return memoryStorage.get(key) ?? null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      memoryStorage.set(key, value);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      memoryStorage.delete(key);
    }
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: safeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Helper to fetch current active session, user info, and access token.
 */
export const getAuthenticatedSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    return null;
  }
  return {
    session,
    user: session.user,
    accessToken: session.access_token,
  };
};

/**
 * Helper to generate Authorization headers for custom backend API calls.
 */
export const getAuthHeader = async (): Promise<Record<string, string>> => {
  const sessionData = await getAuthenticatedSession();
  if (!sessionData) return {};
  return {
    Authorization: `Bearer ${sessionData.accessToken}`,
  };
};
