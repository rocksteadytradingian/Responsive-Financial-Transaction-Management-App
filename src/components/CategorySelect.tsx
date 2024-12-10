import { TransactionType } from '../types/finance';

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  type?: TransactionType;
}

export function CategorySelect({ value, onChange, type = 'expense' }: CategorySelectProps) {
  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Other'],
    expense: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Other'],
    debt: ['Credit Card', 'Loan Payment', 'Mortgage', 'Other'],
    investment: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Other'],
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="">Select Category</option>
      {categories[type].map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}