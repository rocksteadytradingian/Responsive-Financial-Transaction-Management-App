import { useEffect, useState } from 'react';
import { CreditCard } from '../types/finance';
import { creditCardService } from '../services/creditCardService';

export function useCreditCards() {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = creditCardService.subscribeToCreditCards((newCreditCards) => {
      setCreditCards(newCreditCards);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addCreditCard = async (creditCard: Omit<CreditCard, 'id'>) => {
    try {
      await creditCardService.addCreditCard(creditCard);
    } catch (err) {
      setError('Failed to add credit card');
      throw err;
    }
  };

  const updateCreditCard = async (id: string, updates: Partial<CreditCard>) => {
    try {
      await creditCardService.updateCreditCard(id, updates);
    } catch (err) {
      setError('Failed to update credit card');
      throw err;
    }
  };

  const deleteCreditCard = async (id: string) => {
    try {
      await creditCardService.deleteCreditCard(id);
    } catch (err) {
      setError('Failed to delete credit card');
      throw err;
    }
  };

  return {
    creditCards,
    loading,
    error,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard
  };
}