const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add String"], // 'require' should be 'required'
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Add email"], // 'require' should be 'required'
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Add Password"], // 'require' should be 'required'
      maxlength: 64,
      minlength: 6,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true } // Corrected from 'timeStamps'
);

module.exports = mongoose.model("User", UserSchema);
