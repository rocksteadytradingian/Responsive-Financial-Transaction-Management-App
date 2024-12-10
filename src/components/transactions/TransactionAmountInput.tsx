import React from 'react';

interface TransactionAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TransactionAmountInput({ value, onChange, disabled }: TransactionAmountInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Amount</label>
      <input
        type="number"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        min="0"
        step="0.01"
        disabled={disabled}
      />
    </div>
  );
}