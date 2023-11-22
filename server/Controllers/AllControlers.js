const { Otp, mailer } = require("../Middlewares/Emailer");
const OTPModel = require("../Models/OTP");

const OTPGernater = async (req, res) => {
  try {
    const { Email } = req.body;
    console.log(Email);

    const OTPDetail = Otp();
    const expireTime = OTPDetail.expireTime;
    if (OTPDetail) {
      await new OTPModel({
        Email: Email,
        OTP: OTPDetail.code,
        expireTime: OTPDetail.expireTime,
      }).save();

      mailer(Email, OTPDetail.code);
      return res
        .status(200)
        .json({ message: "OTP send", status: true, expireTime });
    }
  } catch (error) {
    console.log(error);
  }
};

const OTPVerIFY = async (req, res) => {
  try {
    const { Email, OTP } = req.body;
    console.log(Email, OTP);

    const OTPDetail = await OTPModel.findOne({ Email, OTP });

    const currentTime = new Date().getTime();

    if (OTPDetail) {
      let diff = OTPDetail.expireTime - currentTime;
      if (diff < 0) {
        return res.status(400).json({ message: "OTP Expired" });
      } else {
        return res.status(200).json({ message: "OTP Verified", status: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  OTPGernater,
  OTPVerIFY,
};
