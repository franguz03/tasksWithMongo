import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './context/authContext.jsx';

export default function App() {
  return (
    // AuthProvider envuelve toda la aplicación para proporcionar el contexto de autenticación a todos los componentes hijos
    <AuthProvider>
      {/* BrowserRouter envuelve las rutas para manejar la navegación */}
      <BrowserRouter>
        {/* Define las rutas de la aplicación */}
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path='/' element={<h1>Home Page</h1>} />
          {/* Ruta para la página de inicio de sesión */}
          <Route path='/login' element={<LoginPage />} />
          {/* Ruta para la página de registro */}
          <Route path='/register' element={<RegisterPage />} />
          {/* Ruta para la página de tareas */}
          <Route path='/tasks' element={<h1>Tasks Page</h1>} />
          {/* Ruta para la página de añadir nueva tarea */}
          <Route path='/add-task' element={<h1>New Task</h1>} />
          {/* Ruta para la página de actualizar tarea */}
          <Route path='/tasks/:id' element={<h1>Update Task</h1>} />
          {/* Ruta para la página de perfil */}
          <Route path='/profile' element={<h1>Profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
