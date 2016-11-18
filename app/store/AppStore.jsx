import { observable, action } from 'mobx';

class AppStore {
  @observable token = '';
  @observable loggedIn = false;
  @observable user = {};
  @observable gists = [];
  @observable gist = {};

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

  @action getGistsData = () => {
    fetch(`https://api.github.com/gists?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      return this.gists = json;
    });
  }

  @action getGistData = (id) => {
    fetch(`https://api.github.com/gists/${id}?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      return this.gist = json;
    });
  }

  @action editGist = (id, filename, content, description = '') => {
    fetch(`https://api.github.com/gists/${id}?access_token=${this.token}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          description: description,
          files: {
            [filename]: {
              content: content
            }
          }
        })
      }).then((response) => {
      return response.json();
    });
  }
}

export default AppStore;
