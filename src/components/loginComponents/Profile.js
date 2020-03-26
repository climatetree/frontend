import React, { useContext, useEffect } from "react";
import Can from "./Can";
import authContext from "../context/authContext";
import "./Profile.css";

const Profile = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  const [{ username, email, url, userid }] = useContext(authContext);
  const [role] = localStorage.getItem("userRole");
  useEffect(() => {
    window.localStorage.setItem("userRole", role);
  });

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
          <p>You current user role is:</p>
          <p>{role}</p>
          <Can
            role={role}
            perform="posts:view"
            yes={() => <h2>User can do it</h2>}
            no={() => <h2>User can't do it</h2>}
          />
        </div>
      </div>
      <div className="stories-wrapper">
        <div className="recommendations"></div>
        <div className="bookmarks"></div>
        <div className="posts"></div>
      </div>
    </div>
  );
};

export default Profile;
