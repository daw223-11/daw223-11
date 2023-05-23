import { Link } from "react-router-dom";
import '../App.css'
import { useAuthContext } from "../context/AuthContext";

export function NavBar() {
    const { user } = useAuthContext();

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/inicio">INICIO</Link>
                </li>
                <li>
                    <Link to="/csv">SUBIR CSV</Link>
                </li>
                <li>
                    <Link to="/tablon-anuncios">TABLÓN DE ANUNCIOS</Link>
                </li>
                <li>
                    <Link to="/matriculaciones">MATRICULACIONES</Link>
                </li>
                {user.user.id_rol == 2 ? <li><Link to="/emails">ENVIAR EMAILS</Link></li> : null}
                {user.user.id_rol == 2 ? <li><Link to="/registrarUsuarios">REGISTRAR USUARIOS</Link></li> : null}
            </ul>
        </nav>
    );
}