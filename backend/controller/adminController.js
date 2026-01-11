const path = require("path");
const userDb = require(path.join(__dirname, "..", "model", "user.js"));
const projectDb = require(path.join(__dirname, "..", "model", "project.js"));
const loginLog = require(path.join(__dirname, "..", "model", "loginLog.js"));
const {throwError} = require(path.join(__dirname, "..", "middleware", "errorMiddleware.js"))

// =======================================================
//  login stats ===========================================

// route -  get - api/analytics/logins;
// access - private ;

async function loginStats(req,res,next) {
    try {
        const totalLogins = await loginLog.countDocuments({
                                userId: { $ne: null }
                            });

        const uniqueUsers = await loginLog.distinct("userId", {
                                userId: { $ne: null }
                            });
         
        if ((!totalLogins) || (!uniqueUsers)) {
            return throwError("Unable to fetch login data", 400)
        };
      
    return res.status(200).json({
            success : true,
            message: "login logs fetched",
            data :  {
                totalLogins,
                uniqueUserCount: uniqueUsers.length,
            }
          });
  } catch (error) {
      next(error);
  };
};

// =======================================================
//  per user login stats ===========================================

// route -  get - api/analytics/perlogins;
// access - private ;

async function perUserloginStats(req,res,next) {
    try {         
        const perUser = await loginLog.aggregate([
            {
                $match: { userId: { $ne: null } }
            },
            {
                $group: {
                    _id: "$userId",
                    email: { $first: "$email" },
                    logins: { $sum: 1 },
                    lastLogin: { $max: "$createdAt" }
                }
            },
            { $sort: { logins: -1 } }
        ]);

        if (!perUser){
            return throwError("Unable to fetch login data", 400)
        };
      
    return res.status(200).json({
            success : true,
            message: "login logs fetched",
            data : perUser
          });
  } catch (error) {
      next(error);
  };
};

// =======================================================
//  cleanup Old LoginLogs ===========================================

async function cleanupOldLoginLogs() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const result = await loginLog.deleteMany({
    createdAt: { $lt: sevenDaysAgo }
  });

  if (!result) {
    return throwError("Unable to delete login data", 400)
  };

  console.log(
    `[CRON] Deleted ${result.deletedCount} login logs older than 7 days`
  );
}

// =======================================================
//  get Project Stats ===========================================

// route -  get - api/analytics/getprojectstats;
// access - private ;

async function getProjectStats(req,res,next) {
    try {
        const stats = await projectDb.aggregate([
        {
            $group: {
            _id: null,
            totalProjects: { $sum: 1 },
            completedProjects: {
                $sum: {
                $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                }
            },
            underConstruction: {
                $sum: {
                $cond: [{ $eq: ["$status", "under construction"] }, 1, 0]
                }
            }
            }
        },
        {
            $project: {
            _id: 0,
            totalProjects: 1,
            completedProjects: 1,
            underConstruction: 1
            }
        }
        ]);

        // console.log("stats : ", stats);
        if(!stats){
            return throwError("Unable to fetch Project stat data", 400)
        };
      
        return res.status(200).json({
            success : true,
            message: "Project Status fetched",
            data : (stats[0] || {
                totalProjects: 0,
                completedProjects: 0,
                underConstruction: 0
            })
        });
  } catch (error) {
      next(error);
  };
};

// =======================================================
//  get user Stats ===========================================

// route -  get - api/analytics/getuserstats;
// access - private ;

async function getUserStats(req, res, next){
  try {
    const stats = await userDb.aggregate([
      {
        $addFields: {
          verified: {
            $cond: [
              { $in: ["$isVerified", [true, "true", 1]] },
              true,
              false
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },

          admins: {
            $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] }
          },

          editorUsers: {
            $sum: { $cond: [{ $eq: ["$role", "editor"] }, 1, 0] }
          },

          normalUsers: {
            $sum: { $cond: [{ $eq: ["$role", "user"] }, 1, 0] }
          },

          verifiedUsers: {
            $sum: { $cond: [{ $eq: ["$verified", true] }, 1, 0] }
          },

          unverifiedUsers: {
            $sum: { $cond: [{ $eq: ["$verified", false] }, 1, 0] }
          }
        }
      },
      { $project: { _id: 0 } }
    ]);

    // console.log("stats : ", stats);
    if(!stats){
        return throwError("Unable to user stat data", 400)
    };
    
    return res.status(200).json({
        success : true,
        message: "user Status fetched",
        data : (stats[0] || {
            totalUsers: 0,
            admins: 0,
            normalUsers: 0,
            verifiedUsers: 0,
            unverifiedUsers: 0
        })
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};



module.exports = {loginStats, perUserloginStats, cleanupOldLoginLogs, getProjectStats, getUserStats};