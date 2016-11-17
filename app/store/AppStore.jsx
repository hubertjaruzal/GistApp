import { observable, action } from 'mobx';

class AppStore {
  @observable token = '';
  @observable loggedIn = false;
  @observable user = {};

  @action saveToken = (token) => {
    localStorage.setItem('userToken', token);
  }

  @action setToken = (token) => {
    return this.token = token;
  }

  @action setTokenFromStorage = () => {
    return this.token = localStorage.getItem('userToken');
  }

  @action saveLoggedIn = (loggedIn) => {
    localStorage.setItem('loggedIn', loggedIn);
  }

  @action toggleLoggedIn = () => {
    return this.loggedIn = !this.loggedIn;
  }

  @action isUserLoggedIn = () => {
    if(localStorage.getItem('loggedIn') == 'true') {
      return true;
    }
    return false;
  }

  @action getUserData = () => {
    fetch(`https://api.github.com/user?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      return this.user = json;
    });
  }
}

export default AppStore;
