import React, { useContext } from "react";
import Nav from "./Nav";
import Login from "./loginComponents/Login";
import authContext from "./context/authContext";
import Profile from "./loginComponents/Profile";

const LoginPage = () => {
  const [{ isLoggedIn }] = useContext(authContext);
  return (
    <div>
      <Nav />
      {isLoggedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default LoginPage;
