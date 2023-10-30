import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

interface ProtectedWrapperProps {
  children: React.ReactElement;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedWrapper;
