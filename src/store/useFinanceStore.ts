import { create } from 'zustand';
import { Transaction, FundSource, CreditCard } from '../types/finance';
import { transactionService } from '../services/transactionService';

interface FinanceStore {
  transactions: Transaction[];
  fundSources: FundSource[];
  creditCards: CreditCard[];
  initialized: boolean;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  transactions: [],
  fundSources: [],
  creditCards: [],
  initialized: false,

  setTransactions: (transactions) => set({ transactions, initialized: true }),

  addTransaction: async (transaction) => {
    try {
      await transactionService.addTransaction(transaction);
    } catch (error) {
      console.error('Failed to add transaction:', error);
      throw error;
    }
  },

  updateTransaction: async (id, transaction) => {
    try {
      await transactionService.updateTransaction(id, transaction);
    } catch (error) {
      console.error('Failed to update transaction:', error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    try {
      await transactionService.deleteTransaction(id);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      throw error;
    }
  },

  updateCreditCard: (id, updates) => set((state) => ({
    creditCards: state.creditCards.map((card) =>
      card.id === id ? { ...card, ...updates } : card
    )
  }))
}));

// Initialize Firestore listeners
if (typeof window !== 'undefined') {
  transactionService.subscribeToTransactions((transactions) => {
    useFinanceStore.getState().setTransactions(transactions);
  });
}