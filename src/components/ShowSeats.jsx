import { CircularProgress, Divider } from "@mui/material";
import Seat from "./Seat";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../config/apiConfig";

const ShowSeats = () => {
  const { id: showId } = useParams("id");
  const [seats, setSeats] = useState([]);
  const [seatDetails,setSeatDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axiosInstance.get(
          `/user/${showId}/show-seats`
        );
        setSeats(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchSeatDetails = async () => {
        try {
            const res = await axiosInstance.get(
              `/user/${showId}/show-seat-details`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setSeatDetails(res.data);
          } catch (error) {
            console.log(error);
          }
    }
    fetchSeatDetails();
    fetchSeats();
  }, [showId]);

  useEffect(()=> {
    
  })

  let selectedSeats = [];

  const getSelectedSeats = (seat) => {
    let res = selectedSeats.indexOf(seat.id);
    if (res == -1) {
      selectedSeats.push(seat);
    } else {
      selectedSeats = selectedSeats.filter((seat) => seat.id != seat.id);
    }
  };

  const handleBooking = () => {
    console.log(selectedSeats);
  };

  const regularSeats = seats.slice(0,seatDetails.noOfRegularSeats);
  const premiumSeats = seats.slice(seatDetails.noOfRegularSeats,seatDetails.noOfRegularSeats+seatDetails.noOfPremiumSeats);
  const vipSeats = seats.slice(seatDetails.noOfRegularSeats+seatDetails.noOfPremiumSeats, seatDetails.noOfRegularSeats+seatDetails.noOfPremiumSeats+seatDetails.noOfVipSeats);
  
  return (
    <>
      {loading ? (
        <div className="flex w-full min-h-screen justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full min-h-screen pt-5 mb-10">
          <div className="flex justify-center text-2xl font-semibold">
            Select Seats
          </div>
          <div className="pl-5 flex gap-10">
            <div className="flex flex-col">
              <button className="w-7 h-7 bg-green-600"></button>
              <div>Selected</div>
            </div>
            <div className="flex flex-col">
              <button className="w-7 h-7 bg-gray-200"></button>
              <div>Occupied</div>
            </div>
          </div>
          <div className="mt-10 flex justify-center text-2xl">Screen</div>
          <div className="mt-10">
            <Divider />
            <div className="pl-5">
              <strong>Regular Seats</strong>
              <span> ₹{seatDetails.regularSeatPrice}</span>
            </div>
            <div className="w-[60%] flex flex-wrap gap-5 ml-[20%] mr-[20%]">
              {regularSeats.map((seat) => (
                <Seat getId = {getSelectedSeats} seat = {seat} key={seat.id} />
              ))}
            </div>
          </div>
          <div className="mt-10">
            <Divider />
            <div className="pl-5">
              <strong>Premium Seat </strong>
              <span> ₹{seatDetails.premiumSeatPrice}</span>
            </div>
            <div className="w-[60%] flex flex-wrap gap-5 ml-[20%] mr-[20%]">
            {premiumSeats.map((seat) => (
                <Seat getId={getSelectedSeats} seat = {seat} key={seat.id} />
              ))}
            </div>
          </div>
          <div className="mt-10">
            <Divider />
            <div className="pl-5">
              <strong>VIP Seat </strong>
              <span> ₹{seatDetails.vipSeatPrice}</span>
            </div>
            <div className="w-[60%] flex flex-wrap gap-5 ml-[20%] mr-[20%]">
            {vipSeats.map((seat) => (
                <Seat getId={getSelectedSeats} seat = {seat} key={seat.id} />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="pl-5 pr-5 pt-2 pb-2 rounded-md outline outline-green-600 text-green-600"
              onClick={handleBooking}
            >
              Book
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowSeats;
