import React from 'react';

interface TransactionDateInputProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  disabled?: boolean;
}

export function TransactionDateInput({ 
  date, 
  time, 
  onDateChange, 
  onTimeChange,
  disabled 
}: TransactionDateInputProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          required
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}