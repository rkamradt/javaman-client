import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Screen from './components/screen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
  >
    <Router>
      <Route path="/" exact component={Screen} />
    </Router>
  </Auth0Provider>,
  document.getElementById('screen')
);
