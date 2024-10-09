const Razorpay = require("razorpay");
// const crypto = require("crypto");
require("dotenv").config();

//making instance for razorpay which has key and secret
var instance = new Razorpay({
  key_id: "rzp_test_CuQMaTBQ4HuGLh",
  key_secret: "yTnAeQbQLaGpihLB4Tjv9vJn",
});

const checkout = async (req, res) => {
  //making some options for razorpay
  try {
    const options = {
      amount: Number(req.body.amount * 100), // converting amount to number and changing to paise
      currency: "INR",
    };

    //creating an order with razorpay method
    const order = await instance.orders
      .create(options)
      .catch((err) => console.log("here", err));
    //sending true status to app and order also
    //to make it access there because request window will be made there
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error creating Razorpay order",
    });
  }
};


module.exports = { checkout };