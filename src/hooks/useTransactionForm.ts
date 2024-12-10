import { useState } from 'react';
import { useTransactions } from './useTransactions';
import { TransactionType } from '../types/finance';

interface UseTransactionFormProps {
  onClose: () => void;
}

interface FormData {
  date: string;
  time: string;
  from: string;
  type: TransactionType;
  category: string;
  details: string;
  amount: string;
  fundSourceId: string;
  creditCardId: string;
}

export function useTransactionForm({ onClose }: UseTransactionFormProps) {
  const { addTransaction } = useTransactions();
  
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    from: '',
    type: 'expense',
    category: '',
    details: '',
    amount: '',
    fundSourceId: '',
    creditCardId: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date(`${formData.date}T${formData.time}`);

    const transactionData = {
      date: timestamp,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      details: formData.details,
      from: formData.from,
      fundSourceId: formData.fundSourceId,
      creditCardId: formData.type === 'debt' ? formData.creditCardId : undefined,
    };

    await addTransaction(transactionData);
    onClose();
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
}