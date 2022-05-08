import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  component: ReactNode;
  redirectTo: string;
}

export function ProtectedRoute({ component, redirectTo }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user.email) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
}
