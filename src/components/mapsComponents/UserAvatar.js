import React, {useContext} from 'react';
import authContext from "../context/authContext";
import './UserAvatar.css';

export default function UserAvatar() {
  const [{ username, email, url, userid }] = useContext(authContext);
  const toggleUserInfo = () => {
    const userInfo = document.querySelector('.user-info');
    if (userInfo.style.display === 'flex') {
      userInfo.style.display = 'none';
    } else {
      userInfo.style.display = 'flex';
    }
  }
  return (
    <div className="avatar-wrapper">
      <img
        className="avatar"
        src={url}
        alt={username}
        onClick={toggleUserInfo}
      />
      <div className="user-info">
        <img src={url} alt={username} />
        <p>{username}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};