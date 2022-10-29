import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsyncDetails, removeSelected } from "../../features/movies/movieSlice";
import { useParams } from "react-router";
import "./MovieDetail.scss";
import {AiTwotoneLike, AiFillStar } from "react-icons/ai";
import {BiCameraMovie} from "react-icons/bi"
import {BsFillCalendar3Fill} from "react-icons/bs"


function MovieDetail() {
  const { imdbID } = useParams();
  const { details } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AsyncDetails(imdbID));
    return ()=>{
      dispatch(removeSelected())
    }
  }, [dispatch, imdbID]);

  return (
    <>
      <div className="detail-container">
        <div className="detail-text">
          <span className="detail-title">{details.Title}</span>
          <div className="ratings-div">
            <div className="ratings">
              <span className="imdb-text">IMDB Rating</span>
              <AiFillStar className="star" />
              <span>:</span>
              <span className="rating-value">{details.imdbRating}</span>
            </div>
            <div className="votes">
              <span>IMDB Votes</span><AiTwotoneLike className="like-icon"/>
              <span>:</span>
              <span>{details.imdbVotes}</span>
            </div>
            <div className="runtime">
              <span>Runtime</span><BiCameraMovie className="biCamera"/>
              <span>:</span>
              <span>{details.Runtime}</span>
            </div>
            <div className="year">
              <span>Year</span><BsFillCalendar3Fill className="bsCalendar"/>
              <span>:</span>
              <span>{details.Year}</span>
            </div>
          </div>
          <div className="plot">
            <p className="plot-text">
              {details.Plot}
            </p>
          </div>

          <div className="information">
            <div className="info-title">
              <span>Director</span>
              <span>Stars</span>
              <span>Genres</span>
              <span>Languages</span>
              <span>Awards</span>
            </div>
            <div className="info-title-names">
              <span>{details.Director}</span>
              <span>{details.Actors}</span>
              <span>{details.Genre}</span>
              <span>{details.Language}</span>
              <span>{details.Awards}</span>
            </div>
          </div>

        </div>
        <div className="poster">
          <img src={details.Poster} alt=".." className="detail-img"/>
        </div>
      </div>
      ;
    </>
  );
}

export default MovieDetail;
