import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/v1/users', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data.results);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length ? (
              users.map((user) => (
                <TableRow
                  key={user.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.role}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <p>No users to display</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Link className="text-black" to="/create-user">
        Create New User
      </Link>
    </Container>
  );
};

export default Users;
