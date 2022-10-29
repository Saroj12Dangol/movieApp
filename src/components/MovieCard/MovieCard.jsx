import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.scss";

function MovieCard(props) {
  return (
    <Link to ={`/movie/${props.data.imdbID}`}>
      <div className="movieCard-container">
        <img src={props.data.Poster} alt="..." className="movieCard-img" />
        <p className="movieTitle">{props.data.Title}</p>
        <span className="release-date">Year: {props.data.Year}</span>
      </div>
    </Link>
  );
}

export default MovieCard;
