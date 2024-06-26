import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  // Inicializa el hook useForm para manejar el formulario
  const { register, handleSubmit } = useForm();
  
  // Obtiene las funciones signup e isAuthenticated del contexto que provee useAuth
  const { signup, isAuthenticated } = useAuth();
  
  // Hook para la navegación programática
  const navigation = useNavigate();

  // useEffect para redirigir al usuario si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigation("/tasks"); // si el usuario esta autenticado nos redirige a la ruta /tasks
    }
  }, [isAuthenticated]); 

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = handleSubmit(async (values) => {
    console.log(values); // Muestra los valores del formulario en la consola
    signup(values); // Llama a la función signup con los valores del formulario
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        {/* Campo de entrada para el nombre de usuario */}
        <input
          type="text"
          {...register("userName", { required: true })} // Registra el campo en useForm y marca como requerido
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {/* Campo de entrada para el correo electrónico */}
        <input
          type="email"
          {...register("email", { required: true })} // Registra el campo en useForm y marca como requerido
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {/* Campo de entrada para la contraseña */}
        <input
          type="password"
          {...register("password", { required: true })} // Registra el campo en useForm y marca como requerido
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {/* Botón para enviar el formulario */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
