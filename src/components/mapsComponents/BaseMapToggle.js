import React, { useState, useEffect } from "react";
import "./BaseMapToggle.css";

export default function BaseMap({
    setBaseMap
}) {
   const handleOptionChange = (changeEvent) => {
        setBaseMap(changeEvent.target.value);
    }
      
    return (
        <div className="radio-wrapper">
            <span>Toggle Basemap</span>
            <span className="radio-input">
                <input type="radio" id="dark" name="basemap" value="dark" onChange={handleOptionChange} defaultChecked/>
                <label className="map-label">Dark</label>
            </span>
            <span className="radio-input">
                <input type="radio" id="natGeo" name="basemap" value="natGeo" onChange={handleOptionChange} />
                <label className="map-label">NatGeo</label>
            </span>
        </div>
    )
}