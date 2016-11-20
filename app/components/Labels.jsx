import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Labels extends Component {
  constructor(props) {
    super(props);

  }

  createLabel(label) {
    this.props.store.createLabel(label)
  }

  removeLabel(label) {
    this.props.store.removeLabel(label)
  }

  getInputValue(filenameClass) {
    let filename = '';
    filename = document.querySelectorAll(`.${filenameClass}`);
    return filename[0].value;
  }

  render() {
    return (
      <section className="labels__container">
        <h3>Labels</h3>
        <div className="labels__form">
          <input
            placeholder="name"
            className="labels__input"
          />
          <button
            onClick={() => this.createLabel(this.getInputValue('labels__input'))}
          >
            Create
          </button>
        </div>
        <div className="labels__items">
          {
            this.props.store.labels.map((label, index) => {
              return (
                <div
                  key={index}
                  className="labels__items--container"
                >
                  <p className={"labels__item--"+index}>{label}</p>
                  <button
                    onClick={() => this.removeLabel(label)}
                  >
                    <i className="material-icons">clear</i>
                  </button>
                </div>
              )
            })
          }
        </div>
      </section>
    );
  }
}

export default Labels;
