import React, { useRef } from "react";
import Lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { appGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //search movie in tmdb

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    //make an API call to GPT API and get movie resultas
    const gptQuery =
      "act as a movie recomandation system and suggest some movies for the query : " +
      searchText.current.value +
      ".only give me a names of 5 movies ,comma seperated like the example result given ahead. Example : Gadar,Don,Golmaal,welcome,koi mil gaya ";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices[0].message?.content);
    const gptMovies = gptResults.choices[0].message?.content.split(",");

    //for each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //it will returns 5 promises not results ex - [promise,promise,promise,promise,promise]
    //it will take time,think 1st promise take 1 second to get the result and 2nd promise will take 0.5 seconds to get the results and 3rd will take 2sedconds to get the results,so when all the promises get resolve then only get the data from thmdbResults

    const tmdbResults = await Promise.all(promiseArray);
    //how we can give multiple input to same actions
    dispatch(
      appGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[20%] flex justify-center">
      <form
        className=" w-full md:w-1/2 grid grid-cols-12 bg-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={Lang[langKey].gptSearchPlaceHolder}
          className="col-span-9 p-4 m-4"
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {Lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
