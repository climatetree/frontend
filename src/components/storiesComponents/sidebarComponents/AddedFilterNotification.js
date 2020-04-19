import React from "react";

import "./AddedFilterNotification.css";

const AddedFilterNotification = ({ filterValue }) => {
  return (
    <div id="added-notification-container">
      <div className="added-notification">{filterValue} is added</div>
    </div>
  );
};

export default AddedFilterNotification;
