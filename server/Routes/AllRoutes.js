const { Router } = require("express");
const AllRoutes = Router();
const { OTPGernater, OTPVerIFY } = require("../Controllers/AllControlers");

AllRoutes.post("/OTP", OTPGernater);
AllRoutes.post("/OTPVerify", OTPVerIFY);

module.exports = AllRoutes;
