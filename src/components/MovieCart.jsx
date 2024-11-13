import React from "react";
import { Link } from "react-router-dom";

const MovieCart = ({ movie }) => {

  return (
    <Link to={`/movie-show/${movie.movie_id}`}>
      <div>
        <div>
          <img
            className="w-[20vw] object-cover rounded-md"
            src={movie.photo}
            alt="Movie poster"
          />
        </div>
        <div>
          <div className="text-left">{movie.title}</div>
          <div className="text-left">{movie.type}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCart;
