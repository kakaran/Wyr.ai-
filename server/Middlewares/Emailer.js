const nodemailer = require("nodemailer");

const mailer = (email, otp) => {
  /* https://stackoverflow.com/questions/45478293/
  username - and - password - not - accepted - when - using - nodemailer
https://myaccount.google.com/lesssecureapps */
  // var nodemailer = require ( ' nodemailer ' ) ;
  try {
    var transporter = nodemailer.createTransport({
      service: " gmail ",
      port: 587,
      secure: false,
      auth: {
        user: 
        pass: 
      },
    });
    var mailOptions = {
      from: " looks0126@gmail.com ",
      to: `<${email}>`,
      subject: "Email verification OTP  ",
      text: `${otp} is your One-Time Password (OTP) to complete reset your password.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const Otp = () => {
  var otp = Math.floor(1000 + Math.random() * 9000);
  return {
    code: otp,
    expireTime: new Date().getTime() + 300 * 1000,
  };
};

module.exports = { mailer, Otp };
