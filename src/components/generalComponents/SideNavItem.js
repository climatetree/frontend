import React from "react";

import "./SideNavItem.css";

const SideNavItem = (props) => {
  return <div className="help-sidenav-item">{props.children}</div>;
};

export default SideNavItem;
