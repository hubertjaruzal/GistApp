import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Labels from './Labels';
import { browserHistory } from 'react-router';

@observer
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  getGistsData() {
    this.props.store.getGistsData();
  }

  getPublicGistsData() {
    this.props.store.getPublicGistsData();
  }

  getPrivateGistsData() {
    this.props.store.getPrivateGistsData();
  }

  getStarredGistData() {
    this.props.store.getStarredGistData();
  }

  toggleShowModalGist() {
    this.props.store.toggleShowModalGist();
  }

  logoutlabel() {
    this.props.store.logout();
    browserHistory.push('/');
    window.location.reload();
  }

  render() {
    return (
      <nav className="menu__container">
        <button
          className="menu__button"
          onClick={() => this.getGistsData()}
        >
          All Gists
        </button>
        <button
          className="menu__button" onClick={() => this.getPublicGistsData()}
        >
          Public Gists
        </button>
        <button
          className="menu__button" onClick={() => this.getPrivateGistsData()}
        >
          Private Gists
        </button>
        <button
          className="menu__button" onClick={() => this.getStarredGistData()}
        >
          Starred Gists
        </button>
        <button
          className="menu__button" onClick={() => this.toggleShowModalGist()}
        >
          Create Gist
        </button>
        <Labels
          store={this.props.store}
        />
        <button
          className="menu__button--logout" onClick={() => this.logoutlabel()}
        >
          Logout
        </button>
      </nav>
    );
  }
}

export default Menu;
