import React, { useContext } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { decodeToken } from "jsontokens";
import { UserContext } from "../context/UserContext";
import GoogleLogo from "../../images/google.svg";
import "./Login.css";

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  async function setGoogleUser(response, data, options) {
    try {
      const res = await axios.post(
        "https://climatetree-api-gateway.azurewebsites.net/user/login",
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
        error: ""
      });
    } catch (error) {
      setUser({
        ...user,
        error
      });
    }
  }
  const responseGoogle = response => {
    const data = {
      username: response.profileObj.name,
      email: response.profileObj.email
    };
    const options = {
      headers: {
        Authorization: response.tokenId,
        "Content-Type": "application/json"
      }
    };
    console.log("Google RESPONSE token==== : ", response.tokenId);
    setGoogleUser(response, data, options);
  };
  async function setFacebookUser(response, data, options) {
    try {
      const res = await axios.post(
        "https://climatetree-api-gateway.azurewebsites.net/user/login",
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
        error: ""
      });
    } catch (error) {
      setUser({
        ...user,
        error
      });
    }
  }
  const responseFacebook = response => {
    const data = {
      username: response.name,
      email: response.email
    };
    const options = {
      headers: {
        Authorization: response.signedRequest,
        "Content-Type": "application/json"
      }
    };
    console.log("response facebook ", response);
    setFacebookUser(response, data, options);
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
