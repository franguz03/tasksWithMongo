import app from "./app.js";
import { connectDB } from "./bd.js";

connectDB();//hace el llamado para conectarse a la base de datos
app.listen(4001);// iniciar un servidor HTTP en el puerto 4001
console.log("server on port ", 4001)