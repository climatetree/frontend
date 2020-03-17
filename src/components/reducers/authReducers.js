export const initialAuthState = {
  isLoggedIn: false,
  username: "NA",
  email: "NA",
  url: "NA",
  userid: "NA",
  error: "",
  jwt: ""
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("userId", action.payload.userid);
      window.localStorage.setItem("JWT", action.payload.jwt);
      return {
        isLoggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
        url: action.payload.url,
        userid: action.payload.userid,
        error: "",
        jwt: action.payload.jwt
      };

    case "LOGIN_ERROR":
      localStorage.setItem("userId", action.payload.userid);
      localStorage.setItem("JWT", action.payload.jwt);
      return {
        isLoggedIn: false,
        username: "Loggedout error",
        email: "NA",
        url: "NA",
        userid: "NA",
        error: action.payload.error,
        jwt: action.payload.jwt
      };

    case "LOGOUT":
      localStorage.removeItem("userId");
      localStorage.removeItem("JWT");
      return {
        isLoggedIn: false,
        username: "Loggedout",
        email: "NA",
        url: "NA",
        userid: "NA",
        error: "",
        jwt: ""
      };
    default:
      return initialAuthState;
  }
};
