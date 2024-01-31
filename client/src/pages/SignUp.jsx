import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseDb from "../firebase/firebase.db";

const SignUp = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    setAccount(() => {
      return {
        ...account,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // get infor from user's input data.
    const email = account.email;
    const username = account.username;
    const password = account.password;
    
  }

  return (
    <div className="h-screen w-ful">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/319e80c0-66aa-416c-9407-c7377a8c126a/VN-vi-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="hidden sm:block w-full h-full opacity-40 object-cover"
        alt=""
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[450px] absolute top-[80px] left-2/4 -translate-x-2/4 h-[90%] gap-y-8 bg-black bg-opacity-70 rounded-2xl items-start px-[5%] pt-[3%]"
      >
        <p className="mt-4 w-4/5 text-white text-3xl rounded-t-2xl">Đăng ký</p>
        <div className="flex flex-col gap-y-4 w-full">
          <input
            onChange={handleChange}
            value={account.email}
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="email"
            value={account.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <input
            onChange={handleChange}
            value={account.password}
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex flex-col justify-between items-center w-full gap-y-4">
          <button
            type="submit"
            className="text-xl bg-red-600 rounded-md w-full text-center py-2"
          >
            Đăng ký
          </button>
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex-1 flex flex-row gap-x-2 items-center">
              <input
                className="cursor-pointer"
                id="remember-me"
                type="checkbox"
              />
              <label
                htmlFor="remember-me"
                className="text-gray-400 cursor-pointer"
              >
                Ghi nhớ tôi
              </label>
            </div>
            <Link className="flex-1 text-right text-gray-400" to="/help">
              Bạn cần trợ giúp?
            </Link>
          </div>
          <div className="flex flex-row gap-x-2 self-start justify-start">
            <p className="text-gray-400">Bạn đã có tài khoản?</p>
            <Link to="/sign-in">Đăng nhập ngay</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
