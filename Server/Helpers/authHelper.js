const bcrypt = require("bcrypt");

// Function to hash a password
async function hashPassword(plainTextPassword) {
  const saltRounds = 10; // The cost factor, controls how much time is needed to calculate a single bcrypt hash
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    // console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

// Function to verify a password
async function verifyPassword(plainTextPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (match) {
      console.log("Password is valid!");
    } else {
      console.log("Password is invalid.");
    }
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

module.exports = { hashPassword, verifyPassword };
