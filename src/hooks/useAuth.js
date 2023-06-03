import { useContext, useDebugValue, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => {
    return auth?.user ? 'Logged In' : 'Logged Out';
  });
  return useContext(AuthContext);
};

export default useAuth;
