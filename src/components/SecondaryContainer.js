import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlatingMovies && (
      <div className="bg-black">
        <div className="-mt-52 relative z-20">
          <MovieList title="Now Playing" movies={movies.nowPlatingMovies} />
          <MovieList title="Popular Movies" movies={movies.popularMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
