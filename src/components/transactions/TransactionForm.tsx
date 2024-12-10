import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CategorySelect } from './CategorySelect';
import { TransactionTypeSelect } from './TransactionTypeSelect';
import { TransactionDateInput } from './TransactionDateInput';
import { TransactionAmountInput } from './TransactionAmountInput';
import { TransactionDetailsInput } from './TransactionDetailsInput';
import { FundSourceSelect } from './FundSourceSelect';
import { CreditCardSelect } from './CreditCardSelect';
import { IoArrowBack } from 'react-icons/io5';
import { useTransactionForm } from '../../hooks/useTransactionForm';

interface TransactionFormProps {
  onClose: () => void;
}

export function TransactionForm({ onClose }: TransactionFormProps) {
  const { formData, handleInputChange, handleSubmit } = useTransactionForm({ onClose });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoArrowBack size={24} />
        </button>
        <h1 className="text-2xl font-bold">Add New Transaction</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TransactionDateInput
            date={formData.date}
            time={formData.time}
            onDateChange={(date) => handleInputChange('date', date)}
            onTimeChange={(time) => handleInputChange('time', time)}
          />

          <TransactionTypeSelect
            value={formData.type}
            onChange={(type) => handleInputChange('type', type)}
          />

          <CategorySelect
            value={formData.category}
            onChange={(category) => handleInputChange('category', category)}
            type={formData.type}
          />

          {formData.type === 'debt' && (
            <CreditCardSelect
              value={formData.creditCardId}
              onChange={(id) => handleInputChange('creditCardId', id)}
            />
          )}

          {(formData.type === 'expense' || formData.type === 'income') && (
            <FundSourceSelect
              value={formData.fundSourceId}
              onChange={(id) => handleInputChange('fundSourceId', id)}
              type={formData.type === 'expense' ? 'from' : 'to'}
            />
          )}

          <TransactionAmountInput
            value={formData.amount}
            onChange={(amount) => handleInputChange('amount', amount)}
          />

          <TransactionDetailsInput
            value={formData.details}
            onChange={(details) => handleInputChange('details', details)}
          />

          <div className="flex space-x-4">
            <Button type="submit" variant="primary" className="flex-1">
              Add Transaction
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}