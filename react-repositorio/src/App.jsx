import AuthContextProvider, { useAuthContext } from './context/AuthContext';
import './App.css';
import { Login } from './pages/Login.jsx';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { PublicRoute } from './components/PublicRoute'
import { PrivateRoute } from './components/PrivateRoute';
import { TablonAnuncios } from './pages/TablonAnuncios';
import { Csv } from './pages/Csv';
import { Matriculaciones } from './pages/Matriculaciones';
import { Emails } from "./pages/Emails";
import { Registro } from './pages/Registro';
function App() {

  return (

    <AuthContextProvider>
      <BrowserRouter basename='/intranet'>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route element={<PrivateRoute jefatura={false} />}>
            <Route index path='/inicio' element={<Inicio />} />
            <Route path="/csv" element={<Csv />} />
            <Route path="/tablon-anuncios" element={<TablonAnuncios />} />
            <Route path="/matriculaciones" element={<Matriculaciones />} />
          </Route>
          <Route element={<PrivateRoute jefatura={true} />} >
            <Route path='/emails' element={<Emails />} />
            <Route path='/registrarUsuarios' element={<Registro />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
