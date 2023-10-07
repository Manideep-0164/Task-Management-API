const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_TKN_SECRET;
const EXPIRY = process.env.JWT_TKN_EXPIRY;

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find the existence of the user
    const isUserExists = await UserModel.findOne({ email });

    if (isUserExists)
      return res.status(409).json({ message: "User exists, Please login." });

    // hashing the password
    const hash = await bcrypt.hash(password, 5);

    // creating the user instance with hashed password
    const user = new UserModel({ name, email, password: hash });

    // saving the user
    await user.save();

    res.status(201).json({ message: "Registration success." });
  } catch (error) {
    console.log(`Error registering user => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the existence of the user
    const isUserExists = await UserModel.findOne({ email });

    if (!isUserExists)
      return res
        .status(404)
        .json({ message: "User does not exists, Please register!" });

    // validate the password
    const isPasswordsMatched = await bcrypt.compare(
      password,
      isUserExists.password
    );

    // check wheather the passwords are matched or not
    if (!isPasswordsMatched)
      return res
        .status(401)
        .json({ message: "Invalid credentials, Please try again." });

    const tokenPayload = {
      userId: isUserExists._id,
      email: isUserExists.email,
    };

    const tokenExpiry = { expiresIn: EXPIRY };

    // generate the token
    const token = jwt.sign(tokenPayload, SECRET, tokenExpiry);

    res.status(200).json({ message: "Login success.", token });
  } catch (error) {
    console.log(`Error login user => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
