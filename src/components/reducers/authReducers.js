export const initialAuthState = {
  isLoggedIn: false,
  username: "NA",
  email: "NA",
  url: "NA",
  userid: "NA",
  error: ""
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
        url: action.payload.url,
        userid: action.payload.userid,
        error: ""
      };
    case "LOGIN_ERROR":
      return {
        isLoggedIn: false,
        username: "Loggedout error",
        email: "NA",
        url: "NA",
        userid: "NA",
        error: action.payload.error
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
        username: "Loggedout",
        email: "NA",
        url: "NA",
        userid: "NA",
        error: ""
      };
    default:
      return initialAuthState;
  }
};
