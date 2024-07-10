import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="h-16 bg-zinc-800 text-white ">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between  ">
        <div>
          <img
            src="logo.png"
            className="h-[60px] rounded-full  cursor-pointer "
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className=" hidden lg:flex items-center w-full  justify-between max-w-screen-sm border rounded-full focus-within:shadow ">
          <input
            type="text"
            placeholder="search.."
            className="w-full outline-yellow-400  h-10 border rounded-l-full pl-4 text-black "
          />
          <div className="text-lg h-10  min-w-[50px] bg-red-800 flex items-center justify-center rounded-r-full text-white ">
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-4xl cursor-pointer ">
            <FaUserCircle />
          </div>
          <div className="text-2xl relative cursor-pointer ">
            <span>
              <FaCartShopping />
            </span>
            <div className="bg-red-600  text-wrap w-5 h-5 rounded-full p-2 pr-3 flex items-center justify-center absolute -top-3  -right-2">
              <p className="text-base">14</p>
            </div>
          </div>

          <div>
            <Link to={"/login"} className="px-3 py-1 font-bold rounded-full hover:bg-red-700 bg-red-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
