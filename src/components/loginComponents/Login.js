/**
 * Login module. 
 * A user can only login with Facebook or Google. 
 * There is no 'register' button, only a 'login' button.
 * If the user does not exits (based on the Facebook or Google email) then create a new account. 
 * Else, retrieve the user informations.
 */
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
        role: token.payload.role,
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
        role: token.payload.role,
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
          appId="149701679676715"
          fields="name,email,picture"
          disableMobileRedirect={true}
          onClick={componentClicked}
          callback={responseFacebook}
          cssClass="facebook-login-button"
          icon="fa-facebook"
        />
        <GoogleLogin
          clientId="373284097627-clfol175dg7a585n7i9jpif4ggjquhef.apps.googleusercontent.com"
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
