const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

// importing files *****************************************************

const authRoutes = require(path.join(__dirname,"routes","authRoutes"));
const projectRoutes = require(path.join(__dirname,"routes","projectRoutes"));
const shopRoutes = require(path.join(__dirname,"routes","shopRoutes"));
const contactRoutes = require(path.join(__dirname,"routes","contactRoutes"));

const {errorHandler, throwError} = require(path.join(__dirname,"middleware","errorMiddleware.js"));

// app config *****************************************************

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
].filter(Boolean); // 🔥 removes undefined values

console.log("cleint url : ", process.env.CLIENT_URL,process.env.ADMIN_URL);

// ✅ allow localhost ONLY if explicitly enabled
if (process.env?.ALLOW_LOCALHOST === "true") {
  allowedOrigins.push(
    "http://localhost:5173",
    "http://localhost:5174"
  );
}

// app middlewares *****************************************************

// 1️⃣ REQUIRED on Vercel ---------------------------
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// 2️⃣ Security Headers (helmet should be early) 
app.disable('x-powered-by');
// helmet -----------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", process.env.CLIENT_URL].filter(Boolean),
      },
    },
    crossOriginEmbedderPolicy: false, // ✅ Prevents some third-party issues
    referrerPolicy: { policy: "no-referrer" },
    frameguard: { action: "deny" }
  })
);

// 3️⃣ Logging morgan(before rate limit to log blocked requests)
if (process.env.NODE_ENV === 'production') {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev")); // ✅ Better for development
}

// 4️⃣ Rate Limiting (before body parsing to save resources)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }, // ✅ JSON response
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  // ✅ Skip rate limiting for health checks
  skip: (req) => req.path === '/' || req.path === '/health'
});
app.use('/api/', limiter); // ✅ Only apply to API routes

// 5️⃣ CORS (before body parsing)
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    // allow server-to-server, postman, render health checks
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // ❌ DO NOT throw error (causes deployment/runtime issues)
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}));

// 6️⃣ Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 7️⃣ Compression (for responses)
app.use(compression({
  filter: (req, res) => {
    if (req?.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // ✅ Balance between speed and compression
}));

// 8️⃣ Honeypot & Bot Detection
app.use((req, res, next) => {
  if (req.body?.website) {
    return res.status(200).json({ success: true }).end(); // silent drop
  }
  // ✅ Better validation
  if (req.body?.formTime && Date.now() - parseInt(req.body.formTime) < 3000) {
    return res.status(200).json({ success: true }).end(); // too fast = bot
  }
  next();
});

// 9️⃣ NoSQL Injection Protection
function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      sanitizeObject(obj[key]);
    }
  }
}
app.use((req, res, next) => {
  sanitizeObject(req?.body);
  sanitizeObject(req?.query);
  sanitizeObject(req?.params);
  next();
});

// 🔟 XSS Protection
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  return input;
};
app.use((req, res, next) => {
  if (req?.body && typeof req.body === 'object') {
    Object.keys(req?.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeInput(req?.body?.[key]);
      }
    });
  }
  next();
});

// 1️⃣1️⃣ HPP Protection
app.use((req, res, next) => {
  // Take only last value if parameter appears multiple times
  Object.keys(req?.query).forEach(key => {
    if (Array.isArray(req?.query?.[key])) {
      req.query[key] = req.query[key][req.query[key].length - 1];
    }
  });
  next();
});

// url - routes *****************************************************

    app.get("/", (req, res) => {
      res.send("Backend is running 🚀");
    });
    app.get("/health", (req, res) => {
      res.status(200).json({ status: "healthy", timestamp: new Date() });
    });

    //  auth ---------------------------------
    app.use("/api/auth", authRoutes);

    //  project ---------------------------------
    app.use("/api/project", projectRoutes);

    //  shop ---------------------------------
    app.use("/api/shop", shopRoutes);

    //  mail ---------------------------------
    app.use("/api/contact", contactRoutes);

    //  Cache-Control ---------------------------------
    app.use((req, res, next) => {
      if (req.method === 'GET') {
        res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
      }
      next();
    });

// 404 error page *****************************************************

app.use((req, res, next) => {
  next(throwError(`404 Error - page not found ${req.originalUrl}`, 404));
});
app.use(errorHandler);


// export *****************************************************

module.exports = app;