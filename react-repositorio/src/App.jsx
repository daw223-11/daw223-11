import { useState } from 'react';
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
function App() {
  const [user, setUser] = useState();
  // TODO: Comprobar que existe un usuario en el sessionStorage
  // TODO: Si existe redirigir a inicio
  // TODO: Sino existe redirigir al login

  const changeUser = (newUser) => {
    setUser(newUser);
    /* sessionStorage.setItem("key", "value"); */
    console.log(newUser)
  }

  return (
    <>


      <BrowserRouter basename='/intranet'>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path='/private' element={<PrivateRoute isAuthenticated={false} />}>
            <Route index path='/private/inicio' element={<Inicio />} />
            <Route path="/private/csv" element={<Csv />} />
            <Route path="/private/tablon-anuncios" element={<TablonAnuncios />} />
            <Route path="/private/matriculaciones" element={<Matriculaciones />} />
            <Route path='/private/emails' element={<Emails />} />
          </Route>
          {/* <Route element={<ProtectedRoute isAllowed={!!user} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
