import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  //fetch the data from tmdb api and update the store
  const dispatch = useDispatch();
  const nowPlayingMovie = useSelector((store) => store.movies.nowPlatingMovies);
  //if nowPlayingMovie has some movie than don't make an API call

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    //if there is no now playing movie then only make an API call
    if (!nowPlayingMovie) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
