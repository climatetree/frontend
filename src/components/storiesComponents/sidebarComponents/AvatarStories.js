import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import "./AvatarStories.css";

const AvatarStories = () => {
  const { user } = useContext(UserContext);
  const { url, username, email } = user;

  // console.log(user);

  return (
    <div id="avatar-stories-container">
      <img src={url} alt={url} id="avatar-story" />
      <div id="user-info">
        <div id="user-name-container">
          <Link id="user-name" to="/login">
            {username}
          </Link>
        </div>
        <div id="user-email">
          <span>{email}</span>
        </div>
        {/* <div>
          <button id="view-profile">View Profile</button>
        </div> */}
      </div>
    </div>
  );
};

export default AvatarStories;
