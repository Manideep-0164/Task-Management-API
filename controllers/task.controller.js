const { TaskModel } = require("../models/task.model");
require("dotenv").config();

const createTask = async (req, res) => {
  try {
  } catch (error) {
    console.log(`Error creating task => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};
