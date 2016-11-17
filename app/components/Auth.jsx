import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Auth extends Component {
  constructor(props) {
    super(props);
  }

  setToken(token) {
    this.props.route.store.setToken(token);
  }

  saveToken(token) {
    this.props.route.store.saveToken(token);
  }

  toggleLoggedIn() {
    this.props.route.store.toggleLoggedIn();
  }

  saveLoggedIn(loggedIn) {
    this.props.route.store.saveLoggedIn(loggedIn);
  }

  componentDidMount() {
    if(localStorage.getItem('userToken') === '' || 'undefined') {
      const code = window.location.href.match(/\?code=(.*)/)[1];
      fetch(`http://localhost:9999/authenticate/${code}`).then((response) => {
        return response.json();
      }).then((json) => {
        return json.token
      }).then((token) => {
        this.setToken(token);
        this.saveToken(token);
        this.toggleLoggedIn();
        this.saveLoggedIn(true);
      });
    } else {
      this.toggleLoggedIn();
      this.saveLoggedIn(true);
    }
  }

  render() {
    return (
      <section>
        <h2>AUTH</h2>
      </section>
    );
  }
}

export default Auth;
