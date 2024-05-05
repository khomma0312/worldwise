import { useAuth } from '@/contexts/FakeAuthContext';
import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute: FC<{children: ReactNode}> = ({children}) => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}
