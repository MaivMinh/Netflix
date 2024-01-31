import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthContextProvider from "./context/AuthContextProvider";
import Favourite from "./pages/Favourite";
import PlayMovie from "./pages/PlayMovie";
import SideBar from "./components/SideBar";
import Detail from "./pages/Detail";
import Footer from "./components/Footer";
import Trailer from "./pages/Trailer";
import Account from "./pages/Account";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="App relative">
      <AuthContextProvider>
        <SideBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/play/:movieID" element={<PlayMovie />} />
          <Route path="/detail/:movieID" element={<Detail />} />
          <Route path="/trailer/:movieID" element={<Trailer />} />
          <Route path="/account" element={<Account />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
