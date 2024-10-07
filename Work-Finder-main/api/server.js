require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const MongoConnection = require("./config/database");
const userRoutes = require("./routes/UserRoutes");
const freelancerRoutes = require("./routes/FreelancerRoutes");
const clientRoutes = require("./routes/ClientRoutes");
const chatRoutes = require("./routes/ChatRoutes");
// const paymentsRoutes = require("./routes/paymentsRoutes");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");


var instance = new Razorpay({
  key_id: "rzp_test_CuQMaTBQ4HuGLh",
  key_secret: "yTnAeQbQLaGpihLB4Tjv9vJn",
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
MongoConnection();

app.use("/user", userRoutes);
app.use("/freelancer", freelancerRoutes);
app.use("/client", clientRoutes);
app.use("/chat", chatRoutes);
app.use("/ProfilePic", express.static(__dirname + "/uploads/Users_imgs"));
app.use("/ServicePic", express.static(__dirname + "/uploads/UsersServices"));




app.post("/payment/checkout",async (req,res)=>{

  console.log("payment gateway");

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
});



app.listen(port, (err) => {
  if (err) console.log("Server Error :" + err.message);
  else console.log("Server Runnig on Port: " + port);
});
