import { Navigate, Outlet } from 'react-router-dom';
import { Login } from '../pages/Login';

//TODO: Está hardcodeado con las props
export function PrivateRoute(props) {
    /* const { isAuthenticated } = useAuthContext(); */

    if (!props.isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}