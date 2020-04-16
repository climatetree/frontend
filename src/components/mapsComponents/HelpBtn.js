import React, { useState } from 'react';
import CloseIcon from "../../images/x.svg";
import "./HelpBtn.css"

const HelpBtn = () => {
    const [helpHidden, setHelpHidden] = useState(true);

    return (
        <div className="map-help-container">
            <button
                className="map-help-btn"
                onClick={() => setHelpHidden(prev => !prev)}
            >
                Help
            </button>
            {!helpHidden && (
                <div className="help-content-container">
                    <div className="help-content">
                        <div className="close-btn">
                            <img
                                src={CloseIcon}
                                alt="close help"
                                onClick={() => setHelpHidden(true)}
                            />
                        </div>
                        <p>
                            The ClimateTree™ Map feature allows you to find places like yours around the world to explore what they are doing about climate change. When you search for a place you will be shown a number of places around the world that are similar based on our default search parameters.
                        </p>
                        <p>
                            For default searches, ClimateTree maps all places that are between 90% and 150% of the population of your place. For example if you live in a place with 100,000 people, ClimateTree will fetch any places with a population between 90,000 and 150,000. This range of similarity stretches higher than lower to account for anticipated population growth or in-migration. Feel free to customize your own notion of “similarity” with the Advanced Search features.
                        </p>
                        <p>
                            The search bar will find places similar to yours around the world. Type in the name of your Nation, State, County, or City into the box. Leave the words “county”, “state”, or “city” out of your search (e.g. Madison, not Madison County; Hawaii not State of Hawaii; New York, not New York City). Also, if you live in a smaller city next to a bigger city,  use your county name (more local picture) or the bigger city name (more regional picture), not your smaller city name. This is because our cities are really “urban regions” and not strict city boundaries. Note that some places with special characters may not work in this release.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HelpBtn;