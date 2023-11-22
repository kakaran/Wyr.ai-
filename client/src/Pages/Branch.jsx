import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const categories = [
  {
    image: "/Buyer.svg",
    name: "Buyer",
  },
  {
    image: "/Buying.svg",
    name: "Buying Agency",
  },
  {
    image: "/Buying.svg",
    name: "Factory",
  },
  {
    image: "/Buying.svg",
    name: "Qc Agency",
  },
];

const Branch = () => {
  const [branch, setBranch] = useState();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full m-auto">
        <div className=" text-center">
          <p className="font-bold text-[16px] text-[#666666]">Please Tell Us</p>
          <h1 className="font-bold text-[32px] text-[#1B9BEF]"> What You Do</h1>
        </div>
        <div className="m-14 flex flex-wrap gap-8 justify-center ">
          {categories.map((i, index) => {
            return (
              <div
                className="text-center relative flex flex-col items-center justify-center cursor-pointer"
                key={index}
                onClick={() => {
                  setBranch(i.name);
                  navigate(`/signup/${i.name}`);
                }}
              >
                {branch === i.name && (
                  <div className="absolute top-0 right-0">
                    <img src="Check.svg" alt="" />
                  </div>
                )}
                <div
                  className={`rounded-full shadow-md w-[100px] h-[100px] flex justify-center items-center  xl:w-[200px] xl:h-[200px]${
                    branch === i.name ? " border-[#1B9BEF]" : ""
                  }`}
                >
                  <img
                    src={i.image}
                    alt="Buyer logo"
                    className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px]"
                  />
                </div>
                <h3
                  className={`font-semibold text-[14px] p-4 xl:text-[20px] ${
                    branch === i.name ? "text-[#1B9BEF]" : "text-color"
                  }`}
                >
                  {i.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Branch;
