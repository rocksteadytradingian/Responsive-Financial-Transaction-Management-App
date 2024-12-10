import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  onSnapshot,
  Timestamp,
  FirestoreError
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { CreditCard } from '../types/finance';

const getCreditCardsCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  return collection(db, 'users', user.uid, 'creditCards');
};

export const creditCardService = {
  subscribeToCreditCards: (callback: (creditCards: CreditCard[]) => void) => {
    const user = auth.currentUser;
    if (!user) return () => {};

    const creditCardsRef = getCreditCardsCollection();
    const q = query(creditCardsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const creditCards: CreditCard[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CreditCard));
        callback(creditCards);
      },
      (error: FirestoreError) => {
        console.error('Error fetching credit cards:', error);
      }
    );

    return unsubscribe;
  },

  addCreditCard: async (creditCard: Omit<CreditCard, 'id'>) => {
    try {
      const creditCardsRef = getCreditCardsCollection();
      const docRef = await addDoc(creditCardsRef, {
        ...creditCard,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        userId: auth.currentUser?.uid
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding credit card:', error);
      throw error;
    }
  },

  updateCreditCard: async (id: string, updates: Partial<CreditCard>) => {
    try {
      const creditCardRef = doc(getCreditCardsCollection(), id);
      await updateDoc(creditCardRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating credit card:', error);
      throw error;
    }
  },

  deleteCreditCard: async (id: string) => {
    try {
      const creditCardRef = doc(getCreditCardsCollection(), id);
      await deleteDoc(creditCardRef);
    } catch (error) {
      console.error('Error deleting credit card:', error);
      throw error;
    }
  }
};