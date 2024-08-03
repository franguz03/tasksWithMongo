import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  getTasksRequest,
  updateTasksRequest,
} from "../api/tasks";
const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new error("useTasks must be used within a taskProvider");
  }
  return context;
};
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      console.log("res", res);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createTasks = async (task) => {
    const res = await createTasksRequest(task);
    console.log(res);
  };
  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      console.log("eliminacion de tarea", res);
      if (res.status == 200) setTasks(tasks.filter((task) => task._id != id));
    } catch (error) {
      console.log(error);
    }
  };
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask =async (id,task)=>{
    try {
        await updateTasksRequest(id,task)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <TaskContext.Provider
      value={{updateTask, getTask, tasks, createTasks, getTasks, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
