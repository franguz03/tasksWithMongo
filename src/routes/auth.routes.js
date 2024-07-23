import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken
} from "../controllers/auth.controller.js";
import { authrequired } from "../middlewares/valideToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const router = Router(); //lo usamos para crear rutas

router.post("/register", validateSchema(registerSchema), register); //recibe una ruta y una funcion
router.post("/login", validateSchema(loginSchema), login); //recibe una ruta y una funcion
router.post("/logout", logout);
router.get("/verify",verifyToken);
router.get("/profile", authrequired, profile); //(ruta,middleware,funcion)
export default router;
