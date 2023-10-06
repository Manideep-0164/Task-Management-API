const mongoose = require("mongoose");
const { TaskModel } = require("../models/task.model");
require("dotenv").config();

const addTask = async (req, res) => {
  try {
    // get the email(attached while authentication), title, and description from request
    const { email } = req;
    const { title, description } = req.body;

    // Check if title and description are provided
    if (!title || !description)
      return res
        .status(400)
        .json({ message: "Title and description are required." });

    // Create a new task
    const task = new TaskModel({ title, description, user: email });

    // Save the task  to the database
    await task.save();

    // Respond with success message and the created task
    res.status(201).json({ message: "Task added successfully", task: task });
  } catch (error) {
    console.log(`Error adding task => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

const getTasks = async (req, res) => {
  try {
    // get the email(attached while authentication) from request
    const { email } = req;

    // retrive the tasks associated with provided email
    const tasks = await TaskModel.find({ user: email });

    // Check if no tasks were found for user
    if (tasks.length === 0)
      return res.status(204).json({ message: "No tasks found" });

    // Respond with tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.log(`Error getting tasks => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

const getSingleTask = async (req, res) => {
  try {
    // get the Id from request parameters
    const { id } = req.params;

    // check if the Id is valid Object id
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id format" });

    // retrive a task
    const task = await TaskModel.findById(id);

    // Check if no task was found
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Respond with task
    res.status(200).json({ task });
  } catch (error) {
    console.log(`Error getting task => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

const updateTask = async (req, res) => {
  try {
    // get the Id from request parameters
    const { id } = req.params;

    const { title, description, status } = req.body;

    // Check if at least one of the fields is provided
    if (!title && !description && !status)
      return res.status(400).json({
        message:
          "Provide at least one of these fields: title, description, or status to update",
      });

    // check if the Id is valid Object id
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id format" });

    const task = await TaskModel.findById(id);

    // Check if no task was found for the provided ID
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    // update a task
    const updatedTask = await task.save();

    // Respond with success message and task
    res
      .status(200)
      .json({ message: "Successfully updated task", task: updatedTask });
  } catch (error) {
    console.log(`Error updating task => ${error}`);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Invalid values, Please provide valid values!" });
    }
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

const deleteTask = async (req, res) => {
  try {
    // get the Id from request parameters
    const { id } = req.params;

    // check if the Id is valid Object id
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id format" });

    // delete a task
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    // Check if no task was found
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    // Respond with success message
    res.status(200).json({ message: "Task deleted." });
  } catch (error) {
    console.log(`Error deleting task => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

module.exports = {
  addTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
