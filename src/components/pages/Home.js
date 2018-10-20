import React, { Component } from 'react';
import { logout, getUserData } from '../../services/auth';
// import Json from '../common/Json';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null, err: null };
  }

  handleClick = e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, err: err.message });
      });
  };

  render() {
    const user = getUserData();
    // user.sub is the userID for auth0
    // console.log(user);
    const { loading, msg, err } = this.state;
    return (
      <div>
        <p>
          <button onClick={this.handleClick}>
            {loading ? 'Loading...' : 'Call Lambda'}
          </button>
          <br />
          <span>{msg}</span>
          <span>{err}</span>
        </p>
        <h2>Hello {user.given_name}!</h2>
        <img
          alt="profile"
          src={user.picture}
          style={{ height: '100px', width: '100px', borderRadius: '50%' }}
        />
        <br />
        <button onClick={() => logout()}>Log out</button>
      </div>
    );
  }
}
