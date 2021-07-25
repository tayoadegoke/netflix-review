import React, { FC, useEffect, useState } from "react";
import { useParams, useHistory, Link ,useLocation} from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { requests, base_url } from "../../utils/requests";
import "./movieDetails.css";
import MovieExcerpt from "../../components/MovieExcerpt";
import logo from "../../assets/netflix-logo.png";
import axios from "axios";
const MovieDetailProps = {
  name: "",
  poster_path: "",
  backdrop_path: "",
  id: "",
  title: "",
  original_name: "string",
  overview: "string",
  production_companies: [{ name: "string" }],
  tagline: "string",
  year: "number",
};

const MovieDetails: FC<any> = () => {
  const params: { id: string } = useParams();
  const history = useHistory();
  const location = useLocation<{name:string}>();
  const [movieDetails, setMovieDetails] = useState(MovieDetailProps);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  let username = localStorage.getItem("loggedInUser")
  if(username) username = JSON.parse(username).username


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests.fetchMovieById(params.id)).then((res)=>{
        setMovieDetails(res.data);
        if(location.state.name.toLowerCase() !== res.data.title.toLowerCase()){
          setOpen(true);
        }else{
        setLoading(false);
        }
      }).catch((err)=>{
        setOpen(true);
      });
      
      return request;
    }
    fetchData();
    if (!movieDetails.backdrop_path && !loading) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [params.id]);

  const logout = () => {
    localStorage.clear()
    history.push("/")
  }
  return (
    <div className="movie-details">
      <div className="movie-details__navlogo">
        <Link to="/home">
          <img
            className="movie-details__navlogoImg"
            src={logo}
            alt="background-img"
          />
        </Link>
      </div>

      <div className="movie-details__logout">
        {username &&
        <>
        <p style={{color:"white"}}>{username}</p>
        <button onClick={()=>logout()}>Logout</button>
        </>
        }
      </div>

      {loading ? (
        <div style={{ marginTop: "10%", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="movie-details_header">
            <img
              src={
                base_url +
                (movieDetails?.backdrop_path ?? movieDetails?.poster_path)
              }
              alt="movie header"
            ></img>
          </div>
          <div className="movie-details_header--fade"></div>
          <MovieExcerpt
            title={movieDetails.title}
            overview={movieDetails.overview}
            sidebarImg={movieDetails.poster_path}
            producer={movieDetails?.production_companies?.[0]?.name}
            tagline={movieDetails.tagline}
            year={movieDetails.year}
            postId={params.id}
          />
        </>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Movie Resource Not Found"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sorry the requested movie is no longer available. Clicking ok will
            redirect you to the home page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push("/home")} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieDetails;
