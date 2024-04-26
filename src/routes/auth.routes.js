import { Router } from "express";
import{login,register} from "../controllers/auth.controller.js"

const router =Router()//lo usamos para crear rutas

router.post('/register',register); //resive una ruta y una funcion
router.post('/login',login) //resive una ruta y una funcion

export default router