const mongoose = require("mongoose");

const Todochema = new mongoose.Schema(
  {
    TodoTitle: {
      type: String,
      required: [true, "Please Add String"], // 'require' should be 'required'
      trim: true,
    },
    TodoDiscription: {
      type: String,
      required: [true, "Please Add String"], // 'require' should be 'required'
      trim: true,
    },

    TodoUserID: {
      type: String,
      required: [true, "Please Add String"], // 'require' should be 'required'
      trim: true,
    },
  },
  { timestamps: true } // Corrected from 'timeStamps'
);

module.exports = mongoose.model("Todo", Todochema);
