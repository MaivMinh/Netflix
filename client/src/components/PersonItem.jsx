import React from "react";

const PersonItem = (props) => {
  /* Components này giành cho thẻ phim ở các Categories phần sidebar, không phải bên phần Favourite. 
  Với mục đích là cho phần thẻ phim nó khác với bên favourite thôi.
  */
  const id = props.id;  // Tìm thông tin chi tiết thông qua id.
  return (
    <div className="flex flex-row w-full h-[400px] bg-red-500">
      <img className="basis-1/4 bg-blue-400 h-full" />
      <div className="content basis-3/4 bg-yellow-400 h-full"></div>
    </div>
  )
};

export default PersonItem;
