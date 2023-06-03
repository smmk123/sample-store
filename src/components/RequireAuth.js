import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  if (auth?.roles && allowedRoles.includes(auth.roles)) {
    return <Outlet />;
  } else if (auth?.roles) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  // else {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
};

export default RequireAuth;
