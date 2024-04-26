import user from "../models/user.model.js"

export const register= async(req,res)=>{ //funcion para la ruta register
const {email, password,userName}=req.body //deconstruimos la peticion
 res.send('registrando')//mandamos esta respuesta

try {
    const newUser= new user ({ // creamos un objeto

    userName,
    email,
    password
 })

 await newUser.save()// con esa funcion lo mandamos a la bd

console.log("nuevo usuario",newUser)
} catch (error) {
    console.log(error)
    
}




}
export const login=(req,res)=>{ //funcion para la ruta login
    res.send('login')
    
}