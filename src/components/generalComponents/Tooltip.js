import React from 'react';
import whiteInfoIcon from '../../images/info.white.svg';
import blackInfoIcon from '../../images/info.black.svg';
import './Tooltip.css';

export default function Tooltip({
  dark,
  description,
}) {
  return (
    <div className="tooltip">
      <img
        src={dark ? blackInfoIcon : whiteInfoIcon}
        alt="info"
      />
      <p className={`tooltip-text${dark ? ' dark' : ''}`}>{description}</p>
    </div>
  );
}