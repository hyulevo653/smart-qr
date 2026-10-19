import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';

function getQueryParam(search: string, key: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(key);
}

const SsoCallback: React.FC = () => {
  const location = useLocation();
  
  const { callback } = useAuth();

  useEffect(() => {
    const code = getQueryParam(location.search, 'code');
    const message = getQueryParam(location.search, 'message');
    callback({ code, message });
  }, [location.search, callback]);

  return <div>Đang xác thực...</div>;
};

export default SsoCallback;
