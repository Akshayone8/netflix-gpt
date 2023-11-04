import React from "react";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  console.log(movieNames);
  if (!movieNames) return <Shimmer />;
  return (
    <div className="p-4 mt-4 bg-black text-white ">
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
