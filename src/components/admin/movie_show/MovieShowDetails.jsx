import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import axios from "axios";
import { useDispatch } from "react-redux";
import { DELETE_MOVIE_SHOW_ADMIN } from "../../../slices/admin/movie_show";

const MovieShowDetails = ({movieShow}) => {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem('token');
  const dispatch =  useDispatch();
  
  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:8085/admin/${movieShow.show_id}/delete-movie-show`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(DELETE_MOVIE_SHOW_ADMIN({show_id: movieShow.show_id}));
    }
    catch(error) {
      console.log("error ",error);
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
        <div className="flex gap-2">
          <div>
            <LiveTvIcon/>
          </div>
          <div>
            <div className=" font-semibold">{movieShow.movie.title}</div>
            <div className=" font-semibold">{movieShow.cinemaHall.name}</div>
          </div>
        </div>
        <span className="text-lg">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4 border-t  bg-white shadow-md border-gray-300">
          <div>Language: {movieShow.language}</div>
          <div>Screen Type: {movieShow.screenType}</div>
          <div>Show Date: {movieShow.showDate}</div>
          <div>Start time: {movieShow.startTime}</div>
          <div>end time: {movieShow.endTime}</div>
          <div>Regular Seat Price: ₹ {movieShow.regularSeatPrice}</div>
          <div>Premium Seat Price: ₹ {movieShow.premiumSeatPrice}</div>
          <div>VIP Seat Price: ₹ {movieShow.vipSeatPrice}</div>
          <div className="flex justify-end">
            <button className="pt-2 pb-2 pl-5 pr-5 bg-red-600 rounded-md text-white"
            onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieShowDetails;
