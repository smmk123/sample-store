import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from '../../api/axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';

export default function CreateUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        '/v1/users',
        JSON.stringify({ email, name, password, role }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setEmail('');
      setPassword('');
      setRole('');
      setName('');
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

  return (
    <FormControl>
      <FormLabel>Name</FormLabel>
      <TextField
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></TextField>
      <FormLabel>Email</FormLabel>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <FormLabel>Password</FormLabel>
      <TextField
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <FormLabel>Role</FormLabel>
      <Select
        type="text"
        defaultValue="user"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <MenuItem value={'user'}>User</MenuItem>
        <MenuItem value={'admin'}>Admin</MenuItem>
      </Select>
      <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
  );
}
