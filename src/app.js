import express from "express";
import morgan from "morgan";
import authrouters from './routes/auth.routes.js'


const app=express()//instancia de express
app.use(express.json())//para que pueda leer los request en formato json

app.use(morgan('combined')) //utiliza morgan para mostrar las solicitudes realizadas por el formato que establece el parametro commbined
app.use("/api",authrouters) //todas las rutas van a empezar con /api

export default app;
