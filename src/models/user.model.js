import mongoose from "mongoose";

const userSchema = new mongoose.Schema(//crea un nuevo esquema (estructura de los documentos de la collecion)
  {
    
    userName: {
      //atributo
      type: String,
      required: true,
      trim: true, //quita los espacios en blanco
    },
    email: {
      //atributo
      type: String,
      required: true,
      trim: true,
      unique: true, //para que cada email sea unico
    },
    password: {
      //atributo
      type: String,
      required: true,
    },
  },
  { timestamps: true }// crea dos marcas de tiempo (creacion y actualizacion) que en la bd se agregan como otro campo
);

export default mongoose.model("user", userSchema); //crea un coleccion "user" con el esquema definido y un modelo que nos permita usar las funciones
