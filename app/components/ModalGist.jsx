import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Codemirror from 'react-codemirror';
import '../../node_modules/codemirror/mode/jsx/jsx'
import '../../node_modules/codemirror/lib/codemirror.css'

@observer
class ModalGist extends Component {
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

  getRadioValue() {
    let radioVal = '';
    radioVal = document.querySelectorAll(".modal__box--radios input:checked");
    return radioVal[0].value;
  }

  toggleShowModalGist() {
    this.props.store.toggleShowModalGist();
  }

  createGist(filename, content, description) {
    this.props.store.createGist(filename, content, description);
  }

  render() {
    return (
      <section className="modal__container">
        <div className="modal__box">
          <header className="modal__box--header">
            Add File
            <button
              onClick={() => this.toggleShowModalGist()}
            >
              <i className="material-icons">clear</i>
            </button>
          </header>
          <div className="modal__box--content">
            <input
              className="modal__box--description"
              placeholder="Description"
            />
            <div className="modal__box--radios">
              <input type="radio" id="public" name="status" value="public" />
              <label htmlFor="public">Public</label>
              <input type="radio" id="private" name="status" value="private" />
              <label htmlFor="private">Private</label>
            </div>
            <input
              className="modal__box--filename"
              placeholder="Filename"
            />
            <Codemirror value={""} className="modal__box--codemirror" options={{mode: "javascript", lineNumbers: true, readOnly: false}}/>
            <div className="modal__box--container">
              <button
                onClick={
                  () => {
                    this.createGist(
                      this.getInputValue("modal__box--filename"),
                      this.getCodemirrorValue("modal__box--codemirror"),
                      this.getInputValue("modal__box--description"),
                      this.getRadioValue("modal__box--description")
                    )
                  }
                }
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

export default ModalGist;
