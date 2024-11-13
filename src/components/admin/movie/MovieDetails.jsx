import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MovieModal from "./MovieModal";
import { useDispatch } from "react-redux";
import { DELETE_MOVIES_ADMIN } from "../../../slices/admin/movies";
import axiosInstance from "../../../config/apiConfig";

const MovieDetails = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [openModal,setOpenModal] = useState(false);
  

  const dispatch = useDispatch();

  const handleDeleteMovie = async () => {
    try{
      await axiosInstance.delete(`/admin/${movie.movie_id}/delete-movie`);
      dispatch(DELETE_MOVIES_ADMIN({movie_id: movie.movie_id}));
    }
    catch(error) {
      console.log("error ",error)
    }
  }

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden w-[100%] mb-4">
      <div
        className="flex justify-between items-center p-4 bg-white shadow-md cursor-pointer"
        onClick={toggleDetails}
      >
        <div>
          <SlideshowIcon/>
          <span className="ml-2 font-semibold">{movie.title}</span>
        </div>
        <span className="text-lg">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4 border-t  bg-white shadow-md border-gray-300">
          <div>Release Date: {movie.releaseDate}</div>
          <div>Duration: {movie.duration}</div>
          <div>Languages: {
          movie.languages.map(lang => <span className="ml-2">{lang}</span>)
          }</div>
          <div>Type: {movie.type}</div>
          <div>
            description: {movie.description}
          </div>
          <div className="flex gap-2 justify-end">
            <button className="pt-2 pb-2 pl-5 pr-5 bg-green-600 rounded-md text-white" onClick={() => setOpenModal(true)} >Update</button>
            <button className="pt-2 pb-2 pl-5 pr-5 bg-red-600 rounded-md text-white"
            onClick={handleDeleteMovie}
            >Delete</button>
            <MovieModal movie={movie} btnTitle="Update Movie" title = "Update Movie" open={openModal} close={() => setOpenModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
