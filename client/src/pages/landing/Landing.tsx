import React, { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./landing.css";
import logo from "../../assets/netflix-logo.png";
import Login from "../../components/Login";
interface LandingProps {}

const Landing: FC<LandingProps> = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  return (
    <div className="landing">
      <img
        className="landing__background "
        src="https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/6726f1e1-1e2e-4060-a57f-344a7bd4d59a/GB-en-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background-img"
      />

      <div className="landing__logo">
        <img className="landing__logo-img" src={logo} alt="background-img" />
      </div>
      <p
        className="landing__button"
        onClick={() => {
          setSigningIn(true);
          setSigningUp(false);
        }}
      >
        {" "}
        Sign In{" "}
      </p>

      {signingIn && !signingUp ? (
        <Login setOpen={setSigningIn} open={signingIn} />
      ) : signingUp && !signingIn ? (
        <Login setOpen={setSigningUp} open={signingIn} />
      ) : (
        <div className="landing__center-box">
          <h1 className="landing__center-box-message">
            Unlimited film trailers, reviews and more.
          </h1>
          <h2 className="landing__center-box-sub-message">
            Review movies and find out what's hot and what's not.
          </h2>
          <Link to="/home">
            <button className="landing__center-box-get-started-btn">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Landing;
