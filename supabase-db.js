// Supabase-only Database Module for RELIA🐂LIMO™
// All data is stored in Supabase - NO localStorage for critical business data
// This replaces the localStorage-based db.js for production use

import { 
  setupAPI, 
  getSupabaseClient,
  createReservation,
  updateReservation,
  fetchReservations,
  getReservation,
  fetchDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  fetchAffiliates,
  createAffiliate,
  updateAffiliate,
  deleteAffiliate,
  fetchVehicleTypes,
  upsertVehicleType,
  saveAccountToSupabase,
  fetchAccounts,
  savePassengerToSupabase,
  saveBookingAgentToSupabase
} from './api-service.js';

// Error display helper
function showDatabaseError(operation, error) {
  const errorMsg = error?.message || error?.toString() || 'Unknown database error';
  console.error(`❌ Database Error [${operation}]:`, error);
  
  // Show user-visible alert
  alert(`⚠️ DATABASE ERROR\n\nOperation: ${operation}\nError: ${errorMsg}\n\nPlease check your connection and try again.`);
  
  return null;
}

// Success notification (optional - can be disabled)
function logSuccess(operation, data) {
  console.log(`✅ ${operation} successful:`, data);
}

// ========================================
// RESERVATIONS
// ========================================

export async function saveReservation(reservationData) {
  try {
    await setupAPI();
    
    // Check if this is an update or create
    if (reservationData.id && reservationData.id.toString().includes('-')) {
      // UUID = existing reservation, update it
      const result = await updateReservation(reservationData.id, reservationData);
      if (!result) throw new Error('Update returned empty result');
      logSuccess('Reservation updated', result);
      return result;
    } else {
      // New reservation
      const result = await createReservation(reservationData);
      if (!result || result.length === 0) throw new Error('Create returned empty result');
      logSuccess('Reservation created', result);
      return result[0] || result;
    }
  } catch (error) {
    return showDatabaseError('Save Reservation', error);
  }
}

export async function getAllReservations() {
  try {
    await setupAPI();
    const result = await fetchReservations();
    if (!result) return [];
    logSuccess('Fetched reservations', `${result.length} records`);
    return result;
  } catch (error) {
    showDatabaseError('Fetch Reservations', error);
    return [];
  }
}

export async function getReservationById(reservationId) {
  try {
    await setupAPI();
    const result = await getReservation(reservationId);
    return result;
  } catch (error) {
    showDatabaseError('Get Reservation', error);
    return null;
  }
}

// ========================================
// ACCOUNTS
// ========================================

export async function saveAccount(accountData) {
  try {
    await setupAPI();
    const result = await saveAccountToSupabase(accountData);
    if (!result) throw new Error('Save returned empty result');
    logSuccess('Account saved', result);
    return result;
  } catch (error) {
    return showDatabaseError('Save Account', error);
  }
}

export async function getAllAccounts() {
  try {
    await setupAPI();
    const result = await fetchAccounts();
    if (!result) return [];
    logSuccess('Fetched accounts', `${result.length} records`);
    return result;
  } catch (error) {
    showDatabaseError('Fetch Accounts', error);
    return [];
  }
}

export async function deleteAccount(accountId) {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    const { error } = await client
      .from('accounts')
      .delete()
      .eq('id', accountId);
    
    if (error) throw error;
    logSuccess('Account deleted', accountId);
    return true;
  } catch (error) {
    return showDatabaseError('Delete Account', error);
  }
}

// ========================================
// DRIVERS
// ========================================

export async function saveDriver(driverData) {
  try {
    await setupAPI();
    
    if (driverData.id) {
      const result = await updateDriver(driverData.id, driverData);
      if (!result) throw new Error('Update returned empty result');
      logSuccess('Driver updated', result);
      return result;
    } else {
      const result = await createDriver(driverData);
      if (!result) throw new Error('Create returned empty result');
      logSuccess('Driver created', result);
      return result;
    }
  } catch (error) {
    return showDatabaseError('Save Driver', error);
  }
}

export async function getAllDrivers() {
  try {
    await setupAPI();
    const result = await fetchDrivers();
    if (!result) return [];
    logSuccess('Fetched drivers', `${result.length} records`);
    return result;
  } catch (error) {
    showDatabaseError('Fetch Drivers', error);
    return [];
  }
}

export { deleteDriver };

// ========================================
// AFFILIATES
// ========================================

export async function saveAffiliate(affiliateData) {
  try {
    await setupAPI();
    
    if (affiliateData.id) {
      const result = await updateAffiliate(affiliateData.id, affiliateData);
      if (!result) throw new Error('Update returned empty result');
      logSuccess('Affiliate updated', result);
      return result;
    } else {
      const result = await createAffiliate(affiliateData);
      if (!result) throw new Error('Create returned empty result');
      logSuccess('Affiliate created', result);
      return result;
    }
  } catch (error) {
    return showDatabaseError('Save Affiliate', error);
  }
}

export async function getAllAffiliates() {
  try {
    await setupAPI();
    const result = await fetchAffiliates();
    if (!result) return [];
    logSuccess('Fetched affiliates', `${result.length} records`);
    return result;
  } catch (error) {
    showDatabaseError('Fetch Affiliates', error);
    return [];
  }
}

