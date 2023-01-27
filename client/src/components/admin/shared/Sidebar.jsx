import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  HiMenuAlt2,
  HiMenuAlt3,
  MdOutlineDashboard,
  BiLogOutCircle,
  TfiHeartBroken,
  TfiComment,
  AiOutlineStar,
  BiPlusMedical,
  BiMessageSquare
} from "../../../assets/icons";
import { logout } from "../../../features/authentification/authentificationSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menus = [
    {
      name: "Dashboard",
      Link: "/dashboard",
      icon: MdOutlineDashboard,
      margin: true,
    },
    {
      name: " Pharmacies",
      Link: "/dashboard/pharmacies",
      icon: BiPlusMedical,
      margin: true,
    },
    {
      name: "Commentaire",
      Link: "/dashboard/commentaires",
      icon: BiMessageSquare,
    },
    {
      name: "Review",
      Link: "/dashboard/review",
      icon: AiOutlineStar,
    },
  ];
  const deconnecter = () => {
    dispatch(logout());
    navigate("/");
  };
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`bg-color-secondary h-screen ${
        open ? "w-56" : "w-16"
      } duration-500 text-gray-100 px-3`}
    >
      <div className="pt-1 flex flex-col gap-4 relative">
        <div className="flex justify-start swap swap-rotate">
          <label className="swap swap-rotate">
            <input type="checkbox" onClick={() => setOpen(!open)} />
            <HiMenuAlt3
              size={24}
              className="cursor-pointer swap-off fill-current"
            />
            <HiMenuAlt2
              size={24}
              className="cursor-pointer swap-on fill-current"
            />
          </label>
          <p className="btn btn-ghost normal-case text-xl">PharmGarde</p>
        </div>
        <hr className="p-0" />
        {menus?.map((menu, i) => (
          <Link
            to={menu?.Link}
            key={i}
            className={`${
              menu?.margin && "mt-5"
            } group flex items-center text-sm gap-3 font-medium p-2 hover:bg-color-primary rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "24" })}</div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hideen"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
        <div
          onClick={deconnecter}
          className={`${
            true && "mt-5"
          } group flex items-center text-sm gap-3 font-medium p-2 hover:bg-red-600 rounded-md`}
        >
          <div>{React.createElement(BiLogOutCircle, { size: "24" })}</div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hideen"
            }`}
          >
            Se déconnecter
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
          >
            Se déconnecter
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
