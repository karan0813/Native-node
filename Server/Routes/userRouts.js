const express = require("express");
const {
  registerController,
  loginController,
} = require("../Controllers/userControler");

const Route = express.Router();

Route.post("/register", registerController);
Route.post("/login", loginController);

module.exports = Route;
