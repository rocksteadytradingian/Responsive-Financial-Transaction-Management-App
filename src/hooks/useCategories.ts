import { TransactionType } from '../types/finance';

const categoryMap: Record<TransactionType, string[]> = {
  income: ['Salary', 'Freelance', 'Investment', 'Other'],
  expense: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Other'],
  debt: ['Credit Card', 'Loan Payment', 'Mortgage', 'Other'],
  investment: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Other'],
};

export function useCategories(type: TransactionType): string[] {
  return categoryMap[type] || [];
}