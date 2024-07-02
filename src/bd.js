import mongoose from "mongoose";

export const connectDB = async () => {//funcion para conectarnos a la base de datos
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskWithMongo");//establecer una conexión a una base de datos MongoDB llamada "taskWithMongo" que se encuentra en el servidor local
    console.log(">>>> db is connected");
  } catch (error) {
    console.log(error);
  }
};
