const mongoose = require("mongoose");
const colors = require("colors");

const CoonnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log(`successfully Connected `.bgCyan.white);
  } catch (error) {
    console.log(`Eroor coonectionDB ${error}`.bgRed.white);
  }
};

module.exports = CoonnectDB;
