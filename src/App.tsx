import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/transactions/TransactionForm';
import { AuthProvider } from './components/auth/AuthProvider';
import { AuthGuard } from './components/auth/AuthGuard';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AuthProvider>
      <AuthGuard>
        <AppLayout onAddTransaction={() => setShowForm(true)}>
          {showForm ? (
            <TransactionForm onClose={() => setShowForm(false)} />
          ) : (
            <Dashboard />
          )}
        </AppLayout>
      </AuthGuard>
    </AuthProvider>
  );
}

export default App;