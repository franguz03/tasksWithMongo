import { Router } from "express";
import{login,register,logout,profile} from "../controllers/auth.controller.js"
import {authrequired} from "../middlewares/valideToken.js"
const router =Router()//lo usamos para crear rutas

router.post('/register',register); //resive una ruta y una funcion
router.post('/login',login) //resive una ruta y una funcion
router.post('/logout',logout)
router.get('/profile',authrequired,profile)//(ruta,middleware,funcion)
export default router