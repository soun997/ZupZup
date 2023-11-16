import { useLoginCheck } from 'hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { URL } from 'utils';

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export default function PrivateRoute() {
  const isLogin = useLoginCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      //console.log('login');
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        window.navigator.userAgent.includes('wv')
      ) {
        //console.log('This is running as PWA.');
        navigate(URL.LOGIN.HOME);
      } else {
        //console.log('This is running in a browser tab.');
        navigate(URL.LOGIN.ONBOARD);
      }
    }
  }, [isLogin, navigate]);

  if (isLogin) {
    return <Outlet />;
  }

  return null;
}
