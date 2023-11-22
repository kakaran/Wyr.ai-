const mongoose = require("mongoose");

const configDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).catch((err) => {
      console.log(err);
    });
    console.log("Data Base Conected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = configDB;
