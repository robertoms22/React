import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Para redirigir al usuario

  const handleLogin = async (e) => {
    e.preventDefault();

    // Obtener la URL de la API desde la variable de entorno
    const apiUrl = process.env.REACT_APP_API_URL;  // Usamos la variable de entorno

    try {
      // Verificar los datos antes de enviarlos
      console.log('Enviando datos:', { email, password });

      const response = await fetch(`${apiUrl}/login`, {  // Usamos apiUrl aquí
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Verificar la respuesta de la API
      console.log('Respuesta de la API:', response);

      const data = await response.json();
      // Verificar los datos devueltos por la API
      console.log('Datos devueltos:', data);

      if (response.ok) {
        // Simular autenticación estableciendo un "token" en el localStorage
        localStorage.setItem('token', '123456789');  // Simular un token en localStorage
        alert('Login exitoso');
        navigate('/dashboard');  // Redirige al dashboard
      } else {
        alert(data.message);  // Mostrar el mensaje de error del backend
      }
    } catch (error) {
      console.error('Error en el login:', error);  // Mostrar cualquier error
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Ingresa tu correo" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Ingresa tu contraseña" 
              required 
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
