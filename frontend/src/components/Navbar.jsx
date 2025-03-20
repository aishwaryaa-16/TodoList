import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser,logout } = useAuthStore();
  return (
    <nav className="flex justify-between bg-blue-950 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9">Taskify</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <Link to="/">
          <li className="cursor-pointer hover:font-bold transition-all ">
            Home
          </li>
        </Link>
        {authUser && (
          <Link to="/tasks">
            <li className="cursor-pointer hover:font-bold transition-all">
              Tasks
            </li>
          </Link>
        )}
        {authUser ? (
          <li
            className="cursor-pointer hover:font-bold transition-all"
            onClick={logout} // Call logout function on click
          >
            Logout
          </li>
        ) : (
          <Link to="/login">
            <li className="cursor-pointer hover:font-bold transition-all">
              Login
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
