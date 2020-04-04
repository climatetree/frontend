import React, { useContext } from "react";

import AvatarStories from "./AvatarStories";
import StorySignIn from "./StorySignIn";
import AdvancedSearch from "./AdvancedSearch";
import { UserContext } from "../../context/UserContext";
import "./SideBar.css";

const SideBar = () => {
  const { user } = useContext(UserContext);
  const { isLoggedIn } = user;

  return (
    <div id="side-bar-container">
      <div id="side-bar-absolute">
        {!isLoggedIn && <StorySignIn />}
        {isLoggedIn && <AvatarStories />}
        <AdvancedSearch />
      </div>
    </div>
  );
};

export default SideBar;
