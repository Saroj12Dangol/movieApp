import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import { AiFillDownCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useState, useRef } from "react";
import { AsyncMovies, AsyncSeries } from "../../features/movies/movieSlice";

function MovieListing() {
  const dispatch = useDispatch();

  const movieRef = useRef();
  const showRef = useRef();

  const [searchValues, setSearchValues] = useState({
    movieSearch: "",
    showSearch: "",
  });

  const searchMovie = () => {
    if (movieRef.current.value === "") {
      dispatch(AsyncMovies("movie"));
    } else {
      dispatch(AsyncMovies(movieRef.current.value));
    }
  };
  const searchShow = () => {
    if (showRef.current.value === "") {
      dispatch(AsyncSeries("series"));
    } else {
      dispatch(AsyncSeries(showRef.current.value));
    }
  };

  const { movies, shows } = useSelector((state) => state.movies);
  const renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );
  const renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="show-error">
        <h3>{shows.Error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div className="name-arrow">
          <div className="search">
            <h2>Movies</h2>
            <div className="search-input-div">
              <input
                type="text"
                className="search-input"
                placeholder="Search ..."
                name="movieSearch"
                value={searchValues.movieSearch}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setSearchValues({
                    ...searchValues,
                    [name]: value,
                  });
                }}
                ref={movieRef}
              />
              <BsSearch className="search-icon" onClick={searchMovie} />
            </div>
          </div>
          <AiFillDownCircle className="down-arrow" />
        </div>
        <div className="movie-container">{renderMovies}</div>
        <div className="name-arrow">
          <div className="search">
            <h2>Shows</h2>
            <div className="search-input-div">
              <input
                type="text"
                className="search-input"
                placeholder="Search ..."
                name="showSearch"
                value={searchValues.showSearch}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setSearchValues({
                    ...searchValues,
                    [name]: value,
                  });
                }}
                ref={showRef}
              />
              <BsSearch className="search-icon" onClick={searchShow} />
            </div>
          </div>
          <AiFillDownCircle className="down-arrow" />
        </div>
        <div className="shows-container">{renderShows}</div>
      </div>
    </div>
  );
}

export default MovieListing;
