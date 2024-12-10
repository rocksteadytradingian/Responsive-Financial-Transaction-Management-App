export type TransactionType = 'income' | 'expense' | 'debt' | 'investment';

export interface Transaction {
  id: string;
  date: Date;
  type: TransactionType;
  category: string;
  details: string;
  amount: number;
  from: string;
  fundSourceId?: string;
  creditCardId?: string;
}

export interface FundSource {
  id: string;
  bankName: string;
  accountName: string;
  balance: number;
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  limit: number;
  balance: number;
}