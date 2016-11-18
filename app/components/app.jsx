import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import Menu from './Menu';
import List from './List';
import Details from './Details';

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

  getGistsData() {
    this.props.route.store.getGistsData();
  }

  componentWillMount() {
    if(this.props.route.store.isUserLoggedIn()) {
      this.toggleLoggedIn();
      this.saveLoggedIn(true);
      this.setTokenFromStorage();
      this.getUserData();
      this.getGistsData();
    }
  }

  render() {
    return (
      <section>
        <Header
          isLoggedIn={this.props.route.store.loggedIn}
          key={this.props.route.Config.key}
          username={this.props.route.store.user.name}
          avatar={this.props.route.store.user.avatar_url}
        />
        <section className="main__container">
          <Menu />
          <List
            store={this.props.route.store}
          />
          <Details
            gist={this.props.route.store.gist}
          />
        </section>
        <div>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default App;
