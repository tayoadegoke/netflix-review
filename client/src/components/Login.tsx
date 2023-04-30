import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../pages/landing/landing.css";
interface Props {
  setOpen: any;
  open: boolean;
}

function Login(props: Props) {
  const history = useHistory();
  const { setOpen, open } = props;
  const [signingIn, setSigningIn] = useState(open);
  const [signingUp, setSigningUp] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    username: "",
  });
  const login = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/login`, {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then(
        (response) => {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data.result)
          );
          if (window.location.pathname === "/") history.push("/home");
          else window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const register = () => {
    const { email } = loginDetails;
    function ValidateEmail(email: string) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return true;
      }
      return false;
    }
    if (ValidateEmail(email)) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/users/register`, {
          email: loginDetails.email,
          password: loginDetails.password,
          username: loginDetails.username,
          confirmPassword: loginDetails.password,
        })
        .then(
          (response) => {
            console.log(response);
            localStorage.setItem(
              "loggedInUser",
              JSON.stringify(response.data.result)
            );
            if (window.location.pathname === "/") history.push("/home");
            else window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      alert("enter valid email");
    }
  };
  return signingIn ? (
    <div className="landing__signIn-box">
      <p className="landing__signIn-box-close" onClick={() => setOpen(false)}>
        X
      </p>
      <h1>Sign In</h1>
      <form className="landing__signIn-box-form" noValidate autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Email")}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              email: e.target.value,
            });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Password")}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              password: e.target.value,
            });
          }}
        />
      </form>
      <button
        className="landing__signIn-btn"
        type="button"
        onClick={() => {
          login();
        }}
      >
        Sign In
      </button>
      <p className="landing__signUpText">
        Don't Have an account?{" "}
        <span
          onClick={() => {
            setSigningUp(true);
            setSigningIn(false);
          }}
        >
          {" "}
          Sign Up
        </span>
      </p>
    </div>
  ) : (
    <div className="landing__signIn-box">
      <p
        className="landing__signIn-box-close"
        onClick={() => {
          setOpen(false);
        }}
      >
        X
      </p>
      <h1>Sign Up</h1>
      <form className="landing__signIn-box-form" noValidate autoComplete="off">
        <input
          type="text"
          placeholder="Name"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Username")}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              username: e.target.value,
            });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Email")}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              email: e.target.value,
            });
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Password")}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              password: e.target.value,
            });
          }}
        />
      </form>
      <button
        className="landing__signIn-btn"
        type="button"
        onClick={() => {
          register();
        }}
      >
        Sign Up
      </button>
      <p className="landing__signUpText">
        Have an account?{" "}
        <span
          onClick={() => {
            setSigningIn(true);
            setSigningUp(false);
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Login;
