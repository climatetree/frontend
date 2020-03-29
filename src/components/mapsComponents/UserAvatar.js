import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './UserAvatar.css';

export default function UserAvatar() {
  const { user } = useContext(UserContext);
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
        src={user.url}
        alt={user.username}
        onClick={toggleUserInfo}
      />
      <div className="user-info">
        <img src={user.url} alt={user.username} />
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}