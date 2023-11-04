import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    appGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    emptySearchResult: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const { toggleGptSearchView, appGptMovieResult, emptySearchResult } =
  gptSlice.actions;
export default gptSlice.reducer;
