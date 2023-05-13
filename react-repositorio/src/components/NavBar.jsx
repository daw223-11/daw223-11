import { Link } from "react-router-dom";
import '../App.css'

export function NavBar() {
    const routes = ['/login', '/inicio', '/csv', '/tablon-anuncios']

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/private/inicio">INICIO</Link>
                </li>
                <li>
                    <Link to="/private/csv">CSV</Link>
                </li>
                <li>
                    <Link to="/private/tablon-anuncios">TABLÓN DE ANUNCIOS</Link>
                </li>
                <li>
                    <Link to="/private/matriculaciones">MATRICULACIONES</Link>
                </li>
                <li>
                    <Link to="/private/emails">EMAILS</Link>
                </li>
            </ul>
        </nav>
    );
}