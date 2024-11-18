import React, { useEffect, useState } from "react";
import Message from '../Message'
import BookingDetails from './BookingDetails'
import axiosInstance from "../../config/apiConfig";

const UserBookings = () => {

  const [bookings,setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try{
        const response = await axiosInstance.get("user/all-bookings");
        setBookings(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchBookings();
  },[]);

 
  return (
    <div className="flex gap-5 mt-10 flex-wrap">
      {
        bookings.length === 0 ? <Message>You Don't Have Any Bookings</Message> : bookings.map( booking => <BookingDetails booking={booking} /> )
      }
    </div>
  );
};

export default UserBookings;
