import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { format } from 'date-fns';
import { TransactionIcon } from './TransactionIcon';

interface TransactionListProps {
  transactions: Transaction[];
  compact?: boolean;
}

export function TransactionList({ transactions, compact = false }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transactions yet</p>
        <p className="text-sm text-gray-400 mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center space-x-4">
            <TransactionIcon type={transaction.type} category={transaction.category} />
            <div>
              <p className="font-medium text-gray-900">{transaction.category}</p>
              {!compact && (
                <p className="text-sm text-gray-500">{format(new Date(transaction.date), 'PPp')}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`font-semibold ${
              transaction.type === 'income' ? 'text-emerald-600' :
              'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}