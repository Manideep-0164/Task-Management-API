const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.router");
const PORT = process.env.PORT || 1010;

app.use(require("cors")());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is live!" });
});

app.use("/api", userRouter);

(async () => {
  try {
    await connection;
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error connecting DB or server", error);
  }
})();
