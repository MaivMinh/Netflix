import React from "react";
import { UserAuth } from "../context/AuthContextProvider";
import authAxios from "../axios/authAxios-config";
import axios from "axios";

const Account = () => {
  function handleClick(e) {
    authAxios.get("/auth/test")
    .then(res => {
      console.log("Success");
    })
    .catch(err => {
      console.log("ERROR");
    })

  }

  return (
    <div className="absolute sm:mt-[120px] mt-[150px]">
      <button className="text-3xl text-red-500" onClick={handleClick}>
        Get Accounts
      </button>
    </div>
  );
};

export default Account;
