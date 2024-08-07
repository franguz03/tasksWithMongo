import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const{signin,errosRegister:errorsLogin,isAuthenticated}=useAuth()
  const navegate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(()=>{

    if (isAuthenticated)  navegate('/tasks')
  },[isAuthenticated])
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
       
       {errorsLogin.map((error,i)=>(<div key={i} className="bg-red-500 p-2 text-white"> {error}</div>))}
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Login</h1>
          {/* Campo de entrada para el correo electrónico */}
          <input
            type="email"
            {...register("email", { required: true })} // Registra el campo en useForm y marca como requerido
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500"> email is requires</p>}
          {/* Campo de entrada para la contraseña */}
          <input
            type="password"
            {...register("password", { required: true })} // Registra el campo en useForm y marca como requerido
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500"> Password is requires</p>
          )}
          {/* Botón para enviar el formulario */}
          <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md my-2">login</button>
        </form>
        <p className="flex gap-x-2 justify-between">Don´t haave a account? <Link  className="text-sky-500" to="/register">Singup</Link></p>

      </div>
    </div>
  );
}
