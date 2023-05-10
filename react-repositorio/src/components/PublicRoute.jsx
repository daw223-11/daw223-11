import { Navigate, Outlet } from 'react-router-dom';
import { Inicio } from '../pages/Inicio';
/* import { useAuthContext } from 'contexts/authContext'; */


//TODO: Está hardcodeado con las props
//TODO: Cambiar las rutas de navigate
export function PublicRoute(props) {
    /* const { isAuthenticated } = useAuthContext(); */

    if (props.isAuthenticated) {
        return <Navigate to={<Inicio />} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}