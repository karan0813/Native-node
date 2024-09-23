const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");
const { hashPassword, verifyPassword } = require("../Helpers/authHelper");
const Usermodels = require("../Models/Usermodels");

// express Middleware

const compairJWT = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(" req.body", req.body);
    // Validation
    if (!name || !email || !password) {
      return res.status(400).send({
        Success: false,
        message: "Please Fill Details !",
      });
    }
    // Already User Present
    const userPresent = await Usermodels.findOne({ email });
    if (userPresent) {
      return res.status(400).send({
        Success: false,
        message: "Data Present !",
      });
    }
    // password bcrypt
    let haspassword = await hashPassword(password);
    Usermodels({ email, name, password: haspassword }).save();

    return res.status(200).send({
      Success: true,
      message: " Data Saved !",
    });
  } catch (error) {
    return res.status(500).send({
      Success: false,
      message: "Api have Some Error !",
      error: error,
    });
  }
};

// Login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(" req.body", req.body);
    if (!email || !password) {
      return res.status(400).send({
        Success: false,
        message: "Please Fill Details !",
      });
    }
    // find User
    const user = await Usermodels.findOne({ email });
    if (!user) {
      return res.status(400).send({
        Success: false,
        message: "Invalid userName password",
      });
    }

    //  match password
    const match = await verifyPassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        Success: false,
        message: "Invalid userName password ",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      Success: true,
      message: "login Successfully ! ",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      Success: false,
      message: "Api have Some Error !",
      error: error,
    });
  }
};

// update-user

const UpdateUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user exists
    const user = await Usermodels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Validate password length
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }

    // Hash the password if provided
    const hashedPassword = password
      ? await hashPassword(password)
      : user.password;

    // Update the user information
    const updatedUser = await Usermodels.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassword },
      { new: true }
    );

    // Ensure the password is not returned in the response
    updatedUser.password = undefined;

    return res.status(200).send({
      success: true,
      message: "Updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};

// user getApi
const GetUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send({
        Success: false,
        message: "Please pass the Email",
      });
    }
    console.log("hhh");
    const user = await Usermodels.findOne({ email });
    if (!user) {
      return res.status(400).send({
        Success: false,
        message: "Email not Found !",
      });
    }
    res.status(200).send({
      Success: true,
      message: " Successfully ! ",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      Success: false,
      message: "Api have Some Error !",
      error: error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  UpdateUserController,
  GetUser,
  compairJWT,
};
