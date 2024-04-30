import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
  //funcion para la ruta register
  const { email, password, userName } = req.body; //deconstruimos la peticion
    
  try {
    const passwordHash = await bcrypt.hash(password, 10); // devuelve un string aleatorio para encriptar la contraseña
    
    const newUser = new user({
      // creamos un objeto

      userName:userName,
      email:email,
      password:passwordHash,
    });
    console.log(newUser)
    const userSaved = await newUser.save(); // con esa funcion lo mandamos a la bd
    const token = await createAccessToken({id:userSaved._id}) // crea un toquen
    res.cookie('tu token', token)// se guarda en una cookie
    res.json({
        id:userSaved._id,
        email:userSaved.email,
        name:userSaved.userName
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
export const login = (req, res) => {
  //funcion para la ruta login
  res.send("login");
};
