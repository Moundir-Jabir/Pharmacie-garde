import React from "react";
import {
  FaUserCircle,
} from "../../../assets/icons";

function Navbar() {
  return (
    <div className="navbar bg-gray-800 text-white">
      <div className="navbar-start">
      </div>
      <div className="navbar-end flex px-3">
        <div className="dropdown dropdown-end flex flex-row items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full">
              <FaUserCircle size={24} className="cursor-pointer" />
            </div>
          </label>
          <p className="text-white">Admin</p>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar