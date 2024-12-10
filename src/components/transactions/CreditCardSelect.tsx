import React from 'react';
import { useCreditCards } from '../../hooks/useCreditCards';
import { formatCurrency } from '../../utils/formatters';

interface CreditCardSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CreditCardSelect({ value, onChange, disabled }: CreditCardSelectProps) {
  const { creditCards, loading } = useCreditCards();

  if (loading) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">Credit Card</label>
        <select
          disabled
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option>Loading credit cards...</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Credit Card</label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Credit Card</option>
        {creditCards.map((card) => (
          <option key={card.id} value={card.id}>
            {card.name} - {card.bank} (Available: {formatCurrency(card.limit - card.balance)})
          </option>
        ))}
      </select>
    </div>
  );
}