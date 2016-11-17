import { observable, action } from 'mobx';

class AppStore {
  @observable token = '';
  @observable loggedIn = false;

  @action saveToken = (token) => {
    localStorage.setItem('userToken', token);
  }

  @action setToken = (token) => {
    return this.token = token;
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
}

export default AppStore;
