import React, { useState } from "react";
import "./CurrentSearchNotification.css";

const CurrentSearchNotification = ({
    searchMessage
  }) => {
      const [displayMessage, setDisplayMessage] = useState(false);
      const switchDisplay = () => {
        if (searchMessage.length > 0) {
            setDisplayMessage(!displayMessage);
        }
      }
      return (
          <div>
          <span onClick={switchDisplay} className="currentDetailsContainer">Current Search Details</span>
          {displayMessage
            ?  <div className="searchMessageContainer message">
                    <span className="searchMessage">{searchMessage}</span>
               </div>
            : null
          }
         
          </div>
      )
  }

  export default CurrentSearchNotification;