import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Codemirror from 'react-codemirror';
import '../../node_modules/codemirror/mode/jsx/jsx'
import '../../node_modules/codemirror/lib/codemirror.css'

@observer
class Modal extends Component {
  constructor(props) {
    super(props);
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

  getFilenameValue(filenameClass) {
    let filename = '';
    filename = document.querySelectorAll(`.${filenameClass}`);
    return filename[0].value;
  }

  toggleShowModal() {
    this.props.store.toggleShowModal();
  }

  addGist(id, filename, content) {
    this.props.store.addGist(id, filename, content);
  }

  render() {
    return (
      <section className="modal__container">
        <div className="modal__box">
          <header className="modal__box--header">
            Add File
            <button
              onClick={() => this.toggleShowModal()}
            >
              <i className="material-icons">clear</i>
            </button>
          </header>
          <input
            className="modal__box--filename"
            placeholder="Filename"
          />
          <Codemirror value={""} className="modal__box--codemirror" options={{mode: "javascript", lineNumbers: true, readOnly: false}}/>
          <div className="modal__box--container">
            <button
              onClick={() => this.addGist(this.props.store.gist.id, this.getFilenameValue("modal__box--filename"), this.getCodemirrorValue("modal__box--codemirror"))}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Modal;
