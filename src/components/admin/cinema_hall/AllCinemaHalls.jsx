import React, { useEffect, useState } from "react";
import CinemaHallDetails from "./CinemaHallDetails";
import CinemaHallModal from "./CinemaHallModal";
import { useDispatch, useSelector } from "react-redux";
import { SET_CINEMA_HALL_ADMIN } from "../../../slices/admin/cinemaHall";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../../config/apiConfig";

const AllCinemaHalls = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cinemaHalls = useSelector((store) => store.cinemaHall_admin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/all-cinema-hall"
        );
        dispatch(SET_CINEMA_HALL_ADMIN(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex w-full min-h-screen justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-2 m-5">
          <div className="flex flex-col gap-2">
            {cinemaHalls.map((cinemaHall) => (
              <CinemaHallDetails
                key={cinemaHalls.hall_id}
                cinemaHall={cinemaHall}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="pt-2 pb-2 pl-5 pr-5 bg-blue-700 rounded-md text-white"
              onClick={() => setOpen(true)}
            >
              New CinemaHall
            </button>
            <CinemaHallModal open={open} close={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default AllCinemaHalls;
