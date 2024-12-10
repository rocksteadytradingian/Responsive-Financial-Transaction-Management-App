import React from 'react';

interface TransactionDetailsInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TransactionDetailsInput({ value, onChange, disabled }: TransactionDetailsInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Details</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        rows={3}
        disabled={disabled}
      />
    </div>
  );
}