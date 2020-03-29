<<<<<<< HEAD
import React, { useState, useContext } from "react";
import uuid from "react-uuid";
import authContext from "../context/authContext";
import { decodeToken } from "jsontokens";

import "../aboutComponents/AboutInfo";
=======
import React, { useContext } from "react";
import axios from "axios";
>>>>>>> 09ceb6e372714973de39e16b4de0fcc4dd616003
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { decodeToken } from "jsontokens";
import { UserContext } from "../context/UserContext";
import GoogleLogo from "../../images/google.svg";
import "./Login.css";
<<<<<<< HEAD
import axios from "axios";

const Login = () => {
  const [state, dispatch] = useContext(authContext);
  const { isLoggedIn } = state;
  const { username } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [jwt, setJwt] = useState("");
=======
>>>>>>> 09ceb6e372714973de39e16b4de0fcc4dd616003

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  async function setGoogleUser(response, data, options) {
    try {
      const res = await axios.post(
        'https://climatetree-api-gateway.azurewebsites.net/user/login',
        data,
        options
      );
      const jwt = res.data.jwtToken;
      const token = decodeToken(jwt);
      setUser({
        ...user,
        isLoggedIn: true,
        username: response.profileObj.name,
        email: response.profileObj.email,
        url: response.profileObj.imageUrl,
        userId: token.payload.userId,
        jwt,
        error: '',
      });
    } catch (error) {
      setUser({
        ...user,
        error,
      });
    }
  }
  const responseGoogle = (response) => {
    const data = {
      username: response.profileObj.name,
      email: response.profileObj.email,
    };
    const options = {
      headers: {
        Authorization: response.tokenId,
        "Content-Type": "application/json",
      },
    };
<<<<<<< HEAD

    dispatch({
      type: "LOGIN",
      payload: {
        username: response.profileObj.name,
        email: response.profileObj.email,
        url: response.profileObj.imageUrl,

        sw: axios
          .post(
            "https://climatetree-api-gateway.azurewebsites.net/user/login",
            data,
            options
          )
          .then(res => {
            window.localStorage.setItem("JWT", res.data.jwtToken);
            // var jwt = require("jsonwebtoken");
            const token = decodeToken(res.data.jwtToken);
            window.localStorage.setItem("userId", token.payload.userId);
            window.localStorage.setItem("userRole", token.payload.role);
          })
          .catch(err => {
            console.log("ERROR: ====", err);
          }),
        userid: window.localStorage.getItem("userId")
      }
    });
=======
    console.log("Google RESPONSE token==== : ", response.tokenId);
    setGoogleUser(response, data, options);
>>>>>>> 09ceb6e372714973de39e16b4de0fcc4dd616003
  };
  async function setFacebookUser(response, data, options) {
    try {
      const res = await axios.post(
        'https://climatetree-api-gateway.azurewebsites.net/user/login',
        data,
        options
      );
      const jwt = res.data.jwtToken;
      const token = decodeToken(jwt);
      setUser({
        ...user,
        isLoggedIn: true,
        username: response.name,
        email: response.email,
        url: response.picture.data.url,
        userId: token.payload.userId,
        jwt,
        error: '',
      });
    } catch (error) {
      setUser({
        ...user,
        error,
      });
    }
  }
  const responseFacebook = (response) => {
    const data = {
      username: response.name,
      email: response.email,
    };
    const options = {
      headers: {
        Authorization: response.signedRequest,
        "Content-Type": "application/json",
      },
    };
<<<<<<< HEAD

    console.log("response faceboookk ", response);
    dispatch({
      type: "LOGIN",
      payload: {
        username: response.name,
        email: response.email,
        url: response.picture.data.url,
        sw: axios
          .post(
            "https://climatetree-api-gateway.azurewebsites.net/user/login",
            data,
            options
          )
          .then(res => {
            window.localStorage.setItem("JWT", res.data.jwtToken);
            // var jwt = require("jsonwebtoken");
            const token = decodeToken(res.data.jwtToken);
            window.localStorage.setItem("userId", token.payload.userId);
            window.localStorage.setItem("userRole", token.payload.role);
          })
          .catch(err => {
            console.log("ERROR: ====", err);
          }),
        userid: window.localStorage.getItem("userId")
      }
    });
=======
    console.log("response facebook ", response);
    setFacebookUser(response, data, options);
>>>>>>> 09ceb6e372714973de39e16b4de0fcc4dd616003
  };

  const componentClicked = () => {
    console.log("Welcome!" + responseFacebook);
  };

  return (
    <div className="login-wrapper">
      <div className="social-login">
        <FacebookLogin
          appId="208267926889455"
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          cssClass="facebook-login-button"
          icon="fa-facebook"
        />
        <GoogleLogin
          clientId="69469445070-29f3osjc154mqn4ccdnt7rp354oge5va.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          icon={true}
          cookiePolicy={"single_host_origin"}
          render={renderProps => (
            <button
              className="google-login-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img src={GoogleLogo} alt="google g logo" />
              Login with Google
            </button>
          )}
        />
      </div>
    </div>
  );
}