import axiosInstance from "./axios";

export const getTaskRequest = (id) => axiosInstance.get(`/tasks/${id}`);
export const getTasksRequest = () => axiosInstance.get("/tasks");
export const createTasksRequest = (task) => axiosInstance.post("/tasks", task);
export const updateTasksRequest = (id,task) =>
  axiosInstance.put(`/tasks/${id}`, task);
export const deleteTasksRequest =(id)=> axiosInstance.delete(`/tasks/${id}`)