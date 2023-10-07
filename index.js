const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.router");
const { taskRouter } = require("./routes/task.router");
const { loggerMiddleware } = require("./middlewares/logger.middleware");
const { authenticate } = require("./middlewares/authentication.middleware");
const { rateLimiter } = require("./middlewares/ratelimiter.middleware");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
const PORT = process.env.PORT || 5000;

app.use(require("cors")());
app.use(express.json());

app.use(loggerMiddleware);
app.use(rateLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.json({ message: "Server is live!" });
});

app.use("/user", userRouter);
app.use("", authenticate, taskRouter);

async function establishConnection() {
  try {
    await connection;
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error connecting DB or server", error);
  }
}
establishConnection();
