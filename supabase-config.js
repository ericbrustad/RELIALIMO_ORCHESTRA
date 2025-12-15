// Shared Supabase credential resolver
function resolveSupabaseUrl() {
  if (typeof process !== 'undefined') {
    const url = process.env?.NEXT_PUBLIC_SUPABASE_URL || process.env?.SUPABASE_URL;
    if (url) return url;
  }

  if (typeof window !== 'undefined' && window.ENV?.SUPABASE_URL) {
    return window.ENV.SUPABASE_URL;
  }

  if (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL;
  }

  return null;
}

function resolveSupabaseAnonKey() {
  if (typeof process !== 'undefined') {
    const anonKey = process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY;
    if (anonKey) return anonKey;
  }

  if (typeof window !== 'undefined' && window.ENV?.SUPABASE_ANON_KEY) {
    return window.ENV.SUPABASE_ANON_KEY;
  }

  if (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  return null;
}

export function getSupabaseCredentials() {
  const url = resolveSupabaseUrl();
  const anonKey = resolveSupabaseAnonKey();

  if (!url || !anonKey) {
    const missing = [];
    if (!url) missing.push('SUPABASE_URL (NEXT_PUBLIC_SUPABASE_URL | SUPABASE_URL | window.ENV | VITE_SUPABASE_URL)');
    if (!anonKey)
      missing.push('SUPABASE_ANON_KEY (NEXT_PUBLIC_SUPABASE_ANON_KEY | SUPABASE_ANON_KEY | window.ENV | VITE_SUPABASE_ANON_KEY)');

    throw new Error(
      `Supabase credentials are missing: ${missing.join(
        '; '
      )}. Set your public Supabase URL and anon key environment variables.`
    );
  }

  return { url, anonKey };
}
