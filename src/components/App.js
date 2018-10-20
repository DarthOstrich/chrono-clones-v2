import React, { Component } from 'react';
import { Router } from '@reach/router';
import Callback from './Callback';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

// import { isAuthenticated } from '../services/auth';

export default class App extends Component {
  render() {
    return (
      <Router>
        <LandingPage path="/" />
        <Home path="dashboard" />
        <Callback path="callback" />
      </Router>
    );
  }
}
