import { type } from "express/lib/response";
import mongoose from "mongoose";

const userSchema =mongoose.Schema({ //crea un nuevo esquema (estructura de los documentos de la collecion)
  userName: { //atributo
    type: String,
    required: true,
    trim:true, //quita los espacios en blanco
  },
  email: { //atributo
    type: String, 
    required: true,
    trim:true,
    unique:true//para que cada email sea unico
  },
  password: { //atributo
    type: String,
    required: true,
  },
});

export default mongoose.model('user',userSchema) //crea un coleccion "user" con el esquema definido

