import express from "express";
import morgan from "morgan";


const app=express()//instancia de express

app.use(morgan('combined')) //utiliza morgan para mostrar las solicitudes realizadas por el formato que establece el parametro commbined

export default app;
