const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    email: {
      type: String,
      required: true
    },

    ip: {
      type: String
    },

    userAgent: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
      expires: 60 * 60 * 24 * 7 // 7 days
    }
  },
  { timestamps: false }
);

module.exports = mongoose.model("LoginLog", loginLogSchema);
