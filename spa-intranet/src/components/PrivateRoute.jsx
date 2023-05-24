import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function PrivateRoute(props) {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to='/' replace />;
    }

    if (props.jefatura) {
        if (!(user.user.id_rol == 2)) {
            return <Navigate to='/inicio' />;
        }
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}