import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  Timestamp,
  getDocs,
  FirestoreError
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Transaction } from '../types/finance';

const getTransactionsCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  return collection(db, 'users', user.uid, 'transactions');
};

export const transactionService = {
  subscribeToTransactions: (callback: (transactions: Transaction[]) => void) => {
    const user = auth.currentUser;
    if (!user) return () => {};

    const transactionsRef = getTransactionsCollection();
    const q = query(
      transactionsRef,
      orderBy('date', 'desc'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const transactions: Transaction[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        } as Transaction));
        callback(transactions);
      },
      (error: FirestoreError) => {
        console.error('Error fetching transactions:', error);
        if (error.code === 'permission-denied') {
          console.error('User does not have permission to access transactions');
        }
      }
    );

    return unsubscribe;
  },

  addTransaction: async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const transactionsRef = getTransactionsCollection();
      const docRef = await addDoc(transactionsRef, {
        ...transaction,
        date: Timestamp.fromDate(transaction.date),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        userId: auth.currentUser?.uid
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  updateTransaction: async (id: string, transaction: Partial<Transaction>) => {
    try {
      const transactionRef = doc(getTransactionsCollection(), id);
      const updates: Record<string, any> = {
        ...transaction,
        updatedAt: Timestamp.now()
      };
      if (transaction.date) {
        updates.date = Timestamp.fromDate(transaction.date);
      }
      await updateDoc(transactionRef, updates);
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  deleteTransaction: async (id: string) => {
    try {
      const transactionRef = doc(getTransactionsCollection(), id);
      await deleteDoc(transactionRef);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  getTransactionsByDateRange: async (startDate: Date, endDate: Date) => {
    try {
      const transactionsRef = getTransactionsCollection();
      const q = query(
        transactionsRef,
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      } as Transaction));
    } catch (error) {
      console.error('Error fetching transactions by date range:', error);
      throw error;
    }
  }
};