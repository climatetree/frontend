import React, { useContext } from "react";

import AvatarStories from "./AvatarStories";
import StorySignIn from "./StorySignIn";
import AdvancedSearch from "./AdvancedSearch";
import { UserContext } from "../../context/UserContext";
import CloseIcon from "../../../images/x.svg";
import "./SideBar.css";

const SideBar = ({
  generalSearchTerm,
  setGeneralSearchTerm,
  sideBarVisible,
  windowWidth,
  closeSideBar,
  setStoriesBasedOnFilter,
  loadSpinner,
  setClickFilter,
}) => {
  const { user } = useContext(UserContext);
  const { isLoggedIn } = user;

  return (
    <div
      id="side-bar-container"
      className={`${
        sideBarVisible
          ? "when-filter-is-clicked make-z-index-one unhide-sidebar"
          : ""
      } ${windowWidth > 950 && !loadSpinner ? "make-z-index-one" : ""} ${
        !sideBarVisible && windowWidth < 950 ? "not-apparent" : ""
      }`}
      onClick={closeSideBar}
    >
      <div id="side-bar-absolute" onClick={(event) => event.stopPropagation()}>
        <div id="close-filters-container" onClick={closeSideBar}>
          {sideBarVisible && (
            <img src={CloseIcon} className="close-icon" alt="close filters" />
          )}
        </div>
        {!isLoggedIn && <StorySignIn />}
        {isLoggedIn && <AvatarStories />}
        <AdvancedSearch
          generalSearchTerm={generalSearchTerm}
          setGeneralSearchTerm={setGeneralSearchTerm}
          sideBarVisible={sideBarVisible}
          windowWidth={windowWidth}
          closeSideBar={closeSideBar}
          setStoriesBasedOnFilter={setStoriesBasedOnFilter}
          loadSpinner={loadSpinner}
          setClickFilter={setClickFilter}
        />
      </div>
    </div>
  );
};

export default SideBar;
