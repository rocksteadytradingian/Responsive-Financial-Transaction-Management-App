import { useMemo } from 'react';
import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { Card } from '../ui/Card';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const summary = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else if (transaction.type === 'expense') {
        acc.expenses += transaction.amount;
      }
      return acc;
    }, { income: 0, expenses: 0 });
  }, [transactions]);

  const balance = summary.income - summary.expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-emerald-500 text-white">
        <h3 className="text-sm font-medium opacity-90">Total Income</h3>
        <p className="text-2xl font-bold mt-1">{formatCurrency(summary.income)}</p>
      </Card>
      
      <Card className="bg-red-500 text-white">
        <h3 className="text-sm font-medium opacity-90">Total Expenses</h3>
        <p className="text-2xl font-bold mt-1">{formatCurrency(summary.expenses)}</p>
      </Card>
      
      <Card className={`${balance >= 0 ? 'bg-blue-500' : 'bg-orange-500'} text-white`}>
        <h3 className="text-sm font-medium opacity-90">Net Balance</h3>
        <p className="text-2xl font-bold mt-1">{formatCurrency(balance)}</p>
      </Card>
    </div>
  );
}