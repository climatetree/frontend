import React, { useContext } from "react";
import authContext from "../context/authContext";
import './Profile.css';

const Profile = () => {
  const [{ username, email, url, userid }] = useContext(authContext);
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="greeting">
          <p>Welcome</p>
          <p>{username}</p>
        </div>
        <img className="profile-image" src={url} alt={username} />
        <div className="profile-details">
          <p>Email: {email}</p>
          <p>You current user id is:</p>
          <p>{userid}</p>
        </div>
      </div>
      <div className="stories-wrapper">
        <div className="recommendations">
        </div>
        <div className="bookmarks"></div>
        <div className="posts"></div>
      </div>
    </div>
  );
};

export default Profile;
