import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";
import Navbar from "./components/Navbar.jsx";
export default function App() {
  return (
    // AuthProvider envuelve toda la aplicación para proporcionar el contexto de autenticación a todos los componentes hijos
    <AuthProvider>
      {/* BrowserRouter envuelve las rutas para manejar la navegación */}
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            {/* Define las rutas de la aplicación */}
            <Routes>
              {/* Ruta para la página de inicio */}
              <Route path="/" element={<HomePage />} />
              {/* Ruta para la página de inicio de sesión */}
              <Route path="/login" element={<LoginPage />} />
              {/* Ruta para la página de registro */}
              <Route path="/register" element={<RegisterPage />} />
              {/* Ruta para la página de tareas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                {/* Ruta para la página de añadir nueva tarea */}
                <Route path="/add-task" element={<TaskFormPage />} />
                {/* Ruta para la página de actualizar tarea */}
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                {/* Ruta para la página de perfil */}
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
