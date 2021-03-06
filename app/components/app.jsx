import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import Menu from './Menu';
import List from './List';
import Details from './details/Details';
import ModalFile from './ModalFile'
import ModalGist from './ModalGist';
import Loader from './Loader';

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

  setLabelsFromStorage() {
    this.props.route.store.setLabelsFromStorage();
  }

  setGistsLabelsFromStorage() {
    this.props.route.store.setGistsLabelsFromStorage();
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
      this.setLabelsFromStorage();
      this.setGistsLabelsFromStorage();
      this.getUserData();
      this.getGistsData();
    }
  }

  render() {
    return (
      <section>
        {this.props.route.store.isLoading &&
          <Loader />
        }
        <Header
          isLoggedIn={this.props.route.store.loggedIn}
          route={this.props.route}
          username={this.props.route.store.user.name}
          avatar={this.props.route.store.user.avatar_url}
        />
        {this.props.route.store.isUserLoggedIn() &&
          <div>
            {this.props.route.store.showModalGist &&
              <ModalGist
                store={this.props.route.store}
              />
            }
            {this.props.route.store.showModalFile &&
              <ModalFile
                store={this.props.route.store}
              />
            }
            <section className="main__container">
              <Menu
                store={this.props.route.store}
              />
              <List
                store={this.props.route.store}
              />
              <Details
                store={this.props.route.store}
              />
            </section>
          </div>
        }
        <div>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default App;
