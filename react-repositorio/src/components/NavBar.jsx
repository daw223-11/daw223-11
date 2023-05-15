import { Link } from "react-router-dom";
import '../App.css'

export function NavBar() {

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
                <li>
                    <Link to="/emails">EMAILS</Link>
                </li>
            </ul>
        </nav>
    );
}