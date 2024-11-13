import React, { useEffect, useState } from "react";
import TheaterDetails from "./TheaterDetail";
import TheaterModal from './TheaterModal'
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SET_THEATER_ADMIN } from "../../../slices/admin/theater";
import axiosInstance from "../../../config/apiConfig";


const AllTheaters = () => {

    const [open,setOpen] = useState(false)

    const dispatch = useDispatch();
    const theaters = useSelector(store => store.theater_admin);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTheaters = async () => {
        try {
          const response = await axiosInstance.get("/admin/all-theater");
          dispatch(SET_THEATER_ADMIN(response.data));
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
        {theaters.map((theater) => (
          <TheaterDetails key={theater.theater_id} theater={theater} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="pt-2 pb-2 pl-5 pr-5 bg-blue-700 rounded-md text-white"
          onClick={() => setOpen(true)}
        >
          New Theater
        </button>
        <TheaterModal theater={null} buttonTitle="New Theater" title="Create New Theater" open={open} close={() => setOpen(false)} />
      </div>
    </div>
    )}
  </>
  );
};

export default AllTheaters;
