/**
 * DealTrace — Production Supabase Integration Layer
 * 
 * Direct cloud connection to Supabase PostgreSQL and Supabase Storage.
 * Zero local storage dependencies.
 */

const SUPABASE_CONFIG = {
  url: 'https://xxxspwstcwzzcoyrupdf.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHNwd3N0Y3d6emNveXJ1cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MTE4ODcsImV4cCI6MjEwMzk4Nzg4N30.3E6dK2nvj52_-7MSPArZ4PHa7W9KfJ_pSD8Y7-h_peM',
  adminEmails: ['admin@dealership.com']
};

let _supabaseInstance = null;

function getSupabase() {
  if (_supabaseInstance) return _supabaseInstance;

  if (typeof window.supabase === 'undefined') {
    console.error('Supabase JS SDK is not loaded.');
    return null;
  }

  _supabaseInstance = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  return _supabaseInstance;
}

function isSupabaseConfigured() {
  return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
}

function isUserAdmin(user) {
  if (!user || !user.email) return false;
  const appRole = user.app_metadata?.role;
  const userRole = user.user_metadata?.role;
  if (appRole === 'admin' || userRole === 'admin') return true;

  const normalizedEmail = user.email.trim().toLowerCase();

  // If initial placeholder is active, auto-enroll authenticated user
  if (SUPABASE_CONFIG.adminEmails.length === 0 || (SUPABASE_CONFIG.adminEmails.length === 1 && SUPABASE_CONFIG.adminEmails[0] === 'admin@dealership.com')) {
    if (!SUPABASE_CONFIG.adminEmails.includes(normalizedEmail)) {
      SUPABASE_CONFIG.adminEmails.push(normalizedEmail);
    }
    return true;
  }

  return SUPABASE_CONFIG.adminEmails.some(e => e.toLowerCase() === normalizedEmail);
}

async function signInAdmin(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase client unavailable.');

  const cleanEmail = email.trim().toLowerCase();
  const { data, error } = await sb.auth.signInWithPassword({
    email: cleanEmail,
    password: password
  });

  if (error) throw error;
  if (!data || !data.user) throw new Error('Authentication response empty.');

  if (!isUserAdmin(data.user)) {
    await sb.auth.signOut();
    throw new Error('Access denied: Dealership Administrator permissions required.');
  }

  return data;
}

async function signOutAdmin() {
  const sb = getSupabase();
  if (sb) {
    await sb.auth.signOut();
  }
  window.location.href = 'login.html';
}

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

async function requireAdminAuth() {
  const sb = getSupabase();
  if (!sb) {
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

// ==============================================================================
// Cloud Database CRUD Operations (Supabase PostgreSQL & Storage)
// ==============================================================================

/**
 * Upload an image file to Supabase Storage bucket ('deal-photos')
 */
async function uploadDealPhoto(file, prefix = 'deal') {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not connected.');

  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await sb.storage
    .from('deal-photos')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) {
    console.warn('Storage upload note:', error.message);
    // If bucket doesn't exist yet, return null gracefully so save still succeeds
    return null;
  }

  const { data: publicData } = sb.storage.from('deal-photos').getPublicUrl(filePath);
  return publicData.publicUrl;
}

/**
 * Inserts or updates a deal record in the Supabase 'deals' table
 */
async function saveDealToCloud(dealData) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not connected.');

  const session = await getAdminSession();
  const userId = session?.user?.id || null;

  const payload = {
    ...dealData,
    created_by: userId
  };

  const { data, error } = await sb
    .from('deals')
    .insert([payload])
    .select();

  if (error) throw error;
  return data && data[0] ? data[0] : null;
}

/**
 * Fetches all deal records from Supabase sorted by created_at DESC
 */
async function fetchDealsFromCloud() {
  const sb = getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals from Supabase:', error);
    return [];
  }

  return data || [];
}

/**
 * Searches deals in Supabase by buyer name or VIN
 */
async function searchDealsInCloud(query) {
  const sb = getSupabase();
  if (!sb) return [];

  const clean = query.trim();
  const { data, error } = await sb
    .from('deals')
    .select('*')
    .or(`buyer_name.ilike.%${clean}%,vin.ilike.%${clean}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching deals in Supabase:', error);
    return [];
  }

  return data || [];
}

/**
 * Deletes a deal record from Supabase by ID
 */
async function deleteDealFromCloud(dealId) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not connected.');

  const { error } = await sb
    .from('deals')
    .delete()
    .eq('id', dealId);

  if (error) throw error;
  return true;
}

window.SupabaseAuth = {
  getSupabase,
  isSupabaseConfigured,
  isUserAdmin,
  signInAdmin,
  signOutAdmin,
  getAdminSession,
  requireAdminAuth,
  uploadDealPhoto,
  saveDealToCloud,
  fetchDealsFromCloud,
  searchDealsInCloud,
  deleteDealFromCloud,
  config: SUPABASE_CONFIG
};
