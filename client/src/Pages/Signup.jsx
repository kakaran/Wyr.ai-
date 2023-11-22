import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import { AdminSchema } from "../Schemas/Schema";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormData = [
  {
    name: "Name",
    bname: "Name",
    PlaceVale: "Enter Your Name",
    type: "text",
  },
  {
    name: "Email",
    bname: "Email",
    PlaceVale: "Enter Your Email",
    type: "text",
  },
  {
    name: "Phone Number",
    bname: "PNumber",
    PlaceVale: "Enter Your Phone Number",
    type: "text",
  },
  {
    name: "Create Password",
    bname: "Password",
    PlaceVale: "Abcde123",
    type: "password",
  },
  {
    name: "Re-enter Password",
    bname: "rePassword",
    PlaceVale: "Abcde123",
    type: "password",
  },
];

const Signup = () => {
  const [initialValues] = useState({
    Name: "",
    Email: "",
    PNumber: "",
    Password: "",
    rePassword: "",
  });
  const [otpPOpen, setOtpPOpen] = useState();
  const [otp, setOtp] = useState();
  const { branch } = useParams("branch");
  const navigate = useNavigate();
  // const [expireTime, setExpireTime] = useState();
  // eslint-disable-next-line no-undef

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: AdminSchema,
      onSubmit: async (values) => {
        const { Email } = values;
        const { data } = await axios.post(`${BASE_URL}/api/OTP`, { Email });
        if (data) {
          // const currentTime = new Date().getTime();
          setOtpPOpen(true);
        }
      },
    });

  const OtpVerify = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/OTPVerify`, {
        Email: values.Email,
        OTP: otp,
      });
      if (response.data.status) {
        const adminResponse = await axios.post(`${BASE_URL}/api/admin/signup`, {
          Branch: branch,
          Name: values.Name,
          Email: values.Email,
          PNumber: values.PNumber,
          Password: values.Password,
          verify: true,
        });
        console.log(adminResponse);
        if (adminResponse.data.status) {
          console.log("hello");
          navigate("/signup/companyDet");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtp = (e) => {
    const otpvalue = e.target.value.replace(/\D/g, "");

    const limitedValue = otpvalue.slice(0, 4);
    setOtp(limitedValue);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center  h-screen xl:w-6/12 xl:m-auto xl:my-4 xl:border xl:rounded-lg xl:border-[#00000040]">
        <img src="/Logo.svg" alt="" className="w-[107px] h-[41px]" />
        <div className="w-full p-5 xl:pb-0">
          <h2 className="mt-4 xl:mt-0 text-center xl:font-bold xl:text-[20px]">
            Sign Up
          </h2>
          {FormData.map((i, index) => {
            return (
              <div key={index}>
                <div
                  className={`border-2 ${
                    errors[i.bname] ? "border-[#FF686B]" : "border-[#99999980]"
                  }  relative p-[15px] flex flex-col rounded-lg mt-5 w-full`}
                >
                  <label
                    htmlFor={i.bname}
                    className="absolute top-[-11px] bg-white text-color px-3"
                  >
                    {i.name}
                  </label>
                  <input
                    type={i.type}
                    name={i.bname}
                    id={i.bname}
                    placeholder={i.PlaceVale}
                    className="border-0 outline-none placeholder-[#CCCCCC]"
                    value={values[i.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors[i.bname] && touched[i.bname] ? (
                  <p className="text-red-800">{errors[i.bname]}</p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          <p className="text-color pl-2 pt-2">
            Password should be Alpha-numeric
          </p>

          <div className="text-center mt-10 xl:mt-5">
            <button
              className="BGBlue py-[10px] px-[20px] xl:px-[45px] xl:text-[16px] rounded-md text-white font-bold"
              onClick={handleSubmit}
            >
              Generate OTP
            </button>
            <p className="font-semibold text-[10px] text-color pt-1 xl:text-[14px]">
              OTP will send to your registered Email id
            </p>
          </div>
          <p className="text-center pt-4 text-[12px] font-medium xl:text-[16px]">
            Already Registered?{" "}
            <span className="font-bold text-[12px] textBlue xl:text-[16px]">
              Sign In
            </span>
          </p>
        </div>
      </div>
      {/* <div className="w-full bg-black"> */}
      {otpPOpen && (
        <div className="absolute w-[308px] h-[324px] bg-white border top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-10%] p-8">
          <div className="text-center">
            <h1 className="font-bold text-[16px]">Enter OTP</h1>
            <p className="font-medium text-[10px]">
              OTP sent to your registered Email
            </p>
            <div className="my-9 text-center flex flex-col justify-center items-center">
              <input
                type="number"
                name=""
                id=""
                // pattern="[0-9]*"
                // maxLength="4"
                // max="9999"
                value={otp}
                onChange={
                  handleOtp
                  // setOtp(e.target.value);
                }
                className="border-2 rounded-lg w-[248px] h-[50px]  border-[#CCCCCC] p-3 text-[15px]"
              />
              {/* <p className="w-[34px] h-[18px] mt-2">time</p> */}
            </div>
            <button
              className="px-[40px] py-[10px] BGBlue rounded-md text-white font-bold"
              onClick={OtpVerify}
            >
              Verify
            </button>
            <p className="text-[14px] font-medium mt-3">
              Didn’t received OTP?{" "}
              <span
                className="textBlue font-bold cursor-pointer"
                onClick={handleSubmit}
              >
                Send Again
              </span>
            </p>
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Signup;
