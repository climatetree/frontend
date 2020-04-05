/**
 * This Context component is used create a user object and manage the global state of a given user accross the applation
 * jwt = Json Web Token which is part of our authentication
 * The user-service back-end generates a JWT token for a given user (unique). Then, pass this JWT token to the frontend, and then our frontend can send this token alongside requests to access protected API route.
 * Roles map:
 * 1 -> basicUserRule
 * 2 -> normalUserRule
 * 3 -> moderatorUserRule
 * 4 -> adminUserRole
 */
import React, { useEffect, useState } from "react";

const initUserState = {
  isLoggedIn: false,
  username: "NA",
  email: "NA",
  url: "NA",
  userId: "NA",
  error: "",
  jwt: "",
  role: 4
};

// user informations will be stored in the local storage of the client browser in order to keep the user logged in after a page refresh
const localState = JSON.parse(sessionStorage.getItem("user"));
const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState(localState || initUserState);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
