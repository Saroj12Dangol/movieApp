import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {AsyncMovies, AsyncSeries} from "../../features/movies/movieSlice"

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AsyncMovies());
    dispatch(AsyncSeries())
  }, [dispatch]);

  return (
    <>
      <MovieListing />
    </>
  );
}

export default Home;
