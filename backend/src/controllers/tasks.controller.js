import Task from "../models/tasks.model.js";

export const addTask = async (req, res) => {
  const { todo } = req.body;
  const userId = req.user._id;
  try {
    if (!todo) {
      return res.status(400).json({ message: "Task description is required" });
    }
    const newTask = new Task({
      todo,
      isCompleted: false,
      userId,
    });
    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error("Error in addTask controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { todo } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { todo },
      { new: true }
    );
    console.log("task", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error in editTask controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error in toggleTaskCompletion controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error in getUserTasks controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
