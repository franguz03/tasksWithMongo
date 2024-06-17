import { Router } from "express";
import { authrequired } from "../middlewares/valideToken.js";
import {
  getTask,
  getTasks,
  deleteTasks,
  updateTasks,
  createTasks,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";
const router = Router();

router.get("/tasks", authrequired, getTasks);
router.get("/tasks/:id", authrequired, getTask); // : espedifica un a propiedad a la cual se puede acceder despues, en este caso id 
router.post("/tasks", authrequired,validateSchema(createTaskSchema), createTasks);// ejecuta las fuunciones middleware una despues de otra en ese orden 
router.delete("/tasks/:id", authrequired, deleteTasks);
router.put("/tasks/:id", authrequired, updateTasks);
export default router;
