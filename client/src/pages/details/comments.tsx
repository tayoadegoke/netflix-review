import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./comments.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import Login from "../../components/Login";
function Comments(props: any) {
  const { postId } = props;
  const [message, setMessage] = useState("");
  const [movieComments, setMovieComments] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  let userId = localStorage.getItem("loggedInUser");
  if (userId) {
    userId = JSON.parse(userId)._id;
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/comments/${postId}`)
      .then((response) => {
        setMovieComments(response.data);
      });
  }, [postId]);

  const postComment = () => {
    if (!message) {
      alert("cannot post empty comment");
    } else if (userId && message) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/comments`, {
          postId,
          userId,
          message,
        })
        .then(
          () => {
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      alert("You need to be logged in to post a comment");
      setOpen(true);
    }
  };

  return (
    <div className="comments">
      <h2>Comments {`(${movieComments.length})`}</h2>
      <div>
        {movieComments.map(
          (movieComment: {
            message: string;
            createdAt: Date;
            _id: string;
            user: String;
          }) => {
            return (
              <div className="comments_commentBox" key={movieComment._id}>
                <h3>{movieComment.user}</h3>{" "}
                <span>
                  posted: {new Date(movieComment.createdAt).toDateString()}
                </span>
                <p>{movieComment.message}</p>
              </div>
            );
          }
        )}
      </div>
      <div className="comments_commentInput">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          placeholder="add comment"
        ></textarea>
        <button onClick={() => postComment()}>Add Comment</button>
      </div>
      <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          id="container-signup"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Login setOpen={setOpen} open={open} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.push("/home")} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

export default Comments;
