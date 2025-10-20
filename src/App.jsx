import React, { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, SetUsername] = useState('')

  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          SetUsername(data.username)
        }
      } catch (err) {
        console.error('No autenticado:', err);
      }
    };

    checkAuth();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      console.log('Registro:', data);
    } catch (err) {
      console.error('Error al registrar:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        SetUsername(data.username)
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <div className="container">
      <h1>Mi App de Autenticación</h1>

      {!isAuthenticated ? (
        <>
          <form onSubmit={handleRegister} className="form">
            <h2>Registro</h2>
            <input
              type="text"
              placeholder="Usuario"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
            <button type="submit">Registrar</button>
          </form>

          <form onSubmit={handleLogin} className="form">
            <h2>Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Usuario"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit">Entrar</button>
          </form>
        </>
      ) : (
        <div className="content">
          <h2>Bienvenido, {username}!</h2>
          <p>Este contenido solo se muestra si estás autenticado.</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default App;