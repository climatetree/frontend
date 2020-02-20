import React, { useContext } from "react";
import Nav from "./Nav";
import LoginData from "./loginComponents/LoginData";
import authContext from "./context/authContext";
import Profile from "./loginComponents/Profile";

const Login = () => {
  const [{ isLoggedIn }] = useContext(authContext);
  return (
    <div>
      <Nav />
      {isLoggedIn ? <Profile /> : <LoginData />}
    </div>
  );
};

export default Login;
