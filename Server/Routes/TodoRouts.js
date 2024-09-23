const express = require("express");
const { compairJWT } = require("../Controllers/userControler");
const {
  AddTodoControler,
  editTodoControler,
  GetTodoControler,
  deleteTodoController,
} = require("../Controllers/TodoControler");

const Route = express.Router();

Route.post("/addTodo", compairJWT, AddTodoControler);
Route.put("/Edit-todo", compairJWT, editTodoControler);
Route.get("/getTodosById", compairJWT, GetTodoControler);
Route.delete("/delete-todo", compairJWT, deleteTodoController);

module.exports = Route;
