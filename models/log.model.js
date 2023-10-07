const { Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    remoteIPAddress: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    responseSize: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const LogModel = model("log", logSchema);

module.exports = {
  LogModel,
};
