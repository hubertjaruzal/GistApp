import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Codemirror from 'react-codemirror';
import '../../node_modules/codemirror/mode/jsx/jsx'
import '../../node_modules/codemirror/lib/codemirror.css'

@observer
class ModalFile extends Component {
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

  getInputValue(filenameClass) {
    let filename = '';
    filename = document.querySelectorAll(`.${filenameClass}`);
    return filename[0].value;
  }

  toggleShowModalFile() {
    this.props.store.toggleShowModalFile();
  }

  addGistFile(id, filename, content) {
    this.props.store.addGistFile(id, filename, content);
  }

  render() {
    return (
      <section className="modal__container">
        <div className="modal__box">
          <header className="modal__box--header">
            Add File
            <button
              onClick={() => this.toggleShowModalFile()}
            >
              <i className="material-icons">clear</i>
            </button>
          </header>
          <div className="modal__box--content">
            <input
              className="modal__box--filename"
              placeholder="Filename"
            />
            <Codemirror value={""} className="modal__box--codemirror" options={{mode: "javascript", lineNumbers: true, readOnly: false}}/>
            <div className="modal__box--container">
              <button
                onClick={() => this.addGistFile(this.props.store.gist.id, this.getInputValue("modal__box--filename"), this.getCodemirrorValue("modal__box--codemirror"))}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ModalFile;
