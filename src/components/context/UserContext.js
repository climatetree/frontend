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
