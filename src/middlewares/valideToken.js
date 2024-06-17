import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authrequired =(req,res,next)=>{ //middleware utilizado para cunado se hace una peticion a la ruta profile
    console.log("midlleware")
    const {token} = req.cookies// tomamos los tokens del request(los headers guardan los token en un login y los mandan asi no haya un body y sea un get)

    if (!token) 
        return res.status(401).json({message:"no token"})// si no existe el token manda 401
    
    jwt.verify(token,TOKEN_SECRET,(err,user)=>{//(token, secreto utilizado para firmar,callback que se ejecuta tras la verificacion)

        if (err) return res.status(401).json({message:"invalid token"})// si hay un error en la veriifacion 401
    
        req.user=user//ñadimos la propiedad user que guarda user para la proxima funcion en next
        console.log("-----------",req.user);
    })   
    next()// ejecuta la proxima funcion

}