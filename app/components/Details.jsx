import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Codemirror from 'react-codemirror';
import '../../node_modules/codemirror/mode/jsx/jsx'
import '../../node_modules/codemirror/lib/codemirror.css'

@observer
class Details extends Component {
  constructor(props) {
    super(props);
  }

  addLabel(id, value) {
    this.props.store.addLabel(id, value);
  }

  renderCodemirror() {
    let files = [];
    for(let file in this.props.store.gist.files) {
      files.push(this.props.store.gist.files[file])
    }
    return files;
  }

  editGist(id, filename, content) {
    this.props.store.editGist(id, filename, content);
  }

  deleteGistFile(id, filename) {
    this.props.store.deleteGistFile(id, filename);
  }

  deleteGist(id) {
    this.props.store.deleteGist(id);
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

  getCodemirrorValue(mirrorClass) {
    let codemirrorArray = [];
    let codemirrorText = document.querySelectorAll(`.${mirrorClass} .CodeMirror-code .CodeMirror-line`);
    codemirrorText.forEach((data) => {
      codemirrorArray.push(data.innerText)
    })
    if(codemirrorArray.length > 1) {
      codemirrorText = codemirrorArray.join('\n')
    } else {
      codemirrorText = codemirrorArray.join('')
    }
    return codemirrorText;
  }

  toggleShowModalFile() {
    this.props.store.toggleShowModalFile();
  }

  render() {
    return (
      <section className="details__container">
        {this.props.store.gist.id &&
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
        }
        {this.props.store.gist.description !== '' &&
          <p>{this.props.store.gist.description}</p>
        }
        {this.props.store.gist.id &&
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
        }
        <div className="details__code">
          {
            this.renderCodemirror().map((data, index) => {
              return (
                <div key={index}>
                  <div className="details__header">
                    <p className="details__name">{index+1}. {data.filename}</p>
                    <button
                      className="button__header button__edit"
                      onClick={() => this.editGist(this.props.store.gist.id, data.filename, this.getCodemirrorValue(`codemirror__${index}`))}
                    >
                      <i className="material-icons">mode_edit</i>
                    </button>
                    <button
                      className="button__header button__delete"
                      onClick={() => this.deleteGistFile(this.props.store.gist.id, data.filename)}
                    >
                      <i className="material-icons">clear</i>
                    </button>
                  </div>
                  <Codemirror
                    className={`codemirror__${index}`}
                    value={data.content}
                    options={{
                      mode: "javascript",
                      lineNumbers: true,
                      readOnly: !this.props.store.ownGists
                    }}/>
                </div>
              )
            })
          }

        </div>
      </section>
    );
  }
}

export default Details;
