import React from "react";
import ForbesLogo from "../../assets/Forbes.png";

const Header = () => {
  return (
    <div >
      <nav className="p-3 flex bg-slate-500 justify-between items-center top-0 left-0 right-0 z-10 shadow-lg">

      {/* left header section */}
        <div id="logo" className="">
        <a href="#" className="flex gap-2 items-center">
          <img src={ForbesLogo} className=" h-6" />
          <span>Coder</span>  
        </a>
        </div>
        {/* Middle header section */}
        <div className="flex justify-between gap-5 items-center">
          <a href="#" className="text-xl font-semibold">Home</a>
          <a href="#"  className="text-xl font-semibold">Page</a>
          <a href="#" className="text-xl font-semibold">Questions</a>
        </div>
        {/* Right header section */}
        <div className="flex justify-between gap-3 items-center">
          <a href="#" className="text-xl font-semibold">Profile</a>
          <a href="#" className="text-xl font-semibold">Log-out</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
