import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

export default {
  addNewUser: async (username) => {
    // Kiểm tra xem user có tồn tại hay không.
    const docRef = doc(db, "users", `${username}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return;
    }
    try {
      setDoc(
        doc(db, "users", username),
        {
          savedMovies: [],
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  updateSavedMovies: async (status, username, movie) => {
    const userRef = doc(db, "users", username);
    if (status) {
      // Khi status == true => thêm phim vào danh sách các phim đã lưu.
      try {
        await updateDoc(userRef, {
          savedMovies: arrayUnion({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
          }),
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // Ngược lại xoá các phim đã chọn.
      try {
        await updateDoc(userRef, {
          savedMovies: arrayRemove({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
          }),
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};
