import { observable, action } from 'mobx';

class AppStore {
  @observable token = '';
  @observable loggedIn = false;
  @observable user = {};
  @observable gists = [];
  @observable gist = {};
  @observable showModalFile = false;
  @observable showModalGist = false;
  @observable ownGists = false;
  @observable labels = [];

  @action saveToken = (token) => {
    localStorage.setItem('userToken', token);
  }

  @action setToken = (token) => {
    return this.token = token;
  }

  @action setTokenFromStorage = () => {
    return this.token = localStorage.getItem("userToken");
  }

  @action saveLoggedIn = (loggedIn) => {
    localStorage.setItem("loggedIn", loggedIn);
  }

  @action toggleLoggedIn = () => {
    return this.loggedIn = !this.loggedIn;
  }

  @action isUserLoggedIn = () => {
    if(localStorage.getItem("loggedIn") == "true") {
      return true;
    }
    return false;
  }

  @action setLabelsFromStorage = (label) => {
    return this.labels = JSON.parse("["+localStorage.getItem("labels")+"]");
  }

  @action createLabel = (label) => {
    let labels = [];
    if(localStorage["labels"] !== undefined) {
      labels = JSON.parse("["+localStorage["labels"]+"]");
    }
    labels.push(label)
    labels = labels.map(function(e){
      return JSON.stringify(e);
    });
    localStorage.setItem('labels', labels.join(", "));
    this.labels = JSON.parse("["+localStorage.getItem("labels")+"]");
  }

  @action toggleShowModalFile = () => {
    return this.showModalFile = !this.showModalFile;
  }

  @action toggleShowModalGist = () => {
    return this.showModalGist = !this.showModalGist;
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
      this.gist =  {};
      this.ownGists =  true;
      return this.gists = json;
    });
  }

  @action getPublicGistsData = () => {
    fetch(`https://api.github.com/gists?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      this.gist =  {};
      this.ownGists =  true;
      return this.gists = json.filter(x => x.public);
    });
  }

  @action getPrivateGistsData = () => {
    fetch(`https://api.github.com/gists?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      this.gist =  {};
      this.ownGists =  true;
      return this.gists = json.filter(x => !x.public);
    });
  }

  @action getGistData = (id) => {
    fetch(`https://api.github.com/gists/${id}?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      return this.gist = json;
    });
  }

  @action getStarredGistData = () => {
    fetch(`https://api.github.com/gists/starred?access_token=${this.token}`).then((response) => {
      return response.json();
    }).then(json => {
      this.gist =  {};
      this.ownGists =  false;
      return this.gists = json;
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

  @action createGist = (filename, content, description = '', status) => {
    fetch(`https://api.github.com/gists?access_token=${this.token}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          description: description,
          [status]: true,
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

  @action addGistFile = (id, filename, content) => {
    fetch(`https://api.github.com/gists/${id}?access_token=${this.token}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
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

  @action deleteGistFile = (id, filename) => {
    fetch(`https://api.github.com/gists/${id}?access_token=${this.token}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          files: {
            [filename]: null
          }
        })
      }).then((response) => {
      return response.json();
    });
  }

  @action deleteGist = (id) => {
    fetch(`https://api.github.com/gists/${id}?access_token=${this.token}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }).then((response) => {
      return response.json();
    });
  }
}

export default AppStore;
