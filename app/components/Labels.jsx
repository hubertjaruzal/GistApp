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

  getInputValue(filenameClass) {
    let filename = '';
    filename = document.querySelectorAll(`.${filenameClass}`);
    return filename[0].value;
  }

  render() {
    return (
      <section className="labels__container">
        <h3>Labels</h3>
        <input
          placeholder="name"
          className="labels__input"
        />
        <button
          onClick={() => this.createLabel(this.getInputValue('labels__input'))}
        >
          Create
        </button>
        <div className="labels__items">
          {
            this.props.store.labels.map((label, index) => {
              return (
                <p className={"labels__item--"+index}>{label}</p>
              )
            })
          }
        </div>
      </section>
    );
  }
}

export default Labels;
