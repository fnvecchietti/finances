import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context';

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  
  const { token } = useContext(AuthContext);
  const location  = useLocation();
  
  return token? element : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
