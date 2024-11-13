import React from "react";
import Message from '../Message'
import BookingDetails from './BookingDetails'

const UserBookings = () => {
  const bookingsData = [
    {
      booking_id: 1,
      bookingDate: "2024-11-03T15:30:00",
      numberOfSeats: 3,
      totalPrice: 45.0,
      status: "Confirmed",
      movieShow: {
        theaterName: "Grand Cinema Theater",
        cinemaHallName: "Hall 1",
        address: {
          street: "123 Main St",
          city: "Metropolis",
          state: "NY",
        },
      },
      seats: [{ number: "A1" }, { number: "A2" }, { number: "A3" }],
    },
    {
      booking_id: 1,
      bookingDate: "2024-11-03T15:30:00",
      numberOfSeats: 3,
      totalPrice: 45.0,
      status: "Confirmed",
      movieShow: {
        theaterName: "Grand Cinema Theater",
        cinemaHallName: "Hall 1",
        address: {
          street: "123 Main St",
          city: "Metropolis",
          state: "NY",
        },
      },
      seats: [{ number: "A1" }, { number: "A2" }, { number: "A3" }],
    },
    {
      booking_id: 1,
      bookingDate: "2024-11-03T15:30:00",
      numberOfSeats: 3,
      totalPrice: 45.0,
      status: "Confirmed",
      movieShow: {
        theaterName: "Grand Cinema Theater",
        cinemaHallName: "Hall 1",
        address: {
          street: "123 Main St",
          city: "Metropolis",
          state: "NY",
        },
      },
      seats: [{ number: "A1" }, { number: "A2" }, { number: "A3" }],
    }
  ]

 

  return (
    <div className="flex gap-5 mt-10 flex-wrap">
      {
        bookingsData.length === 0 ? <Message>You Don't Have Any Bookings</Message> : bookingsData.map( booking => <BookingDetails booking={booking} /> )
      }
    </div>
  );
};

export default UserBookings;
