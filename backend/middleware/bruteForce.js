const rateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const { ipKeyGenerator } = rateLimit;
const crypto = require("crypto");

// ✅ MongoDB Store Configuration
let store;

try {
  store = new MongoStore({
    uri: process.env.MONGODB_URI,
    collectionName: "bruteforce",
    expireTimeMs: 24 * 60 * 60 * 1000, // 24 hours
    errorHandler: (error) => {
      console.error("❌ Rate limit store error:", error);
    }
  });
  console.log("✅ Brute force protection using MongoDB store");
} catch (error) {
  console.warn("⚠️ MongoDB store failed, using memory store:", error.message);
  // Falls back to memory store automatically
}

// ✅ Helper function to add resetKey to request
// const addResetKey = (limiter) => {
//   return (req, res, next) => {
//     // Add resetKey function to request.rateLimit
//     const originalLimiter = limiter(req, res, () => {
//       if (store && store.resetKey) {
//         req.rateLimit = req.rateLimit || {};
//         req.rateLimit.resetKey = async () => {
//           const key = limiter.keyGenerator ? limiter.keyGenerator(req) : req.ip;
//           try {
//             await store.resetKey(key);
//             console.log(`✅ Reset brute force counter for key: ${key}`);
//           } catch (error) {
//             console.error(`⚠️ Failed to reset key ${key}:`, error);
//           }
//         };
//       }
//       next();
//     });
//   };
// };


// =======================
// Key Generators
// =======================
  const hashEmail = (email = "unknown") =>
    crypto.createHash("sha256").update(email).digest("hex");

  const loginKeyGenerator = (req) => {
    const email = hashEmail(req.body?.email?.toLowerCase().trim())
    // const ip = req.ip || req.connection?.remoteAddress || "unknown";
    const ip = ipKeyGenerator(req);
    return `login:${email}:${ip}`;
  };
  const forgotKeyGenerator = (req) => {
    const email = hashEmail(req.body?.email?.toLowerCase().trim())
    const ip = ipKeyGenerator(req);
    return `forgot:${email}:${ip}`;
  };
  const resetKeyGenerator = (req) => {
    const token = req.params?.token || "unknown";
    const ip = ipKeyGenerator(req);
    return `reset:${token}:${ip}`;
  };
  const signupKeyGenerator = (req) => {
    const ip = ipKeyGenerator(req);
    return `signup:${ip}`;
  };

// 🔐 LOGIN BRUTE FORCE PROTECTION
const loginLimiterBase = rateLimit({
  store: store,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 failed login attempts

  keyGenerator: loginKeyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  
  skipSuccessfulRequests: true,
  skipFailedRequests: false,
  
  handler: (req, res) => {
    const resetTime = new Date(req.rateLimit.resetTime);
    const minutesLeft = Math.ceil((resetTime - Date.now()) / 1000 / 60);
    
    return res.status(429).json({
      success: false,
      error: "Too many failed login attempts",
      message: `Account temporarily locked. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
      retryAfter: minutesLeft
    });
  }
});

// Store keyGenerator for resetKey function
// loginLimiterBase.keyGenerator = loginLimiterBase.keyGenerator;

// Wrap with resetKey functionality
const loginLimiter = (req, res, next) => {
  loginLimiterBase(req, res, () => {
    if (store && store.resetKey) {
      req.rateLimit = req.rateLimit || {};
      req.rateLimit.resetKey = setImmediate(async () => {
        try {
          await store.resetKey(loginKeyGenerator(req));
          console.log(`✅ Reset brute force counter`);
          return key;
        } catch (error) {
          console.error(`⚠️ Failed to reset key:`, error);
        }
      });
    }
    next();
  });
};

// 📧 FORGOT PASSWORD BRUTE FORCE PROTECTION
const forgotPasswordLimiterBase = rateLimit({
  store: store,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Only 3 attempts per hour
  
  keyGenerator: forgotKeyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    const resetTime = new Date(req.rateLimit.resetTime);
    const minutesLeft = Math.ceil((resetTime - Date.now()) / 1000 / 60);
    
    return res.status(429).json({
      success: false,
      error: "Too many password reset attempts",
      message: `Please wait ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} before requesting another reset.`,
      retryAfter: minutesLeft
    });
  }
});

// forgotPasswordLimiterBase.keyGenerator = forgotPasswordLimiterBase.keyGenerator;

const forgotPasswordLimiter = (req, res, next) => {
  forgotPasswordLimiterBase(req, res, () => {
    if (store && store.resetKey) {
      req.rateLimit = req.rateLimit || {};
      req.rateLimit.resetKey = setImmediate(async () => {
        try {
          await store.resetKey(forgotKeyGenerator(req));
          console.log("✅ Forgot-password counter reset");
        } catch (error) {
          console.error(`⚠️ Failed to reset key:`, error);
        }
      });
    }
    next();
  });
};

// 🔑 RESET PASSWORD TOKEN BRUTE FORCE
const resetPasswordLimiterBase = rateLimit({
  store: store,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per token
  
  keyGenerator: resetKeyGenerator,  
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      error: "Too many attempts",
      message: "This reset link has been locked due to too many attempts. Please request a new password reset."
    });
  }
});

// resetPasswordLimiterBase.keyGenerator = resetPasswordLimiterBase.keyGenerator;

const resetPasswordLimiter = (req, res, next) => {
  resetPasswordLimiterBase(req, res, () => {
    if (store && store.resetKey) {
      req.rateLimit = req.rateLimit || {};
      req.rateLimit.resetKey = setImmediate(async () => {
        try {
          await store.resetKey(resetKeyGenerator(req));
          console.log("✅ Reset-password counter reset");
        } catch (error) {
          console.error(`⚠️ Failed to reset key:`, error);
        }
      });
    }
    next();
  });
};

// 📝 SIGNUP BRUTE FORCE
const signupLimiter = rateLimit({
  store: store,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 signups per hour per IP
  
  keyGenerator: signupKeyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      error: "Too many signup attempts",
      message: "Please wait before creating another account."
    });
  }
});

module.exports = { 
  loginLimiter, 
  forgotPasswordLimiter, 
  resetPasswordLimiter,
  signupLimiter 
};