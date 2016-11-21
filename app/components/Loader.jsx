import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="loader">
        <div className="sk-folding-cube loader__cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </section>
    );
  }
}

export default Loader;
