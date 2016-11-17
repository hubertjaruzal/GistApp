import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class App extends Component {
  constructor(props) {
    super(props);
  }

  toggleLoggedIn() {
    this.props.route.store.toggleLoggedIn();
  }

  saveLoggedIn(loggedIn) {
    this.props.route.store.saveLoggedIn(loggedIn);
  }

  setTokenFromStorage() {
    this.props.route.store.setTokenFromStorage();
  }

  getUserData() {
    this.props.route.store.getUserData();
  }

  componentWillMount() {
    if(this.props.route.store.isUserLoggedIn()) {
      this.toggleLoggedIn();
      this.saveLoggedIn(true);
      this.setTokenFromStorage();
      this.getUserData();
    }
  }

  render() {
    return (
      <section>
        <header className="navbar navbar-default navbar__container">
          <div className="user__info">
            {!this.props.route.store.loggedIn ?
              <button
                className="user__info--login"
                onClick={() => {
                  location.href = `https://github.com/login/oauth/authorize?scope=user:email,gist&client_id=${this.props.route.Config.key}`;
                }}
              >
                Sign in with github
              </button> :
              <div>
                <p className="user__info--name">{this.props.route.store.user.name}</p>
                <img className="user__info--avatar" src={this.props.route.store.user.avatar_url} />
              </div>
            }
          </div>
        </header>
        <div>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default App;
