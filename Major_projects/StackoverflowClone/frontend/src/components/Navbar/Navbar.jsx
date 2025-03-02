import React, { useState } from "react";
import logo_image from "../../assets/looka.svg";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Navbar = () => {

  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center text-black py-4 px-6 md:px-32 bg-white drop-shadow-md">
      <a href="#">
        <img
          src={logo_image}
          className="w-28 hover:scale-105 transition-all"
          alt="logo-image"
        />
      </a>
      <ul className="hidden md:flex items-center gap-12 font-semibold text-base">
        <li className=" p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">
          Home
        </li>
        <li className=" p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">
          Explore
        </li>
        <li className=" p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">
          Contact
        </li>
        <li className=" p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">
          products
        </li>
      </ul>

      <div className="relative hidden md:flex items-center w-auto">
        <SearchIcon
          className=" text-gray-400 left-3 absolute"
          fontSize="large"
        />
        <input
          type="text"
          placeholder="search.."
          className=" py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500 "
        />
      </div>

      <div className="flex items-center gap-4 text-base font-semibold">
        <a className="p-3">Profile</a>
        <button className="p-2 rounded-md bg-green-400 hover:scale-105 hover:text-white hover:bg-gray-600 transition-all ">
          Log-in
        </button>
      </div>
      <div className="md:hidden hover:cursor-pointer">
        <MenuIcon onClick={()=>setisMenuOpen(!isMenuOpen)} />
      </div>
    </div>
  );
};

export default Navbar;
