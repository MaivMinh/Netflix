import React, { useState, useEffect } from "react";
import instance from "../axios/logicAxios-config";

const FilmItem = (props) => {
  /* Components này giành cho thẻ phim ở các Categories phần sidebar, không phải bên phần Favourite. 
  Với mục đích là cho phần thẻ phim nó khác với bên favourite thôi.
  */
  const id = props.id;  // Tìm thông tin chi tiết thông qua id.
  const [infor, setInfor] = useState(undefined);
  useEffect(() => {
    // Lấy dữ liệu phim.
    instance.get(`/movie/${id}`)
    .then(res => {
      setInfor(res.data);
    })
    .catch(err => {
      console.log(err);
    })

  }, [infor]);
  
  return (
    <div className="flex flex-row w-full h-[400px] bg-red-500">
      <img className="basis-1/4 bg-blue-400 h-full" />
      <div className="content basis-3/4 bg-yellow-400 h-full"></div>
    </div>
  )
};

export default FilmItem;
