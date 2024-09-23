const express = require("express");
const {
  registerController,
  loginController,
  UpdateUserController,
  GetUser,
  compairJWT,
} = require("../Controllers/userControler");

const Route = express.Router();

Route.post("/register", registerController);
Route.post("/login", loginController);
Route.put("/update-user", compairJWT, UpdateUserController);
Route.get("/getuser", GetUser);

module.exports = Route;
