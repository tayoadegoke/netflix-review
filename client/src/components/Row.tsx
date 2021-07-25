import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Row.css";
import { RowProps, initialMovieProps } from "../utils/types";
import { base_url } from "../utils/requests";
import instance from "../utils/axios";

const Row: FC<RowProps> = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([initialMovieProps]);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/*several row posters*/}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={(): void => history.push({pathname:`/movie/${movie?.id}`,state:{name:movie?.title || movie?.name || movie?.original_name}})}
            className={`row_poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
