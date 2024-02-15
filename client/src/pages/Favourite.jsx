import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContextProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import FavMovie from "../components/FavMovie";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const { user, setUser } = UserAuth();
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user == undefined) navigate("/sign-in");
  });

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
