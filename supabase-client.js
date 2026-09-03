/**
 * Supabase Client & Admin Authentication Layer
 * 
 * Replace the placeholders below with your Supabase Project credentials.
 * You can find these in your Supabase Dashboard under:
 * Project Settings -> API -> Project URL & Project API Keys (anon public).
 */

const SUPABASE_CONFIG = {
  url: window.__SUPABASE_URL || localStorage.getItem('supabase_url') || 'https://xxxspwstcwzzcoyrupdf.supabase.co',
  anonKey: window.__SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHNwd3N0Y3d6emNveXJ1cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MTE4ODcsImV4cCI6MjEwMzk4Nzg4N30.3E6dK2nvj52_-7MSPArZ4PHa7W9KfJ_pSD8Y7-h_peM',
  // Admin emails permitted to access the dealership system
  adminEmails: ['admin@dealership.com']
};

let _supabaseInstance = null;

/**
 * Initializes and returns the Supabase client instance
 */
function getSupabase() {
  if (_supabaseInstance) return _supabaseInstance;

  if (typeof window.supabase === 'undefined') {
    console.error('Supabase JS SDK is not loaded. Ensure the CDN script tag is included in <head>.');
    return null;
  }

  const url = SUPABASE_CONFIG.url;
  const key = SUPABASE_CONFIG.anonKey;

  if (!url || url === 'YOUR_SUPABASE_PROJECT_URL' || !key || key === 'YOUR_SUPABASE_ANON_KEY') {
    return null;
  }

  _supabaseInstance = window.supabase.createClient(url, key);
  return _supabaseInstance;
}

/**
 * Checks if Supabase credentials are configured
 */
function isSupabaseConfigured() {
  const url = SUPABASE_CONFIG.url;
  const key = SUPABASE_CONFIG.anonKey;
  return Boolean(url && url !== 'YOUR_SUPABASE_PROJECT_URL' && key && key !== 'YOUR_SUPABASE_ANON_KEY');
}

/**
 * Saves Supabase config dynamically (e.g., from setup modal)
 */
function saveSupabaseConfig(url, anonKey, adminEmail = null) {
  if (url) {
    SUPABASE_CONFIG.url = url.trim();
    localStorage.setItem('supabase_url', url.trim());
  }
  if (anonKey) {
    SUPABASE_CONFIG.anonKey = anonKey.trim();
    localStorage.setItem('supabase_anon_key', anonKey.trim());
  }
  if (adminEmail) {
    const email = adminEmail.trim().toLowerCase();
    if (!SUPABASE_CONFIG.adminEmails.includes(email)) {
      SUPABASE_CONFIG.adminEmails.push(email);
    }
    localStorage.setItem('supabase_admin_emails', JSON.stringify(SUPABASE_CONFIG.adminEmails));
  }
  _supabaseInstance = null;
  return getSupabase();
}

// Load custom admin emails from storage if present
try {
  const storedEmails = localStorage.getItem('supabase_admin_emails');
  if (storedEmails) {
    const parsed = JSON.parse(storedEmails);
    if (Array.isArray(parsed)) {
      SUPABASE_CONFIG.adminEmails = [...new Set([...SUPABASE_CONFIG.adminEmails, ...parsed])];
    }
  }
} catch (e) {
  // fallback silently
}

/**
 * Validates if the given user object has admin privileges
 */
function isUserAdmin(user) {
  if (!user || !user.email) return false;
  
  // 1. Check if user's app_metadata or user_metadata explicitly has role 'admin'
  const appRole = user.app_metadata?.role;
  const userRole = user.user_metadata?.role;
  if (appRole === 'admin' || userRole === 'admin') return true;

  // 2. Check against designated admin emails list (case-insensitive)
  const normalizedEmail = user.email.trim().toLowerCase();

  // If no custom admin emails have been specified yet, auto-register this authenticated account as admin
  if (SUPABASE_CONFIG.adminEmails.length === 0 || (SUPABASE_CONFIG.adminEmails.length === 1 && SUPABASE_CONFIG.adminEmails[0] === 'admin@dealership.com')) {
    if (!SUPABASE_CONFIG.adminEmails.includes(normalizedEmail)) {
      SUPABASE_CONFIG.adminEmails.push(normalizedEmail);
      localStorage.setItem('supabase_admin_emails', JSON.stringify(SUPABASE_CONFIG.adminEmails));
    }
    return true;
  }

  const isAdminEmail = SUPABASE_CONFIG.adminEmails.some(e => e.toLowerCase() === normalizedEmail);
  return isAdminEmail;
}

/**
 * Signs in an admin user using email and password
 */
async function signInAdmin(email, password) {
  const sb = getSupabase();
  if (!sb) {
    throw new Error('Supabase is not configured. Please enter your Supabase URL and Anon Key.');
  }

  const cleanEmail = email.trim().toLowerCase();

  // Attempt login with Supabase Auth
  const { data, error } = await sb.auth.signInWithPassword({
    email: cleanEmail,
    password: password
  });

  if (error) {
    throw error;
  }

  if (!data || !data.user) {
    throw new Error('No user data returned from authentication.');
  }

  // Verify that the logged-in user is an authorized admin
  const adminAuthorized = isUserAdmin(data.user);

  if (!adminAuthorized) {
    // If not authorized as admin, sign out immediately to prevent unauthorized session
    await sb.auth.signOut();
    throw new Error('Access denied: This portal is restricted to Dealership Administrators only. Your account (' + data.user.email + ') is not registered as an admin.');
  }

  return data;
}

/**
 * Signs out the current user and clears session
 */
async function signOutAdmin() {
  const sb = getSupabase();
  if (sb) {
    await sb.auth.signOut();
  }
  window.location.href = 'login.html';
}

/**
 * Gets the current active session
 */
async function getAdminSession() {
  const sb = getSupabase();
  if (!sb) return null;

  const { data: { session }, error } = await sb.auth.getSession();
  if (error || !session) return null;

  if (!isUserAdmin(session.user)) {
    await sb.auth.signOut();
    return null;
  }

  return session;
}

/**
 * Auth guard: redirects to login.html if not authenticated or not an admin
 */
async function requireAdminAuth() {
  const sb = getSupabase();
  if (!sb) {
    // If Supabase credentials aren't set yet, redirect to login to allow setup
    window.location.href = 'login.html';
    return null;
  }

  const { data: { session } } = await sb.auth.getSession();
  
  if (!session || !session.user || !isUserAdmin(session.user)) {
    window.location.href = 'login.html';
    return null;
  }

  return session.user;
}

window.SupabaseAuth = {
  getSupabase,
  isSupabaseConfigured,
  saveSupabaseConfig,
  isUserAdmin,
  signInAdmin,
  signOutAdmin,
  getAdminSession,
  requireAdminAuth,
  config: SUPABASE_CONFIG
};
