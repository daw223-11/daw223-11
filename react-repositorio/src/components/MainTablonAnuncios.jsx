import "../App.css";
import { CKEditorMod } from './CKEditorMod';

export function MainTablonAnuncios() {
    return (
        <div className="mainTablonAnuncios">
            <h1>TABLÓN DE ANUNCIOS</h1>
            <CKEditorMod />
        </div>
    )
}