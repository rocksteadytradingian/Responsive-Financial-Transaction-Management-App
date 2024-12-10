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
import { FundSource } from '../types/finance';

const getFundSourcesCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  return collection(db, 'users', user.uid, 'fundSources');
};

export const fundSourceService = {
  subscribeToFundSources: (callback: (fundSources: FundSource[]) => void) => {
    const user = auth.currentUser;
    if (!user) return () => {};

    const fundSourcesRef = getFundSourcesCollection();
    const q = query(fundSourcesRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fundSources: FundSource[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as FundSource));
        callback(fundSources);
      },
      (error: FirestoreError) => {
        console.error('Error fetching fund sources:', error);
      }
    );

    return unsubscribe;
  },

  addFundSource: async (fundSource: Omit<FundSource, 'id'>) => {
    try {
      const fundSourcesRef = getFundSourcesCollection();
      const docRef = await addDoc(fundSourcesRef, {
        ...fundSource,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        userId: auth.currentUser?.uid
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding fund source:', error);
      throw error;
    }
  },

  updateFundSource: async (id: string, updates: Partial<FundSource>) => {
    try {
      const fundSourceRef = doc(getFundSourcesCollection(), id);
      await updateDoc(fundSourceRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating fund source:', error);
      throw error;
    }
  },

  deleteFundSource: async (id: string) => {
    try {
      const fundSourceRef = doc(getFundSourcesCollection(), id);
      await deleteDoc(fundSourceRef);
    } catch (error) {
      console.error('Error deleting fund source:', error);
      throw error;
    }
  }
};