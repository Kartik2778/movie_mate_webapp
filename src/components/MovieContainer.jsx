import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieCart from "./MovieCart";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import RightArrow from './RIghtArrow'
import LeftArrow from './LeftArrow'
import axiosInstance from "../config/apiConfig";

function MovieContainer() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get('/public/latest-movies');
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
