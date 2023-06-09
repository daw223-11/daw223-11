import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


export function PublicRoute() {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to='/inicio' replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}