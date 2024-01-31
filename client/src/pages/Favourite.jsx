import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContextProvider";
import { doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import FavMovie from "../components/FavMovie";

const Favourite = () => {
  const { user } = UserAuth();
  const [savedMovies, setSavedMovies] = useState([]);

  function remove(id) {
    setSavedMovies((previousSavedMovies) => {
      return previousSavedMovies.filter((value, index) => {
        return value.id !== id;
      });
    });
  }

  useEffect(() => {
    const unsubcribe = onSnapshot(doc(db, "users", `${user}`), (doc) => {
      setSavedMovies(doc.data()?.savedMovies);
    });
    return () => {
      unsubcribe();
    };
  }, [user?.email]);

  return (
    <div className="w-4/5 absolute left-2/4 -translate-x-2/4 sm:mt-[25%] md:mt-[15%] lg:mt-[10%] mt-[35%] flex flex-wrap gap-8 ml-[5%]">
      {savedMovies &&
        savedMovies.map((value, index) => {
          return <FavMovie key={index} movie={value} onClick={remove} />;
        })}
    </div>
  );
};

export default Favourite;