export { deleteAffiliate };

// ========================================
// VEHICLES
// ========================================

export async function saveVehicleType(vehicleData) {
  try {
    await setupAPI();
    const result = await upsertVehicleType(vehicleData);
    if (!result) throw new Error('Upsert returned empty result');
    logSuccess('Vehicle type saved', result);
    return result;
  } catch (error) {
    return showDatabaseError('Save Vehicle Type', error);
  }
}

export async function getAllVehicleTypes() {
  try {
    await setupAPI();
    const result = await fetchVehicleTypes();
    if (!result) return [];
    logSuccess('Fetched vehicle types', `${result.length} records`);
    return result;
  } catch (error) {
    showDatabaseError('Fetch Vehicle Types', error);
    return [];
  }
}

// ========================================
// PASSENGERS
// ========================================

export async function savePassenger(passengerData) {
  try {
    await setupAPI();
    const result = await savePassengerToSupabase(passengerData);
    if (!result) throw new Error('Save returned empty result');
    logSuccess('Passenger saved', result);
    return result;
  } catch (error) {
    return showDatabaseError('Save Passenger', error);
  }
}

export async function getAllPassengers() {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    const { data, error } = await client
      .from('passengers')
      .select('*')
      .order('last_name', { ascending: true });
    
    if (error) throw error;
    logSuccess('Fetched passengers', `${data?.length || 0} records`);
    return data || [];
  } catch (error) {
    showDatabaseError('Fetch Passengers', error);
    return [];
  }
}

// ========================================
// BOOKING AGENTS
// ========================================

export async function saveBookingAgent(agentData) {
  try {
    await setupAPI();
    const result = await saveBookingAgentToSupabase(agentData);
    if (!result) throw new Error('Save returned empty result');
    logSuccess('Booking agent saved', result);
    return result;
  } catch (error) {
    return showDatabaseError('Save Booking Agent', error);
  }
}

export async function getAllBookingAgents() {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    const { data, error } = await client
      .from('booking_agents')
      .select('*')
      .order('last_name', { ascending: true });
    
    if (error) throw error;
    logSuccess('Fetched booking agents', `${data?.length || 0} records`);
    return data || [];
  } catch (error) {
    showDatabaseError('Fetch Booking Agents', error);
    return [];
  }
}

// ========================================
// ACCOUNT ADDRESSES
// ========================================

export async function saveAccountAddress(accountId, addressData) {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    const { data, error } = await client
      .from('account_addresses')
      .insert([{
        account_id: accountId,
        ...addressData
      }])
      .select();
    
    if (error) throw error;
    logSuccess('Account address saved', data);
    return data?.[0] || data;
  } catch (error) {
    return showDatabaseError('Save Account Address', error);
  }
}

export async function getAccountAddresses(accountId) {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    const { data, error } = await client
      .from('account_addresses')
      .select('*')
      .eq('account_id', accountId);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    showDatabaseError('Fetch Account Addresses', error);
    return [];
  }
}

// ========================================
// CONFIRMATION / ACCOUNT NUMBER SEQUENCES
// ========================================

export async function getNextConfirmationNumber() {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    // Get the max confirmation number from reservations
    const { data, error } = await client
      .from('reservations')
      .select('confirmation_number')
      .order('confirmation_number', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    let nextNum = 100000; // Default starting number
    if (data && data.length > 0 && data[0].confirmation_number) {
      const lastNum = parseInt(data[0].confirmation_number);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    }
    
    return nextNum;
  } catch (error) {
    console.error('Error getting next confirmation number:', error);
    // Fall back to timestamp-based number
    return Date.now();
  }
}

export async function getNextAccountNumber() {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) throw new Error('No Supabase client');
    
    // Get the max account number from accounts
    const { data, error } = await client
      .from('accounts')
      .select('account_number')
      .order('account_number', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    let nextNum = 30000; // Default starting number
    if (data && data.length > 0 && data[0].account_number) {
      const lastNum = parseInt(data[0].account_number);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    }
    
    return nextNum;
  } catch (error) {
    console.error('Error getting next account number:', error);
    // Fall back to timestamp-based number
    return Date.now();
  }
}

// ========================================
// INITIALIZATION CHECK
// ========================================

export async function checkConnection() {
  try {
    await setupAPI();
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase client not initialized');
    }
    
    // Quick test query
    const { error } = await client.from('organizations').select('id').limit(1);
    if (error) throw error;
    
    console.log('✅ Supabase connection verified');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    alert('⚠️ DATABASE CONNECTION FAILED\n\nPlease check your internet connection and reload the page.');
    return false;
  }
}

// Default export for compatibility
export default {
  saveReservation,
  getAllReservations,
  getReservationById,
  saveAccount,
  getAllAccounts,
  deleteAccount,
  saveDriver,
  getAllDrivers,
  deleteDriver,
  saveAffiliate,
  getAllAffiliates,
  deleteAffiliate,
  saveVehicleType,
  getAllVehicleTypes,
  savePassenger,
  getAllPassengers,
  saveBookingAgent,
  getAllBookingAgents,
  saveAccountAddress,
  getAccountAddresses,
  getNextConfirmationNumber,
  getNextAccountNumber,
  checkConnection
};
