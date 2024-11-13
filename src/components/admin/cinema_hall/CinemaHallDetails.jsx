import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StadiumIcon from "@mui/icons-material/Stadium";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DELETE_CINEMA_HALL_ADMIN } from "../../../slices/admin/cinemaHall";
import axiosInstance from "../../../config/apiConfig";

const CinemaHallDetails = ({cinemaHall}) => {

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem('token');
  const handleDeleteCinemaHall = async () => {
    try{
      await axiosInstance.delete(`/admin/${cinemaHall.hall_id}/delete-cinemaHall`)
      dispatch(DELETE_CINEMA_HALL_ADMIN({hall_id: cinemaHall.hall_id}))
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
            <StadiumIcon />
          </div>
          <div>
            <div className=" font-semibold">{cinemaHall.name}</div>
            <div className=" font-semibold">Theater: {cinemaHall.theater.name}</div>
          </div>
        </div>
        <span className="text-lg">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4 border-t  bg-white shadow-md border-gray-300">
          <div>Total Seats: {cinemaHall.totalSeats}</div>
          <div>Regular Seats: {cinemaHall.regularSeats}</div>
          <div>Premium Seats: {cinemaHall.premiumSeats}</div>
          <div>VIP Seats: {cinemaHall.vipSeats}</div>
          <div className="flex gap-2">
            <div>Address: </div>
            <div className="flex flex-col gap-2">
              <p>{cinemaHall.theater.address.street}</p>
              <p>{cinemaHall.theater.address.city}</p>
              <p>{cinemaHall.theater.address.state}</p>
              <p>{cinemaHall.theater.address.country}</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Link to={`/admin-panel/movie-shows/${cinemaHall.hall_id}`}>
              <button className="pt-2 pb-2 pl-5 pr-5 bg-green-600 rounded-md text-white">
                All Shows
              </button>
            </Link>
            <button className="pt-2 pb-2 pl-5 pr-5 bg-red-600 rounded-md text-white" 
            onClick={handleDeleteCinemaHall}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemaHallDetails;
