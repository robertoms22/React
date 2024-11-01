import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Daily from './components/Daily';
import HorasExtras from './components/HorasExtras';
import Notas from './components/Notas';
import Login from './components/Login'; // Componente de login
import PrivateRoute from './components/PrivateRoute'; // Rutas protegidas
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Ruta para el login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta protegida para la aplicación */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>
                  <Daily />
                  <HorasExtras />
                  <Notas />
                </div>
              </PrivateRoute>
            }
          />

          {/* Redirecciona al login por defecto */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

