import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class DetailsBottom extends Component {
  constructor(props) {
    super(props);
  }

  addLabel(id, value) {
    this.props.store.addLabel(id, value);
  }

  getSelectValue(selectClass) {
    let selectValue = '';
    selectValue = document.querySelectorAll(`.${selectClass}`);
    return selectValue[0].value;
  }

  removeLabelFromGist(id, label) {
    this.props.store.removeLabelFromGist(id, label);
  }

  checkIfGistContainsLabel(id) {
    this.props.store.checkIfGistContainsLabel(id);
  }

  toggleShowModalFile() {
    this.props.store.toggleShowModalFile();
  }

  render() {
    return (
      <div className="details__bottom">
        <div>
          <p>{this.props.store.gist.public ? "Public" : "Private"} Gist</p>
        </div>
        {this.props.store.checkIfGistContainsLabel(this.props.store.gist.id) &&
          <div className="details__bottom--labels">
            <p>Labels:</p>
            {
              this.props.store.gistsLabels.map((item) => {
                if(item[this.props.store.gist.id]) {
                  return item[this.props.store.gist.id].map((label, index) => {
                    return (
                      <button
                        className="details__bottom--label"
                        onClick={() => this.removeLabelFromGist(this.props.store.gist.id, label)}
                        key={index}
                      >
                        {label}
                      </button>
                    )
                  })
                }
              })
            }
          </div>
        }
        <button
          className="details__bottom--button"
          onClick={() => this.addLabel(this.props.store.gist.id, this.getSelectValue("details__select"))}
        >
          add label
        </button>
        <select
          className="form-control input-sm details__select"
        >
          {
            this.props.store.labels.map((label, index) => {
              return (
                <option
                  key={index}
                  value={label}
                >
                  {label}
                </option>
              )
            })
          }
        </select>
      </div>
    );
  }
}

export default DetailsBottom;
