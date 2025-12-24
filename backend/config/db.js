const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDb() {

  // Return cached connection if exists
  // if (cachedConnection && mongoose.connection.readyState === 1) {
  //   console.log('♻️ Using cached MongoDB connection');
  //   return cachedConnection;
  // };

  try {
    const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}/aspl`
      // ,
      // {
      //   // Essential for serverless
      //   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      //   socketTimeoutMS: 45000,
        
      //   // Connection pool settings for serverless
      //   maxPoolSize: 10,
      //   minPoolSize: 1,
        
      //   // Retry settings
      //   retryWrites: true,
      //   retryReads: true,
        
      //   // Use new URL parser
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
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