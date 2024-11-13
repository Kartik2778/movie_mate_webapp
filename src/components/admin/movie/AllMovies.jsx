import React, { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieModal from "./MovieModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SET_MOVIES_ADMIN } from "../../../slices/admin/movies";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../../config/apiConfig";

const AllMovies = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies_admin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/all-movies"
        );
        dispatch(SET_MOVIES_ADMIN(response.data));
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
        <div className="flex flex-col m-5">
          <div className="flex flex-col">
            {movies.map((movie) => (
              <MovieDetails movie={movie} key={movie.movie_id} />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="pt-2 pb-2 pl-5 pr-5 bg-blue-700 rounded-md text-white"
              onClick={() => setOpen(true)}
            >
              New Movie
            </button>
            <MovieModal
              movie={null}
              title="Create New Movie"
              btnTitle = "New Movie"
              open={open}
              close={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllMovies;
