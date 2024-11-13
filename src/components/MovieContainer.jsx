import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieCart from "./MovieCart";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./Arrow";
import axios from "axios";

function MovieContainer() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:8085/public/latest-movies');
        setMovies(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="w-[90%] ml-[5%] mt-24">
      <Slider {...settings}>
        {movies.map(movie => <MovieCart key={movie.movie_id} movie={movie} />)}
      </Slider>
    </div>
  );
}

export default MovieContainer;
