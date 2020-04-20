import React from "react";

import "./SideNav.css";

const SideNav = (props) => {
  return <div className="help-sidebar">{props.children}</div>;
};

export default SideNav;
