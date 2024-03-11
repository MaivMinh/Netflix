import React from "react";
import { UserAuth } from "../context/AuthContextProvider";
import FilmItem from "../components/FilmItem";
import PersonItem from "../components/PersonItem";

const Search = () => {
  const { user, setUser, searchResult, setSearchResult } = UserAuth();
  return (
    <div className="absolute sm:mt-[25%] md:mt-[15%] lg:mt-[10%] mt-[35%] flex flex-wrap gap-8 mx-[5%] w-[90%] justify-center">
      {searchResult != undefined && searchResult.length != 0 ? (
        <div className="flex flex-col w-full gap-y-8">{/* Trường hợp có dữ liệu tìm kiếm. */}
          {searchResult.type == "film" ? (
            searchResult.results.map(element => {
              return <FilmItem id={element.id} />
            })
          ): (
            searchResult.results.map(element => {
              return <PersonItem id={element.id} />
            })
          )}
          
        </div>
      ) : (
        <div className="w-screen">{/* Trường hợp không có dữ liệu tìm kiếm. */}
          <h1 className="w-full text-3xl text-center">Không tìm thấy dữ liệu tìm kiếm</h1>
        </div>
      )}
    </div>
  );
};

export default Search;
