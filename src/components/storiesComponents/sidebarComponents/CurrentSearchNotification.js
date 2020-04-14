import React, { useState } from "react";
import "./CurrentSearchNotification.css";

const CurrentSearchNotification = ({
    searchMessage
  }) => {
      const [displayMessage, setDisplayMessage] = useState(false);
      const switchDisplay = () => {
        setDisplayMessage(!displayMessage);
      }
      return (
          <div>
          <span onClick={switchDisplay} className="currentDetailsContainer">Current Search Details</span>
          {displayMessage
            ?  <div className="searchMessageContainer message">
                    <span className="searchMessage">{searchMessage}</span>
               </div>
            : ""
          }
         
          </div>
      )
  }

  export default CurrentSearchNotification;