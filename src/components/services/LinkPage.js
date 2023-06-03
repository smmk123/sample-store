import { Link } from 'react-router-dom';

const LinkPage = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Links</h1>
      <br />
      <h2 className="text-xl font-semibold">Public</h2>
      <Link to="/products">Products</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2 className="text-xl font-semibold">Private</h2>
      <Link to="/">Home</Link>
      <Link to="/editor">Editors Page</Link>
      <Link to="/admin">Admin Page</Link>
    </section>
  );
};

export default LinkPage;
