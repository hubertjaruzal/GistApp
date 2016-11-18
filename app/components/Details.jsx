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

  deleteGist(id, filename) {
    this.props.store.deleteGist(id, filename);
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

  render() {
    return (
      <section className="details__container">
        {this.props.store.gist.id &&
          <h2>Details</h2>
        }
        {this.props.store.gist.description !== '' &&
          <p>{this.props.store.gist.description}</p>
        }
        {this.props.store.gist.id &&
          <p>{this.props.store.gist.public ? 'Public' : 'Private'} Gist</p>
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
                      onClick={() => this.deleteGist(this.props.store.gist.id, data.filename)}
                    >
                      <i className="material-icons">clear</i>
                    </button>
                  </div>
                  <Codemirror value={data.content} className={`codemirror__${index}`} options={{mode: 'javascript', lineNumbers: true, readOnly: false}}/>
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
