import React from 'react';
import { TransactionType } from '../../types/finance';
import { useCategories } from '../../hooks/useCategories';

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  type: TransactionType;
  disabled?: boolean;
}

export function CategorySelect({ value, onChange, type, disabled }: CategorySelectProps) {
  const categories = useCategories(type);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Category</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}