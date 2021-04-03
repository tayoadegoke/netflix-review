import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import instance from "../utils/axios";
import { requests } from "../utils/requests";
import { initialMovieProps } from "../utils/types";
import "./banner.css";
import { IconButton } from "@material-ui/core";

interface Props {}

const Banner: FC = (props: Props) => {
  const {} = props;
  const history = useHistory();
  const [movie, setMovie] = useState(initialMovieProps);
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);

  /* to maintain the overflow for the description we are using overflow function below*/
  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {" "}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__button">
          <IconButton>
            <button
              className="banner__button"
              onClick={() => history.push({pathname:`/movie/${movie?.id}`,state:{name:movie?.title || movie?.name || movie?.original_name}})}
            >
              More
            </button>
          </IconButton>
          {/* <IconButton><button className = "banner__button">My List</button></IconButton>
           */}
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 100)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
