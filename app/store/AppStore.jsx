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
  @observable gistsLabels = [];

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

  @action setGistsLabelsFromStorage = (label) => {
    return this.gistsLabels = JSON.parse("["+localStorage.getItem("gistsLabels")+"]");
  }

  @action stringifyItem = (tempLabels, labels, obj) => {
    tempLabels = labels.map(function(e){
      return JSON.stringify(e);
    });
    localStorage.setItem(obj, tempLabels.join(", "));
  }

  @action createLabel = (label) => {
    let labels = [];
    if(localStorage["labels"] !== undefined) {
      labels = JSON.parse("["+localStorage["labels"]+"]");
    }
    labels.push(label)
    this.stringifyItem(labels, labels, "labels");
    this.labels = JSON.parse("["+localStorage.getItem("labels")+"]");
  }

  @action removeLabel = (label) => {
    let labels = [];
    this.labels = this.labels.filter((item) => {
      return item !== label
    })
    this.stringifyItem(labels, this.labels, "labels");
  }

  @action removeGistLabel = (id, label) => {
    let labels = [];
    for(let item of this.gistsLabels) {
      if(item[id]) {
        item[id] = item[id].filter((data) => {
          return data !== label
        })
      }
    };
    this.stringifyItem(labels, this.gistsLabels, "gistsLabels");
  }

  @action removeLabelFromGist = (id, label) => {
    this.removeGistLabel(id, label);
  }

  @action checkIfGistContainsLabel = (id) => {
    for(let item of this.gistsLabels) {
      if(item[id] && (item[id].length > 0)) {
        return true;
      }
    };
    return false;
  }

  @action isGistExistsInArray = (array, id) => {
    for(let item of array) {
      if(item[id]) {
        return true;
      }
    };
    return false;
  }

  @action isGistLabelExistsInArray = (array, id, value) => {
    for(let item of array) {
      if(item[id] && item[id].includes(value)) {
        return false;
      }
    };
    return true;
  }

  @action addLabel = (id, value) => {
    let gistsLabels = [];
    if(localStorage["gistsLabels"] !== undefined) {
      gistsLabels = JSON.parse("["+localStorage["gistsLabels"]+"]");
    }
    if(this.isGistExistsInArray(gistsLabels, id)) {
      if(this.isGistLabelExistsInArray(gistsLabels, id, value)) {
        for(let item of gistsLabels) {
          if(item[id]) {
            item[id].push(value);
          }
        };
      }
    } else {
      gistsLabels.push({[id]: [value]});
    }
    this.stringifyItem(gistsLabels, gistsLabels, "gistsLabels");
    this.gistsLabels = JSON.parse("["+localStorage.getItem("gistsLabels")+"]");
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
