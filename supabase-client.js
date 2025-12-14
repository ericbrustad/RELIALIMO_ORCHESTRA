// Supabase Client - REST API (Buildless Compatible)
// Pure fetch-based REST API client - no SDK dependency

// Get credentials from environment or window.ENV
export const supabaseUrl = 
  window.ENV?.SUPABASE_URL || 
  import.meta?.env?.VITE_SUPABASE_URL ||
  'https://siumiadylwcrkaqsfwkj.supabase.co';

export const supabaseAnonKey = 
  window.ENV?.SUPABASE_ANON_KEY || 
  import.meta?.env?.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdW1pYWR5bHdjcmthcXNmd2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjMzMTMsImV4cCI6MjA4MTIzOTMxM30.sSZBsXyOOmIp2eve_SpiUGeIwx3BMoxvY4c7bvE2kKw';

// Validate credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials');
  throw new Error('Supabase configuration missing');
}

console.log('✅ Supabase REST API client initialized');

// Mock Supabase client for buildless environment
// This is a minimal mock that allows imports to work without throwing errors
export const supabase = {
  url: supabaseUrl,
  key: supabaseAnonKey,
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: null, error: 'Use api-service.js' }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback) => {
      console.log('⚠️ Auth state listener: use api-service.js instead');
      return () => {};
    }
  },
  from: (table) => ({
    select: () => ({ data: null, error: 'Use api-service.js' }),
    insert: () => ({ data: null, error: 'Use api-service.js' }),
    update: () => ({ data: null, error: 'Use api-service.js' })
  })
};

// Test connection via simple REST request
export async function testSupabaseConnection() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (response.ok) {
      console.log('✅ Supabase REST API connected successfully');
      return true;
    } else {
      console.error('❌ Supabase REST API connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Connection test error:', error);
    return false;
  }
}

// Get current user from localStorage (session-based auth)
export async function getCurrentUser() {
  try {
    const session = localStorage.getItem('supabase_session');
    if (session) {
      const sessionData = JSON.parse(session);
      return sessionData.user || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get current session from localStorage
export async function getCurrentSession() {
  try {
    const session = localStorage.getItem('supabase_session');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
}

// Sign in with email/password via REST API
export async function signInWithEmail(email, password) {
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    const data = await response.json();
    
    if (!response.ok || data.error) {
      console.error('❌ Sign in error:', data.error || data.error_description);
      return { success: false, error: data.error || 'Sign in failed' };
    }
    
    // Store session
    localStorage.setItem('supabase_session', JSON.stringify(data));
    localStorage.setItem('supabase_access_token', data.access_token);
    
    console.log('✅ Signed in:', email);
    return { 
      success: true, 
      user: data.user, 
      session: data,
      access_token: data.access_token 
    };
  } catch (error) {
    console.error('❌ Sign in exception:', error);
    return { success: false, error: error.message };
  }
}

// Sign out
export async function signOut() {
  try {
    // Clear session from localStorage
    localStorage.removeItem('supabase_session');
    localStorage.removeItem('supabase_access_token');
    
    console.log('✅ Signed out');
    return { success: true };
  } catch (error) {
    console.error('❌ Sign out exception:', error);
    return { success: false, error: error.message };
  }
}

// Get stored auth token
export function getAuthToken() {
  return localStorage.getItem('supabase_access_token');
}

// Set auth token
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('supabase_access_token', token);
  } else {
    localStorage.removeItem('supabase_access_token');
  }
}

export default supabase;
