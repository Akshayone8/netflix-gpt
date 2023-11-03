import React from "react";
import Lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[20%] flex justify-center">
      <form className="w-1/2 grid grid-cols-12 bg-black">
        <input
          type="text"
          placeholder={Lang[langKey].gptSearchPlaceHolder}
          className="col-span-9 p-4 m-4"
        />
        <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3">
          {Lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
