const express = require("express");
const router = express.Router();
const {checkout} = require("../controllers/PaymentController.js");
const VerifyToken = require("../middleware/Auth");
const {paymentLimiter} = require("../middleware/rateLimiter");




//used for checkout payment
//all of functions for making razorpay order apply to instance
console.log("payment route")
router.post("/checkout",paymentLimiter,checkout);