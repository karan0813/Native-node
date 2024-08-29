const JWT = require("jsonwebtoken");

const { hashPassword, verifyPassword } = require("../Helpers/authHelper");
const Usermodels = require("../Models/Usermodels");

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

module.exports = { registerController, loginController };
