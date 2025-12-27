const path = require("path");
// require("dotenv").config({"path" : path.join(__dirname, "config.env")});
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: path.join(__dirname, "config.env"),
  });
};
const mongoose = require("mongoose");
const app = require(path.join(__dirname, "app.js"));

// imported files ---------------------------------------------

const dbconnection = require(path.join(__dirname,"config","db.js"));
const connectCloudinary = require(path.join(__dirname,"config","cloudinary"));

// app config ---------------------------------------------
// let connected = false;
// async function init() {
//   if (!connected) {
    dbconnection();
//     connected = true;
//   }
// }
// init();
connectCloudinary();
const port = process.env.PORT || 5000;

// connection ---------------------------------------------

const server = app.listen(port, ()=>{
    console.log("server run @ port : ", port);
});

// ===============================
// Graceful shutdown (NON-VERCEL)
// ===============================
if (!process.env?.VERCEL) {
  const shutdown = async (signal) => {
    console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);

    // Stop accepting new connections
    server.close(async () => {
      console.log("🧯 HTTP server closed");

      try {
        await mongoose.connection.close(false);
        console.log("🗄️ MongoDB connection closed");
        process.exit(0);
      } catch (err) {
        console.error("❌ Error closing MongoDB:", err);
        process.exit(1);
      }
    });

    // Force exit if shutdown hangs
    setTimeout(() => {
      console.error("⚠️ Forced shutdown");
      process.exit(1);
    }, 10_000);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
  process.on("uncaughtException", shutdown);
  process.on("unhandledRejection", shutdown);
}

// ✅ THIS IS MANDATORY FOR VERCEL
module.exports = app;