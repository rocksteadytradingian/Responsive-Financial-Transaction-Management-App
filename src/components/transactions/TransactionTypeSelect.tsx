import React from 'react';
import { TransactionType } from '../../types/finance';

interface TransactionTypeSelectProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
  disabled?: boolean;
}

export function TransactionTypeSelect({ value, onChange, disabled }: TransactionTypeSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TransactionType)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        <option value="debt">Debt</option>
        <option value="investment">Investment</option>
      </select>
    </div>
  );
}