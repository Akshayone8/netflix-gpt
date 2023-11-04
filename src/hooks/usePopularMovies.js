import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  //fetch the data from tmdb api and update the store
  const dispatch = useDispatch();

  const nowPopularMovie = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    //if there is no popular movie than only make an API call
    !nowPopularMovie && getPopularMovies();
  }, []);
};

export default usePopularMovies;
