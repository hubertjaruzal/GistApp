import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

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
    if(localStorage.getItem('userToken') === null) {
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
        browserHistory.push('/');
        window.location.reload();
      });
    } else {
      this.toggleLoggedIn();
      this.saveLoggedIn(true);
      browserHistory.push('/');
      window.location.reload();
    }
  }

  render() {
    return (
      <section className="loader">
        <div className="sk-folding-cube loader__cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </section>
    );
  }
}

export default Auth;
