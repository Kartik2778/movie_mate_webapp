import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NEW_MOVIE_SHOW_CREATED_ADMIN } from "../../../slices/admin/movie_show";
import Message from "../../Message";
import axiosInstance from "../../../config/apiConfig";

const MovieShowModal = ({ cinemaHallId, open, close }) => {
  const movieNameRef = useRef();
  const showDateRef = useRef();
  const startTimeRef = useRef();
  const languageRef = useRef();
  const screenTypeRef = useRef();
  const regualrSeatPrice = useRef();
  const premiumSeatPrice = useRef();
  const vipSeatPrice = useRef();

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState({
    message: "",
    flag: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collecting values from refs
    const movieShowData = {
      showDate: showDateRef.current.value,
      startTime: startTimeRef.current.value,
      language: languageRef.current.value,
      screenType: screenTypeRef.current.value,
      regularSeatPrice: regualrSeatPrice.current.value,
      premiumSeatPrice: premiumSeatPrice.current.value,
      vipSeatPrice: vipSeatPrice.current.value,
      movieName: movieNameRef.current.value,
    };

    try {
      const res = await axiosInstance.post(
        `/admin/${cinemaHallId}/create-movie-show`,
        movieShowData
      );

      dispatch(NEW_MOVIE_SHOW_CREATED_ADMIN(res.data)); // dispatch action to Redux
      setErrorMessage({ message: "", flag: false }); // reset error message
      close(); // close the modal
      // Optionally, clear the form inputs (e.g., refs could be reset here)
    } catch (error) {
      setErrorMessage({ message: error.response?.data || "Something went wrong", flag: true });
      console.error("Error creating movie show:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "visible opacity-100 bg-black/20" : "invisible opacity-0"
      }`}
    >
      <div className="bg-slate-700 p-6 rounded-lg shadow-lg w-1/2">
        <button
          type="button"
          className="float-right text-white hover:text-gray-100"
          onClick={close}
        >
          &times;
        </button>
        <h2 className="text-xl text-white font-bold mb-4">Create New Movie Show</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-white">Movie Name</label>
            <input
              type="text"
              ref={movieNameRef}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>
          <div>
            <label className="text-white">Show Date</label>
            <input
              type="date"
              ref={showDateRef}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div className="flex gap-5">
            <label className="text-white">Start Time: </label>
            <input
              type="time"
              ref={startTimeRef}
              required
              className="mb-2 p-2 rounded-sm"
            />
          </div>

          <div className="flex gap-5">
            <label className="text-white">Screen Type: </label>
            <input
              type="text"
              ref={screenTypeRef}
              required
              className="mb-2 p-2 rounded-sm"
            />
          </div>

          <div className="flex gap-5">
            <label className="text-white">Language: </label>
            <input
              type="text"
              ref={languageRef}
              required
              className="mb-2 p-2 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <label className="text-white">Seat Price: </label>
            </div>
            <div className="flex justify-between">
              <input
                type="number"
                ref={regualrSeatPrice}
                placeholder="Regular"
                required
                className="mb-2 p-2 rounded-sm"
              />
              <input
                type="number"
                ref={premiumSeatPrice}
                placeholder="Premium"
                required
                className="mb-2 p-2 rounded-sm"
              />
              <input
                type="number"
                ref={vipSeatPrice}
                placeholder="VIP"
                required
                className="mb-2 p-2 rounded-sm"
              />
            </div>
          </div>

          {errorMessage.flag && <Message severity="error">{errorMessage.message}</Message>}

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create New Movie Show
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieShowModal;
