import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context';

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  
  const { isAuthenticated } = useContext(AuthContext);
  console.log('is auth?', isAuthenticated);
  
  return isAuthenticated? element : <Navigate to="/login" />;
};

export default PrivateRoute;
