import { WebAuth } from 'auth0-js';
import { navigate } from '@reach/router';
import jwt_decode from 'jwt-decode';

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENTID,
  REACT_APP_AUTH0_REDIRECTURI
} = process.env;

const auth0 = new WebAuth({
  domain: REACT_APP_AUTH0_DOMAIN,
  clientID: REACT_APP_AUTH0_CLIENTID,
  redirectUri: REACT_APP_AUTH0_REDIRECTURI,
  // audience: `https://${process.env.REACT_APP_DOMAIN}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid profile'
});

export const login = () => {
  auth0.authorize();
};

const setSession = authResult => {
  // Set the time that the Access Token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
};

export const logout = () => {
  // Clear Access Token and ID Token from local storage
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  // navigate to the home route
  navigate('/');
};

export const handleAuthentication = () => {
  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.idToken) {
      setSession(authResult);
    } else if (err) {
      console.error(err);
    }
    navigate('/');
  });
};

export const isAuthenticated = () => {
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  const now = new Date().getTime();
  return now < expiresAt;
};

export const getUserData = () => {
  const idToken = localStorage.getItem('id_token');
  // we only really care about given_name, family_name, nickname, name, picture, gender, sub
  // and could destructure those jwt_decode(idToken) from here.
  return idToken ? jwt_decode(idToken) : null;
};
