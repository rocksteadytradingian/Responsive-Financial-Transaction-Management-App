import { PropsWithChildren } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginPage } from '../auth/LoginPage';

export function AuthLayout({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
}