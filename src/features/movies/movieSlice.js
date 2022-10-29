import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi";
import { apiKey } from "../../common/apis/MovieApiKey";

const initialState = {
  movies: [],
  shows: [],
  details: [],
};
export const AsyncMovies = createAsyncThunk("movies/AsyncMovies", async (movieText = "movie") => {
  const response = await movieApi.get(
    `?apiKey=${apiKey}&s=${movieText}&type=movie`
  );
  return response.data;
});

export const AsyncSeries = createAsyncThunk(
  "movies/AsyncSeries",
  async (seriesText = "series") => {
    const response = await movieApi.get(
      `?apiKey=${apiKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const AsyncDetails = createAsyncThunk(
  "movies/AsyncDetails",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${apiKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, action) => {
    //   state.movies = action.payload;
    // },
    addSeries: (state, action) => {
      state.shows = action.payload;
    },
    removeSelected: (state) => {
      state.details = [];
    },
    // movieSearch: (state, action) => {
    //   state.movieSearch = action.payload;
    // },
    // showSearch: (state, action) => {
    //   state.showSearch = action.payload;
    // },
  },

  extraReducers: {
    [AsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [AsyncMovies.fulfilled]: (state, action) => {
      console.log("fulfilled");
      return { ...state, movies: action.payload };
    },
    [AsyncMovies.rejected]: () => {
      console.log("rejected");
    },
    [AsyncSeries.fulfilled]: (state, action) => {
      return { ...state, shows: action.payload };
    },
    [AsyncDetails.fulfilled]: (state, action) => {
      return { ...state, details: action.payload };
    },
  },
});

export const { removeSelected } = movieSlice.actions;

export default movieSlice.reducer;
