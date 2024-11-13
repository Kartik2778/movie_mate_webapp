import React, { useEffect, useState } from "react";
import MovieCart from "./MovieCart";
import { useSearchParams } from "react-router-dom";
import Message from "./Message";
import axios from "axios";
import axiosInstance from "../config/apiConfig";

const SearchResult = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [movies, setMovies] = useState([]);

  const [errorMovies, setErrorMovies] = useState({ message: "", flag: false });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get(
          `/public/movies/search?query=${query}`
        );
        setMovies(res.data);
        setErrorMovies({ message: "", flag: false });
      } catch (error) {
        setErrorMovies({ message: error.response.data, flag: true });
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="w-full flex justify-center mb-10 mt-10">
      {(errorMovies.flag || movies.length === 0 ) ? (
        <Message severity={"success"} >{errorMovies.message || "No Movie found"}</Message>
      ) : (
        <div className="w-[90%] flex flex-wrap gap-5">
          {movies.map((movie) => (
            <MovieCart key={movie.movie_id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
