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

  componentWillMount() {
    if(this.props.route.store.isUserLoggedIn()) {
      this.toggleLoggedIn();
      this.saveLoggedIn(true);
    }
  }

  render() {
    return (
      <section>
        <h1>Hello!</h1>
        {!this.props.route.store.loggedIn &&
          <button
            onClick={() => {
              location.href = `https://github.com/login/oauth/authorize?scope=user:email,gist&client_id=${this.props.route.Config.key}`;
            }}
          >
            Sign in with github
          </button>
        }
        <button
          onClick={() => {
            console.log(this.props);
          }}
        >
          Props
        </button>
        <div>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default App;
