import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">Man /&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Made with <img src="icons/heart.png" className="w-[20px] mx-2"></img> by @Mandeep
      </div>
    </div>
  );
};

export default Footer;
