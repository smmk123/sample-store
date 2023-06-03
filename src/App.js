import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/services/Editor';
import Admin from './components/Admin/Admin';
import Missing from './components/services/Missing';
import Unauthorized from './components/services/Unauthorized';
import Lounge from './components/Admin/Lounge';
import LinkPage from './components/services/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/services/PersistLogin';
import Products from './components/Products';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Admin/Users';
import CreateUser from './components/Admin/CreateUser';
import CreateProduct from './components/Admin/CreateProduct';
import ShoppingCart from './components/ShoppingCart';

const ROLES = {
  User: 'user',
  Editor: 'user',
  Admin: 'admin',
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="users" element={<Users />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="create-user" element={<CreateUser />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="create-product" element={<CreateProduct />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
