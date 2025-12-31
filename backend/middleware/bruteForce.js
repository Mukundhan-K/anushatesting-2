const rateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const crypto = require("crypto");

let store;

// =======================
// Mongo Store
// =======================
try {
  store = new MongoStore({
    uri: process.env.MONGODB_URI,
    collectionName: "bruteforce",
    expireTimeMs: 24 * 60 * 60 * 1000,
    errorHandler: (err) => {
      console.error("❌ Rate-limit store error:", err);
    },
  });
  console.log("✅ Brute force protection using MongoDB store");
} catch (err) {
  console.warn("⚠️ Falling back to memory store:", err.message);
}

// =======================
// Helpers
// =======================
const hash = (v = "unknown") =>
  crypto.createHash("sha256").update(v).digest("hex");

const ipKey = (req) =>
    req.ip ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection?.remoteAddress ||
      "unknown";
// =======================
// Key generators
// =======================
const loginKey = (req) =>
  `login:${hash(req.body?.email?.toLowerCase())}:${ipKey(req)}`;

const forgotKey = (req) =>
  `forgot:${hash(req.body?.email?.toLowerCase())}:${ipKey(req)}`;

const resetKey = (req) =>
  `reset:${req.params?.token || "unknown"}:${ipKey(req)}`;

const signupKey = (req) =>
  `signup:${ipKey(req)}`;

// =======================
// Factory (SAFE)
// =======================
const createLimiter = ({ windowMs, max, keyGenerator, message }) =>
  rateLimit({
    store,
    windowMs,
    max,
    keyGenerator,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    handler: (req, res) => {
      const rateInfo = req.rateLimit;

      // 🔒 ABSOLUTE SAFETY: behave like old code if timing missing
      if (
        !rateInfo ||
        !rateInfo.resetTime ||
        !(rateInfo.resetTime instanceof Date)
      ) {
        return res.status(429).json({
          success: false,
          error: "Too many attempts",
          message,
        });
      }

      const resetTime = rateInfo.resetTime;
      const msLeft = resetTime - Date.now();

      // Always safe numbers
      // const secondsLeft = Math.max(1, Math.ceil(msLeft / 1000));
      // const minutesLeft = Math.ceil(secondsLeft / 60);
      const totalSeconds = Math.max(1, Math.ceil(msLeft / 1000));
      const totalMinutes = Math.ceil(totalSeconds / 60);
      const totalHours = Math.ceil(totalMinutes / 60);
      const totalDays = Math.ceil(totalHours / 24);


      let retryAfter;
      let retryAfterUnit;
      let timeMessage;

      
      if (totalSeconds < 60) {
        retryAfter = totalSeconds;
        retryAfterUnit = "seconds";
        timeMessage = `Try again in ${retryAfter} second${retryAfter !== 1 ? "s" : ""}.`;
      } else if (totalMinutes < 60) {
        retryAfter = totalMinutes;
        retryAfterUnit = "minutes";
        timeMessage = `Try again in ${retryAfter} minute${retryAfter !== 1 ? "s" : ""}.`;
      } else if (totalHours < 24) {
        retryAfter = totalHours;
        retryAfterUnit = "hours";
        timeMessage = `Try again in ${retryAfter} hour${retryAfter !== 1 ? "s" : ""}.`;
      } else {
        retryAfter = totalDays;
        retryAfterUnit = "days";
        timeMessage = `Try again in ${retryAfter} day${retryAfter !== 1 ? "s" : ""}.`;
      }

      return res.status(429).json({
        success: false,
        error: "Too many attempts",
        message: `${message} ${timeMessage}`,
        retryAfter,
        retryAfterUnit,
        unlockAt: resetTime.toISOString(),
      });
    },
  });

// =======================
// Limiters
// =======================
const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  keyGenerator: loginKey,
  message: "Too many failed login attempts. ",
});

const forgotPasswordLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: forgotKey,
  message: "Too many password reset requests. ",
});

const resetPasswordLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyGenerator: resetKey,
  message: "Reset link temporarily locked. Request a new one. ",
});

const signupLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: signupKey,
  message: "Too many signup attempts. Please wait. ",
});

// =======================
// Manual resets (UNCHANGED)
// =======================
const resetLoginLimit = async (req) => {
  if (store?.resetKey) await store.resetKey(loginKey(req));
};

const resetForgotLimit = async (req) => {
  if (store?.resetKey) await store.resetKey(forgotKey(req));
};

const resetPasswordLimit = async (req) => {
  if (store?.resetKey) await store.resetKey(resetKey(req));
};

module.exports = {
  loginLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  signupLimiter,

  resetLoginLimit,
  resetForgotLimit,
  resetPasswordLimit,
};



// const rateLimit = require("express-rate-limit");
// const MongoStore = require("rate-limit-mongo");
// const { ipKeyGenerator } = rateLimit;
// const crypto = require("crypto");

// // ✅ MongoDB Store Configuration
// let store;

// try {
//   store = new MongoStore({
//     uri: process.env.MONGODB_URI,
//     collectionName: "bruteforce",
//     expireTimeMs: 24 * 60 * 60 * 1000, // 24 hours
//     errorHandler: (error) => {
//       console.error("❌ Rate limit store error:", error);
//     }
//   });
//   console.log("✅ Brute force protection using MongoDB store");
// } catch (error) {
//   console.warn("⚠️ MongoDB store failed, using memory store:", error.message);
//   // Falls back to memory store automatically
// }

// // ✅ Helper function to add resetKey to request
// // const addResetKey = (limiter) => {
// //   return (req, res, next) => {
// //     // Add resetKey function to request.rateLimit
// //     const originalLimiter = limiter(req, res, () => {
// //       if (store && store.resetKey) {
// //         req.rateLimit = req.rateLimit || {};
// //         req.rateLimit.resetKey = async () => {
// //           const key = limiter.keyGenerator ? limiter.keyGenerator(req) : req.ip;
// //           try {
// //             await store.resetKey(key);
// //             console.log(`✅ Reset brute force counter for key: ${key}`);
// //           } catch (error) {
// //             console.error(`⚠️ Failed to reset key ${key}:`, error);
// //           }
// //         };
// //       }
// //       next();
// //     });
// //   };
// // };


// // =======================
// // Key Generators
// // =======================
//   const hashEmail = (email = "unknown") =>
//     crypto.createHash("sha256").update(email).digest("hex");

//   const loginKeyGenerator = (req) => {
//     const email = hashEmail(req.body?.email?.toLowerCase().trim())
//     // const ip = req.ip || req.connection?.remoteAddress || "unknown";
//     const ip = ipKeyGenerator(req);
//     return `login:${email}:${ip}`;
//   };
//   const forgotKeyGenerator = (req) => {
//     const email = hashEmail(req.body?.email?.toLowerCase().trim())
//     const ip = ipKeyGenerator(req);
//     return `forgot:${email}:${ip}`;
//   };
//   const resetKeyGenerator = (req) => {
//     const token = req.params?.token || "unknown";
//     const ip = ipKeyGenerator(req);
//     return `reset:${token}:${ip}`;
//   };
//   const signupKeyGenerator = (req) => {
//     const ip = ipKeyGenerator(req);
//     return `signup:${ip}`;
//   };

// // 🔐 LOGIN BRUTE FORCE PROTECTION
// const loginLimiterBase = rateLimit({
//   store: store,
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 failed login attempts

//   keyGenerator: loginKeyGenerator,
//   standardHeaders: true,
//   legacyHeaders: false,
  
//   skipSuccessfulRequests: true,
//   skipFailedRequests: false,
  
//   handler: (req, res) => {
//     const resetTime = new Date(req.rateLimit.resetTime);
//     const minutesLeft = Math.ceil((resetTime - Date.now()) / 1000 / 60);
    
//     return res.status(429).json({
//       success: false,
//       error: "Too many failed login attempts",
//       message: `Account temporarily locked. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
//       retryAfter: minutesLeft
//     });
//   }
// });

