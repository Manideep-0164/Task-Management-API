const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    creation_date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const TaskModel = model("task", taskSchema);

module.exports = {
  TaskModel,
};
