import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContextProvider";
import firebaseDb from "../firebase/firebase.db";
import { collection, getDocs } from "firebase/firestore";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const FavMovie = (props) => {
  const movie = props.movie;
  const { user } = UserAuth();

  function handleClick(e) {
    props.onClick(movie.id);
    console.log(user)
    firebaseDb.updateSavedMovies(false, user, movie);
  }

  return (
    <div className="h-full sm:w-[450px] md:w-[260px] lg:w-[300px] inline-block mr-8 cursor-pointer group relative" to={`/detail/${movie?.id}`}>
      <Link className="absolute top-0 left-0 border-[1px] border-white p-1 rounded-lg group-hover:block hidden hover:text-black hover:bg-white duration-300" to={`/detail/${movie?.id}`}>
        Chi tiết
      </Link>
      <img
        className="w-full object-cover rounded-xl group-hover:shadow-lg group-hover:shadow-cyan-300/50"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <button
        onClick={handleClick}
        className="absolute top-2 right-2 hidden group-hover:block p-2 rounded-3x"
        value={movie.email}
      >
        <IoMdCloseCircle className="opacity-50 hover:opacity-100" size={30} />
      </button>
      <p className="hidden group-hover:flex w-full absolute bottom-0 bg-black py-3 px-2 opacity-70 rounded-b-2xl">
        {movie.title}
      </p>
    </div>
  );
};

export default FavMovie;
