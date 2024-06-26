import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";// para parsear las cookies que guardan los token
import authrouters from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routers.js'
import cors from 'cors'


const app=express()//instancia de express
app.use(cors(// soluciona el conflicto entre dominios en el explorador cuando se corre front y back
   {origin: 'http://localhost:5173'} 
))
app.use(express.json())//para que pueda leer los request en formato json
app.use(cookieParser())//usamos el parser en app
app.use(morgan('combined')) //utiliza morgan para mostrar las solicitudes realizadas por el formato que establece el parametro commbined
app.use("/api",authrouters) //todas las rutas van a empezar con /api
app.use("/api",tasksRoutes) // añadimos otro route
export default app;
