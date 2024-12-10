import { useEffect, useState } from 'react';
import { Transaction } from '../types/finance';
import { transactionService } from '../services/transactionService';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = transactionService.subscribeToTransactions((newTransactions) => {
      setTransactions(newTransactions);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await transactionService.addTransaction(transaction);
    } catch (err) {
      setError('Failed to add transaction');
      throw err;
    }
  };

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      await transactionService.updateTransaction(id, transaction);
    } catch (err) {
      setError('Failed to update transaction');
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionService.deleteTransaction(id);
    } catch (err) {
      setError('Failed to delete transaction');
      throw err;
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
}