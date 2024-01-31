import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContextProvider";
import firebaseDb from "../firebase/firebase.db";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const MovieRow = (props) => {
  const movie = props.movie;
  const [like, setLike] = useState(false);
  const { user } = UserAuth();

  const [display, setDisplay] = useState(false);

  function handleClick() {
    const previousState = like;
    const currentState = !like;
    setLike(!like);
    setTimeout(() => {
      setDisplay(true);
    }, 500);
    setTimeout(() => {
      setDisplay(false);
    }, 1500);

    if (currentState) {
      // Nếu trạng thái hiện tại là true, thêm phim vào danh sách yêu thích.
      firebaseDb.updateSavedMovies(true, user, movie);
      console.log(user);
    } else if (previousState == true) {
      // Nếu trạng thái hiện tại là false nhưng trạng thái trước đó là true thì điều này có nghĩa là user đã huỷ phim yêu thích này.
      firebaseDb.updateSavedMovies(false, user, movie);
    }
  }

  useEffect(() => {
    if (user) {
      /* 
        Dùng onSnapshot() giúp sử dụng chức năng real-time database, điều này giúp cho trạng thái của phim được yêu thích hoặc không được giữ xuyên suốt trong toàn bộ phiên sử dụng.
      */
      const unsubcribe = onSnapshot(
        doc(db, "users", `${user?.email}`),
        (doc) => {
          const savedMovies = doc.data()?.savedMovies;
          if (savedMovies != undefined) {
            for (let index = 0; index < savedMovies.length; index++) {
              if (savedMovies[index].id === movie.id) setLike(true);
            }
          }
        }
      );
      return () => {
        unsubcribe();
      };
    }
  }, [user?.email]);

  return (
    <div
      className="h-full w-[350px] inline-block mr-8 cursor-pointer group relative"
      to={`/detail/${movie?.id}`}
    >
      <Link
        className="absolute top-0 left-0 border-[1px] border-white p-1 rounded-lg group-hover:block hidden hover:text-black hover:bg-white duration-300"
        to={`/detail/${movie?.id}`}
      >
        Chi tiết
      </Link>
      <img
        className="w-full object-cover rounded-xl group-hover:shadow-lg group-hover:shadow-cyan-300/50"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      {user != undefined ? (
        <button
          onClick={handleClick}
          className="absolute top-5 right-5 hidden group-hover:block p-2 rounded-3xl bg-white"
        >
          {!like ? (
            <FaRegHeart className="text-2xl text-red-500" />
          ) : (
            <FaHeart className="text-2xl text-red-500" />
          )}
        </button>
      ) : null}
      <p className="hidden group-hover:flex w-full absolute bottom-0 bg-black py-3 px-2 opacity-70 rounded-b-2xl -translate-y-[50%]">
        {movie.title}
      </p>
      {display ? (
        <div>
          {like ? (
            <div className="w-[400px] h-[130px] rounded-2xl bg-[#F6F6F6] fixed top-[20%] left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center gap-y-3 items-center opacity-80 z-50">
              <p className="text-black text-[22px]">
                Thêm vào phim yêu thích thành công!
              </p>
              <img
                className="w-[15%]"
                src="https://image.similarpng.com/very-thumbnail/2020/11/Correct-icon-button-on-transparent-background-PNG.png"
              />
            </div>
          ) : (
            <div className="w-[400px] h-[130px] rounded-2xl bg-[#F6F6F6] fixed top-[20%] left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center gap-y-3 items-center opacity-80 z-50">
              <p className="text-black text-[22px]">
                Xoá phim yêu thích thành công!
              </p>
              <img
                className="w-[15%]"
                src="https://image.similarpng.com/very-thumbnail/2020/11/Red-incorrect-icon-button-on-transparent-background-PNG-1.png"
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MovieRow;
