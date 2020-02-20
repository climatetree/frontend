import React, { useState, useContext } from "react";
import uuid from "react-uuid";
import authContext from "../context/authContext";

import "../aboutComponents/AboutInfo";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const LoginData = () => {
  const [state, dispatch] = useContext(authContext);
  const { isLoggedIn } = state;
  const { username } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const responseGoogle = response => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);

    dispatch({
      type: "LOGIN",
      payload: {
        username: response.profileObj.name,
        email: response.profileObj.email,
        url: response.profileObj.imageUrl,
        userid: uuid()
      }
    });
  };

  const responseFacebook = response => {
    setName(response.name);
    setEmail(response.email);
    setUrl(response.picture.data.url);
    dispatch({
      type: "LOGIN",
      payload: {
        username: response.name,
        email: response.email,
        url: response.picture.data.url,
        userid: uuid()
      }
    });
  };

  const componentClicked = () => {
    console.log("Welcome!" + responseFacebook);
  };

  return (
    <div justify-content="center">
      {!isLoggedIn ? (
        <div>
          <br />
          <br />
          <br />
          <br />
          <FacebookLogin
            appId="208267926889455"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook"
          />
          <h4>-------------------------</h4>

          <GoogleLogin
            clientId="17873037182-efko5kkjp7b07dlo5fi7vsrt654rpl0q.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <br />
          <h4> Welcome : {username} </h4>
          <h4> Email : {email} </h4>
          <img src={url} alt={name} />
        </div>
      )}
    </div>
  );
};

export default LoginData;
