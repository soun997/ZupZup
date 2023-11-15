import { useLoginCheck } from 'hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivateRoute() {
  const isLogin = useLoginCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  if (isLogin) {
    return <Outlet />;
  }

  return null;
}
