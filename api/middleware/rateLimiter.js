const { rateLimit } = require("express-rate-limit");


const paymentLimiter = rateLimit({
    windowMs: 60 * 1000, 
    limit: 10,
    message: "Too many payment requests from this IP, please try again later",
    standardHeaders: "draft-7", 
    legacyHeaders: false,
  });

module.exports = { paymentLimiter};
