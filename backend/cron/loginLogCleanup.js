const path = require("path");
const cron = require("node-cron");
const {cleanupOldLoginLogs} = require(path.join(__dirname, "..", "controller", "adminController"));
const {throwError} = require(path.join(__dirname, "..", "middleware", "errorMiddleware.js"))

// Run once every day at 2:00 AM
cron.schedule("0 2 * * *", async () => {
  try {
    await cleanupOldLoginLogs();
  } catch (err) {
    console.error("Login log cleanup failed : ", err);
    next(throwError(`Login log cleanup failed ${err}`, 400));
  }
});
