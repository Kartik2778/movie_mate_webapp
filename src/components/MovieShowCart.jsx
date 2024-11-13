import React from "react";
import { Link } from "react-router-dom";

const MovieShowCart = ({movieShow}) => {

    let token = localStorage.getItem("token") || "";

  return (
    <Link to={ token ? `/select-seats/${movieShow.show_id}` : "/signup" }>
    <div className="p-10 flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <strong>{movieShow.cinemaHall.theater.name}</strong>
                <strong>{movieShow.cinemaHall.name}</strong>
                <span className="p-2 bg-gray-300 rounded-md">{movieShow.screenType}</span>
                <span className="p-2 bg-gray-300 rounded-md">{movieShow.language}</span>
            </div>
            <div className="flex gap-1">
                <span>{movieShow.cinemaHall.theater.address.street}</span>
                <span>{movieShow.cinemaHall.theater.address.city}</span>
                <span>{movieShow.cinemaHall.theater.address.state}</span>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <span>{movieShow.showDate}</span>
            <span className=" w-fit pt-1 pb-1 pl-5 pr-5 outline outline-green-600 text-green-600 rounded-sm">{movieShow.startTime}</span>
        </div>
    </div>
    </Link>
  );
};

export default MovieShowCart;
