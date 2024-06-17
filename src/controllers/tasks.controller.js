import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate("user"); // popoulate hace una referencia al schema de moongose user
  res.json(tasks);
};

export const createTasks = async (req, res) => {
  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "task not found" });
  res.json(task);
};

export const updateTasks = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    // req params toma los parametros de la url, req.body (segundo campo) valores a actualizar, new true hace que retorne el objeto actualizado
    // actualiza las porpiedades que coincidan con la que se pasan en el segundo parametro, lo demas lo omite
    new: true,
  });
  if (!task) return res.status(404).json({ message: "task no found" });
  res.json(task);
};

export const deleteTasks = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "task no found" });
  res.json(task);
};
