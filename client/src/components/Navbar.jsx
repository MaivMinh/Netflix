import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { UserAuth } from "../context/AuthContextProvider";

function Navbar() {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();
  async function logOut() {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <nav className="flex flex-row justify-between py-4 px-[10%] border-b-[1px] rounded-b-2xl items-center bg-transparent z-10 absolute top-0 left-0 right-0">
      <Link className="text-red-600 font-bold text-5xl cursor-pointer" to="/">
        NETFLIX
      </Link>
      {user == undefined ? (
        <ul className="flex flex-row gap-x-6 items-center justify-between">
          <Link
            className="px-2 py-[7px] text-white border-[1px] border-white rounded-xl cursor-pointer hover:bg-white hover:text-black"
            to="/sign-up"
          >
            Đăng Kí
          </Link>
          <Link
            className="px-2 py-2 text-white border-none rounded-xl cursor-pointer bg-red-600 hover:bg-red-700"
            to="/sign-in"
          >
            Đăng Nhập
          </Link>
        </ul>
      ) : (
        <ul className="flex flex-row gap-x-6 items-center justify-between">
          <Link
            className="px-2 py-[7px] text-white rounded-2xl cursor-pointer hover:bg-red-500 hover:text-[#F6F6F6] text-xl"
            to={"/favourite"}
          >
            Phim yêu thích
          </Link>
          <div className="h-9 border-red-500 rounded-2xl border-[1px]"></div>
          <Link
            className="px-2 py-[7px] text-white border-[1px] border-white rounded-xl cursor-pointer hover:bg-white hover:text-black "
            to="/account"
          >
            Tài khoản
          </Link>
          <button
            className="px-2 py-2 text-white border-none rounded-xl cursor-pointer bg-red-600 hover:bg-red-700"
            onClick={logOut}
          >
            Đăng Xuất
          </button>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
