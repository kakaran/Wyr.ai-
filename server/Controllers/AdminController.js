const { hashPassword } = require("../Middlewares/authpassword");
const Admin = require("../Models/Admin");
let PNregex = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
let Passregex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/);

// const { mailer } = require("../Middlewares/Emailer");
// const { verify } = require("crypto");

const AdminSignup = async (req, res) => {
  try {
    const { Branch, Name, Email, PNumber, Password, verify } = req.body;

    console.log(Branch, Name, Email, PNumber, Password, verify);
    if (!Branch || !Name || !Email || !PNumber || !Password || !verify) {
      return res.status(401).json({
        message: "All fields are required",
        status: false,
      });
    }

    if (!Email.match(/^[A-Za-z0-9_.]{3,}@[a-zA-Z]{3,}[a-zA-Z.]{2,}$/)) {
      return res
        .status(500)
        .send({ message: "Wrong email format", status: false });
    }

    const EmailCheck = await Admin.findOne({ "Email.value": Email });

    if (EmailCheck)
      return res
        .status(200)
        .json({ message: "Account is allready existed", status: false });

    if (PNregex.test(PNumber) == false) {
      return res
        .status(400)
        .json({ message: "Invalid Phone Number", status: false });
    }

    if (Passregex.test(Password) == false) {
      return res
        .status(400)
        .json({ message: "Invalid Password", status: false });
    }

    const hashedPassword = await hashPassword(Password);

    await Admin({
      Branch,
      Name,
      "Email.value": Email,
      "Email.verify": verify,
      PNumber,
      Password: hashedPassword,
    }).save();
    return res.status(200).json({ message: "Account Created", status: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { AdminSignup };
