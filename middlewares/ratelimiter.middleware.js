const rateLimit = require("express-rate-limit");
require("dotenv").config();

// restrict the requests to 10 per minute
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.REQUESTS_PER_MINUTE || 10,
  message: {
    message: "Too many requests, please try again after a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  rateLimiter,
};
