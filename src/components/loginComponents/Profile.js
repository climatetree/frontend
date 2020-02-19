import React, { useContext } from "react";

import Nav from "../Nav";
import authContext from "../context/authContext";

const Profile = () => {
  const [{ username, email, url, userid }] = useContext(authContext);
  return (
    <div>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <h3>
        {" "}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;You
        are on the PROFILE tab
      </h3>
      <p> Welcome {username}</p>
      <img src={url} alt={username} />
      <p> Email : {email}</p>
      <p>You current user id is : {userid}</p>
    </div>
  );
};

export default Profile;
