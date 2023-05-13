import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function PrivateRoute(props) {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to='/' replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}