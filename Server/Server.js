const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const CoonnectDB = require("./Config/db");

// env Config
dotenv.config();
// DB Connection
CoonnectDB();

// Rest Object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/Api/v1/auth", require("./Routes/userRouts"));
app.use("/Api/v1/Todo", require("./Routes/TodoRouts"));

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`.bgGreen.white);
});
