const userRouter = require("express").Router();
const { userLogin, userRegister } = require("../controllers/user.controller");

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

module.exports = {
  userRouter,
};
