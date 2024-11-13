import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TheatersIcon from '@mui/icons-material/Theaters';
import TheaterModal from "./TheaterModal";
import { useDispatch } from "react-redux";
import { DELETE_THEATER_ADMIN } from "../../../slices/admin/theater";
import axiosInstance from "../../../config/apiConfig";

const TheaterDetails = ({ theater }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const handleDelete = async () => {
      try{
        await axiosInstance.delete(`/admin/${theater.theater_id}/delete-theater`)
        dispatch(DELETE_THEATER_ADMIN({theater_id: theater.theater_id}))
      }
      catch(error) {
        console.log("error",error);
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
            <TheatersIcon/>
          <span className="ml-2 font-semibold">{theater.name}</span>
        </div>
        <span className="text-lg">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4 border-t  bg-white shadow-md border-gray-300">
          <div className="flex gap-2">
            <div>Address: </div>
            <div className="flex flex-col gap-2">
              <p>{theater.address.street}</p>
              <p>{theater.address.city}</p>
              <p>{theater.address.state}</p>
              <p>{theater.address.country}</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="pt-2 pb-2 pl-5 pr-5 bg-green-600 rounded-md text-white"
              onClick={() => setOpenModal(true)}
            >
              Update
            </button>
            <button className="pt-2 pb-2 pl-5 pr-5 bg-red-600 rounded-md text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
            <TheaterModal theater={theater} buttonTitle = "Update Theater" title = "Update Theater" open={openModal} close={() => setOpenModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterDetails;
