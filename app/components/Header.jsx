import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="navbar navbar-default header__container">
        <div className="user__info">
          {!this.props.isLoggedIn ?
            <button
              className="user__info--login"
              onClick={() => {
                location.href = `https://github.com/login/oauth/authorize?scope=user:email,gist&client_id=${this.props.route.Config.client_id}`;
              }}
            >
              Sign in with github
            </button> :
            <div>
              <p className="user__info--name">{this.props.username}</p>
              <img className="user__info--avatar" src={this.props.avatar} />
            </div>
          }
        </div>
      </header>
    );
  }
}

export default Header;
