import React, { useState } from 'react';
import CloseIcon from "../../images/x.svg";
import "./HelpBtn.css"

const HelpBtn = () => {
    const [helpHidden, setHelpHidden] = useState(true);

    return (
        <>
            <button
                className="map-help-btn"
                onClick={() => setHelpHidden(prev => !prev)}
            >
                Search Tips
            </button>
            {!helpHidden && (
                <div className="help-content-container">
                    <div className="help-content">
                        <div
                            className="close-btn" 
                            onClick={() => setHelpHidden(true)}
                        >
                            <img src={CloseIcon} alt="close help" />
                            <p>Close Search Tips</p>
                        </div>
                        <p>
                            The ClimateTree&trade; Map search bar will find your place AND places similar to yours around the world. Type in the name of your Nation, State, County, or City into the box. Leave the words “county”, “state”, or “city” out of your search (e.g. Madison, not Madison County; Hawaii not State of Hawaii; New York, not New York City). Also, if you live in a smaller city next to a bigger city, use your county name (more local picture) or the bigger city name (more regional picture), not your smaller city name. Some places with special characters may not work in this release.
                        </p>
                        <p>
                            When you click on these similar places around the world you will be able to compare some of their population and carbon data with your own place. You will also be able to click "Stories' to see what Climate Change Solution Stories our database has about that place.
                        </p>
                        <p>
                            Default Seach: ClimateTree&trade; maps all places that are between 90% and 150% of the population of your place. For example if you live in a place with 100,000 people, ClimateTree&trade; will fetch any places with a population between 90,000 and 150,000. This range of similarity stretches higher than lower to account for anticipated population growth or in-migration.
                        </p>
                        <p>
                            Advanced Search: Feel free to customize your own notion of “similarity” with the Advanced Search features. You can use the checkboxes under "Type" to filter for Nations, States, Counties, or Urban Extents. For example, if you want to find big city climate change solutions, it may not be useful looking at nations or regions. The percentages for population and carbon work in the same manner as the Default Search, in that the percentages are in reference to the place you searched. Adjusting for 20% to 50% Carbon for example, will find places that have 20% to 50% the carbon emissions of your place.
                        </p>
                        <a className="map-help-link" href="/help/map">Learn More About ClimateTree&trade; Map</a>
                    </div>
                </div>
            )}
        </>
    );
}

export default HelpBtn;