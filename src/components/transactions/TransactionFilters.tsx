import { useState } from 'react';
import { TransactionType } from '../../types/finance';
import { Button } from '../ui/Button';

interface TransactionFiltersProps {
  onFilterChange: (filters: {
    type?: TransactionType;
    startDate?: Date;
    endDate?: Date;
  }) => void;
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const [type, setType] = useState<TransactionType | undefined>();
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleTypeChange = (newType: TransactionType | undefined) => {
    setType(newType);
    onFilterChange({ 
      type: newType,
      startDate: dateRange.startDate ? new Date(dateRange.startDate) : undefined,
      endDate: dateRange.endDate ? new Date(dateRange.endDate) : undefined
    });
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateRange(prev => {
      const newRange = { ...prev, [field]: value };
      onFilterChange({
        type,
        startDate: newRange.startDate ? new Date(newRange.startDate) : undefined,
        endDate: newRange.endDate ? new Date(newRange.endDate) : undefined
      });
      return newRange;
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex space-x-2">
        <Button
          variant={type === undefined ? 'primary' : 'secondary'}
          onClick={() => handleTypeChange(undefined)}
        >
          All
        </Button>
        <Button
          variant={type === 'income' ? 'primary' : 'secondary'}
          onClick={() => handleTypeChange('income')}
        >
          Income
        </Button>
        <Button
          variant={type === 'expense' ? 'primary' : 'secondary'}
          onClick={() => handleTypeChange('expense')}
        >
          Expenses
        </Button>
      </div>

      <div className="flex space-x-4">
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => handleDateChange('startDate', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => handleDateChange('endDate', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}