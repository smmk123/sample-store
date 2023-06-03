import { useEffect } from 'react';
import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setAuth({});
      navigate({ pathname: '/products' });
      if (refreshToken) {
        await axios.post('/v1/auth/logout', { refreshToken });
        localStorage.removeItem('refreshToken');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    return () => {};
  }, []);

  return logout;
};

export default useLogout;