// // Store keyGenerator for resetKey function
// // loginLimiterBase.keyGenerator = loginLimiterBase.keyGenerator;

// // Wrap with resetKey functionality
// const loginLimiter = (req, res, next) => {
//   loginLimiterBase(req, res, () => {
//     if (store && store.resetKey) {
//       req.rateLimit = req.rateLimit || {};
//       req.rateLimit.resetKey = setImmediate(async () => {
//         try {
//           await store.resetKey(loginKeyGenerator(req));
//           console.log(`✅ Reset brute force counter`);
//           return key;
//         } catch (error) {
//           console.error(`⚠️ Failed to reset key:`, error);
//         }
//       });
//     }
//     next();
//   });
// };

// // 📧 FORGOT PASSWORD BRUTE FORCE PROTECTION
// const forgotPasswordLimiterBase = rateLimit({
//   store: store,
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 3, // Only 3 attempts per hour
  
//   keyGenerator: forgotKeyGenerator,
//   standardHeaders: true,
//   legacyHeaders: false,
  
//   handler: (req, res) => {
//     const resetTime = new Date(req.rateLimit.resetTime);
//     const minutesLeft = Math.ceil((resetTime - Date.now()) / 1000 / 60);
    
//     return res.status(429).json({
//       success: false,
//       error: "Too many password reset attempts",
//       message: `Please wait ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} before requesting another reset.`,
//       retryAfter: minutesLeft
//     });
//   }
// });

// // forgotPasswordLimiterBase.keyGenerator = forgotPasswordLimiterBase.keyGenerator;

// const forgotPasswordLimiter = (req, res, next) => {
//   forgotPasswordLimiterBase(req, res, () => {
//     if (store && store.resetKey) {
//       req.rateLimit = req.rateLimit || {};
//       req.rateLimit.resetKey = setImmediate(async () => {
//         try {
//           await store.resetKey(forgotKeyGenerator(req));
//           console.log("✅ Forgot-password counter reset");
//         } catch (error) {
//           console.error(`⚠️ Failed to reset key:`, error);
//         }
//       });
//     }
//     next();
//   });
// };

// // 🔑 RESET PASSWORD TOKEN BRUTE FORCE
// const resetPasswordLimiterBase = rateLimit({
//   store: store,
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 5, // 5 attempts per token
  
//   keyGenerator: resetKeyGenerator,  
//   standardHeaders: true,
//   legacyHeaders: false,
  
//   handler: (req, res) => {
//     return res.status(429).json({
//       success: false,
//       error: "Too many attempts",
//       message: "This reset link has been locked due to too many attempts. Please request a new password reset."
//     });
//   }
// });

// // resetPasswordLimiterBase.keyGenerator = resetPasswordLimiterBase.keyGenerator;

// const resetPasswordLimiter = (req, res, next) => {
//   resetPasswordLimiterBase(req, res, () => {
//     if (store && store.resetKey) {
//       req.rateLimit = req.rateLimit || {};
//       req.rateLimit.resetKey = setImmediate(async () => {
//         try {
//           await store.resetKey(resetKeyGenerator(req));
//           console.log("✅ Reset-password counter reset");
//         } catch (error) {
//           console.error(`⚠️ Failed to reset key:`, error);
//         }
//       });
//     }
//     next();
//   });
// };

// // 📝 SIGNUP BRUTE FORCE
// const signupLimiter = rateLimit({
//   store: store,
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 3, // 3 signups per hour per IP
  
//   keyGenerator: signupKeyGenerator,
//   standardHeaders: true,
//   legacyHeaders: false,
  
//   handler: (req, res) => {
//     return res.status(429).json({
//       success: false,
//       error: "Too many signup attempts",
//       message: "Please wait before creating another account."
//     });
//   }
// });

// module.exports = { 
//   loginLimiter, 
//   forgotPasswordLimiter, 
//   resetPasswordLimiter,
//   signupLimiter 
// };