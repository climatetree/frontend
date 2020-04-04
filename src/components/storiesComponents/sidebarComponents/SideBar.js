import React, { useContext } from "react";

import AvatarStories from "./AvatarStories";
import StorySignIn from "./StorySignIn";
import { UserContext } from "../../context/UserContext";
import "./SideBar.css";

const AdvancedSearch = () => {
  const { user } = useContext(UserContext);
  const { isLoggedIn } = user;

  return (
    <div id="side-bar-container">
      <div id="side-bar-absolute">
        {!isLoggedIn && <StorySignIn />}
        {isLoggedIn && <AvatarStories />}
        {/* <h3 style={{ color: "#d9d9d9" }}>AdvancedSearch</h3> */}
      </div>
    </div>
  );
};

export default AdvancedSearch;
