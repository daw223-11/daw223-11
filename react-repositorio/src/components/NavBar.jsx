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
                    <Link to="/csv">CSV</Link>
                </li>
                <li>
                    <Link to="/tablon-anuncios">TABLÓN DE ANUNCIOS</Link>
                </li>
                <li>
                    <Link to="/matriculaciones">MATRICULACIONES</Link>
                </li>
                {user.user.id_rol == 2 ? <li><Link to="/emails">EMAILS</Link></li> : null}
            </ul>
        </nav>
    );
}