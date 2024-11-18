import React from 'react';

const BookingDetails = ({ booking }) => {
  const {
    booking_id,
    bookingDate,
    numberOfSeats,
    totalPrice,
    status,
    movieShow,
    seats,
  } = booking;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-fit h-fit">
      <h2 className="text-xl font-semibold mb-2">Booking ID: {booking_id}</h2>

      <p className="mb-2">
        <strong>Booking Date:</strong> {new Date(bookingDate).toLocaleString()}
      </p>

      <p className="mb-2">
        <strong>Number of Seats:</strong> {numberOfSeats}
      </p>

      <p className="mb-2">
        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      </p>

      <p className="mb-2">
        <strong>Status:</strong> {status}
      </p>

      {/* Movie Show Details */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Movie Show Details</h3>
      <p className="mb-1">
        <strong>Theater:</strong> {movieShow.cinemaHall.theater.name}
      </p>
      <p className="mb-1">
        <strong>Cinema Hall:</strong> {movieShow.cinemaHall.name}
      </p>
      <p className="mb-1">
        <strong>Show Date:</strong> {movieShow.showDate}
      </p>
      <p className="mb-1">
        <strong>Timing:</strong> {movieShow.startTime}
      </p>
      <p className="mb-1">
        <strong>Address:</strong> {movieShow.cinemaHall.theater.address.street}, {movieShow.cinemaHall.theater.address.city}, {movieShow.cinemaHall.theater.address.state}
      </p>

      {/* Seat Numbers */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Seat Numbers</h3>
      <ul className="list-disc list-inside">
        {seats.map((seat, index) => (
          <li key={index}>{seat.seatNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookingDetails;
