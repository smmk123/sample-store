import { useNavigate, Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { Paper } from '@mui/material';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
  };

  return (
    <>
      <div className="relative">
        {/* Hero Image */}
          <div className="min-h-full bg-transparent">
          <img
            src="https://picsum.photos/2000/1000"
            alt="Hero"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-white text-xl">Discover Amazing Products</p>
          <Link
            to="/products"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-6 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <Paper elevation={3}>
        <h1>Home</h1>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/editor">Go to the Editor page</Link>
          </li>

          <li>
            <Link to="/admin">Go to the Admin page</Link>
          </li>

          <li>
            <Link to="/lounge">Go to the Lounge</Link>
          </li>

          <li>
            <Link to="/linkpage">Go to the link page</Link>
          </li>
        </ul>
        <div className="flexGrow">
          <button onClick={signOut}>Sign Out</button>
        </div>
      </Paper>
    </>
  );
};

export default Home;
