const { LogModel } = require("../models/log.model");

const loggerMiddleware = async (req, res, next) => {
  try {
    // Continue to the next middleware in the chain
    next();

    // Extract relevant information from the request and response
    const logInfo = {
      remoteIPAddress: req.ip,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseSize: res.get("Content-Length") || "-",
      userAgent: req.headers["user-agent"] || "-",
    };

    // Save the log information to the database
    await new LogModel(logInfo).save();
  } catch (error) {
    console.log(`Error in logingMiddleware => ${error}`);

    // Pass the error to the next error handling middleware
    next(error);
  }
};

module.exports = {
  loggerMiddleware,
};
