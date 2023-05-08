import { useState } from 'react';
import './App.css'
import { Login } from './pages/Login.jsx'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Inicio } from './pages/Inicio'
import { ProtectedRoute } from './components/ProtectedRoute'
import { TablonAnuncios } from './pages/TablonAnuncios';
import { Csv } from './pages/Csv';

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

      
      <BrowserRouter>
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="/login" element={<Login user={user} changeUser={changeUser} />} />
          <Route element={<ProtectedRoute isAllowed={!!user} />} />
          <Route path="/inicio" element={<Inicio user={user} />} />
          <Route path="/csv" element={<Csv />} />
          <Route path="/tablon-anuncios" element={<TablonAnuncios />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
