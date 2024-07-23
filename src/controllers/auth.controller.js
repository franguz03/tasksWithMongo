import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  //funcion para la ruta register
  const { email, password, userName } = req.body; //deconstruimos la peticion

  try {
    const userFound=await user.findOne({email})
    console.log("correo repetido--", userFound)
    if (userFound) return res.status(400).json(['the email already exists'])// verificamos si el email ingresado para el registro ya existe y retornamos 400
    const passwordHash = await bcrypt.hash(password, 10); // devuelve un string aleatorio para encriptar la contraseña

    const newUser = new user({
      // creamos un objeto

      userName: userName,
      email: email,
      password: passwordHash,
    });
    console.log(newUser);
    const userSaved = await newUser.save(); // con esa funcion lo mandamos a la bd
    const token = await createAccessToken({ id: userSaved._id }); // crea un toquen
    res.cookie("token", token); // se guarda en una cookie
    res.json({
      id: userSaved._id,
      email: userSaved.email,
      name: userSaved.userName,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const login = async (req, res) => {
  //funcion para la ruta login
  const { email, password } = req.body; //deconstruimos la peticion

  try {
    const userFound = await user.findOne({ email: email }); // busca un elemento en la collecion que coincida con el conjunto de datos, si no retorna un falsy

    if (!userFound) return res.status(400).json(["user not found"]  ); //validamos si lo encontro por email

    const isMatch = await bcrypt.compare(password, userFound.password); //compara un string con un hash, retorna true o false
    if (!isMatch)
      return res.status(400).json([ "incorrect password" ]); //validamos la contraseña

    const token = await createAccessToken({ id: userFound._id }); // crea un toquen
    res.cookie("token", token); // se guarda en una cookie
    res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.userName,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const logout = (req, res) => {
  // Elimina la cookie llamada 'tu token' estableciendo su valor como null
  // y configurando su fecha de expiración en una fecha pasada (para eliminarla inmediatamente).
  res.cookie("token", "", {
    expires: new Date(0),
  });

  // Envía un código de estado 200 (OK) al cliente para indicar que la operación se realizó correctamente.
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  //peticion get para obtener los datos del perfil previamente logueado
  const userFound = await user.findById(req.user.id); //obetenemos el user con el la propiedad user que añadimos en el middleware
  if (!userFound) return res.status(400).json({ message: "user not found" }); // no se encontro el usuario en la bd 400

  return res.json({
    // si se encuentra retornamos este objeto

    email: userFound.email,
    userName: userFound.userName,
  });
};

export const verifyToken = async (req,res)=>{
  const {token}=req.cookies
  if(!token) return res.status(401).json({message:'unauthorized'})
  
  jwt.verify(token,TOKEN_SECRET, async (err,User)=>{
    if (err) return res.status(401).json({message:'unauthorized'})

      const userFound = await user.findById(User.id)

      if (!userFound) res.status(401).json({message:'unauthorized'})

      return res.json({
        id:userFound._id,
        username:userFound.userName,
        email: userFound.email,
      })
  })


  
}