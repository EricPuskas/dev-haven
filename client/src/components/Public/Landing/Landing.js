import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="Landing">
      <div className="row ma0">
        <div className="col-xl-5 col-12 pad0 flex-center-col">
          <div className="Landing-container">
            <h1>
              <span>Welcome to </span>
              <span className="dev"> Dev </span>
              <span className="haven">Haven</span>
              <span>!</span>
            </h1>
            <h2>
              Create a developer profile or portfolio, share posts and get help
              from other developers.
            </h2>
            <p>
              <span className="dev"> Dev </span>
              <span className="haven">Haven</span> is an open community for
              anyone that codes. We help you get answers to your toughest coding
              questions, share knowledge with other developers, and find your
              next big opportunity.
            </p>
            <div className="Landing-btn-container">
              <Link
                to="/register"
                id="sign-up-btn"
                className="btn btn-standard"
              >
                {" "}
                Sign up for free
              </Link>
              <Link to="/login" id="log-in-btn" className="btn btn-standard">
                {" "}
                Log in
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-7 col-12 pad0">
          <div className="Landing-img-container">
            <img
              src="https://res.cloudinary.com/zenipsstudio/image/upload/v1564436660/connections2.png"
              alt="Connections"
              className="Landing-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
