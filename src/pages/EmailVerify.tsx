import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import usePostData from '../hooks/usePostHook';

const EmailVerify: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const location = useLocation();
  const { data, error, isValidating, executePost } = usePostData(
    `verify/${token}/`,
    {},
    {
      'Content-Type': 'application/json',
    }
  );

  useEffect(() => {
    const path = location.pathname.split('/');
    const token = path[path.length - 1];
    setToken(token);
    console.log(token);
    executePost();
  }, [token]);

  return (
    <div>
      <div>verfiy {token}</div>
    </div>
  );
};

export default EmailVerify;
