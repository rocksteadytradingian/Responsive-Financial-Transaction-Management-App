import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: ReactNode;
  onAddTransaction: () => void;
}

export function AppLayout({ children, onAddTransaction }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onAddTransaction={onAddTransaction} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}