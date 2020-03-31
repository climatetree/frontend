import React, { useContext } from "react";
import Nav from "./Nav";
import Login from "./loginComponents/Login";
import Profile from "./loginComponents/Profile";
import { UserContext } from "./context/UserContext";

const LoginPage = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Nav />
      {user.isLoggedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default LoginPage;