import React, { useContext } from "react";

import AvatarStories from "./AvatarStories";
import StorySignIn from "./StorySignIn";
import AdvancedSearch from "./AdvancedSearch";
import { UserContext } from "../../context/UserContext";
import CloseIcon from "../../../images/x.svg";
import "./SideBar.css";

const SideBar = ({ sideBarVisible, windowWidth, closeSideBar }) => {
  const { user } = useContext(UserContext);
  const { isLoggedIn } = user;

  return (
    <div
      id="side-bar-container"
      className={`${
        sideBarVisible ? "when-filter-is-clicked make-z-index-one" : ""
      } ${windowWidth > 950 ? "make-z-index-one" : ""} ${
        !sideBarVisible && windowWidth < 950 ? "not-apparent" : ""
      }`}
      onClick={closeSideBar}
    >
      <div id="side-bar-absolute" onClick={(event) => event.stopPropagation()}>
        {/* <div>
          <img src={CloseIcon} alt="close filters" />
        </div> */}
        {!isLoggedIn && <StorySignIn />}
        {isLoggedIn && <AvatarStories />}
        <AdvancedSearch
          sideBarVisible={sideBarVisible}
          windowWidth={windowWidth}
          closeSideBar={closeSideBar}
        />
      </div>
    </div>
  );
};

export default SideBar;
