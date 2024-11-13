import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import MovieShowHeader from '../components/MovieShowHeader';
import MovieShowsBody from '../components/MovieShowsBody';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
import axiosInstance from '../config/apiConfig';

const MovieShowPage = () => {
  const { id: movieId } = useParams();
  const { selectedCity } = useSelector((store) => store.selectedCity);

  const [movie, setMovie] = useState({});
  const [movieShows, setMovieShows] = useState([]);
  const[movieShowError,setMovieShowError] = useState({message: "",flag: false});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axiosInstance.get(`/public/${movieId}/movie`);
        setMovie(res.data);
      } catch (error) {
        console.log("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchMovieShows = async () => {
      try {
        const res = await axiosInstance.get(
          `/public/${movieId}/movie-show?city=${selectedCity}`
        );
        setMovieShows(res.data);
        setMovieShowError({message: "",flag: false});
      } catch (error) {
        setMovieShowError({message: error.response.data,flag: true});
      }
    };
    fetchMovieShows();
  }, [movieId, selectedCity]);

  return (
    <div>
      <NavBar />
      <MovieShowHeader movie={movie} />
      {
       movieShowError.flag ? <div className='w-[80%] ml-[10%] mr-[10%] mt-10'> <Message severity={"success"}>{movieShowError.message}</Message> </div> :
      <MovieShowsBody movieShows={movieShows} />
      }
    </div>
  );
};

export default MovieShowPage;
