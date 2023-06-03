import { useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { Paper } from '@mui/material';
const LOGIN_URL = '/v1/auth/login';

const Login = () => {
  const { setAuth } = useAuth();
  const [persist, setPersist] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const accessToken = response?.data?.tokens?.access?.token;
      const roles = response?.data?.user?.role;
      const user = response?.data?.user?.name;
      setAuth({ user, email, password, roles, accessToken });
      if (persist) {
        localStorage.setItem(
          'refreshToken',
          response?.data?.tokens?.refresh?.token
        );
      }
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const togglePersist = () => {
    setPersist((prevPersist) => !prevPersist);
  };

  return (
    <Paper>
      <div className="container">
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full border border-gray-300 rounded-md text-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
            required
            className="w-full border border-gray-300 rounded-md text-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            Sign In
          </button>
          <div className="persistCheck">
            <input type="checkbox" id="persist" onChange={togglePersist} />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
    </Paper>
  );
};

export default Login;
