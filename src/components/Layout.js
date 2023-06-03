import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
