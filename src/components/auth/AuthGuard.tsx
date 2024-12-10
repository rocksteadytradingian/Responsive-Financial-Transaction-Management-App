import { PropsWithChildren } from 'react';
import { useAuthContext } from './AuthContext';
import { LoginPage } from './LoginPage';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function AuthGuard({ children }: PropsWithChildren) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
}