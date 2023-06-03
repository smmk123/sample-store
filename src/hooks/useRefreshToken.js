import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (refreshToken) => {
    try {
      const response = await axios.post('/v1/auth/refresh-tokens', {
        refreshToken,
      });
      const { tokens, user } = response.data.user;
      setAuth((prevAuth) => ({
        ...prevAuth,
        accessToken: tokens.access.token,
        email: user.email,
        roles: user.role,
        user: user.name,
      }));
      localStorage.setItem('refreshToken', tokens.refresh.token);
      return tokens.access.token;
    } catch (error) {
      console.log('🚀 ~ file: refreshToken.js:30 ~ refresh ~ error:', error);
    }
  };
  return refresh;
};

export default useRefreshToken;
