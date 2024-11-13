import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { NEW_MOVIE_CREATED_ADMIN, UPDATE_MOVIES_ADMIN } from "../../../slices/admin/movies";

const MovieModal = ({ title, btnTitle, movie, open, close }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [photo, setPhoto] = useState("");
  const [languages, setLanguages] = useState("");
  const [type, setType] = useState("");

  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (title === "Update Movie" && movie) {
      setMovieTitle(movie.title);
      setDescription(movie.description);
      setReleaseDate(movie.releaseDate);
      setDuration(movie.duration);
      setPhoto(movie.photo);
      setLanguages(movie.languages.join(" "));
      setType(movie.type);
    }
  }, [title, movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title: movieTitle,
      description,
      releaseDate,
      duration,
      photo,
      languages: languages.split(" "),
      type,
    };

    try {
      if (title === "Create New Movie") {
        const response = await axios.post("http://localhost:8085/admin/create-movie", movieData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(NEW_MOVIE_CREATED_ADMIN(response.data));
        console.log("Movie created:", response.data);
      } else {
        const response = await axios.put(`http://localhost:8085/admin/${movie.movie_id}/update-movie`, movieData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(UPDATE_MOVIES_ADMIN(response.data));
        console.log("Movie updated:", response.data);
      }
      close();
    } catch (error) {
      console.error("Error managing movie:", error);
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
        <h2 className="text-xl text-white font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-white">Title:</label>
            <input
              type="text"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white">Release Date:</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white">Duration:</label>
            <input
              type="time"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white">Photo URL:</label>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white">Languages:</label>
            <input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white">Type:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {btnTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
