import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">Man /&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <a href="https://github.com/gitdas-dev"><div className="flex justify-between hover:scale-105 hover:transition-all">
          <img className="py-6" src="/icons8-github.svg" alt="github logo" />
          <span className="text-white font-bold pt-10">GitHub</span>
        </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
