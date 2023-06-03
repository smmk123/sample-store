import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = localStorage.getItem('refreshToken');
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh(refreshToken);
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
  }, [isLoading]);

  return (
    <>
      {!refreshToken ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  );
};

export default PersistLogin;
