import React from "react";
import { Link } from "react-router-dom";

import "./StorySignIn.css";

const StorySignIn = () => {
  return (
    <div id="sign-in-container">
      Want to share thoughts on our stories?
      <div id="sign-in-btn-container">
        <Link id="sign-in-btn" to="/login">
          Please sign in
        </Link>
      </div>
      <hr id="sign-in-hr"></hr>
    </div>
  );
};

export default StorySignIn;
