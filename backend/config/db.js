const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDb() {


  try {
    const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}`,
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    );

    if (dbConnection) {
        console.log("db connected : ",dbConnection.connection.name);
    } else {
        throw new Error("db connection error : ");
    };
  }catch (error) {
    console.error("db error occured : ", error);
  };
};

module.exports = connectDb;