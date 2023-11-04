import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-bold py-2 text-white">{title}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex">
          {movies?.map((movie, index) => (
            <MovieCard posterPath={movie.poster_path} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
