import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import Loader from './Loader';

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
      fetch(`https://gists-gatekeeper.herokuapp.com/authenticate/${code}`).then((response) => {
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
      <Loader />
    );
  }
}

export default Auth;
