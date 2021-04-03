import React, { useState, useEffect } from "react";
import { base_url } from "../utils/requests";
import Youtube from "react-youtube";

import "./movieExcerpt.css";

interface MovieExcerptProps {
  title: string;
  sidebarImg: string;
  year: string;
  producer: string;
  tagline: string;
  overview: string;
}
const movieTrailer = require("movie-trailer");
const MovieExcerpt: React.FC<MovieExcerptProps> = ({
  title,
  sidebarImg,
  year,
  producer,
  tagline,
  overview,
}) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  useEffect(() => {
    movieTrailer(title || "")
      .then((url: string) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        if (urlParams.get("v")) {
          setTrailerUrl(urlParams.get("v"));
        }
      })
      .catch((err: any) => {
      });
  }, [title]);
  return (
    <div className="movieExcerpts">
      <div className="movieExcerpts_sideBar">
        <div className="movieExcerpts_sideBarImgContainer">
          <img src={base_url + sidebarImg} alt="" />
        </div>
      </div>

      <div className="movieExcerpts_mainBar">
        <h1>{title}</h1>
        <p className="movieExcerpts_mainBar_yearDetails">
          <span>{year}</span>
          {"  "}
          <span className="movieExcerpts_mainBar_text">Produced By</span>
          {"  "}
          <span>{producer}</span>
        </p>
        <p
          className="movieExcerpts_mainBar_text"
          style={{ fontWeight: "bold" }}
        >
          {tagline}
        </p>
        <p style={{ lineHeight: "1.5" }}>{overview}</p>
        {trailerUrl && <Youtube videoId={trailerUrl} />}
      </div>
    </div>
  );
};

export default MovieExcerpt;
