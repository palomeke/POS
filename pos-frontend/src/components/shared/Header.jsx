import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
const headers = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#FFFFF]">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={logo} className="h-8 w-8" alt="resto logo" />
        <h1 className="text-lg font-semibold text-[#212529]">Resto</h1>
      </div>
      {/* Search */}
      <div className="flex items-center border border-gray-300 focus-within:border-primary gap-4 bg-[#FFFFF] rounded-[15px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#212529]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-surfaceMuted outline-none text-textPrimary w-full placeholder:text-textSecondary"
        />
      </div>
      {/* Logged User Details  */}

      <div className="flex items-center gap-4">
        {userData.role === "Administrador" && (
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer"
          >
            <MdDashboard className="text-[#f5f5f5] text-2xl" />
          </div>
        )}
        <div className="bg-[#1f1f1f] rounded-[15px] p-3">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#212529] text-5xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#212529] font-semibold">
              {userData.name || "TEST USER"}
            </h1>
            <p className="text-xs text-[#212529] font-medium">
              {userData.role || "Role"}
            </p>
          </div>
          <IoLogOut
            onClick={handleLogout}
            className="text-[#212529] ml-2"
            size={40}
          />
        </div>
      </div>
    </header>
  );
};

export default headers;
