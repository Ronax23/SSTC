import { toast } from 'react-hot-toast';
import { Navigate,Outlet} from 'react-router-dom';
interface ProtectedRouteProps {
  allowedRoles?: string[];
}
function AuthRole({ allowedRoles }: ProtectedRouteProps) {
  const role = document.cookie.split('; ').find(row => row.startsWith('role='))?.split('=')[1];

  if (!role || role === 'guest') {
    toast.error('Please log in to access this page.');
    return <Navigate to="/login" replace />; // Happens instantly, toast persists!
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    toast.error('You do not have permission to view this page.');
return <Navigate to="/login" replace />; // Happens instantly, toast persists!
  }
  return <Outlet />;
}

export default AuthRole