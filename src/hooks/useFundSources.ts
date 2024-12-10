import { useEffect, useState } from 'react';
import { FundSource } from '../types/finance';
import { fundSourceService } from '../services/fundSourceService';

export function useFundSources() {
  const [fundSources, setFundSources] = useState<FundSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = fundSourceService.subscribeToFundSources((newFundSources) => {
      setFundSources(newFundSources);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addFundSource = async (fundSource: Omit<FundSource, 'id'>) => {
    try {
      await fundSourceService.addFundSource(fundSource);
    } catch (err) {
      setError('Failed to add fund source');
      throw err;
    }
  };

  const updateFundSource = async (id: string, updates: Partial<FundSource>) => {
    try {
      await fundSourceService.updateFundSource(id, updates);
    } catch (err) {
      setError('Failed to update fund source');
      throw err;
    }
  };

  const deleteFundSource = async (id: string) => {
    try {
      await fundSourceService.deleteFundSource(id);
    } catch (err) {
      setError('Failed to delete fund source');
      throw err;
    }
  };

  return {
    fundSources,
    loading,
    error,
    addFundSource,
    updateFundSource,
    deleteFundSource
  };
}