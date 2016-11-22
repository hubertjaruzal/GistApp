import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class DetailsTop extends Component {
  constructor(props) {
    super(props);
  }

  deleteGist(id) {
    this.props.store.deleteGist(id);
  }

  toggleShowModalFile() {
    this.props.store.toggleShowModalFile();
  }

  render() {
    return (
      <div className="details__top">
        <h2>Details</h2>
        {this.props.store.ownGists &&
          <div
            className="details__top--buttons"
          >
            <button
              className="button__main"
              onClick={() => this.toggleShowModalFile()}
            >
              Add file
            </button>
            <button
              className="button__red"
              onClick={() => this.deleteGist(this.props.store.gist.id)}
            >
              Remove Gist
            </button>
          </div>
        }
      </div>
    );
  }
}

export default DetailsTop;
