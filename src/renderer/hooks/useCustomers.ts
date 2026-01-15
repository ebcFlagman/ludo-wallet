import { useState, useEffect, useCallback } from 'react';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  points: number;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const useCustomers = (searchTerm: string = '') => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const results = await window.electronAPI.getAllCustomers(searchTerm);
      setCustomers(results);
      setError(null);
    } catch (err) {
      console.error('Fehler beim Laden der Kunden:', err);
      setError('Kunden konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const addCustomer = async (data: CustomerFormData) => {
    try {
      await window.electronAPI.createCustomer(data);
      await loadCustomers();
      return { success: true };
    } catch (err) {
      console.error('Fehler beim Erstellen des Kunden:', err);
      return { success: false, error: 'Kunde konnte nicht erstellt werden.' };
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      const success = await window.electronAPI.deleteCustomer(id);
      if (success) {
        await loadCustomers();
        return { success: true };
      }
      return { success: false, error: 'Kunde konnte nicht gelöscht werden.' };
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
      return { success: false, error: 'Fehler beim Löschen des Kunden.' };
    }
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    deleteCustomer,
    refresh: loadCustomers
  };
};
