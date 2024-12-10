import { useTransactions } from '../hooks/useTransactions';
import { TransactionSummary } from './transactions/TransactionSummary';
import { TransactionList } from './transactions/TransactionList';
import { MonthlyChart } from './MonthlyChart';
import { Card } from './ui/Card';
import { TransactionFilters } from './transactions/TransactionFilters';
import { useState } from 'react';
import { TransactionType } from '../types/finance';

export function Dashboard() {
  const { transactions } = useTransactions();
  const [filters, setFilters] = useState<{
    type?: TransactionType;
    startDate?: Date;
    endDate?: Date;
  }>({});

  const filteredTransactions = transactions.filter(t => {
    if (filters.type && t.type !== filters.type) return false;
    if (filters.startDate && new Date(t.date) < filters.startDate) return false;
    if (filters.endDate && new Date(t.date) > filters.endDate) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <TransactionSummary transactions={filteredTransactions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Overview</h2>
            <div className="h-[300px]">
              <MonthlyChart transactions={filteredTransactions} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
              <TransactionFilters onFilterChange={setFilters} />
            </div>
            <TransactionList 
              transactions={filteredTransactions.slice(0, 5)}
              compact
            />
          </div>
        </Card>
      </div>
    </div>
  );
}