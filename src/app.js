import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";// para parsear las cookies que guardan los token
import authrouters from './routes/auth.routes.js'


const app=express()//instancia de express
app.use(express.json())//para que pueda leer los request en formato json
app.use(cookieParser())//usamos el parser en app
app.use(morgan('combined')) //utiliza morgan para mostrar las solicitudes realizadas por el formato que establece el parametro commbined
app.use("/api",authrouters) //todas las rutas van a empezar con /api

export default app;
