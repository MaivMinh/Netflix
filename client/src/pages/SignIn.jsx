import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebase.config";
import { UserAuth } from "../context/AuthContextProvider";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import firebaseDb from "../firebase/firebase.db";

const SignIn = () => {
  const { user, setUser } = UserAuth();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // get infor from user's input data.
    const username = account.username;
    const password = account.password;

    
  }
  function handleChange(e) {
    setAccount(() => {
      return {
        ...account,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user.email);
      firebaseDb.addNewUser(user.email);
      navigate("/");
    }
  });

  function responseFacebook(response) {
    if (response) {
      setUser(response.userID);
      firebaseDb.addNewUser(response.userID);
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }

  return (
    <div className="h-screen w-ful">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/319e80c0-66aa-416c-9407-c7377a8c126a/VN-vi-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="hidden sm:block w-full h-full opacity-40 object-cover"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[450px] absolute top-[80px] left-2/4 -translate-x-2/4 pb-[3%] gap-y-8 bg-black bg-opacity-70 rounded-2xl items-start px-[5%] pt-[3%]"
      >
        <p className="mt-4 w-4/5 text-white text-3xl rounded-t-2xl">
          Đăng nhập
        </p>

        <div className="flex flex-col gap-y-4 w-full relative">
          <input
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="text"
            value={account.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          <input
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="password"
            value={account.password}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {err ? (
            <p className="text-sm text-red-500 text-left italic absolute -bottom-[20%]">
              Email or password is incorrect!
            </p>
          ) : null}
        </div>

        <div className="flex flex-col justify-between items-center w-full gap-y-4">
          <button
            type="submit"
            className="text-xl bg-red-600 rounded-md w-full text-center py-2"
          >
            Đăng nhập
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
            <p className="text-gray-400">Bạn mới tham gia Netflix?</p>
            <Link to="/sign-up">Đăng kí ngay</Link>
          </div>
        </div>
        <GoogleButton onClick={handleSignIn} className="w-full" type="dark" />
        <FacebookLogin
          appId="3186113411533599"
          fields="name,email,picture"
          callback={responseFacebook}
          size="medium"
          cookie="false"
        />
      </form>
    </div>
  );
};

export default SignIn;
