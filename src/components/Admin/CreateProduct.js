import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';

export default function CreateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const from = location.state?.from?.pathname || '/';

  const [price, setPrice] = useState('');
  const [pictureURL, setPictureURL] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        '/v1/products',
        JSON.stringify({ price, name, stock, description, pictureURL }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setPrice('');
      setPictureURL('');
      setStock('');
      setDescription('');
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
      <FormLabel>Price</FormLabel>
      <TextField
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></TextField>
      <FormLabel>Picture URL</FormLabel>
      <TextField
        type="text"
        value={pictureURL}
        onChange={(e) => setPictureURL(e.target.value)}
      ></TextField>
      <FormLabel>Stock</FormLabel>
      <TextField
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      ></TextField>
      <FormLabel>Description</FormLabel>
      <TextField
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></TextField>
      <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
  );
}
