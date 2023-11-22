import * as Yup from "yup";
// const PnumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const Password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
const EmailRegex = /^[A-Za-z0-9_.]{3,}@[a-zA-Z]{3,}[a-zA-Z.]{2,}$/;

export const AdminSchema = Yup.object({
  Name: Yup.string().min(3).max(25).required("Please enter Name"),
  Email: Yup.string()
    .matches(EmailRegex, "Invalid Email")
    .required("Please enter Email"),
  PNumber: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
    .required("Please enter Phone Number"),
  Password: Yup.string()
    .matches(Password, "Password limit eight characters")
    .required("Please enter Password"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Please enter Password"),
});
