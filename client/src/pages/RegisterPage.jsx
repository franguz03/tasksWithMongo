import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  // Inicializa el hook useForm para manejar el formulario
  const { register, handleSubmit,formState:{errors} } = useForm();
  
  // Obtiene las funciones signup e isAuthenticated del contexto que provee useAuth
  const { signup, isAuthenticated,errosRegister } = useAuth();
  
  // Hook para la navegación programática
  const navigation = useNavigate();
  

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // useEffect para redirigir al usuario si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigation("/tasks"); // si el usuario esta autenticado nos redirige a la ruta /tasks
    }
  }, [isAuthenticated]); 

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = handleSubmit(async (values) => {
    // console.log(values); // Muestra los valores del formulario en la consola
    signup(values); // Llama a la función signup con los valores del formulario
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {errosRegister.map((error,i)=>(<div key={i} className="bg-red-500 p-2 text-white"> {error}</div>))}
      
      <form onSubmit={onSubmit}>
        {/* Campo de entrada para el nombre de usuario */}
        <input
          type="text"
          {...register("userName", { required: true })} // Registra el campo en useForm y marca como requerido
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.userName && (<p className="text-red-500"> Username is requires</p>)}
        {/* Campo de entrada para el correo electrónico */}
        <input
          type="email"
          {...register("email", { required: true })} // Registra el campo en useForm y marca como requerido
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && (<p className="text-red-500"> email is requires</p>)}
        {/* Campo de entrada para la contraseña */}
        <input
          type="password"
          {...register("password", { required: true })} // Registra el campo en useForm y marca como requerido
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password && (<p className="text-red-500"> Password is requires</p>)}
        {/* Botón para enviar el formulario */}
        <button type="submit">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between">Already have a account? <Link className="text-sky-500" to="/login">Singin</Link></p>
    </div>
  );
}

export default RegisterPage;
