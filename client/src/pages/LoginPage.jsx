import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
       <h1 className="text-2xl font-bold">login</h1>
        <form onSubmit={onSubmit}>
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
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
}
