import React from 'react';
import { useFundSources } from '../../hooks/useFundSources';
import { formatCurrency } from '../../utils/formatters';

interface FundSourceSelectProps {
  value: string;
  onChange: (value: string) => void;
  showBalance?: boolean;
  disabled?: boolean;
  type: 'from' | 'to';
}

export function FundSourceSelect({ 
  value, 
  onChange, 
  showBalance = true,
  disabled,
  type
}: FundSourceSelectProps) {
  const { fundSources, loading } = useFundSources();

  if (loading) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {type === 'from' ? 'From Account' : 'To Account'}
        </label>
        <select
          disabled
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option>Loading accounts...</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {type === 'from' ? 'From Account' : 'To Account'}
      </label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Account</option>
        {fundSources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.bankName} - {source.accountName}
            {showBalance && ` (${formatCurrency(source.balance)})`}
          </option>
        ))}
      </select>
    </div>
  );
}