const Todomodels = require("../Models/Todomodels");

// addTodoControl
const AddTodoControler = async (req, res) => {
  try {
    const { TodoTitle, TodoDiscription, TodoUserID } = req.body;

    if (!TodoTitle || !TodoDiscription || !TodoUserID) {
      return res.status(400).send({
        Success: false,
        message: "Request body is missing or invalid.",
      });
    }

    // Already User Present
    const TodoPresent = await Todomodels.findOne({ TodoTitle });
    if (TodoPresent) {
      return res.status(400).send({
        Success: false,
        message: "Data Present !",
      });
    }

    // console.log("=========================", req.auth);
    const Todo = await Todomodels({
      TodoTitle,
      TodoDiscription,
      TodoUserID,
    }).save();
    return res.status(200).send({
      Success: true,
      message: " Data Saved !",
      Todo,
    });
  } catch (error) {
    return res.status(500).send({
      Success: false,
      message: "Api have Some Error !",
      error: error,
    });
  }
};

// editTodo
const editTodoControler = async (req, res) => {
  try {
    const { TodoTitle, TodoDiscription, TodoID } = req.body;

    if (!TodoID) {
      return res.status(400).send({
        Success: false,
        message: "Request body is missing or invalid.",
      });
    }

    // Already User Present
    const TodoPresent = await Todomodels.findOne({ _id: TodoID });
    if (!TodoPresent) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }

    const updatedTodo = await Todomodels.findOneAndUpdate(
      { _id: TodoID },
      { TodoTitle, TodoDiscription },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Updated successfully!",
      user: updatedTodo,
    });
  } catch (error) {
    return res.status(500).send({
      Success: false,
      message: "Api have Some Error !",
      error: error,
    });
  }
};

// get Todo

const GetTodoControler = async (req, res) => {
  try {
    const { ID } = req.query;

    if (!ID) {
      return res.status(400).send({
        Success: false,
        message: "please pass the TodoID",
      });
    }

    const allTodos = await Todomodels.find({ TodoUserID: ID });

    res.status(200).send({
      Success: true,
      message: " Successfully ! ",
      allTodos: allTodos.reverse(),
    });
  } catch (error) {
    return res.status(500).send({
      Success: false,
      message: "Api have Some Error !",
      error: error,
    });
  }
};

module.exports = { AddTodoControler, editTodoControler, GetTodoControler };
